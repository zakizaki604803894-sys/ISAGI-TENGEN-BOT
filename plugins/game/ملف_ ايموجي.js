/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة تخمين الإيموجي
   📁 /home/container/plugins/game/ايموجي.js
   ✅ بدون آيات | بدون صورة | توقف فوري
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
let poin = 1000;

if (!global.games) {
    global.games = {};
}

/* ────────────────[قائمة الأسئلة]──────────────── */
const emojiQuestions = [
    { question: "👊🏻👨🏻‍🦲🦸🏻‍♂️", response: "سايتما" },
    { question: "🍎✍🏻📓", response: "لايت" },
    { question: "🫎🧑🏻‍⚕️❄️", response: "تشوبر" },
    { question: "🔥👱🏻‍♂️❄️", response: "تودوروكي" },
    { question: "🧑‍🍳🦵🏻🚬", response: "سانجي" },
    { question: "🐗⚔️👦🏻", response: "اينوسكي" },
    { question: "💀🎸👑", response: "بروك" },
    { question: "🔥🧑🏻‍🚒🚒", response: "شينزا" },
    { question: "💇🏻‍♀️🌸🙍🏻‍♀️", response: "ساكورا" },
    { question: "👨🏻‍🦰🏜️🏺", response: "غارا" },
    { question: "🦊🍜🍥", response: "ناروتو" },
    { question: "🍀📖👿", response: "استا" },
    { question: "☀️🗡️😮‍💨", response: "يوريتشي" },
    { question: "🐍😛🔬", response: "اوروتشيماو" },
    { question: "⚫⚪☁️", response: "زيتسو" },
    { question: "🤡🃏👦🏻", response: "هيسوكا" },
    { question: "🧑🏻🔙🧑", response: "تاكيميتشي" },
    { question: "👒🍖🏴‍☠", response: "لوفي" },
    { question: "🥪👦🏻👊🏻", response: "ماش" },
    { question: "🧛🏻‍♂️☀️👿", response: "موزان" },
    { question: "⛓️👀🧑", response: "كورابيكا" },
    { question: "🏴‍☠️⚓︎🤥", response: "يوسوب" },
    { question: "⚔️🌊🧑🏻", response: "غيو" },
    { question: "⚔️🔥🧑", response: "رينغوكو" },
    { question: "⚔️💨🧑🏻", response: "سانيمي" },
    { question: "⚔️🧑🏻☁️", response: "توكيتو" },
    { question: "⚔️👩🏻🦋", response: "شينوبو" },
    { question: "⚔️👩🏻🩷", response: "ميتسوري" },
    { question: "🧑🏻🪨⚔️", response: "جيومي" },
    { question: "🧑🎩🎇🎆", response: "تينغن" },
    { question: "🧑🎩🔥", response: "سابو" },
    { question: "🐜👑💪🏻", response: "ميريوم" },
    { question: "😈🏺", response: "جيوكو" },
    { question: "🎭👩🏻👁️", response: "الوكا" },
    { question: "😈🎻👩🏻", response: "ناكيمي" },
    { question: "😎🥶❄️👁️", response: "غوجو" },
    { question: "😊👩🏻💰", response: "نامي" },
    { question: "💰☠️👑🏴‍☠️", response: "روجر" },
    { question: "👦🏻🛹⚡", response: "كيلوا" },
    { question: "🌙🦑🧑🏻‍🏫", response: "كورو" },
    { question: "🐸🍻🔞", response: "جيرايا" },
    { question: "🎤🦑⚔️", response: "كيلر بي" },
    { question: "🕵🏻‍♂️💊🛹", response: "كونان" },
    { question: "👁️🗨️👦🏻🔴", response: "ساسكي" },
    { question: "👨🏻‍🦳⚔️👁️", response: "مادارا" },
    { question: "🎭👨🏻🦊", response: "ايتاتشي" },
    { question: "👨🏻‍🦲👁️⚫", response: "كاكاشي" },
    { question: "👩🏻💜👁️", response: "هيناتا" },
    { question: "👦🏻🔵🍃", response: "غون" },
    { question: "👨🏻💥🧨", response: "باكوغو" },
    { question: "👦🏻🟢💪🏻", response: "ميدوريا" },
    { question: "👨🏻⚡🔵", response: "كيلوا" },
    { question: "👨🏻🎩🎲", response: "هيسوكا" },
    { question: "👦🏻🧡👊🏻", response: "ايتشيغو" },
    { question: "👨🏻👒⚔️", response: "زورو" },
    { question: "👨🏻🍖👑", response: "لوفي" },
    { question: "👨🏻‍🍳🚬🦵🏻", response: "سانجي" },
    { question: "👩🏻🍊🧭", response: "نامي" },
    { question: "💀🎸🎶", response: "بروك" },
    { question: "👩🏻🌹📚", response: "روبن" },
    { question: "🤖🔩💪🏻", response: "فرانكي" },
    { question: "👑🐉🔥", response: "اكاينو" },
    { question: "👩🏻🐍🔪", response: "بوا هانكوك" },
    { question: "👨🏻⚓️👑", response: "وايت بيرد" },
    { question: "👨🏻🌪️👁️", response: "دراغون" },
    { question: "👦🏻🔴👊🏻", response: "ناروتو" },
    { question: "👨🏻🔵❄️", response: "هاكو" },
    { question: "👩🏻🌸💊", response: "تسونادي" },
    { question: "👨🏻🟡⚡", response: "ميناتو" },
    { question: "👩🏻🔴💃", response: "ميراي" },
    { question: "👦🏻🟢🐉", response: "غوكو" },
    { question: "👨🏻🔵👑", response: "فيجيتا" },
    { question: "👨🏻🟡🍚", response: "غوهان" },
    { question: "👨🏻🟣💀", response: "بيكولو" },
    { question: "👩🏻🔵👽", response: "بولما" },
    { question: "👨🏻🟠🐱", response: "كيرو" },
    { question: "👦🏻⚫👁️", response: "ساسكي" },
    { question: "👩🏻🟡💫", response: "هيناتا" },
    { question: "👨🏻🟢🍃", response: "ياماتو" },
    { question: "👩🏻🔴🎭", response: "كونان" },
    { question: "👨🏻🟣🗡️", response: "اينوسكي" },
    { question: "👩🏻🟢🐍", response: "ميتسوري" },
    { question: "👨🏻🔵💧", response: "غيو" },
    { question: "👩🏻🟣🦋", response: "شينوبو" },
    { question: "👨🏻🟡🔥", response: "رينغوكو" },
    { question: "👩🏻🟠💨", response: "سانيمي" },
    { question: "👨🏻⚪☁️", response: "توكيتو" },
    { question: "👨🏻🟤🪨", response: "جيومي" },
    { question: "👨🏻🎇🎆", response: "تينغن" },
    { question: "👩🏻👁️🎭", response: "الوكا" },
    { question: "👨🏻🥶❄️", response: "غوجو" },
    { question: "👩🏻💰🧭", response: "نامي" },
    { question: "👑💀🏴‍☠️", response: "روجر" },
    { question: "👨🏻🛹⚡", response: "كيلوا" },
    { question: "👨🏻‍🏫🦑🌙", response: "كورو" },
    { question: "👨🏻🍻🐸", response: "جيرايا" },
    { question: "👨🏻🎤🦑", response: "كيلر بي" },
    { question: "👦🏻💊🕵️", response: "كونان" },
    { question: "👨🏻👊🏻🦲", response: "سايتما" },
    { question: "👦🏻📓🍎", response: "لايت" }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
let handler = async (m, { conn, usedPrefix }) => {
    try {
        const chatId = m.chat;
        
        if (global.games.emoji && global.games.emoji[chatId]) {
            await m.reply(`${BRAND.emoji} *سؤال نشط!*
━━━━━
📌 أكمل السؤال الحالي`);
            return;
        }

        let json = emojiQuestions[Math.floor(Math.random() * emojiQuestions.length)];

        /* ✅ تصميم مضغوط — بدون آيات */
        const bodyText = `${BRAND.emoji} *تخمين الإيموجي* 🎮
━━━━━
🎭 ${json.question}
⏰ ${(timeout / 1000)}ث | 💰 ${poin}XP
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        /* ✅ sendButton — بدون صورة */
        await conn.sendButton(m.chat, {
            bodyText: bodyText,
            footerText: `${BRAND.emoji} ${BRAND.botName}`,
            buttons: [
                {
                    name: 'quick_reply',
                    params: {
                        display_text: `${BRAND.emoji} انسحب`,
                        id: `.انسحب`
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

        global.games.emoji = global.games.emoji || {};
        global.games.emoji[chatId] = {
            answer: json.response.toLowerCase(),
            correctAnswer: json.response,
            emojis: json.question,
            startTime: Date.now(),
            timeout: setTimeout(async () => {
                if (global.games.emoji && global.games.emoji[chatId]) {
                    await m.reply(`${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${json.response}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
                    delete global.games.emoji[chatId];
                }
            }, timeout),
            attempts: 0,
            hintsGiven: []
        };

    } catch (error) {
        console.error(`${BRAND.emoji} خطأ:`, error);
        await m.reply(`${BRAND.emoji} *حدث خطأ*
━━━━━
📌 حاول مرة أخرى`);
    }
}

/* ────────────────[معالجة الإجابات]──────────────── */
handler.before = async (m, { conn }) => {
    try {
        if (m.isBaileys || !m.text) return false;
        
        const chatId = m.chat;
        const game = global.games.emoji ? global.games.emoji[chatId] : null;
        
        if (!game) return false;

        let userAnswer = m.text.toLowerCase().trim();

        /* ✅ انسحب */
        if (m.body === '.انسحب' || userAnswer === 'انسحب') {
            clearTimeout(game.timeout);
            await m.reply(`${BRAND.emoji} *انسحبت!*
━━━━━
✅ *الإجابة:* ${game.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete global.games.emoji[chatId];
            return true;
        }

        /* ✅ إجابة صحيحة */
        if (userAnswer === game.answer) {
            clearTimeout(game.timeout);
            
            const timeTaken = Math.floor((Date.now() - game.startTime) / 1000);
            
            const result = await addExp(m.sender, poin);
            
            /* ✅ تصميم مضغوط */
            let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🎭 *الإجابة:* ${game.correctAnswer}
⏱️ *الوقت:* ${timeTaken}ث
💰 *+${poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
            
            if (result.leveledUp) {
                msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
            }
            
            msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
            
            await m.reply(msg);
            
            delete global.games.emoji[chatId];
            return true;
        }

        /* ✅ إجابة خطأ */
        game.attempts++;
        
        let extraHint = '';
        if (game.attempts >= 2 && !game.hintsGiven.includes('firstLetter')) {
            extraHint = `\n💡 *الحرف الأول:* ${game.correctAnswer.charAt(0)}`;
            game.hintsGiven.push('firstLetter');
        } else if (game.attempts >= 4 && !game.hintsGiven.includes('length')) {
            extraHint = `\n💡 *${game.correctAnswer.length} حروف*`;
            game.hintsGiven.push('length');
        }

        await m.reply(`${BRAND.emoji} *غلط!* ❌${extraHint}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);

        return true;

    } catch (error) {
        console.error(`${BRAND.emoji} خطأ:`, error);
        return false;
    }
}

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['ايموجي'];
handler.tags = ['game'];
handler.command = /^(ايموجي|emoji)$/i;
handler.group = true;

export default handler;