// 🍁 ملف: صراحة.js - لعبة الصراحة - ISAGI TENGEN BOT

import {
    getSession, setSession, delSession,
    createSession, currentPlayer,
    nextTurn, buildQuestionMsg, buildEndMsg
} from './truth_turns.js';
import { QUESTION_TYPES } from './truth_questions.js';

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const DEVELOPER = 'تنغن كيرا';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';
const MAIN_IMAGE = 'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9af3b0fe0a.jpg';

const CHANNEL_INFO = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: CHANNEL_JID,
            newsletterName: CHANNEL_NAME,
            serverMessageId: -1
        }
    }
};

const SESSION_TIMEOUT = 5 * 60 * 1000;

const getName = async (jid, conn, m) => {
    try {
        if (jid === m.sender && m.pushName) return m.pushName;
        if (typeof conn.getName === 'function') {
            const n = await conn.getName(jid).catch(() => null);
            if (n) return n;
        }
    } catch {}
    return jid.split('@')[0];
};

const handler = async (m, { conn, command, args, bot }) => {
    const jid = m.sender;
    const chat = m.chat;
    const isGroup = m.isGroup;

    switch (command) {

        // ─ بدء اللعبة ─
        case 'صراحة':
        case 'truth':
        case 'الصراحة': {

            if (isGroup) {
                const mentioned = m.mentionedJid || [];
                if (!mentioned.length) {
                    const bodyText = `${EMOJI}━━━[ *🎯 لعبة الصراحة* ]━━━${EMOJI}

📌 *طريقة الاستخدام:*
▸ .صراحة @شخص1 @شخص2
▸ .صراحة @شخص1 @شخص2 @شخص3

📝 *للعب في الخاص:*
▸ .صراحة

${EMOJI} *${BOT_NAME}*`;

                    try {
                        await conn.sendButton(chat, {
                            imageUrl: MAIN_IMAGE,
                            bodyText: bodyText,
                            footerText: `${EMOJI} ${BOT_NAME}`,
                            buttons: [
                                {
                                    name: 'cta_url',
                                    params: {
                                        display_text: `${EMOJI} قناة البوت`,
                                        url: CHANNEL_LINK
                                    }
                                }
                            ],
                            mentions: [m.sender],
                            newsletter: {
                                name: CHANNEL_NAME,
                                jid: CHANNEL_JID
                            },
                            interactiveConfig: { buttons_limits: 20 }
                        }, m);
                    } catch (e) {
                        await conn.sendMessage(chat, {
                            text: bodyText,
                            ...CHANNEL_INFO
                        }, { quoted: m });
                    }
                    return;
                }

                const players = [jid, ...mentioned.filter(p => p !== jid)].slice(0, 4);
                if (players.length < 2) {
                    return m.reply(`${EMOJI} ❌ *محتاج لاعبين على الأقل!*`);
                }
                if (players.length > 4) {
                    return m.reply(`${EMOJI} ❌ *أقصى عدد 4 لاعبين*`);
                }

                if (getSession(chat)) {
                    return m.reply(`${EMOJI} ❌ *في لعبة شغالة!\n.إنهاء* لإنهاء اللعبة الحالية*`);
                }

                const session = createSession(chat, players, 'group');

                const names = await Promise.all(players.map(p => getName(p, conn, m)));
                const playersList = players.map((p, i) => `${i + 1}. @${p.split('@')[0]} (${names[i]})`).join('\n');

                await conn.sendMessage(chat, {
                    text:
                        `${EMOJI}━━━[ *🎯 بدأت لعبة الصراحة* ]━━━${EMOJI}

*اللاعبين:*
${playersList}

📌 *اختار نوع السؤال:*
▸ *.عامة* ← أسئلة عامة
▸ *.شخصية* ← أسئلة شخصية
▸ *.جريئة* ← أسئلة جريئة
▸ *.عشوائي* ← سؤال عشوائي

${EMOJI} *${BOT_NAME}*`,
                    contextInfo: { mentionedJid: players }
                }, { quoted: m });

            } else {
                if (getSession(chat)) {
                    return m.reply(`${EMOJI} ❌ *في لعبة شغالة!\n.إنهاء* لإنهاء اللعبة الحالية*`);
                }

                const session = createSession(chat, [jid], 'private');

                await m.reply(
                    `${EMOJI}━━━[ *🎯 لعبة الصراحة* ]━━━${EMOJI}

📌 *اختار نوع السؤال:*
▸ *.عامة* ← أسئلة عامة
▸ *.شخصية* ← أسئلة شخصية
▸ *.جريئة* ← أسئلة جريئة
▸ *.عشوائي* ← سؤال عشوائي

${EMOJI} *${BOT_NAME}*`
                );
            }
            break;
        }

        // ─ اختيار نوع السؤال ─
        case 'عامة':
        case 'شخصية':
        case 'جريئة':
        case 'عشوائي':
        case 'general':
        case 'personal':
        case 'daring':
        case 'random': {

            const session = getSession(chat);
            if (!session) {
                return m.reply(`${EMOJI} ❌ *مفيش لعبة شغالة!\n.صراحة* للبدء*`);
            }

            if (isGroup && currentPlayer(session) !== jid) {
                return m.reply(`*❌ مش دورك!\nدور @${currentPlayer(session).split('@')[0]}*`);
            }

            const typeMap = {
                'عامة': 'general', 'general': 'general',
                'شخصية': 'personal', 'personal': 'personal',
                'جريئة': 'daring', 'daring': 'daring',
                'عشوائي': ['general','personal','daring'][Math.floor(Math.random()*3)],
                'random': ['general','personal','daring'][Math.floor(Math.random()*3)],
            };
            const type = typeMap[command] || 'general';

            session.lastActive = Date.now();

            const { text, mentions } = await buildQuestionMsg(session, type, conn);
            await conn.sendMessage(chat, { text, contextInfo: { mentionedJid: mentions } }, { quoted: m });
            break;
        }

        // ─ جواب ─
        case 'جواب':
        case 'answered': {
            const session = getSession(chat);
            if (!session) return;

            if (isGroup && currentPlayer(session) !== jid) return;

            session.scores[jid] = (session.scores[jid] || 0) + 1;
            session.lastActive = Date.now();

            const nextPlayer = nextTurn(session);

            await conn.sendMessage(chat, {
                text:
                    `${EMOJI} ✅ *تمام يا @${jid.split('@')[0]}!*\n\n` +
                    `دلوقتي دور @${nextPlayer.split('@')[0]}\n\n` +
                    `📌 *اختار نوع السؤال:*\n` +
                    `*.عامة* ┃ *.شخصية* ┃ *.جريئة* ┃ *.عشوائي*`,
                contextInfo: { mentionedJid: [jid, nextPlayer] }
            }, { quoted: m });
            break;
        }

        // ─ تخطى ─
        case 'تخطى':
        case 'skip': {
            const session = getSession(chat);
            if (!session) return;
            if (isGroup && currentPlayer(session) !== jid) return;

            session.scores[jid] = (session.scores[jid] || 0) - 1;
            session.lastActive = Date.now();

            const nextPlayer = nextTurn(session);

            await conn.sendMessage(chat, {
                text:
                    `${EMOJI} 😅 *@${jid.split('@')[0]} اختار يتخطى - خسر نقطة!*\n\n` +
                    `دلوقتي دور @${nextPlayer.split('@')[0]}\n\n` +
                    `📌 *اختار نوع السؤال:*\n` +
                    `*.عامة* ┃ *.شخصية* ┃ *.جريئة* ┃ *.عشوائي*`,
                contextInfo: { mentionedJid: [jid, nextPlayer] }
            }, { quoted: m });
            break;
        }

        // ─ إنهاء ─
        case 'إنهاء':
        case 'انهاء':
        case 'end_truth': {
            const session = getSession(chat);
            if (!session) {
                return m.reply(`${EMOJI} ❌ *مفيش لعبة شغالة دلوقتي*`);
            }

            const names = {};
            for (const p of session.players) {
                names[p] = await getName(p, conn, m);
            }

            const { text, mentions } = buildEndMsg(session, names);
            delSession(chat);

            await conn.sendMessage(chat, {
                text,
                contextInfo: { mentionedJid: mentions }
            }, { quoted: m });
            break;
        }

        // ─ مساعدة ─
        case 'صراحة_مساعدة': {
            return m.reply(
                `${EMOJI}━━━[ *🎯 لعبة الصراحة* ]━━━${EMOJI}

📌 *في الجروب:*
▸ .صراحة @شخص1 @شخص2 ← ثنائي
▸ .صراحة @شخص1 @شخص2 @شخص3 ← ثلاثي

📌 *في الخاص:*
▸ .صراحة ← تلعب مع البوت

📌 *أوامر اللعبة:*
▸ *.عامة* ← سؤال عام
▸ *.شخصية* ← سؤال شخصي
▸ *.جريئة* ← سؤال جريء
▸ *.عشوائي* ← سؤال عشوائي
▸ *.جواب* ← لما تجاوب
▸ *.تخطى* ← ترفض الإجابة
▸ *.إنهاء* ← إنهاء اللعبة

${EMOJI} *${BOT_NAME}*`
            );
        }
    }
};

handler.before = async (m, ctx, bot) => {
    const sessions = global._gs?.__truth;
    if (!sessions) return false;
    const now = Date.now();
    for (const [id, session] of Object.entries(sessions)) {
        if (session?.lastActive && now - session.lastActive > SESSION_TIMEOUT) {
            delete sessions[id];
            try {
                await ctx?.conn?.sendMessage?.(id, {
                    text: `${EMOJI} ⏰ *انتهت لعبة الصراحة بسبب عدم النشاط*\n\n.صراحة* للعب مرة تانية`
                });
            } catch {}
        }
    }
    return false;
};

handler.usage = ['صراحة2', 'عامة', 'شخصية', 'جريئة', 'جواب', 'تخطى', 'إنهاء'];
handler.category = 'fun';
handler.command = [
    '2صراحة', 'truth', '2الصراحة',
    'عامة', 'شخصية', 'جريئة', 'عشوائي',
    'general', 'personal', 'daring', 'random',
    'جواب', 'answered', 'تخطى', 'skip',
    'إنهاء', 'انهاء', 'end_truth',
    'صراحة_مساعدة'
];

export default handler;