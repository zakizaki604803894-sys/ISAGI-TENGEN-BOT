/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — رسائل مدح وتقدير عشوائية
   📁 /home/container/plugins/fun/مدح.js
   ✅ بدون آيات | بدون صورة | 3 أزرار
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

/* ────────────────[قائمة رسائل المدح]──────────────── */
const compliments = [
    "✨ *أنت مذهل كما أنت تماماً! لا تُغير شيئاً!*",
    "🏆 *أنت تستحق كل النجاح الذي حققته.*",
    "🌟 *أنت مصدر إلهام حقيقي لي ولكل من حولك.*",
    "💪 *أنت أقوى مما تتصور، وقادر على تجاوز أي تحد.*",
    "💡 *أنت تضيء القروب بأفكارك النيرة!*",
    "😂 *لديك حس فكاهة رائع! ضحكتك مُعدية.*",
    "🫂 *أنت لطيف ومُراعٍ للغاية لمشاعر الآخرين.*",
    "🤝 *أنت صديق حقيقي يمكن الاعتماد عليه.*",
    "🎨 *إبداعك لا يعرف حدوداً! استمر في التألق.*",
    "💛 *لديك قلب من ذهب، كرمك لا حدود له.*",
    "👑 *أنت ملك/ملكة التواضع والجمال الداخلي.*",
    "💎 *شخصيتك ثمينة كالماس ونادرة كاللؤلؤ.*",
    "🌅 *وجودك في حياتنا كشروق الشمس يبعث الأمل.*",
    "🦋 *روحك جميلة كالفراشة وطيبة كالربيع.*",
    "🧠 *ذكاؤك حاد كالسيف وفطنتك نادرة.*",
    "🌹 *جمالك لا يقتصر على المظهر بل يشمل الروح.*",
    "⚡ *طاقتك الإيجابية تشحن من حولك بالحيوية.*",
    "🕊️ *قلبك نقي كالحمام وطيب كالعبير.*",
    "🎯 *دائماً تصيب الهدف في آرائك ونصائحك.*",
    "🌈 *أنت تجعل العالم مكاناً أفضل بوجودك.*",
    "⭐ *أنت نجمة ساطعة في سماء حياتنا.*",
    "🔥 *حماسك معدٍ ويشعل الروح فينا.*",
    "🌸 *رقّتك ولطفك لا مثيل لهما.*",
    "🏅 *أنت بطل حقيقي في نظرنا جميعاً.*"
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, args, participants }) => {
    const chatId = m.chat;

    try {
        /* ✅ تحديد الهدف — منشن أو رد */
        let userToCompliment = null;

        /* 1️⃣ المنشن */
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            userToCompliment = m.mentionedJid[0];
        }
        /* 2️⃣ الرد على رسالة */
        else if (m.quoted?.sender) {
            userToCompliment = m.quoted.sender;
        }
        /* 3️⃣ الرقم في النص */
        else if (args.length > 0) {
            const possibleJid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            const isParticipant = participants?.some(p => p.id === possibleJid);
            if (isParticipant) {
                userToCompliment = possibleJid;
            }
        }

        /* ✅ التحقق */
        if (!userToCompliment) {
            return conn.sendMessage(chatId, {
                text: `${BRAND.emoji} *مدح*
━━━━━
📌 *الاستخدام:*
▸ .مدح @مستخدم
▸ أو رد على رسالة
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`
            }, { quoted: m });
        }

        /* ✅ اختيار عشوائي */
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];

        /* ✅ تصميم مضغوط — بدون آيات */
        const bodyText = `👤 @${userToCompliment.split('@')[0]}
━━━━━
${compliment}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        /* ✅ sendButton — بدون صورة */
        try {
            await conn.sendButton(chatId, {
                bodyText: bodyText,
                footerText: `${BRAND.emoji} ${BRAND.botName}`,
                buttons: [
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `💛 مدح جديد`,
                            id: `.مدح @${userToCompliment.split('@')[0]}`
                        }
                    },
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `😂 قمع`,
                            id: `.قمع @${userToCompliment.split('@')[0]}`
                        }
                    },
                    {
                        name: 'cta_url',
                        params: {
                            display_text: `📢 قناة البوت`,
                            url: BRAND.channelLink
                        }
                    }
                ],
                mentions: [userToCompliment],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 3 }
            }, m);
        } catch (e) {
            /* 🅱️ Fallback نصي */
            await conn.sendMessage(chatId, {
                text: bodyText,
                mentions: [userToCompliment],
                ...CHANNEL_INFO
            }, { quoted: m });
        }

    } catch (error) {
        console.error(`${BRAND.emoji} خطأ في أمر مدح:`, error);
        await conn.sendMessage(chatId, {
            text: `${BRAND.emoji} *حدث خطأ*
━━━━━
📌 حاول مرة أخرى`
        }, { quoted: m });
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.usage = ['مدح @مستخدم'];
handler.category = 'fun';
handler.command = ['مدح', 'compliment', 'امتداح', 'ثناء', 'كلمة_طيبة'];
handler.description = '💬 إرسال رسالة مدح وتقدير عشوائية لشخص ما';

export default handler;