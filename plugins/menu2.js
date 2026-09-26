/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — القائمة الرئيسية + التفعيل
   📁 /home/container/plugins/commands.js
   🧬 محاكي السلوك البشري — لتقليل بصمة الأتمتة
   ✅ أمر .اوامر | .ألعاب | .تفعيل
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

/* 🧬 محاكي السلوك البشري — لتقليل بصمة الأتمتة */
const humanDelay = () => new Promise(r => setTimeout(r, Math.floor(Math.random() * 350) + 150));
const humanJitter = (text) => {
    if (!text || typeof text !== 'string') return text;
    const variants = [text, text + '\u200b', text.replace(/\n\n/g, '\n \n'), text.replace(/━/g, '─')];
    return variants[Math.floor(Math.random() * variants.length)];
};

const sendReact = (conn, m, emoji) => {
    conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } }).catch(() => {});
};

/* ═══════════════════════════════════════════
   🧬 إرسال آمن (سلوك بشري)
   ═══════════════════════════════════════════ */
const safeSend = async (conn, m, content) => {
    await humanDelay();
    try {
        if (content.bodyText) content.bodyText = humanJitter(content.bodyText);
        if (content.caption)  content.caption  = humanJitter(content.caption);
    } catch {}
    return null;
};

/* 📂 الأقسام */
const CATEGORIES = [
    { id: 'game',     name: '🎮 الألعاب',     emoji: '🎮', isNew: true },
    { id: 'tools',    name: '🛠️ الأدوات',     emoji: '🛠️', isNew: true },
    { id: 'bank',     name: '💰 البنك',       emoji: '💰' },
    { id: 'anime',    name: '🎌 الأنمي',      emoji: '🎌' },
    { id: 'admins',   name: '🛡️ الإدارة',     emoji: '🛡️' },
    { id: 'download', name: '⬇️ التحميلات',   emoji: '⬇️' },
    { id: 'ai',       name: '🧠 الذكاء',      emoji: '🧠' },
    { id: 'fun',      name: '🎭 الترفيه',     emoji: '🎭' },
    { id: 'owner',    name: '👑 المطور',      emoji: '👑' },
    { id: 'info',     name: '📋 المعلومات',   emoji: '📋' },
    { id: 'sticker',  name: '🌄 الملصقات',    emoji: '🌄' }
];

/* 🎮 الألعاب */
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
    { emoji: '🎈', title: 'الفقاعات',         cmd: '.فقاعات' },
    { emoji: '👻', title: 'Pacman',           cmd: '.باكمان' },
    { emoji: '🎮', title: 'إكس أو',           cmd: '.اكس_او' }
];

/* 🛠️ الأدوات */
const TOOLS = [
    { emoji: '🎨', title: 'محرر الصور',       cmd: '.تعديل',  desc: 'تعديل وتحرير الصور' },
    { emoji: '⚡', title: 'ساعة المستقبل',    cmd: '.ساعة',   desc: 'ساعة ذكية + بطارية + شبكة' }
];

/* ═══════════════════════════════════════════
   ⚙️ أدوات التفعيل
   ═══════════════════════════════════════════ */
const getG = (chatId) => {
    if (!global._gs) global._gs = {};
    if (!global._gs[chatId]) global._gs[chatId] = {};
    return global._gs[chatId];
};

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, bot, command, args }) => {
    const randomImage = getRandomImage();
    const v = getRandomVerse();
    const chatId = m.chat;

    sendReact(conn, m, EMOJI);

    const isOwner = bot.config.owners.some(o =>
        m.sender === o.jid || m.sender === o.lid
    );

    /* ═══════════════════════════════════════
       ⚙️ أمر .تفعيل
       ═══════════════════════════════════════ */
    if (command === 'تفعيل' || command === 'settings') {
        const subCmd = args[0]?.toLowerCase()?.trim();

        if (!subCmd) {
            const bodyText = `${EMOJI} *⚙️ نظام التفعيل والتعطيل*
━━━━━
📌 *اختر من القوائم أدناه* 👇
━━━━━
${v}
━━━━━
🍁 *${BOT_NAME}*`;

            const buttons = [
                {
                    name: 'single_select',
                    params: {
                        title: '✅ التفعيلات',
                        sections: [
                            {
                                title: '🎉 الترحيب',
                                rows: [
                                    { header: '✅', title: 'تشغيل الترحيب', description: '🎉 تفعيل رسائل الترحيب', id: '.تشغيل_الترحيب' }
                                ]
                            },
                            {
                                title: '🛡️ الحماية',
                                rows: [
                                    { header: '✅', title: 'تشغيل مضاد الروابط', description: '🔗 منع الروابط', id: '.تفعيل تشغيل_مضاد_الروابط' },
                                    { header: '✅', title: 'تشغيل ضد الشاتم', description: '🚫 منع الشتائم', id: '.تفعيل تشغيل_ضد_الشاتم' },
                                    { header: '✅', title: 'تشغيل مضاد البوتات', description: '🤖 طرد البوتات', id: '.تفعيل تشغيل_مضاد_البوتات' }
                                ]
                            },
                            {
                                title: '🚫 مضادات الميديا',
                                rows: [
                                    { header: '✅', title: 'تشغيل مضاد الستيكر', description: '🎭 منع الملصقات', id: '.تفعيل تشغيل_مضاد_الستيكر' },
                                    { header: '✅', title: 'تشغيل مضاد الفيديو', description: '🎬 منع الفيديو', id: '.تفعيل تشغيل_مضاد_الفيديو' },
                                    { header: '✅', title: 'تشغيل مضاد الصور', description: '🖼️ منع الصور', id: '.تفعيل تشغيل_مضاد_الصور' },
                                    { header: '✅', title: 'تشغيل مضاد الصوت', description: '🔉 منع الصوت', id: '.تفعيل تشغيل_مضاد_الصوت' }
                                ]
                            },
                            {
                                title: '👑 الصلاحيات',
                                rows: [
                                    { header: '✅', title: 'تشغيل الادمن فقط', description: '👑 للمشرفين فقط', id: '.تفعيل تشغيل_الادمن' },
                                    { header: '🔒', title: 'مطور فقط', description: '👑 للمطورين فقط', id: '.تفعيل مطور_فقط' },
                                    { header: '🔓', title: 'مطور عام', description: '🌍 للجميع', id: '.تفعيل مطور_عام' },
                                    { header: '🔓', title: 'تشغيل الخاص', description: '💬 في الخاص', id: '.تفعيل تشغيل_خاص' },
                                    { header: '✅', title: 'تشغيل الفرعي', description: '🤖 البوتات الفرعية', id: '.تفعيل تشغيل_الفرعي' }
                                ]
                            }
                        ]
                    }
                },
                {
                    name: 'single_select',
                    params: {
                        title: '❌ التعطيلات',
                        sections: [
                            {
                                title: '🎉 الترحيب',
                                rows: [
                                    { header: '❌', title: 'ايقاف الترحيب', description: '🎉 إيقاف الترحيب', id: '.ايقاف_الترحيب' }
                                ]
                            },
                            {
                                title: '🛡️ الحماية',
                                rows: [
                                    { header: '❌', title: 'ايقاف مضاد الروابط', description: '🔗 إيقاف مضاد الروابط', id: '.تفعيل ايقاف_مضاد_الروابط' },
                                    { header: '❌', title: 'ايقاف ضد الشاتم', description: '🚫 إيقاف ضد الشاتم', id: '.تفعيل ايقاف_ضد_الشاتم' },
                                    { header: '❌', title: 'ايقاف مضاد البوتات', description: '🤖 إيقاف مضاد البوتات', id: '.تفعيل ايقاف_مضاد_البوتات' }
                                ]
                            },
                            {
                                title: '🚫 مضادات الميديا',
                                rows: [
                                    { header: '❌', title: 'ايقاف مضاد الستيكر', description: '🎭 إيقاف مضاد الستيكر', id: '.تفعيل ايقاف_مضاد_الستيكر' },
                                    { header: '❌', title: 'ايقاف مضاد الفيديو', description: '🎬 إيقاف مضاد الفيديو', id: '.تفعيل ايقاف_مضاد_الفيديو' },
                                    { header: '❌', title: 'ايقاف مضاد الصور', description: '🖼️ إيقاف مضاد الصور', id: '.تفعيل ايقاف_مضاد_الصور' },
                                    { header: '❌', title: 'ايقاف مضاد الصوت', description: '🔉 إيقاف مضاد الصوت', id: '.تفعيل ايقاف_مضاد_الصوت' }
                                ]
                            },
                            {
                                title: '👑 الصلاحيات',
                                rows: [
                                    { header: '❌', title: 'ايقاف الادمن فقط', description: '👑 إيقاف وضع الادمن', id: '.تفعيل ايقاف_الادمن' },
                                    { header: '🔒', title: 'ايقاف الخاص', description: '💬 إيقاف الخاص', id: '.تفعيل ايقاف_خاص' },
                                    { header: '❌', title: 'ايقاف الفرعي', description: '🤖 إيقاف الفرعي', id: '.تفعيل ايقاف_الفرعي' }
                                ]
                            }
                        ]
                    }
                },
                {
                    name: 'cta_url',
                    params: {
                        display_text: `📢 قناة البوت`,
                        url: CHANNEL_LINK
                    }
                }
            ];

            await safeSend(conn, m, { bodyText });

            try {
                return await conn.sendButtonNormal(m.chat, {
                    media: { url: randomImage },
                    mediaType: 'image',
                    caption: humanJitter(bodyText),
                    buttons: buttons,
                    mentions: [m.sender],
                    newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID }
                }, m);
            } catch (e) {
                try {
                    return await conn.sendButton(m.chat, {
                        imageUrl: randomImage,
                        bodyText: humanJitter(bodyText),
                        footerText: `${EMOJI} ${BOT_NAME}`,
                        buttons: buttons,
                        mentions: [m.sender],
                        newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID },
                        interactiveConfig: { buttons_limits: 20 }
                    }, m);
                } catch (e2) {
                    return m.reply(humanJitter(bodyText));
                }
            }
        }

        const isAdmin = m.isAdmin || false;

        const checkPerm = (adminOnly = true) => {
            if (adminOnly && !isOwner && !isAdmin) {
                return `${EMOJI} *「⚠️」 هذا الأمر للمشرفين فقط*`;
            }
            if (!adminOnly && !isOwner) {
                return `${EMOJI} *「⚠️」 هذا الأمر للمطورين فقط*`;
            }
            return null;
        };

        const g = getG(chatId);

        const setG = (key, val, onMsg, offMsg, adminOnly = true) => {
            const err = checkPerm(adminOnly);
            if (err) return err;

            g[key] = val;
            const msg = val ? onMsg : offMsg;
            return msg || onMsg || offMsg || `${EMOJI} *✅ تم التغيير*`;
        };

        const CASES = {
            'تشغيل_مضاد_الروابط': () => setG('antiLink', true,
                `${EMOJI} *✅ تم تشغيل مضاد الروابط* 🔗\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_مضاد_الروابط': () => setG('antiLink', false, '',
                `${EMOJI} *✅ تم إيقاف مضاد الروابط*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'تشغيل_ضد_الشاتم': () => setG('antiCurse', true,
                `${EMOJI} *✅ تم تشغيل ضد الشاتم* 🚫\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_ضد_الشاتم': () => setG('antiCurse', false, '',
                `${EMOJI} *✅ تم إيقاف ضد الشاتم*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'تشغيل_مضاد_البوتات': () => setG('antiBots', true,
                `${EMOJI} *✅ تم تشغيل مضاد البوتات* 🤖\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_مضاد_البوتات': () => setG('antiBots', false, '',
                `${EMOJI} *✅ تم إيقاف مضاد البوتات*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'تشغيل_مضاد_الستيكر': () => setG('antiSticker', true,
                `${EMOJI} *✅ تم تشغيل مضاد الستيكر* 🎭\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_مضاد_الستيكر': () => setG('antiSticker', false, '',
                `${EMOJI} *✅ تم إيقاف مضاد الستيكر*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'تشغيل_مضاد_الفيديو': () => setG('antiVideo', true,
                `${EMOJI} *✅ تم تشغيل مضاد الفيديو* 🎬\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_مضاد_الفيديو': () => setG('antiVideo', false, '',
                `${EMOJI} *✅ تم إيقاف مضاد الفيديو*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'تشغيل_مضاد_الصور': () => setG('antiImage', true,
                `${EMOJI} *✅ تم تشغيل مضاد الصور* 🖼️\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_مضاد_الصور': () => setG('antiImage', false, '',
                `${EMOJI} *✅ تم إيقاف مضاد الصور*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'تشغيل_مضاد_الصوت': () => setG('antiAudio', true,
                `${EMOJI} *✅ تم تشغيل مضاد الصوت* 🔉\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_مضاد_الصوت': () => setG('antiAudio', false, '',
                `${EMOJI} *✅ تم إيقاف مضاد الصوت*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'تشغيل_الادمن': () => setG('adminOnly', true,
                `${EMOJI} *✅ تم تفعيل وضع الادمن* 👑\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`, ''),
            'ايقاف_الادمن': () => setG('adminOnly', false, '',
                `${EMOJI} *✅ تم فك وضع الادمن*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`),

            'مطور_فقط': () => {
                const e = checkPerm(false); if (e) return e;
                global.ownerOnly = true;
                return `${EMOJI} *✅ تم تفعيل وضع المطور فقط*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`;
            },
            'مطور_عام': () => {
                const e = checkPerm(false); if (e) return e;
                global.ownerOnly = false;
                return `${EMOJI} *✅ تم تفعيل وضع المطور العام*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`;
            },

            'ايقاف_خاص': () => {
                const e = checkPerm(false); if (e) return e;
                global.devMode = true;
                return `${EMOJI} *✅ تم إيقاف البوت في الخاص للعامة*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`;
            },
            'تشغيل_خاص': () => {
                const e = checkPerm(false); if (e) return e;
                global.devMode = false;
                return `${EMOJI} *✅ تم تشغيل البوت في الخاص للكل*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`;
            },

            'ايقاف_الفرعي': () => {
                const e = checkPerm(false); if (e) return e;
                global.noSub = true;
                return `${EMOJI} *✅ تم إيقاف البوتات الفرعية*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`;
            },
            'تشغيل_الفرعي': () => {
                const e = checkPerm(false); if (e) return e;
                global.noSub = false;
                return `${EMOJI} *✅ تم تشغيل البوتات الفرعية*\n━━━━━\n${v}\n━━━━━\n${EMOJI} *${BOT_NAME}*`;
            }
        };

        const fn = CASES[subCmd];
        if (!fn) {
            return m.reply(`${EMOJI} *❌ أمر غير معروف*
━━━━━
📌 استخدم:
▸ .تشغيل_الترحيب
▸ .ايقاف_الترحيب
━━━━━
${v}`);
        }

        const result = fn();
        if (result) {
            await humanDelay();
            await m.reply(humanJitter(result));
        }
        return;
    }

    /* ═══════════════════════════════════════
       🎮 أمر .ألعاب
       ═══════════════════════════════════════ */
    if (command === 'ألعاب' || command === 'العاب' || command === 'games') {
        const bodyText = `${EMOJI} *القائمة المتاحة*
🎮 *الألعاب:* ${GAMES.length}
🛠️ *الأدوات:* ${TOOLS.length}
━━━━━
📌 *اختر من القائمة* 👇
━━━━━
${v}
━━━━━
🆕 *المزيد قادم قريباً...*
━━━━━
🍁 *${BOT_NAME}*`;

        const buttons = [
            {
                name: 'single_select',
                params: {
                    title: '🎮 اختر',
                    sections: [
                        {
                            title: '🎮 ألعاب HTML',
                            rows: GAMES.map(g => ({
                                header: g.emoji,
                                title: g.title,
                                description: `🎮 ${g.cmd.replace('.', '')}`,
                                id: g.cmd
                            }))
                        },
                        {
                            title: '🛠️ أدوات',
                            rows: TOOLS.map(t => ({
                                header: t.emoji,
                                title: t.title,
                                description: `🛠️ ${t.desc}`,
                                id: t.cmd
                            }))
                        }
                    ]
                }
            },
            {
                name: 'cta_url',
                params: {
                    display_text: `📢 قناة البوت`,
                    url: CHANNEL_LINK
                }
            }
        ];

        await safeSend(conn, m, { bodyText });

        try {
            return await conn.sendButtonNormal(m.chat, {
                media: { url: randomImage },
                mediaType: 'image',
                caption: humanJitter(bodyText),
                buttons: buttons,
                mentions: [m.sender],
                newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID }
            }, m);
        } catch (e) {
            try {
                return await conn.sendButton(m.chat, {
                    imageUrl: randomImage,
                    bodyText: humanJitter(bodyText),
                    footerText: `${EMOJI} ${BOT_NAME}`,
                    buttons: buttons,
                    mentions: [m.sender],
                    newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID },
                    interactiveConfig: { buttons_limits: 20 }
                }, m);
            } catch (e2) {
                return m.reply(humanJitter(bodyText));
            }
        }
    }

    /* ═══════════════════════════════════════
       📂 أمر .اوامر — القائمة الرئيسية
       ═══════════════════════════════════════ */
    const xp = global.db?.users?.[m.sender]?.xp || 0;
    const lvl = isOwner ? 999 : (Math.floor(Math.sqrt(xp / 100)) + 1);
    const totalUsers = Object.keys(global.db?.users || {}).length;

    const bodyText = `${EMOJI} *${BOT_NAME}*
👤 ${m.pushName || 'مجهول'} | 🆙 Lv ${lvl} | 🌍 ${totalUsers}
━━━━━
${v}
━━━━━
🆕 *تمت إضافة الألعاب + التفعيل!* 🎮⚙️
━━━━━
📂 *اختر قسم من الزر* 👇
━━━━━
🧬 *البوت يحاكي السلوك البشري*
🔔 *إضافات أخرى قادمة قريباً...*`;

    const buttons = [
        {
            name: 'single_select',
            params: {
                title: '📂 اختر القسم',
                sections: [
                    {
                        title: '🍁 أقسام البوت',
                        rows: CATEGORIES.map(cat => ({
                            header: cat.emoji,
                            title: cat.isNew ? `${cat.name} 🆕` : cat.name,
                            description: cat.isNew ? '✨ قسم جديد!' : '🍁 ISAGI BOT',
                            id: `.قسم_${cat.id}`
                        }))
                    }
                ]
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `🎮 الألعاب والأدوات 🆕`,
                id: `.ألعاب`
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `⚙️ التفعيل والتعطيل`,
                id: `.تفعيل`
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `📝 أوامر نصية`,
                id: `.أوامر`
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `⭐ تقييم`,
                id: `.تقيم`
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `👨‍💻 المطور`,
                id: `.المطور`
            }
        },
        {
            name: 'cta_url',
            params: {
                display_text: `📢 قناة البوت`,
                url: CHANNEL_LINK
            }
        }
    ];

    await safeSend(conn, m, { bodyText });

    try {
        await conn.sendButtonNormal(m.chat, {
            media: { url: randomImage },
            mediaType: 'image',
            caption: humanJitter(bodyText),
            buttons: buttons,
            mentions: [m.sender],
            newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID }
        }, m);
    } catch (e) {
        try {
            await conn.sendButton(m.chat, {
                imageUrl: randomImage,
                bodyText: humanJitter(bodyText),
                footerText: `${EMOJI} ${BOT_NAME}`,
                buttons: buttons,
                mentions: [m.sender],
                newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            await m.reply(humanJitter(bodyText));
        }
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = [
    'اوامر', 'أوامر', 'القائمة', 'menu',
    'ألعاب', 'العاب', 'games',
    'تفعيل', 'settings'
];
handler.sectionCommand = ['اقسام_القائمة'];
handler.category = 'info';
handler.usePrefix = true;

export default handler;