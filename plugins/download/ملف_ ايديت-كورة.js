// 🍁 ملف: ايديت-كورة.js - فيديوهات إديت كرة القدم - ISAGI TENGEN BOT

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';

// ────────────────[مصفوفة الفيديوهات]────────────────
const dir = [
    'https://telegra.ph/file/5fb7c13a4d93917f97ff3.mp4',
    'https://telegra.ph/file/2a4e007bec39cc66385b0.mp4',
    'https://telegra.ph/file/a22d5d23a85c4d7b2cdac.mp4',
    'https://telegra.ph/file/148dcadb72c631e0a9d1c.mp4',
    'https://telegra.ph/file/6699964c4f9486bafac22.mp4',
    'https://telegra.ph/file/aec768d540e249ceb0c5b.mp4',
    'https://telegra.ph/file/b2f92a40a7b869896d360.mp4',
    'https://telegra.ph/file/cd611bb1e76ceac182de8.mp4',
    'https://telegra.ph/file/0c4046c6477431bbed40d.mp4',
    'https://telegra.ph/file/d84e53e96fb44ec4cbd23.mp4',
    'https://telegra.ph/file/1286e1bf83c9901308cd8.mp4',
];

// ────────────────[الأمر الرئيسي]────────────────
const handler = async (m, { conn }) => {
    try {
        const chatId = m.chat;

        // ─── رد فعل مؤقت ──────────────────────────────────
        await conn.sendMessage(chatId, {
            react: { text: '⚽', key: m.key }
        });

        // ─── اختيار فيديو عشوائي ──────────────────────────
        const randomVideo = dir[Math.floor(Math.random() * dir.length)];

        // ─── إرسال الفيديو ──────────────────────────────────
        await conn.sendMessage(chatId, {
            video: { url: randomVideo },
            caption: `${EMOJI}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${EMOJI}
    *⚽ فِيدِيُو إِدِيت كُرَةِ الْقَدَمِ*
${EMOJI}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${EMOJI}

⚡ *استمتع بالمشاهدة!*

${EMOJI}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${EMOJI}
📌 *لفيديو آخر:* .اديت-كورة
${EMOJI} *${BOT_NAME}*
${EMOJI}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${EMOJI}`,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: CHANNEL_JID,
                    newsletterName: CHANNEL_NAME,
                    serverMessageId: -1
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error(`${EMOJI} خطأ في إرسال فيديو الإديت:`, error);
        await conn.sendMessage(m.chat, {
            text: `${EMOJI} ❌ *حدث خطأ في إرسال الفيديو*\n📌 ${error.message || 'يرجى المحاولة مرة أخرى'}`
        }, { quoted: m });
    }
};

// ────────────────[إعدادات الأمر]────────────────
handler.usage = ['اديت-كورة'];
handler.category = 'media';
handler.command = ['اديت-كورة', 'editfoot', 'اديت-كوره', 'اديت-فوت', 'كورة'];
handler.description = '⚽ فيديو إديت كرة قدم عشوائي';

export default handler;