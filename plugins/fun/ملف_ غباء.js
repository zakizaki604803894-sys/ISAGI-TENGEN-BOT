/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — حساب نسبة الغباء
   📁 /home/container/plugins/fun/غباء.js
   ✅ بدون صورة | دعم المنشن بالرد | بدون آيات
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

/* ────────────────[قائمة الحالات]──────────────── */
const stupidityLevels = [
    { min: 90, emoji: '🫣', status: 'أوه... هذا كثير! 😅' },
    { min: 70, emoji: '😅', status: 'غبي بعض الشيء!' },
    { min: 50, emoji: '🤔', status: 'متوسط الغباء' },
    { min: 30, emoji: '🧠', status: 'ذكي!' },
    { min: 0, emoji: '🏆', status: 'حكيم! 🌟' }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, text, command }) => {
    const chatId = m.chat;

    try {
        /* ✅ تحديد الهدف — منشن أو رد */
        let userToAnalyze = null;

        /* 1️⃣ المنشن */
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            userToAnalyze = m.mentionedJid[0];
        }
        /* 2️⃣ الرد على رسالة */
        else if (m.quoted?.sender) {
            userToAnalyze = m.quoted.sender;
        }
        /* 3️⃣ الرقم في النص */
        else if (text) {
            const phoneMatch = text.replace(/[^0-9]/g, '');
            if (phoneMatch.length >= 10) {
                userToAnalyze = phoneMatch + '@s.whatsapp.net';
            }
        }
        /* 4️⃣ نفسه */
        else {
            userToAnalyze = m.sender;
        }

        /* ✅ جلب الاسم */
        let userName = userToAnalyze.split('@')[0];
        try {
            const name = conn.getName ? await conn.getName(userToAnalyze) : null;
            if (name) userName = name;
        } catch {}

        /* ✅ حساب النسبة */
        const percentage = Math.floor(Math.random() * 101);
        let level = stupidityLevels.find(l => percentage >= l.min) || stupidityLevels[0];

        /* ✅ تصميم مضغوط — بدون صورة */
        const bodyText = `${BRAND.emoji} *نسبة الغباء* 🤪
👤 @${userToAnalyze.split('@')[0]}
📊 *النسبة:* ${percentage}%
${level.emoji} *الحالة:* ${level.status}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        try {
            await conn.sendButton(chatId, {
                bodyText: bodyText,
                footerText: `${BRAND.emoji} ${BRAND.botName}`,
                buttons: [
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `${BRAND.emoji} إعادة`,
                            id: `.غباء ${userToAnalyze}`
                        }
                    },
                    {
                        name: 'cta_url',
                        params: {
                            display_text: `${BRAND.emoji} قناة البوت`,
                            url: BRAND.channelLink
                        }
                    }
                ],
                mentions: [userToAnalyze],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 2 }
            }, m);
        } catch (e) {
            /* 🅱️ Fallback نصي */
            await conn.sendMessage(chatId, {
                text: bodyText,
                mentions: [userToAnalyze],
                ...CHANNEL_INFO
            }, { quoted: m });
        }

    } catch (error) {
        console.error('❌ خطأ في أمر غباء:', error);
        await conn.sendMessage(chatId, {
            text: `${BRAND.emoji} *حدث خطأ*
━━━━━
📌 حاول مرة أخرى`,
            ...CHANNEL_INFO
        }, { quoted: m });
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['غباء', 'stupidity', 'dumb', 'نسبة_غباء', 'غبي'];
handler.category = 'fun';

export default handler;