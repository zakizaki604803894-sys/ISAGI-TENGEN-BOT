/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة تفكيك الكلمات
   📁 /home/container/plugins/game/تفكيك.js
   ✅ بدون آيات | توقف فوري | بدون سبام
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
const TOTAL_ROUNDS = 10;
const WORD_TIMEOUT = 60000;  /* ✅ 60 ثانية */

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
    const chatId = m.chat;
    
    /* ✅ التحقق من وجود لعبة نشطة */
    if (global.break?.games?.[chatId]) {
        await conn.sendMessage(chatId, {
            text: `${BRAND.emoji} *لعبة نشطة!*
━━━━━
📌 أكمل اللعبة الحالية`,
            ...CHANNEL_INFO
        });
        return;
    }

    /* ✅ جلب البيانات */
    const data = await (await fetch("https://raw.githubusercontent.com/Xov445447533/Xov11111/master/src/JSON/venom-تفكيك.json")).json();
    
    /* ✅ اختيار 10 أسئلة عشوائية */
    let selectedQuestions = [];
    const shuffledData = shuffleArray([...data]);
    for (let i = 0; i < Math.min(TOTAL_ROUNDS, shuffledData.length); i++) {
        selectedQuestions.push(shuffledData[i]);
    }

    /* ✅ حفظ بيانات اللعبة */
    if (!global.break) global.break = { games: {}, scores: {} };
    
    global.break.games[chatId] = {
        questions: selectedQuestions,
        currentIndex: 0,
        answer: null,
        timeout: null,
        isActive: true
    };
    
    if (!global.break.scores[chatId]) global.break.scores[chatId] = {};

    /* ✅ رسالة البداية */
    await conn.sendMessage(chatId, {
        text: `${BRAND.emoji} *بدء اللعبة!* 🎮
━━━━━
📝 *${TOTAL_ROUNDS}* سؤال
⚡ أسرع واحد يجيب يكسب نقطة!
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`,
        ...CHANNEL_INFO
    }, { quoted: m });

    await sendNextQuestion(conn, chatId);
};

/* ────────────────[دالة إرسال السؤال التالي]──────────────── */
async function sendNextQuestion(conn, chatId) {
    const game = global.break?.games?.[chatId];
    if (!game || !game.isActive) return;
    
    if (game.currentIndex >= game.questions.length) {
        await endGame(conn, chatId);
        return;
    }

    const question = game.questions[game.currentIndex];
    game.answer = question.response;
    game.waitingForAnswer = true;

    /* ✅ إرسال السؤال فقط */
    await conn.sendMessage(chatId, {
        text: `🔨 *${question.question}*`,
        ...CHANNEL_INFO
    });

    /* ✅ مؤقت السؤال — 60 ثانية */
    clearTimeout(game.timeout);
    game.timeout = setTimeout(async () => {
        if (!game.isActive) return;
        if (game.waitingForAnswer) {
            game.waitingForAnswer = false;
            game.currentIndex++;
            
            /* ✅ إرسال السؤال التالي فوراً */
            await sendNextQuestion(conn, chatId);
        }
    }, WORD_TIMEOUT);
}

/* ────────────────[معالجة الإجابات]──────────────── */
handler.before = async (m, { conn }) => {
    if (!m.text) return;
    if (m.isBaileys) return;
    
    const chatId = m.chat;
    const senderId = m.sender;

    if (!global.break?.games?.[chatId]) return;
    if (!global.break?.scores?.[chatId]) return;

    const game = global.break.games[chatId];
    if (!game.isActive) return;
    if (!game.waitingForAnswer) return;

    const userAnswer = m.text.trim();
    const correctAnswer = game.answer;

    /* ✅ إجابة صحيحة */
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        clearTimeout(game.timeout);
        game.waitingForAnswer = false;

        /* ✅ تسجيل النقاط */
        if (!global.break.scores[chatId][senderId]) {
            global.break.scores[chatId][senderId] = 0;
        }
        global.break.scores[chatId][senderId] += 1;

        /* ✅ رياكت ✅ فقط */
        await conn.sendMessage(chatId, { react: { text: "✅", key: m.key } });

        game.currentIndex++;
        
        /* ✅ إرسال السؤال التالي فوراً */
        await sendNextQuestion(conn, chatId);

        return true;
    } else {
        /* ✅ رياكت ❌ فقط */
        await conn.sendMessage(chatId, { react: { text: "❌", key: m.key } });
        return false;
    }
};

/* ────────────────[دالة إنهاء اللعبة]──────────────── */
async function endGame(conn, chatId) {
    if (!global.break?.games?.[chatId]) return;
    
    const game = global.break.games[chatId];
    if (!game.isActive) return;
    
    game.isActive = false;
    clearTimeout(game.timeout);

    const scores = global.break.scores[chatId] || {};
    const totalQuestions = game.questions.length;

    /* ✅ ترتيب اللاعبين */
    const sortedPlayers = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);

    /* ✅ بناء النتائج */
    let resultText = `${BRAND.emoji} *النتائج النهائية* 🏁
━━━━━
📊 *ترتيب الفائزين:*`;

    if (sortedPlayers.length === 0) {
        resultText += `\n❌ *لا يوجد فائزون!*`;
    } else {
        sortedPlayers.forEach(([id, points], index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
            const name = id.split('@')[0];
            resultText += `\n${medal} @${name} → ${points} نقطة`;
        });
    }

    /* ✅ مكافأة الفائز */
    let winnerBonus = '';
    if (sortedPlayers.length > 0) {
        const winner = sortedPlayers[0][0];
        const result = await addExp(winner, 500);
        
        winnerBonus = `\n👑 *الفائز:* @${winner.split('@')[0]} +500XP`;
        
        if (result.leveledUp) {
            winnerBonus += `\n🎉 ${result.levelUpMsg}`;
        }
    }

    resultText += `
━━━━━
📝 *عدد الأسئلة:* ${totalQuestions}
👥 *المشاركون:* ${sortedPlayers.length}
${winnerBonus}
━━━━━
💡 *.تفكيك* للعب مرة أخرى
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    await conn.sendMessage(chatId, {
        text: resultText,
        mentions: sortedPlayers.map(p => p[0]),
        ...CHANNEL_INFO
    });

    /* ✅ حذف بيانات اللعبة */
    delete global.break.games[chatId];
    delete global.break.scores[chatId];
}

/* ────────────────[دالة خلط المصفوفة]──────────────── */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* ────────────────[إعدادات الأمر]──────────────── */
handler.usage = ["تفكيك"];
handler.category = "game";
handler.command = ['تفكيك'];
handler.description = '🔨 لعبة تفكيك الكلمات (10 أسئلة)';

export default handler;