// 🍁 ملف: تحدي_حجر_ورقة.js - لعبة حجر ورقة مقص مع ربط البنك - ISAGI TENGEN BOT

import { addExp } from '../bank/نظام_البنك.js';

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';

const CHOICES = { حجر: '🪨', ورقة: '📄', مقص: '✂️' };
const BEATS = { حجر: 'مقص', ورقة: 'حجر', مقص: 'ورقة' };

const handler = async (m, { conn, text }) => {
    const target = m.mentionedJid?.[0] || m.quoted?.sender;
    if (!target) {
        return conn.sendMessage(m.chat, {
            text: `${EMOJI} منشن شخص`
        }, { quoted: m });
    }
    if (target === m.sender) {
        return conn.sendMessage(m.chat, {
            text: `${EMOJI} مع نفسك!`
        }, { quoted: m });
    }

    if (!global.rpsGames) global.rpsGames = {};
    const gameId = [m.sender, target].sort().join('_');

    if (global.rpsGames[gameId]) {
        clearTimeout(global.rpsGames[gameId].timeout);
        delete global.rpsGames[gameId];
    }

    global.rpsGames[gameId] = {
        chat: m.chat, 
        p1: m.sender, 
        p2: target, 
        choices: {},
        timeout: setTimeout(() => { 
            if (global.rpsGames[gameId]) {
                conn.sendMessage(m.chat, {
                    text: `${EMOJI} ⌛ انتهى!`
                });
                delete global.rpsGames[gameId]; 
            }
        }, 60000)
    };

    // ✅ رسالة قصيرة
    await conn.sendMessage(m.chat, {
        text: `${EMOJI} *🎮 حجر ورقة مقص*\n👤 @${m.sender.split('@')[0]} 🆚 @${target.split('@')[0]}\n💰 300XP للفائز\n📌 اختيار حجر|ورقة|مقص`,
        mentions: [m.sender, target]
    }, { quoted: m });
};

handler.before = async (m, { conn }) => {
    if (!m.text?.startsWith('اختيار')) return;
    const choice = m.text.replace('اختيار', '').trim();
    if (!CHOICES[choice]) return;
    if (!global.rpsGames) return;

    const gameId = Object.keys(global.rpsGames).find(id => {
        const g = global.rpsGames[id];
        return g.chat === m.chat && (g.p1 === m.sender || g.p2 === m.sender);
    });
    if (!gameId) return;

    const game = global.rpsGames[gameId];
    game.choices[m.sender] = choice;

    if (!game.choices[game.p1] || !game.choices[game.p2]) {
        return conn.sendMessage(m.chat, {
            text: `${EMOJI} ✅ تم التسجيل`
        }, { quoted: m });
    }

    clearTimeout(game.timeout);
    delete global.rpsGames[gameId];

    const c1 = game.choices[game.p1];
    const c2 = game.choices[game.p2];
    let winnerJid = null;
    let resultText;

    if (c1 === c2) {
        resultText = `${EMOJI} 🤝 تعادل`;
        await addExp(game.p1, 100);
        await addExp(game.p2, 100);
    } else if (BEATS[c1] === c2) {
        winnerJid = game.p1;
        resultText = `${EMOJI} 🏆 @${game.p1.split('@')[0]}`;
    } else {
        winnerJid = game.p2;
        resultText = `${EMOJI} 🏆 @${game.p2.split('@')[0]}`;
    }

    let winnerMsg = '';
    if (winnerJid) {
        const result = await addExp(winnerJid, 300);
        winnerMsg = `\n💰 +300XP | 💵 ${(result.user.exp || 0).toLocaleString('ar-EG')}XP`;
        if (result.leveledUp) {
            winnerMsg += `\n${result.levelUpMsg}`;
        }
    }

    // ✅ رسالة قصيرة
    await conn.sendMessage(m.chat, {
        text: `${EMOJI} *النتيجة*\n@${game.p1.split('@')[0]}: ${CHOICES[c1]} ${c1}\n@${game.p2.split('@')[0]}: ${CHOICES[c2]} ${c2}\n\n${resultText}${winnerMsg}`,
        mentions: [game.p1, game.p2, winnerJid].filter(Boolean)
    }, { quoted: m });
};

handler.usage    = ['تحدي_حجر_ورقة'];
handler.category = 'game';
handler.command  = ['تحدي_حجر_ورقة'];
handler.cooldown = 2000;

export default handler;