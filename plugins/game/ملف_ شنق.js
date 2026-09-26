/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة املأ الفراغ
   📁 /home/container/plugins/game/شنق.js
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
let timeout = 60000;
let poin = 200;

/* ────────────────[كلمات اللعبة]──────────────── */
const hangmanWords = [
    { word: "تفاح", hint: "🍎 فاكهة حمراء", missingLetter: "ح" },
    { word: "موز", hint: "🍌 فاكهة صفراء", missingLetter: "ز" },
    { word: "برتقال", hint: "🍊 فاكهة برتقالية", missingLetter: "ق" },
    { word: "فراولة", hint: "🍓 فاكهة حمراء", missingLetter: "و" },
    { word: "عنب", hint: "🍇 فاكهة عنقودية", missingLetter: "ن" },
    { word: "جزر", hint: "🥕 خضار برتقالي", missingLetter: "ر" },
    { word: "طماطم", hint: "🍅 خضار أحمر", missingLetter: "ا" },
    { word: "خيار", hint: "🥒 خضار أخضر", missingLetter: "ي" },
    { word: "بصل", hint: "🧅 خضار له رائحة", missingLetter: "ص" },
    { word: "ثوم", hint: "🧄 خضار له رائحة قوية", missingLetter: "و" },
    { word: "اسد", hint: "🦁 ملك الغابة", missingLetter: "س" },
    { word: "نمر", hint: "🐯 حيوان مخطط", missingLetter: "م" },
    { word: "فيل", hint: "🐘 حيوان ضخم", missingLetter: "ي" },
    { word: "زرافة", hint: "🦒 أطول حيوان", missingLetter: "ف" },
    { word: "قرد", hint: "🐒 حيوان ذكي", missingLetter: "ر" },
    { word: "نسر", hint: "🦅 طائر جارح", missingLetter: "س" },
    { word: "ببغاء", hint: "🦜 طائر متكلم", missingLetter: "غ" },
    { word: "حمامة", hint: "🕊️ طائر السلام", missingLetter: "م" },
    { word: "عصفور", hint: "🐦 طائر صغير", missingLetter: "ف" },
    { word: "بط", hint: "🦆 طائر مائي", missingLetter: "ط" },
    { word: "قلم", hint: "✏️ أداة للكتابة", missingLetter: "ل" },
    { word: "كتاب", hint: "📚 يحتوي على صفحات", missingLetter: "ت" },
    { word: "مقص", hint: "✂️ أداة للقص", missingLetter: "ص" },
    { word: "مسطرة", hint: "📏 أداة للقياس", missingLetter: "ط" },
    { word: "ممحاة", hint: "🧼 أداة للمسح", missingLetter: "ح" },
    { word: "كرسي", hint: "🪑 للجلوس", missingLetter: "ر" },
    { word: "طاولة", hint: "🛋️ للأكل والعمل", missingLetter: "ا" },
    { word: "سرير", hint: "🛏️ للنوم", missingLetter: "ي" },
    { word: "خزانة", hint: "🚪 لحفظ الملابس", missingLetter: "ز" },
    { word: "مكتب", hint: "💼 للعمل", missingLetter: "ت" },
    { word: "شمس", hint: "☀️ تشرق في الصباح", missingLetter: "م" },
    { word: "قمر", hint: "🌙 يظهر في الليل", missingLetter: "م" },
    { word: "بحر", hint: "🌊 مياه مالحة", missingLetter: "ح" },
    { word: "نهر", hint: "🌊 مياه عذبة", missingLetter: "ه" },
    { word: "جبل", hint: "⛰️ مرتفع أرضي", missingLetter: "ب" },
    { word: "احمر", hint: "🔴 لون الدم", missingLetter: "م" },
    { word: "ازرق", hint: "🔵 لون البحر", missingLetter: "ر" },
    { word: "اخضر", hint: "🟢 لون النبات", missingLetter: "ض" },
    { word: "اصفر", hint: "🟡 لون الشمس", missingLetter: "ف" },
    { word: "اسود", hint: "⚫ لون الليل", missingLetter: "و" },
    { word: "حليب", hint: "🥛 شراب أبيض", missingLetter: "ل" },
    { word: "عصير", hint: "🧃 شراب فواكه", missingLetter: "ص" },
    { word: "قهوة", hint: "☕ شراب منبه", missingLetter: "ه" },
    { word: "شاي", hint: "🍵 شراب ساخن", missingLetter: "ي" },
    { word: "ماء", hint: "💧 شراب الحياة", missingLetter: "ا" },
    { word: "عسل", hint: "🍯 يصنعه النحل", missingLetter: "س" },
    { word: "سكر", hint: "🍬 مادة حلوة", missingLetter: "ك" },
    { word: "ملح", hint: "🧂 يستخدم في الطعام", missingLetter: "ل" },
    { word: "رز", hint: "🍚 طعام أساسي", missingLetter: "ز" },
    { word: "خبز", hint: "🍞 طعام يومي", missingLetter: "ب" }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
let handler = async (m, { conn, usedPrefix }) => {
    conn.hangmanGames = conn.hangmanGames || {};
    let id = m.chat;

    if (id in conn.hangmanGames) {
        await m.reply(`${BRAND.emoji} *لعبة نشطة!*
━━━━━
📌 أكمل اللعبة الحالية`);
        return;
    }

    try {
        const randomWordData = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
        const { word, hint, missingLetter } = randomWordData;

        let displayWord = '';
        for (let i = 0; i < word.length; i++) {
            if (word[i] === missingLetter) {
                displayWord += '_ ';
            } else {
                displayWord += word[i] + ' ';
            }
        }
        displayWord = displayWord.trim();

        const game = conn.hangmanGames[id] = {
            word: word,
            hint: hint,
            missingLetter: missingLetter,
            displayWord: displayWord,
            startTime: Date.now(),
            attempts: 0,
            maxAttempts: 3,
            reward: poin,
            lastWrongGuess: ''
        };

        /* ✅ تصميم مضغوط — بدون آيات */
        const bodyText = `${BRAND.emoji} *املأ الفراغ* 🎮
━━━━━
📝 ${game.displayWord}
💡 ${hint}
⏰ ${(timeout / 1000).toFixed(0)}ث | ⚔️ 3 | 💰 ${game.reward}XP
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        /* ✅ sendButton — بدون صورة */
        await conn.sendButton(m.chat, {
            bodyText: bodyText,
            footerText: `${BRAND.emoji} ${BRAND.botName}`,
            buttons: [
                {
                    name: 'cta_url',
                    params: {
                        display_text: `${BRAND.emoji} قناة البوت`,
                        url: BRAND.channelLink
                    }
                }
            ],
            mentions: [m.sender],
            newsletter: {
                name: BRAND.channelName,
                jid: BRAND.channelId
            },
            interactiveConfig: { buttons_limits: 1 }
        }, m);

        game.timeout = setTimeout(async () => {
            if (conn.hangmanGames[id]) {
                await m.reply(`${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${word}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
                delete conn.hangmanGames[id];
            }
        }, timeout);

    } catch (error) {
        console.error(`${BRAND.emoji} خطأ:`, error);
        await m.reply(`${BRAND.emoji} *حدث خطأ*
━━━━━
📌 حاول مرة أخرى`);
    }
};

/* ────────────────[معالجة الإجابات]──────────────── */
handler.before = async (m, { conn }) => {
    conn.hangmanGames = conn.hangmanGames || {};
    let id = m.chat;

    if (!(id in conn.hangmanGames)) return;

    const game = conn.hangmanGames[id];
    const guessedLetter = m.text?.toLowerCase().trim();

    if (!guessedLetter) return;

    /* ✅ استسلم */
    if (guessedLetter === 'استسلم' || guessedLetter === 'استسلام') {
        clearTimeout(game.timeout);
        await m.reply(`${BRAND.emoji} *استسلمت!*
━━━━━
✅ *الإجابة:* ${game.word}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
        delete conn.hangmanGames[id];
        return true;
    }

    if (guessedLetter.length !== 1 || !guessedLetter.match(/^[أ-يء-ي]$/)) {
        return false;
    }

    if (guessedLetter === game.lastWrongGuess) {
        return false;
    }

    /* ✅ إجابة صحيحة */
    if (guessedLetter === game.missingLetter) {
        clearTimeout(game.timeout);

        const result = await addExp(m.sender, game.reward);
        const timeTaken = Math.floor((Date.now() - game.startTime) / 1000);

        let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
📝 *الإجابة:* ${game.word.toUpperCase()}
⏱️ *الوقت:* ${timeTaken}ث
💰 *+${game.reward}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;

        if (result.leveledUp) {
            msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
        }

        msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;

        await m.reply(msg);
        delete conn.hangmanGames[id];
        return true;
    } else {
        game.attempts++;
        game.lastWrongGuess = guessedLetter;
        const attemptsLeft = game.maxAttempts - game.attempts;

        /* ✅ انتهت المحاولات */
        if (game.attempts >= game.maxAttempts) {
            clearTimeout(game.timeout);
            await m.reply(`${BRAND.emoji} *انتهت المحاولات!* ❌
✅ *الإجابة:* ${game.word}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.hangmanGames[id];
            return true;
        }

        await m.reply(`${BRAND.emoji} *غلط!* ❌
⚔️ *المحاولات المتبقية:* ${attemptsLeft}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
        return true;
    }

    return false;
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['شنق'];
handler.tags = ['game'];
handler.command = ['شنق'];

export default handler;