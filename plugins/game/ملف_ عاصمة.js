/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة العواصم
   📁 /home/container/plugins/game/عاصمة.js
   ✅ بدون آيات | بدون صورة | تصميم هاتف
   ═══════════════════════════════════════════════════════════ */

import { addExp } from '../bank/نظام_البنك.js';

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
let timeout = 40000;
let poin = 500;

/* ────────────────[قاعدة بيانات العواصم]──────────────── */
const capitals = [
    { question: "ما هي عاصمة 🇪🇬 مصر؟", response: "القاهرة" },
    { question: "ما هي عاصمة 🇸🇦 السعودية؟", response: "الرياض" },
    { question: "ما هي عاصمة 🇦🇪 الإمارات؟", response: "أبو ظبي" },
    { question: "ما هي عاصمة 🇯🇴 الأردن؟", response: "عمان" },
    { question: "ما هي عاصمة 🇱🇧 لبنان؟", response: "بيروت" },
    { question: "ما هي عاصمة 🇶🇦 قطر؟", response: "الدوحة" },
    { question: "ما هي عاصمة 🇰🇼 الكويت؟", response: "مدينة الكويت" },
    { question: "ما هي عاصمة 🇧🇭 البحرين؟", response: "المنامة" },
    { question: "ما هي عاصمة 🇴🇲 عمان؟", response: "مسقط" },
    { question: "ما هي عاصمة 🇮🇶 العراق؟", response: "بغداد" },
    { question: "ما هي عاصمة 🇸🇾 سوريا؟", response: "دمشق" },
    { question: "ما هي عاصمة 🇾🇪 اليمن؟", response: "صنعاء" },
    { question: "ما هي عاصمة 🇩🇿 الجزائر؟", response: "الجزائر" },
    { question: "ما هي عاصمة 🇲🇦 المغرب؟", response: "الرباط" },
    { question: "ما هي عاصمة 🇹🇳 تونس؟", response: "تونس" },
    { question: "ما هي عاصمة 🇱🇾 ليبيا؟", response: "طرابلس" },
    { question: "ما هي عاصمة 🇸🇩 السودان؟", response: "الخرطوم" },
    { question: "ما هي عاصمة 🇸🇴 الصومال؟", response: "مقديشو" },
    { question: "ما هي عاصمة 🇲🇷 موريتانيا؟", response: "نواكشوط" },
    { question: "ما هي عاصمة 🇺🇸 أمريكا؟", response: "واشنطن" },
    { question: "ما هي عاصمة 🇬🇧 بريطانيا؟", response: "لندن" },
    { question: "ما هي عاصمة 🇫🇷 فرنسا؟", response: "باريس" },
    { question: "ما هي عاصمة 🇩🇪 ألمانيا؟", response: "برلين" },
    { question: "ما هي عاصمة 🇮🇹 إيطاليا؟", response: "روما" },
    { question: "ما هي عاصمة 🇪🇸 إسبانيا؟", response: "مدريد" },
    { question: "ما هي عاصمة 🇨🇦 كندا؟", response: "أوتاوا" },
    { question: "ما هي عاصمة 🇦🇺 أستراليا؟", response: "كانبرا" },
    { question: "ما هي عاصمة 🇯🇵 اليابان؟", response: "طوكيو" },
    { question: "ما هي عاصمة 🇨🇳 الصين؟", response: "بكين" },
    { question: "ما هي عاصمة 🇷🇺 روسيا؟", response: "موسكو" },
    { question: "ما هي عاصمة 🇮🇳 الهند؟", response: "نيودلهي" },
    { question: "ما هي عاصمة 🇧🇷 البرازيل؟", response: "برازيليا" },
    { question: "ما هي عاصمة 🇦🇷 الأرجنتين؟", response: "بوينس آيرس" },
    { question: "ما هي عاصمة 🇹🇷 تركيا؟", response: "أنقرة" },
    { question: "ما هي عاصمة 🇮🇷 إيران؟", response: "طهران" },
    { question: "ما هي عاصمة 🇰🇷 كوريا الجنوبية؟", response: "سيول" },
    { question: "ما هي عاصمة 🇮🇩 إندونيسيا؟", response: "جاكرتا" },
    { question: "ما هي عاصمة 🇿🇦 جنوب أفريقيا؟", response: "بريتوريا" },
    { question: "ما هي عاصمة 🇳🇬 نيجيريا؟", response: "أبوجا" },
    { question: "ما هي عاصمة 🇲🇽 المكسيك؟", response: "مكسيكو سيتي" }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
let handler = async (m, { conn, usedPrefix }) => {
    conn.capitalsGame = conn.capitalsGame || {};
    let id = m.chat;

    if (id in conn.capitalsGame) {
        await m.reply(`${BRAND.emoji} *سؤال نشط!*
━━━━━
📌 أكمل السؤال الحالي`);
        return;
    }

    const randomIndex = Math.floor(Math.random() * capitals.length);
    const { question, response } = capitals[randomIndex];
    
    let options = [response];
    let allResponses = capitals.map(c => c.response);
    while (options.length < 4) {
        let randomResponse = allResponses[Math.floor(Math.random() * allResponses.length)];
        if (!options.includes(randomResponse)) {
            options.push(randomResponse);
        }
    }
    const shuffledOptions = shuffleArray(options);

    /* ✅ تصميم مضغوط — بدون آيات */
    const bodyText = `${BRAND.emoji} *العواصم* 🏛️
━━━━━
📌 ${question}
⏰ ${(timeout / 1000).toFixed(0)}ث | 💰 ${poin}XP
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    const buttons = shuffledOptions.map((opt, i) => ({
        name: 'quick_reply',
        params: {
            display_text: `${i + 1}. ${opt}`,
            id: `.عاصمة_اجاب_${i + 1}`
        }
    }));

    buttons.push({
        name: 'quick_reply',
        params: {
            display_text: `${BRAND.emoji} استسلم`,
            id: `.عاصمة_استسلم`
        }
    });

    /* ✅ sendButton — بدون صورة */
    await conn.sendButton(m.chat, {
        bodyText: bodyText,
        footerText: `${BRAND.emoji} ${BRAND.botName}`,
        buttons: buttons,
        mentions: [m.sender],
        newsletter: {
            name: BRAND.channelName,
            jid: BRAND.channelId
        },
        interactiveConfig: { buttons_limits: 5 }
    }, m);

    let timer = setTimeout(async () => {
        if (conn.capitalsGame[id]) {
            await m.reply(`${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${response}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.capitalsGame[id];
        }
    }, timeout);

    conn.capitalsGame[id] = {
        correctAnswer: response,
        options: shuffledOptions,
        correctIndex: shuffledOptions.indexOf(response) + 1,
        poin: poin,
        timer: timer,
        attempts: 2
    };
};

/* ────────────────[معالجة الأزرار]──────────────── */
handler.before = async (m, { conn }) => {
    conn.capitalsGame = conn.capitalsGame || {};
    let id = m.chat;

    if (!(id in conn.capitalsGame)) return;

    const gameData = conn.capitalsGame[id];
    const correctAnswer = gameData.correctAnswer.toLowerCase().trim();
    const rewardPoin = gameData.poin;

    /* ✅ معالجة الأزرار */
    if (m.body?.startsWith('.عاصمة_اجاب_')) {
        const selectedIndex = parseInt(m.body.replace('.عاصمة_اجاب_', ''));
        const selectedOption = gameData.options[selectedIndex - 1];
        const isCorrect = selectedOption.toLowerCase().trim() === correctAnswer;

        clearTimeout(gameData.timer);

        if (isCorrect) {
            const result = await addExp(m.sender, rewardPoin);
            
            let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🏛️ *الإجابة:* ${gameData.correctAnswer}
💰 *+${rewardPoin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
            
            if (result.leveledUp) {
                msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
            }
            
            msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
            
            await m.reply(msg);
            delete conn.capitalsGame[id];
        } else {
            gameData.attempts -= 1;
            if (gameData.attempts > 0) {
                await m.reply(`${BRAND.emoji} *غلط!* ❌
⚔️ *المحاولات المتبقية:* ${gameData.attempts}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            } else {
                await m.reply(`${BRAND.emoji} *غلط!* ❌
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
                delete conn.capitalsGame[id];
            }
        }
        return true;
    }

    /* ✅ استسلم */
    if (m.body === '.عاصمة_استسلم') {
        clearTimeout(gameData.timer);
        await m.reply(`${BRAND.emoji} *استسلمت!*
━━━━━
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
        delete conn.capitalsGame[id];
        return true;
    }

    /* ✅ معالجة الردود النصية */
    const userAnswer = m.text?.toLowerCase().trim();
    if (!userAnswer) return;

    if (userAnswer === 'استسلم' || userAnswer === 'استسلام') {
        clearTimeout(gameData.timer);
        await m.reply(`${BRAND.emoji} *استسلمت!*
━━━━━
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
        delete conn.capitalsGame[id];
        return true;
    }

    const isCorrect = userAnswer === correctAnswer;
    if (isCorrect) {
        clearTimeout(gameData.timer);
        
        const result = await addExp(m.sender, rewardPoin);
        
        let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🏛️ *الإجابة:* ${gameData.correctAnswer}
💰 *+${rewardPoin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
        
        if (result.leveledUp) {
            msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
        }
        
        msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
        
        await m.reply(msg);
        delete conn.capitalsGame[id];
        return true;
    } else {
        gameData.attempts -= 1;
        if (gameData.attempts > 0) {
            await m.reply(`${BRAND.emoji} *غلط!* ❌
⚔️ *المحاولات المتبقية:* ${gameData.attempts}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
        } else {
            await m.reply(`${BRAND.emoji} *غلط!* ❌
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.capitalsGame[id];
        }
        return true;
    }

    return false;
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['عاصمة'];
handler.tags = ['game'];
handler.command = ['عاصمة', 'عواصم'];

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default handler;