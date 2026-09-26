// 🍁 ملف: اختبارات2.js - اختبارات شخصية إضافية - ISAGI TENGEN BOT

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const bar = (percent) => {
    const filled = Math.round(percent / 10);
    return '█'.repeat(filled) + '░'.repeat(10 - filled);
};

const TRAITS2 = {
    'نسبة_كيوبوبريتي':   { emoji: '🎤', label: 'حب الكيبوب' },
    'نسبة_الويبو':        { emoji: '🍥', label: 'حب الأنمي' },
    'نسبة_محبتك_للألعاب': { emoji: '🎮', label: 'حب الألعاب' },
    'نسبة_ادمان_القرعة':  { emoji: '🎰', label: 'إدمان القرعات' },
    'نسبة_بخلك':          { emoji: '🪙', label: 'البخل' },
    'نسبة_تقلب_مزاجك':    { emoji: '🎭', label: 'تقلب المزاج' }
};

const FOOTERS = [
    'ما تزعلش لو النتيجة مش عاجباك 😂',
    'دي مجرد نسبة عشوائية 🎲',
    'جرب تاني تشوف تتغير ولا لأ 😏'
];

const handler = async (m, { conn, command, text }) => {
    const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    const mention = `@${target.split('@')[0]}`;

    // اختبارات نسبة مئوية عادية
    if (TRAITS2[command]) {
        const trait = TRAITS2[command];
        const percent = rnd(1, 100);
        return conn.sendMessage(m.chat, {
            text: `${trait.emoji} *${trait.label}* ${mention}\n${bar(percent)} ${percent}%\n_${pick(FOOTERS)}_`,
            mentions: [target],
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: CHANNEL_JID,
                    newsletterName: BOT_NAME,
                    serverMessageId: -1
                }
            }
        }, { quoted: m });
    }

    if (command === 'طولك_المتوقع') {
        const cm = rnd(150, 195);
        return conn.sendMessage(m.chat, {
            text: `📏 طول ${mention}: *${cm} سم*`,
            mentions: [target]
        }, { quoted: m });
    }

    if (command === 'وزنك_المتوقع') {
        const kg = rnd(50, 110);
        return conn.sendMessage(m.chat, {
            text: `⚖️ وزن ${mention}: *${kg} كيلو*`,
            mentions: [target]
        }, { quoted: m });
    }

    if (command === 'عمرك_المتوقع') {
        const age = rnd(15, 45);
        return conn.sendMessage(m.chat, {
            text: `🎂 عمر ${mention}: *${age} سنة*`,
            mentions: [target]
        }, { quoted: m });
    }

    if (command === 'توافق_الحب') {
        const second = m.mentionedJid?.[1];
        const first = m.mentionedJid?.[0];
        if (!first || !second) {
            return m.reply(`⚠️ منشن شخصين\nمثال: توافق_الحب @شخص1 @شخص2`);
        }
        const percent = rnd(1, 100);
        const verdict = percent > 80 ? '💞 توافق خرافي!' : percent > 50 ? '🙂 توافق كويس' : percent > 20 ? '😐 توافق عادي' : '😅 مفيش توافق';
        return conn.sendMessage(m.chat, {
            text: `💘 *نسبة التوافق*\n@${first.split('@')[0]} × @${second.split('@')[0]}\n${bar(percent)} ${percent}%\n${verdict}`,
            mentions: [first, second]
        }, { quoted: m });
    }
};

const allCommands = [...Object.keys(TRAITS2), 'طولك_المتوقع', 'وزنك_المتوقع', 'عمرك_المتوقع', 'توافق_الحب'];

handler.usage    = allCommands;
handler.category = 'fun';
handler.command  = allCommands;
handler.cooldown = 3000;

export default handler;