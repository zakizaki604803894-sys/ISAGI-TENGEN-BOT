/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — بناء القوائم
   📁 /home/container/plugins/menu_builder.js
   ✅ تصميم هاتف | بدون رابط في النص | أزرار احترافية
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

/* 🖼️ الصور — ISAGI TENGEN فقط */
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

const NEWSLETTER = { 
    name: BRAND.channelName, 
    jid: BRAND.channelId 
};

/* 🏷️ وسوم افتراضية — ISAGI TENGEN */
const DEFAULT_TAGS = ['🍁 ISAGI', '👑 TENGEN', '🔥 الأسطوري', '🚀 ISAGI', '✨ الأفضل', '🎯 جربه', '💜 TENGEN'];
const tagFor = (i) => DEFAULT_TAGS[i % DEFAULT_TAGS.length];

/* 🍁 إرسال نص احتياطي */
async function safeText(conn, m, text) {
    try {
        return await conn.sendMessage(m.chat, { text }, { quoted: m });
    } catch (e) {
        console.error('[menu_builder] حتى الرسالة النصية فشلت:', e?.message);
        return null;
    }
}

/* 🍁 القائمة الرئيسية — صورة + أزرار */
async function sendMainMenu(m, { conn, bot }, { sections, user, totalUsers } = {}) {
  try {
    const mentionId = m.sender;
    const now = new Date();
    const week = now.toLocaleDateString('ar-EG', { weekday: 'long' });
    const date = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    const v = verse();

    /* ✅ تصميم هاتف */
    const bodyText = `🍁 *${BRAND.shortName}*

━━━━━

👤 @${mentionId.split('@')[0]}
👑 ${BRAND.developer}
📅 ${week} | ${date}

━━━━━

🍁 المستوى: ${user?.level ?? '-'}
⚔️ الرتبة: ${user?.role ?? '-'}
🌍 المستخدمين: ${totalUsers ?? '-'}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

📌 *اختر القسم المناسب:*`;

    /* ✅ أزرار الأقسام */
    const sectionButtons = (sections || []).map((s) => ({
        name: 'quick_reply',
        params: {
            display_text: `${s.title}`,
            id: s.id
        }
    }));

    /* ✅ أزرار إضافية */
    const extraButtons = [
        {
            name: 'cta_url',
            params: {
                display_text: `📢 قناة البوت`,
                url: BRAND.channelLink
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `👑 المطور`,
                id: `.المطور`
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `📋 معلومات`,
                id: `.معلومات`
            }
        }
    ];

    const allButtons = [...sectionButtons, ...extraButtons];

    /* ✅ إرسال — sendButtonNormal أولاً */
    try {
        return await conn.sendButtonNormal(m.chat, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: bodyText,
            buttons: allButtons,
            mentions: [m.sender],
            newsletter: NEWSLETTER
        }, m);
    } catch (e) {
        console.error('[sendMainMenu] فشل sendButtonNormal:', e?.message);
        try {
            return await conn.sendButton(m.chat, {
                imageUrl: getRandomImage(),
                bodyText: bodyText,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: allButtons,
                mentions: [m.sender],
                newsletter: NEWSLETTER,
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            console.error('[sendMainMenu] فشل sendButton:', e2?.message);
            return safeText(conn, m, bodyText);
        }
    }
  } catch (e) {
    console.error('[sendMainMenu] خطأ غير متوقع:', e?.message);
    return safeText(conn, m, `🍁 *حصل خطأ في عرض القائمة، جرب تاني.*`);
  }
}

/* 🍁 قائمة القسم — صورة + أزرار */
async function sendSectionMenu(m, { conn, bot }, { sectionId, sectionTitle, sectionEmoji = '🍁', rows, backCommand = 'قائمة' } = {}) {
  try {
    const v = verse();

    /* ✅ تصميم هاتف */
    const bodyText = `${sectionEmoji} *${sectionTitle}*

━━━━━

📜 *عدد الأوامر:* ${rows?.length || 0}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

📌 *اختر الأمر المناسب:*`;

    /* ✅ أزرار الأوامر */
    const commandButtons = (rows || []).map(r => ({
        name: 'quick_reply',
        params: {
            display_text: `${r.desc || r.cmd}`,
            id: `.${r.cmd}`
        }
    }));

    /* ✅ زر الرجوع */
    commandButtons.push({
        name: 'quick_reply',
        params: {
            display_text: `🔙 الرئيسية`,
            id: `.${backCommand}`
        }
    });

    /* ✅ إرسال */
    try {
        return await conn.sendButtonNormal(m.chat, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: bodyText,
            buttons: commandButtons,
            mentions: [m.sender],
            newsletter: NEWSLETTER
        }, m);
    } catch (e) {
        console.error('[sendSectionMenu] فشل sendButtonNormal:', e?.message);
        try {
            return await conn.sendButton(m.chat, {
                imageUrl: getRandomImage(),
                bodyText: bodyText,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: commandButtons,
                mentions: [m.sender],
                newsletter: NEWSLETTER,
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            console.error('[sendSectionMenu] فشل sendButton:', e2?.message);
            return safeText(conn, m, bodyText);
        }
    }
  } catch (e) {
    console.error('[sendSectionMenu] خطأ غير متوقع:', e?.message);
    return safeText(conn, m, `🍁 *حصل خطأ في عرض القائمة، جرب تاني.*`);
  }
}

/* 🍁 قائمة المطورين — صورة + أزرار */
async function sendDevMenu(m, { conn, bot }, isDev, backCommand = 'قائمة') {
    if (!isDev) return null;
  try {
    const v = verse();
    
    const cmds = [
        { cmd: 'بنج', desc: 'اختبار سرعة البوت' },
        { cmd: 'رام', desc: 'إظهار استخدام الذاكرة' },
        { cmd: 'معلومات', desc: 'معلومات البوت' },
        { cmd: 'حظر', desc: 'حظر مستخدم' },
        { cmd: 'فك-حظر', desc: 'فك حظر مستخدم' },
        { cmd: 'اذاعه', desc: 'إذاعة لجميع المجموعات' },
        { cmd: 'تنظيف', desc: 'حذف الملفات المؤقتة' },
        { cmd: 'لمطور', desc: 'معرّف المستخدم' }
    ];

    /* ✅ تصميم هاتف */
    const bodyText = `👑 *قائمة المطورين*

━━━━━

👤 ${BRAND.developer}
📜 *عدد الأوامر:* ${cmds.length}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

📌 *اختر الأمر المناسب:*`;

    /* ✅ أزرار الأوامر */
    const commandButtons = cmds.map(c => ({
        name: 'quick_reply',
        params: {
            display_text: `🍁 ${c.desc}`,
            id: `.${c.cmd}`
        }
    }));

    /* ✅ زر الرجوع */
    commandButtons.push({
        name: 'quick_reply',
        params: {
            display_text: `🔙 الرئيسية`,
            id: `.${backCommand}`
        }
    });

    /* ✅ إرسال */
    try {
        return await conn.sendButtonNormal(m.chat, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: bodyText,
            buttons: commandButtons,
            mentions: [m.sender],
            newsletter: NEWSLETTER
        }, m);
    } catch (e) {
        console.error('[sendDevMenu] فشل sendButtonNormal:', e?.message);
        try {
            return await conn.sendButton(m.chat, {
                imageUrl: getRandomImage(),
                bodyText: bodyText,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: commandButtons,
                mentions: [m.sender],
                newsletter: NEWSLETTER,
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            console.error('[sendDevMenu] فشل sendButton:', e2?.message);
            return safeText(conn, m, bodyText);
        }
    }
  } catch (e) {
    console.error('[sendDevMenu] خطأ غير متوقع:', e?.message);
    return safeText(conn, m, `🍁 *حصل خطأ في عرض القائمة، جرب تاني.*`);
  }
}

export { sendMainMenu, sendSectionMenu, sendDevMenu };