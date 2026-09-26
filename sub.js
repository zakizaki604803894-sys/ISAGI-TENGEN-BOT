/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — نظام البوتات الفرعية (سريع)
   📁 /home/container/sub.js
   ✅ يدعم أحداث المجموعة للفرعيين → البلوجنات
   ✅ يستخرج authorPn (رقم المرسل الحقيقي) من WS
   ═══════════════════════════════════════════════════════════ */

import { SubBots } from "meowsab";

/* ═══════════════════════════════════════════
   🏆 الهوية الموحّدة
   ═══════════════════════════════════════════ */
const BRAND = {
    botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
    shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
    emoji:       '🍁'
};

/* ⚡ استخراج نص الرسالة */
function getMessageText(msg) {
    if (!msg?.message) return null;
    const m = msg.message;
    return m.conversation ||
           m.extendedTextMessage?.text ||
           m.imageMessage?.caption ||
           m.videoMessage?.caption ||
           msg.body ||
           null;
}

/* ⚡ كاش الرسائل */
const messageCache = new Map();
const isDuplicate = (key) => {
    if (!key?.id) return false;
    if (messageCache.has(key.id)) return true;
    messageCache.set(key.id, Date.now());
    if (messageCache.size > 1000) {
        const now = Date.now();
        for (const [id, time] of messageCache.entries()) {
            if (now - time > 60_000) messageCache.delete(id);
        }
    }
    return false;
};

/* ⚡ كاش تسجيل الأحداث */
const _eventsRegistered = new Set();

/* ═══════════════════════════════════════════
   🎯 كاش authorPn — يربط @lid بالرقم الحقيقي
   ✅ من WS notification → participant_pn
   ✅ يُخزّن مؤقتاً لمدة 30 ثانية
   ═══════════════════════════════════════════ */
const _authorPnCache = new Map();
const _AUTHOR_PN_TTL = 30_000;

const cacheAuthorPn = (lid, pn) => {
    if (!lid || !pn) return;
    _authorPnCache.set(lid, pn);

    /* تنظيف بعد TTL */
    setTimeout(() => {
        if (_authorPnCache.get(lid) === pn) {
            _authorPnCache.delete(lid);
        }
    }, _AUTHOR_PN_TTL);
};

const getCachedAuthorPn = (lid) => _authorPnCache.get(lid) || null;

/* ═══════════════════════════════════════════
   🎯 معالج أحداث المشاركين
   ═══════════════════════════════════════════ */
async function handleParticipantsUpdate(uid, sock, update) {
    try {
        const { id: chatId, participants, action, author } = update || {};
        if (!chatId || !participants?.length) return;
        if (!['add', 'remove', 'promote', 'demote'].includes(action)) return;

        /* 🎯 استخراج authorPn من الكاش */
        let authorPn = null;
        if (author) {
            authorPn = getCachedAuthorPn(author);

            /* 🎯 احتياطي: إذا author نفسه رقم حقيقي */
            if (!authorPn && author.includes('@s.whatsapp.net')) {
                authorPn = author;
            }
        }

        const event = {
            id: update.id || Date.now().toString(),
            chat: chatId,
            participants,
            action,
            author: author || null,
            authorPn,                                      /* ✅ الرقم الحقيقي */
            authorUrl: author ? `https://wa.me/${(authorPn || author).split('@')[0]}` : undefined,
            timestamp: new Date()
        };

        const ctx = { sock, client: sock, uid };
        const { group } = await import('./system/control.js');
        await group(ctx, event, action);

        console.log(`${BRAND.emoji} ✅ [SubBot ${uid}] ${action} → ${chatId} | author: ${author} | pn: ${authorPn || 'N/A'}`);
    } catch (e) {
        console.log(`${BRAND.emoji} ⚠️ [SubBot ${uid}] handleParticipants error:`, e.message);
    }
}

/* ═══════════════════════════════════════════
   🎯 معالج تغييرات المجموعة
   ═══════════════════════════════════════════ */
async function handleGroupsUpdate(uid, sock, updates) {
    try {
        for (const update of (updates || [])) {
            const chatId = update.id;
            if (!chatId) continue;

            let eventType = null;
            if (update.subject !== undefined) eventType = 'subject';
            else if (update.announce !== undefined) eventType = 'announce';
            else if (update.restrict !== undefined) eventType = 'restrict';

            if (!eventType) continue;

            const author = update.author || null;
            let authorPn = null;
            if (author) {
                authorPn = getCachedAuthorPn(author);
                if (!authorPn && author.includes('@s.whatsapp.net')) authorPn = author;
            }

            const event = {
                id: Date.now().toString(),
                chat: chatId,
                participants: [],
                action: eventType,
                author,
                authorPn,
                subject: update.subject,
                announce: update.announce,
                restrict: update.restrict,
                timestamp: new Date()
            };

            const ctx = { sock, client: sock, uid };
            const { group } = await import('./system/control.js');
            await group(ctx, event, eventType);

            console.log(`${BRAND.emoji} ✅ [SubBot ${uid}] ${eventType} → ${chatId}`);
        }
    } catch (e) {
        console.log(`${BRAND.emoji} ⚠️ [SubBot ${uid}] handleGroups error:`, e.message);
    }
}

/* ═══════════════════════════════════════════
   🎯 تسجيل أحداث المجموعة
   ═══════════════════════════════════════════ */
async function registerSubBotEvents(uid, sock) {
    if (_eventsRegistered.has(uid)) return;
    if (!sock) return;

    _eventsRegistered.add(uid);

    try {
        const botInstance = global.subBots.get(uid);

        let attached = false;

        /* ═══ 1) sock.ev — الطريقة القياسية ═══ */
        if (sock?.ev?.on) {
            try {
                sock.ev.on('group-participants.update', (u) => {
                    handleParticipantsUpdate(uid, sock, u);
                });
                sock.ev.on('groups.update', (u) => {
                    handleGroupsUpdate(uid, sock, u);
                });
                attached = true;
                console.log(`${BRAND.emoji} ✅ [SubBot ${uid}] Events on sock.ev`);
            } catch (e) {
                console.log(`${BRAND.emoji} ⚠️ [SubBot ${uid}] sock.ev failed:`, e.message);
            }
        }

        /* ═══ 2) sock.ws — WebSocket مباشر (لتخزين authorPn) ═══ */
        if (sock?.ws?.on) {
            try {
                sock.ws.on('CB:notification', (node) => {
                    try {
                        const attrs = node?.attrs || {};

                        /* 🎯 تخزين authorPn */
                        const lid = attrs.participant;
                        const pn = attrs.participant_pn;

                        if (lid && pn) {
                            cacheAuthorPn(lid, pn);
                        }

                        /* 🎯 احتياطي: أحداث المجموعة */
                        const from = attrs.from;
                        if (!from || !from.endsWith('@g.us')) return;

                        const content = node?.content?.[0];
                        if (!content) return;

                        const innerTag = content?.tag;
                        const innerAttrs = content?.attrs || {};

                        /* أحداث المشاركين */
                        if (innerTag === 'participant') {
                            const action = innerAttrs?.type;
                            const targetJid = innerAttrs?.jid;
                            const author = innerAttrs?.author || attrs.participant;

                            if (!['add', 'remove', 'promote', 'demote'].includes(action)) return;
                            if (!targetJid) return;

                            handleParticipantsUpdate(uid, sock, {
                                id: Date.now().toString(),
                                chat: from,
                                participants: [{ id: targetJid, phoneNumber: targetJid }],
                                action,
                                author
                            });
                        }

                        /* تغييرات المجموعة */
                        if (innerTag === 'subject' || innerTag === 'announce' || innerTag === 'restrict') {
                            handleGroupsUpdate(uid, sock, [{
                                id: from,
                                subject: innerTag === 'subject' ? (innerAttrs?.subject || innerAttrs?.value) : undefined,
                                announce: innerTag === 'announce' ? (innerAttrs?.value === 'true' || innerAttrs?.value === '1') : undefined,
                                restrict: innerTag === 'restrict' ? (innerAttrs?.value === 'true' || innerAttrs?.value === '1') : undefined,
                                author: innerAttrs?.author || attrs.participant
                            }]);
                        }
                    } catch {}
                });

                attached = true;
                console.log(`${BRAND.emoji} ✅ [SubBot ${uid}] Events on sock.ws`);
            } catch (e) {
                console.log(`${BRAND.emoji} ⚠️ [SubBot ${uid}] sock.ws failed:`, e.message);
            }
        }

        /* ═══ 3) botInstance — احتياطي ═══ */
        if (!attached && botInstance?.on) {
            try {
                botInstance.on('group-participants.update', (u) => {
                    handleParticipantsUpdate(uid, sock, u);
                });
                attached = true;
                console.log(`${BRAND.emoji} ✅ [SubBot ${uid}] Events on botInstance`);
            } catch (e) {}
        }

        if (attached) {
            console.log(`${BRAND.emoji} ✅ [SubBot ${uid}] Group events registered`);
        } else {
            console.log(`${BRAND.emoji} ❌ [SubBot ${uid}] No event attachment`);
            _eventsRegistered.delete(uid);
        }

    } catch (e) {
        console.log(`${BRAND.emoji} ⚠️ [SubBot ${uid}] Registration error:`, e.message);
        _eventsRegistered.delete(uid);
    }
}

/* ═══════════════════════════════════════════
   🎯 الدالة الرئيسية
   ═══════════════════════════════════════════ */
async function sub(client) {
    global.subBots = new SubBots(client.commandSystem);

    SubBots.pariCode("TENGEN07");

    const { config } = client;

    await global.subBots.setConfig({
        commandsPath: config.commandsPath || './plugins',
        owners: config.owners,
        prefix: config.prefix,
        info: config.info,
        printQR: false
    });

    global.subBots.on('error', (uid, error) => {
        if (error?.message?.includes('rate-overlimit')) return;
        console.error(`${BRAND.emoji} [SubBot ${uid}]`, error?.message || error);
    });

    const loadedCount = await global.subBots.load();
    console.log(`${BRAND.emoji} ✅ Loaded ${loadedCount} saved bots`);

    global.subBots.on('ready', async (uid, sock) => {
        console.log(`${BRAND.emoji} ✅ [SubBot ${uid}] Connected!`);
        await registerSubBotEvents(uid, sock);
    });

    global.subBots.on('pair', (uid, code) => {
        console.log(`${BRAND.emoji} 🔐 [SubBot ${uid}] Pairing code: ${code}`);
    });

    global.subBots.on('message', async (uid, msg) => {
        if (msg.key.id?.includes("3EB0")) return;
        if (isDuplicate(msg.key)) return;

        const body = getMessageText(msg);
        if (!body) return;

        const bot = global.subBots.get(uid);
        const sock = bot?.sock;
        if (!sock) return;

        if (!_eventsRegistered.has(uid)) {
            registerSubBotEvents(uid, sock).catch(() => {});
        }

        try {
            if (body === "KIRATENGEN") {
                sock.sendMessage(msg.key.remoteJid, {
                    react: { text: "🫦", key: msg.key }
                }).catch(() => {});
            }
        } catch {}
    });

    global.subBots.on('close', (uid) => {
        console.log(`${BRAND.emoji} 🔌 [SubBot ${uid}] Disconnected`);
        _eventsRegistered.delete(uid);
    });

    global.subBots.on('badSession', (uid) => {
        console.log(`${BRAND.emoji} ⚠️ [SubBot ${uid}] Bad session, removed`);
        _eventsRegistered.delete(uid);
    });

    return global.subBots;
}

export default sub;