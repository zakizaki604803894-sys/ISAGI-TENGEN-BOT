/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — القائمة الرئيسية (محدّثة)
   📁 /home/container/plugins/commands.js
   ✅ قسم الألعاب (15 لعبة) + قسم الأدوات (2)
   ✅ أمر .العاب = القائمة الرئيسية (بكل شيء)
   ═══════════════════════════════════════════════════════════ */

const EMOJI = '🍁';
const BOT_NAME = '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';

/* 🕌 الآيات */
const VERSES = [
    '﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾',
    '﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾',
    '﴿ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ﴾',
    '﴿ وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾',
    '﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾',
    '﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾',
    '﴿ إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴾',
    '﴿ وَاللَّهُ خَيْرُ الرَّازِقِينَ ﴾',
    '﴿ وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ﴾',
    '﴿ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾'
];

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
const getRandomVerse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

const sendReact = (conn, m, emoji) => {
    conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } }).catch(() => {});
};

/* ═══════════════════════════════════════════
   📂 الأقسام
   ═══════════════════════════════════════════ */
const CATEGORIES = [
    { id: 'game',     name: '🎮 الألعاب',     emoji: '🎮' },
    { id: 'bank',     name: '💰 البنك',       emoji: '💰' },
    { id: 'anime',    name: '🎌 الأنمي',      emoji: '🎌' },
    { id: 'admins',   name: '🛡️ الإدارة',     emoji: '🛡️' },
    { id: 'download', name: '⬇️ التحميلات',   emoji: '⬇️' },
    { id: 'ai',       name: '🧠 الذكاء',      emoji: '🧠' },
    { id: 'fun',      name: '🎭 الترفيه',     emoji: '🎭' },
    { id: 'owner',    name: '👑 المطور',      emoji: '👑' },
    { id: 'tools',    name: '🛠️ الأدوات',     emoji: '🛠️' },
    { id: 'info',     name: '📋 المعلومات',   emoji: '📋' },
    { id: 'sticker',  name: '🌄 الملصقات',    emoji: '🌄' }
];

/* 🎮 الألعاب (15) */
const GAMES = [
    { emoji: '🥊', title: 'قتال KOF',         cmd: '.kof' },
    { emoji: '🎹', title: 'Magic Tiles',      cmd: '.ماجيك' },
    { emoji: '🍄', title: 'ماريو',            cmd: '.ماريو' },
    { emoji: '🎾', title: 'تنس',              cmd: '.تنس' },
    { emoji: '🎵', title: 'لعبة الإيقاع',     cmd: '.ايقاع' },
    { emoji: '🎹', title: 'بيانو احترافي',    cmd: '.بيانو' },
    { emoji: '🎮', title: 'تتريس',            cmd: '.تتريس' },
    { emoji: '🐍', title: 'ثعبان النيون',     cmd: '.ثعبان' },
    { emoji: '🎮', title: 'Geometry Dash',    cmd: '.جيو' },
    { emoji: '🏎️', title: 'سباق السيارات',    cmd: '.سباق' },
    { emoji: '🕷️', title: 'سبايدر مان',       cmd: '.سبايدر' },
    { emoji: '🏗️', title: 'Stack Tower',      cmd: '.ستاك' },
    { emoji: '🦔', title: 'سونيك',            cmd: '.سونيك' },
    { emoji: '🐦', title: 'الطائر المحطم',    cmd: '.طائر' },
    { emoji: '🎈', title: 'الفقاعات',         cmd: '.فقاعات' }
];

/* 🛠️ الأدوات (2) */
const TOOLS = [
    { emoji: '🎨', title: 'محرر الصور',       cmd: '.تعديل' },
    { emoji: '⚡', title: 'ساعة المستقبل',    cmd: '.ساعة' }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — أمر .العاب فقط
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, bot }) => {
    const randomImage = getRandomImage();
    const v = getRandomVerse();
    
    sendReact(conn, m, EMOJI);

    const isOwner = bot.config.owners.some(o =>
        m.sender === o.jid || m.sender === o.lid
    );

    const xp = global.db?.users?.[m.sender]?.xp || 0;
    const lvl = isOwner ? 999 : (Math.floor(Math.sqrt(xp / 100)) + 1);
    const totalUsers = Object.keys(global.db?.users || {}).length;

    /* ✅ النص الرئيسي */
    const bodyText = `${EMOJI} *${BOT_NAME}*
👤 ${m.pushName || 'مجهول'} | 🆙 Lv ${lvl} | 🌍 ${totalUsers}
━━━━━
${v}
━━━━━
📂 *اختر قسم من الزر* 👇`;

    /* ✅ الأزرار — الأقسام + الألعاب + الأدوات + القناة */
    const buttons = [
        /* 📂 قائمة الأقسام المنسدلة */
        {
            name: 'single_select',
            params: {
                title: '📂 اختر القسم',
                sections: [
                    {
                        title: '🍁 أقسام البوت',
                        rows: CATEGORIES.map(cat => ({
                            header: cat.emoji,
                            title: cat.name,
                            description: `🍁 ISAGI BOT`,
                            id: `.قسم_${cat.id}`
                        }))
                    }
                ]
            }
        },
        /* 🎮 الألعاب */
        { 
            name: 'quick_reply', 
            params: { 
                display_text: `🎮 الألعاب`,
                id: `.قائمة_الالعاب`
            } 
        },
        /* 🛠️ الأدوات */
        { 
            name: 'quick_reply', 
            params: { 
                display_text: `🛠️ الأدوات`,
                id: `.قائمة_الادوات`
            } 
        },
        /* ⭐ تقييم */
        { 
            name: 'quick_reply', 
            params: { 
                display_text: `⭐ تقييم`,
                id: `.تقيم`
            } 
        },
        /* 👨‍💻 المطور */
        { 
            name: 'quick_reply', 
            params: { 
                display_text: `👨‍💻 المطور`,
                id: `.المطور`
            } 
        },
        /* 📢 القناة */
        { 
            name: 'cta_url', 
            params: { 
                display_text: `📢 قناة البوت`,
                url: CHANNEL_LINK 
            } 
        }
    ];

    /* 📤 الإرسال */
    try {
        await conn.sendButtonNormal(m.chat, {
            media: { url: randomImage },
            mediaType: 'image',
            caption: bodyText,
            buttons: buttons,
            mentions: [m.sender],
            newsletter: {
                name: CHANNEL_NAME,
                jid: CHANNEL_JID
            }
        }, m);
    } catch (e) {
        try {
            await conn.sendButton(m.chat, {
                imageUrl: randomImage,
                bodyText: bodyText,
                footerText: `${EMOJI} ${BOT_NAME}`,
                buttons: buttons,
                mentions: [m.sender],
                newsletter: {
                    name: CHANNEL_NAME,
                    jid: CHANNEL_JID
                },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            await m.reply(bodyText);
        }
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['العاب', 'ألعاب', 'games'];
handler.category = 'games';
handler.usePrefix = true;

export default handler;