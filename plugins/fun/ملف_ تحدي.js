/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — تحديات وجرأة عشوائية
   📁 /home/container/plugins/fun/تحدي.js
   ✅ بدون صورة | بدون آيات | تصميم هاتف
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

/* ────────────────[قائمة التحديات]──────────────── */
const localArabicDares = [
    "🎯 ارسم وجهك على إصبعك 👆 وشارك الصورة",
    "🎯 أرسل آخر رسالة غريبة أو مضحكة 😂",
    "🎯 قلد صوت حيوان 🐶 لمدة 10 ثوانٍ",
    "🎯 اكتب قصيدة قصيرة (4 أسطر) عن البوت",
    "🎯 أرسل إيموجي واحد يصف حالتك",
    "🎯 أخبر المجموعة بأول فيلم 🎥 شاهدته",
    "🎯 غير اسمك في المجموعة إلى اسم فاكهة 🍎",
    "🎯 أرسل لقطة شاشة 📱 لآخر 5 تطبيقات",
    "🎯 ارقص 💃 لمدة 5 ثوانٍ وسجل فيديو",
    "🎯 ضع مكعب ثلج 🧊 على جبهتك 10 ثوانٍ",
    "🎯 التقط سيلفي بأغرب تعبير وجه 😲",
    "🎯 ما هي أسوأ طبخة 🤢 عملتها؟",
    "🎯 اذكر 3 أشياء لا تستغني عنها (غير الهاتف)",
    "🎯 اذكر شخصية أنمي تشبهك ولماذا",
    "🎯 غنّي أغنية أطفال 🎵 وأنت تغمض",
    "🎯 تحدث بلغة أجنبية لمدة دقيقة",
    "🎯 اكتب رسالة حب 💌 لأول شخص تراه",
    "🎯 اعمل 10 تمارين ضغط 💪 وسجل فيديو",
    "🎯 التقط صورة وأنت ترتدي ملابس معكوسة",
    "🎯 اقلد صوت شخصية كرتونية",
    "🎯 ارسم لوحة 🎨 باستخدام طعامك",
    "🎯 غنّي وأنت تضع ملعقة في فمك",
    "🎯 تحدث كالروبوت لمدة دقيقتين",
    "🎯 اكتب اسمك في الهواء ✍️ بعين مغلقة",
    "🎯 صور فيديو وأنت تمشي للخلف",
    "🎯 اقرأ جملة وأنت تضع ماء في فمك",
    "🎯 اعمل قائمة تسوق 🛒 باستخدام أغنية",
    "🎯 التقط صورة مع حيوانك الأليف",
    "🎯 اشرح كيف تعمل الثلاجة 🧊 كخبير",
    "🎯 اعمل صوتيات لأصوات المطبخ",
    "🎯 ارسم صورة بعينيك مغلقتين",
    "🎯 قلد مشهد من فيلم مشهور",
    "🎯 اكتب قصة بـ 5 كلمات فقط",
    "🎯 اعمل حركة أكروباتية بسيطة",
    "🎯 غنّي وأنت تضع أنفك",
    "🎯 اتصل بصديق وقلد صوت طفل",
    "🎯 أرسل صورة لقدمك 👣",
    "🎯 اكتب اسمك بحروف كبيرة",
    "🎯 قلد شخصية مشهورة",
    "🎯 غنّي أغنية راب 🎤"
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
    const chatId = m.chat;

    try {
        const randomIndex = Math.floor(Math.random() * localArabicDares.length);
        const dareMessage = localArabicDares[randomIndex];

        /* ✅ رياكت فوري */
        conn.sendMessage(chatId, {
            react: { text: '🎯', key: m.key }
        }).catch(() => {});

        /* ✅ تصميم مضغوط — بدون آيات */
        const bodyText = `${BRAND.emoji} *تحدي*

━━━━━
${dareMessage}
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
                            display_text: `🎯 تحدي جديد`,
                            id: `.تحدي`
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
                mentions: [m.sender],
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
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: BRAND.channelId,
                        newsletterName: BRAND.channelName,
                        serverMessageId: -1
                    }
                }
            }, { quoted: m });
        }

    } catch (error) {
        console.error(`${BRAND.emoji} خطأ:`, error);
        await conn.sendMessage(chatId, {
            text: `${BRAND.emoji} *فشل إرسال التحدي*
━━━━━
📌 حاول مرة أخرى`
        }, { quoted: m });
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.usage = ['تحدي'];
handler.category = 'fun';
handler.command = ['تحدي', 'dare', 'جرأة', 'تحد', 'تحديات'];
handler.description = '🎯 تحدي وجرأة عشوائي';

export default handler;