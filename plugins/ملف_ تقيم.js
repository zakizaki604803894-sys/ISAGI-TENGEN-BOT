/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — تقييم البوت
   📁 /home/container/plugins/info/تقيم.js
   ✅ صورة كبيرة | نجوم على الأزرار فقط | بدون تكرار
   🚫 ممنوع في الخاص — للمجموعة فقط
   🚫 ممنوع على البوتات نهائياً
   📢 التقييم يُرسل في القروب فقط (ليس للمطورين في الخاص)
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   🏆 الهوية الموحّدة
   ═══════════════════════════════════════════ */
const BRAND = {
  botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  channelId:   '120363428650036031@newsletter',
  channelName: '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  channelLink: 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u',
  emoji:       '🍁'
};

/* 🕌 الآيات */
const VERSES = [
  { text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', ref: 'الشرح: 6' },
  { text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', ref: 'الرعد: 28' },
  { text: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', ref: 'الطلاق: 3' },
  { text: 'وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', ref: 'البقرة: 153' },
  { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' },
  { text: 'فَاذْكُرُونِي أَذْكُرْكُمْ', ref: 'البقرة: 152' },
  { text: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', ref: 'البقرة: 20' },
  { text: 'وَاللَّهُ خَيْرُ الرَّازِقِينَ', ref: 'الجمعة: 11' },
  { text: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', ref: 'الحديد: 4' },
  { text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ', ref: 'هود: 88' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* 🖼️ الصور */
const IMAGES = [
    'https://i.postimg.cc/DZcTw8Dq/lllybyb.jpg',
    'https://i.postimg.cc/Ls393WJK/mntnmanlanlamlt.jpg',
    'https://i.postimg.cc/cLd4h99Q/1ec6d4d9d187860bebecd5655c2130a7.jpg',
    'https://i.postimg.cc/L5m0w1r1/6539a3ddd4b8e9804e2235afa2928e4a.jpg',
    'https://i.postimg.cc/BQHBH6yw/49361b48a01156b70d4e94f5a954aa3f.jpg',
    'https://i.postimg.cc/J7JkdFqB/fe5a547f50ff075c6697d8802c96f31f.jpg',
    'https://i.postimg.cc/T1CG4GHh/c4bac4df1cf0be95920442ceae42fa8e.jpg',
    'https://i.postimg.cc/tTBM0TpC/c8c75a230d652e70a57f364f2c3c20b9.jpg',
    'https://i.postimg.cc/L8FvbfL5/bb5f15bce9d3efdb69edae96cd559cb9.jpg',
    'https://i.postimg.cc/nhnSLBrZ/41187c79fcad726d466fa80e90a51207.jpg',
    'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9afb0fe0a.jpg',
    'https://i.postimg.cc/JnTyPJ74/telechargement-(4).jpg',
    'https://i.postimg.cc/XJx2L2ys/anime-7-63864269925437.jpg'
];

const getRandomImage = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, text, isBot }) => {
    /* 🚫 منع البوتات نهائياً */
    if (m.isBaileys || (m.sender && m.sender.includes('bot'))) {
        return;
    }

    /* 🚫 منع استخدام الأمر في الخاص */
    if (!m.isGroup) {
        return await conn.sendMessage(m.chat, {
            text: `🚫 *عذراً*\n\nهذا الأمر متاح في *المجموعات فقط*\n\n━━━━━\n\n🍁 *${BRAND.shortName}*`
        }, { quoted: m });
    }

    const chatId = m.chat;

    /* ✅ منطق صحيح: تحقق من الرقم أولاً */
    const textMatch = text?.trim() || '';
    const ratingMatch = textMatch.match(/^(\d+)$/) || textMatch.match(/^(?:قيم|تقييم|rate|تقيم)\s*(\d+)/i);

    if (ratingMatch) {
        const stars = parseInt(ratingMatch[1]);
        if (stars >= 1 && stars <= 5) {
            await sendFeedbackResponse(stars, m, conn);
            return;
        }
        /* ❌ رقم خارج النطاق */
        const v = verse();
        return await conn.sendMessage(chatId, {
            text: `❌ *تقييم غير صالح*

━━━━━

📌 اختر من 1 إلى 5 فقط

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

🍁 *${BRAND.shortName}*`
        }, { quoted: m });
    }

    /* 📱 النص المختصر */
    const v = verse();
    const bodyText = `⭐ *تقييم البوت*

━━━━━

👑 مرحباً ${m.pushName || 'مستخدم'}

━━━━━

📌 *اختر تقييمك من الأزرار*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

🍁 *${BRAND.shortName}*`;

    /* ⭐ أزرار أنيقة — نجوم فقط */
    const buttons = [
        { name: 'quick_reply', params: { display_text: '⭐', id: `.قيم 1` } },
        { name: 'quick_reply', params: { display_text: '⭐⭐', id: `.قيم 2` } },
        { name: 'quick_reply', params: { display_text: '⭐⭐⭐', id: `.قيم 3` } },
        { name: 'quick_reply', params: { display_text: '⭐⭐⭐⭐', id: `.قيم 4` } },
        { name: 'quick_reply', params: { display_text: '⭐⭐⭐⭐⭐', id: `.قيم 5` } },
        {
            name: 'cta_url',
            params: {
                display_text: `📢 قناة البوت`,
                url: BRAND.channelLink
            }
        }
    ];

    /* ✅ sendButtonNormal — صورة كبيرة عشوائية */
    try {
        await conn.sendButtonNormal(chatId, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: bodyText,
            buttons: buttons,
            mentions: [m.sender],
            newsletter: {
                name: BRAND.channelName,
                jid: BRAND.channelId
            }
        }, m);
    } catch (e) {
        /* 🅱️ Fallback */
        try {
            await conn.sendButton(chatId, {
                imageUrl: getRandomImage(),
                bodyText: bodyText,
                footerText: `${BRAND.emoji} ${BRAND.botName}`,
                buttons: buttons,
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            await m.reply(bodyText);
        }
    }
};

/* ═══════════════════════════════════════════
   💬 دالة الرد على التقييم
   ═══════════════════════════════════════════ */
const sendFeedbackResponse = async (stars, m, conn) => {
    /* 🚫 منع التقييم في الخاص */
    if (!m.isGroup) return;

    /* 🚫 منع البوتات */
    if (m.isBaileys) return;

    const starDisplay = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
    const userName = m.pushName || '@' + m.sender.split('@')[0];

    const comments = {
        1: { text: 'سيء جداً', emoji: '😔', reply: 'نعتذر عن التجربة! سنعمل على التحسين 💪' },
        2: { text: 'ضعيف', emoji: '😕', reply: 'نقدر رأيك! سنحاول تحسين الخدمة 🔧' },
        3: { text: 'جيد', emoji: '😊', reply: 'شكراً لك! نواصل التطوير لخدمتك 🔥' },
        4: { text: 'ممتاز', emoji: '🎉', reply: 'نشكرك جداً! دعمك يحفزنا ⚡' },
        5: { text: 'خرافي', emoji: '❤️', reply: 'شكراً جزيلاً! هذا يعني لنا الكثير 👑' }
    };

    const rate = comments[stars];
    const v = verse();

    const feedbackMessage = `⭐ *تقييم ${userName}*

━━━━━

${starDisplay}

━━━━━

💬 رأيك: "${rate.text}"

${rate.emoji} ${rate.reply}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

🍁 *${BRAND.shortName}*`;

    /* ✅ إرسال الرد في القروب فقط — لا يُرسل للمطورين في الخاص */
    try {
        await conn.sendMessage(m.chat, {
            text: feedbackMessage,
            mentions: [m.sender],
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: BRAND.channelId,
                    newsletterName: BRAND.channelName,
                    serverMessageId: 0
                }
            }
        }, { quoted: m });
    } catch (e) {
        await m.reply(feedbackMessage);
    }

    /* ❌ تم إزالة إرسال التقييم للمطورين في الخاص نهائياً */
    /* 📢 التقييم يظهر في القروب فقط كما هو مطلوب */
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['تقيم', 'تقييم', 'rate', 'قيم'];
handler.category = 'info';

export default handler;