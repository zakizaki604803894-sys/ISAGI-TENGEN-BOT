/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة ترتيب الحروف
   📁 /home/container/plugins/game/ترتيب.js
   ✅ بدون آيات | بدون صورة | تصميم هاتف
   ═══════════════════════════════════════════════════════════ */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { addExp } from '../bank/نظام_البنك.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ═══════════════════════════════════════════
   🏆 الهوية الموحّدة
   ═══════════════════════════════════════════ */
const BRAND = {
    botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
    shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
    developer:   'ISAGI 🍁',
    channelId:   '120363428650036031@newsletter',
    channelName: '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
    channelLink: 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u',
    emoji:       '🍁'
};

const CHANNEL_INFO = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: BRAND.channelId,
            newsletterName: BRAND.channelName,
            serverMessageId: -1
        }
    }
};

/* ────────────────[إعدادات اللعبة]──────────────── */
let timeout = 60000;
let poin = 500;

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki || {};
    let id = m.chat;

    if (id in conn.tekateki) {
        await conn.sendMessage(m.chat, {
            text: `${BRAND.emoji} *لعبة نشطة!*
━━━━━
📌 أكمل اللعبة الحالية`
        }, { quoted: conn.tekateki[id][0] });
        return;
    }

    /* ✅ قراءة الأسئلة */
    let tekateki;
    try {
        let filePath = path.join(__dirname, '../../src/game/miku3.json');
        if (!fs.existsSync(filePath)) {
            filePath = path.join(process.cwd(), 'src/game/miku3.json');
        }
        if (!fs.existsSync(filePath)) {
            filePath = path.join(process.cwd(), 'game/miku3.json');
        }
        if (!fs.existsSync(filePath)) {
            filePath = path.join(__dirname, '../miku3.json');
        }
        tekateki = JSON.parse(fs.readFileSync(filePath));
    } catch (e) {
        console.error(`${BRAND.emoji} خطأ في قراءة ملف الأسئلة:`, e);
        await conn.sendMessage(m.chat, { react: { text: '💥', key: m.key } });
        await conn.sendMessage(m.chat, {
            text: `${BRAND.emoji} *ملف الأسئلة غير موجود*
━━━━━
📌 حاول مرة أخرى`
        }, { quoted: m });
        return;
    }

    let json = tekateki[Math.floor(Math.random() * tekateki.length)];
    
    /* ✅ تصميم مضغوط — بدون آيات */
    const caption = `${BRAND.emoji} *رتب الحروف* 🔄
━━━━━
📌 ${json.question.toUpperCase()}
⏰ ${(timeout / 1000).toFixed(0)}ث | 💰 ${poin}XP
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    let msg = await conn.sendMessage(m.chat, {
        text: caption,
        ...CHANNEL_INFO
    }, { quoted: m });

    conn.tekateki[id] = [
        msg,
        json,
        poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) {
                await conn.sendMessage(m.chat, {
                    text: `${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${json.response.toUpperCase()}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`
                }, { quoted: conn.tekateki[id][0] });
                delete conn.tekateki[id];
            }
        }, timeout),
        []
    ];
};

/* ────────────────[معالجة الإجابات]──────────────── */
handler.before = async (m, { conn }) => {
    conn.tekateki = conn.tekateki || {};
    let id = m.chat;

    if (!(id in conn.tekateki)) return;
    
    const gameData = conn.tekateki[id];
    const json = gameData[1];
    const poin = gameData[2];
    const timeoutFn = gameData[3];
    const wrongGuesses = gameData[4];

    const userAnswer = m.text?.toLowerCase().trim() || '';
    const correctAnswer = json.response.toLowerCase().trim();

    /* ✅ استسلم */
    if (userAnswer === 'استسلم' || userAnswer === 'استسلام') {
        clearTimeout(timeoutFn);
        await conn.sendMessage(m.chat, {
            text: `${BRAND.emoji} *استسلمت!*
━━━━━
✅ *الإجابة:* ${json.response.toUpperCase()}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`
        }, { quoted: m });
        delete conn.tekateki[id];
        return true;
    }

    if (wrongGuesses.includes(userAnswer)) {
        return false;
    }

    /* ✅ إجابة صحيحة */
    if (userAnswer === correctAnswer) {
        clearTimeout(timeoutFn);
        
        const result = await addExp(m.sender, poin);

        /* ✅ تصميم مضغوط */
        let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🎭 *الإجابة:* ${json.response.toUpperCase()}
💰 *+${poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;

        if (result.leveledUp) {
            msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
        }

        msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;

        await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

        delete conn.tekateki[id];
        return true;
    } else {
        wrongGuesses.push(userAnswer);
        
        try {
            await conn.sendMessage(m.chat, {
                react: { text: '❌', key: m.key }
            });
        } catch (e) {
            /* صامت */
        }
    }
    return false;
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['ترتيب'];
handler.tags = ['game'];
handler.command = ['ترتيب', 'tartib', 'rtb'];

export default handler;