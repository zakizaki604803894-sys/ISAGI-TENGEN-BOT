/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة الكلمات المتسلسلة
   📁 /home/container/plugins/game/كت.js
   ✅ بدون آيات | توقف فوري | 60 ثانية
   ═══════════════════════════════════════════════════════════ */

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

/* ────────────────[قائمة الكلمات]──────────────── */
const WORDS = [
    'جيرايا', 'ناروتو', 'تسونادي', 'اينيوشا', 'فاي', 'ساتاشي', 'امورو', 'موكومو', 'شيبوسا', 'سورا',
    'ايرين', 'ايدوارد', 'ارمين', 'باكيرا', 'باسكال', 'ايزوكو', 'بيجيتا', 'بيكولا', 'بيكو', 'بولما',
    'ترانكس', 'جوزيف', 'راينر', 'زيف', 'زاماسو', 'سوزاكو', 'غيندو', 'جارو', 'فيتان', 'كرولو',
    'غون', 'فريكس', 'فانكوك', 'موزان', 'ميرلين', 'موجين', 'كوتا', 'كايتو', 'هيسوكا', 'كيلوا',
    'رينغوكو', 'تانجيرو', 'نيزوكو', 'زينيتسو', 'اينوسكي', 'يوجي', 'ايتادوري', 'نوبارا', 'كاغورا',
    'هيناتا', 'جورا', 'جوتارو', 'آني', 'ساكوراكو', 'كوهاكو', 'سينكو', 'ميزوكي', 'هيوري', 'ميامورا',
    'اوراراكا', 'شوتو', 'باكوغو', 'تودوروكي', 'اول مايت', 'اكيرا', 'هيرو', 'كونان', 'ران', 'جين',
    'غراي', 'جوفيا', 'ناتسو', 'يوميكو', 'روكيا', 'زاراكي', 'كيسكي', 'ايتشيغو', 'اوزوماكي', 'باين',
    'كازيكاجي', 'هوكاجي', 'ايرين', 'ليفاي', 'ايروين', 'زيك', 'ارثر', 'لولوش', 'صوفيا', 'برولي'
];

/* ────────────────[دوال مساعدة]──────────────── */
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* ────────────────[إعدادات اللعبة]──────────────── */
const TOTAL_WORDS = 10;
const WORD_TIMEOUT = 60000;  /* ✅ 60 ثانية */

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
    const chatId = m.chat;
    
    conn.wordGame = conn.wordGame || {};
    const id = chatId;

    if (id in conn.wordGame) {
        await conn.sendMessage(chatId, {
            text: `${BRAND.emoji} *لعبة نشطة!*
━━━━━
📌 أكمل اللعبة الحالية`,
            ...CHANNEL_INFO
        });
        return;
    }

    /* ✅ اختيار 10 كلمات */
    let selectedWords = [];
    const shuffledWords = shuffleArray([...WORDS]);
    for (let i = 0; i < TOTAL_WORDS; i++) {
        selectedWords.push(shuffledWords[i]);
    }

    /* ✅ حفظ بيانات اللعبة */
    const gameData = {
        words: selectedWords,
        currentIndex: 0,
        scores: {},
        participants: new Set(),
        isActive: true,
        wordTimeout: null,
        waitingForAnswer: false,
        currentWord: null,
        startTime: Date.now()
    };

    conn.wordGame[id] = gameData;

    /* ✅ رسالة البداية */
    await conn.sendMessage(chatId, {
        text: `${BRAND.emoji} *بدء اللعبة!* 🎮
━━━━━
📝 *${TOTAL_WORDS}* كلمة
⚡ أسرع واحد يكتبها يكسب نقطة!
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`,
        ...CHANNEL_INFO
    }, { quoted: m });

    await sendNextWord(conn, chatId, gameData);
};

/* ────────────────[دالة إرسال الكلمة التالية]──────────────── */
async function sendNextWord(conn, chatId, gameData) {
    if (!gameData.isActive) return;
    
    /* ✅ إذا انتهت الكلمات */
    if (gameData.currentIndex >= gameData.words.length) {
        await endGame(conn, chatId, gameData);
        return;
    }

    const word = gameData.words[gameData.currentIndex];
    gameData.currentWord = word;
    gameData.waitingForAnswer = true;

    /* ✅ إرسال الكلمة فقط */
    await conn.sendMessage(chatId, {
        text: `📝 *${word}*`,
        ...CHANNEL_INFO
    });

    /* ✅ مؤقت الكلمة — 60 ثانية */
    clearTimeout(gameData.wordTimeout);
    gameData.wordTimeout = setTimeout(async () => {
        if (!gameData.isActive) return;
        if (gameData.waitingForAnswer) {
            /* ✅ لم يجب أحد — ننتقل للكلمة التالية */
            gameData.waitingForAnswer = false;
            gameData.currentIndex++;
            
            /* ✅ إرسال الكلمة التالية فوراً */
            await sendNextWord(conn, chatId, gameData);
        }
    }, WORD_TIMEOUT);
}

/* ────────────────[معالجة الإجابات]──────────────── */
handler.before = async (m, { conn }) => {
    conn.wordGame = conn.wordGame || {};
    const id = m.chat;
    const senderId = m.sender;

    if (m.isBaileys) return;
    if (!m.text) return;
    if (!(id in conn.wordGame)) return;

    const gameData = conn.wordGame[id];
    if (!gameData.isActive) return;
    if (!gameData.waitingForAnswer) return;

    const userAnswer = m.text.trim();
    const correctWord = gameData.currentWord;

    /* ✅ إجابة صحيحة */
    if (userAnswer.toLowerCase() === correctWord.toLowerCase()) {
        clearTimeout(gameData.wordTimeout);
        gameData.waitingForAnswer = false;

        gameData.participants.add(senderId);

        if (!gameData.scores[senderId]) {
            gameData.scores[senderId] = 0;
        }
        gameData.scores[senderId] += 1;

        /* ✅ رياكت فقط — بدون رسالة */
        await conn.sendMessage(id, { react: { text: "✅", key: m.key } });

        gameData.currentIndex++;
        
        /* ✅ إرسال الكلمة التالية فوراً */
        await sendNextWord(conn, id, gameData);

        return true;
    } else {
        /* ✅ رياكت خطأ — بدون رسالة */
        await conn.sendMessage(id, { react: { text: "❌", key: m.key } });
        return false;
    }
};

/* ────────────────[دالة إنهاء اللعبة]──────────────── */
async function endGame(conn, chatId, gameData) {
    if (!gameData.isActive) return;
    
    gameData.isActive = false;
    clearTimeout(gameData.wordTimeout);

    const scores = gameData.scores;
    const participants = Array.from(gameData.participants);
    const totalWords = gameData.words.length;

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

    resultText += `
━━━━━
📝 *عدد الكلمات:* ${totalWords}
👥 *المشاركون:* ${participants.length}
🏆 *الفائز:* ${sortedPlayers.length > 0 ? `@${sortedPlayers[0][0].split('@')[0]}` : 'لا يوجد'}
━━━━━
💡 *.كت* للعب مرة أخرى
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    await conn.sendMessage(chatId, {
        text: resultText,
        mentions: sortedPlayers.map(p => p[0]),
        ...CHANNEL_INFO
    });

    delete conn.wordGame[chatId];
}

/* ────────────────[إعدادات الأمر]──────────────── */
handler.help = ['كت', 'كتابة'];
handler.tags = ['ألعاب'];
handler.command = ['كت', 'كتابة'];
handler.category = 'game';
handler.description = '🎮 لعبة الكلمات المتسلسلة (10 كلمات)';
handler.usage = '.كت';

export default handler;