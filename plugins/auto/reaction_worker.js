// 🍁 reaction_worker.js - مراقبة القنوات وإرسال التفاعلات
import { getSubsByChannel, getAllSubs, removeSub } from '../../system/reaction_db.js';

// 🍁 قائمة الإيموجيات الافتراضية
const DEFAULT_EMOJIS = [
    '😂','🫩','🙃','😉','💋','❤','✨','🌚','✅',
    '🐥','🎭','🙀','🤲🏻','⚜️','🚫','🤖','🥹',
    '🙂‍↔️','🖐🏻','😳','😥','🍁','🔥','👑'
];

// 🍁 حماية من التكرار
if (!global.__reactionWorkerActive) global.__reactionWorkerActive = false;

// 🍁 سجل الرسائل اللي اتفاعل عليها
if (!global.__reactedMsgs) global.__reactedMsgs = new Set();

const MAX_REACTED_CACHE = 1000;

// 🍁 تأخير
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const randomDelay = (min = 1500, max = 4000) =>
    delay(min + Math.floor(Math.random() * (max - min)));

// 🍁 إرسال تفاعل واحد
const sendReaction = async (conn, jid, msgKey, emoji) => {
    try {
        await conn.sendMessage(jid, {
            react: { text: emoji, key: msgKey }
        });
        return true;
    } catch (e) {
        console.log(`🍁 فشل reaction: ${e.message?.slice(0,50)}`);
        return false;
    }
};

const handler = async (m, { conn }) => {};

// 🍁 before hook: مراقبة كل رسالة
handler.before = async (m, { conn }) => {
    if (!m?.key) return false;

    // حفظ conn في global
    if (!global._conn) global._conn = conn;

    const jid = m.key.remoteJid || '';

    // فقط القنوات
    if (!jid.includes('@newsletter')) return false;

    // التحقق من الاشتراكات
    const subs = getSubsByChannel(jid);
    if (!subs.length) return false;

    // منع التكرار
    const msgId = m.key.id;
    if (global.__reactedMsgs.has(msgId)) return false;
    global.__reactedMsgs.add(msgId);

    // تنظيف الكاش
    if (global.__reactedMsgs.size > MAX_REACTED_CACHE) {
        const arr = [...global.__reactedMsgs];
        global.__reactedMsgs = new Set(arr.slice(-500));
    }

    // إرسال التفاعلات لكل اشتراك
    (async () => {
        for (const sub of subs) {
            // التحقق من انتهاء الاشتراك
            if (Date.now() > sub.expiresAt) {
                removeSub(sub.id);
                console.log(`🍁 اشتراك منتهي: ${sub.id}`);
                continue;
            }

            // ✅ تعيين القيم الافتراضية إذا كانت مفقودة
            const count = sub.count || 3;
            const emojis = sub.emojis && sub.emojis.length ? sub.emojis : DEFAULT_EMOJIS;
            const maxCount = Math.min(count, 50);

            let sentCount = 0;
            while (sentCount < maxCount) {
                const emoji = emojis[sentCount % emojis.length];
                const ok = await sendReaction(conn, jid, m.key, emoji);
                if (ok) sentCount++;

                // تأخير بين كل تفاعل
                if (sentCount < maxCount) await randomDelay(2000, 5000);
            }
            
            console.log(`🍁 تم إرسال ${sentCount} تفاعل على قناة ${jid}`);
        }
    })().catch(e => console.log('🍁 خطأ:', e.message));

    return false;
};

handler.command  = [];
handler.category = 'auto';

export default handler;
