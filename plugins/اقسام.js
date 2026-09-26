/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — قائمة الأزرار
   📁 /home/container/plugins/قائمة_ازرار.js
   ✅ single_select | بدون مساحات فارغة | صورة في المعاينة
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

/* 📂 الأقسام */
const CATEGORIES = {
    'game': { 
        name: '🎮 الألعاب', 
        emoji: '🎮',
        commands: [
            { cmd: 'اكس', desc: '🎯 لعبة XO' },
            { cmd: 'احزر', desc: '🤔 احزر الشخصية' },
            { cmd: 'عين', desc: '👀 عيون الأنمي' },
            { cmd: 'سؤال', desc: '❓ اختبار الأنمي' },
            { cmd: 'رياضة', desc: '⚽ أسئلة كرة قدم' },
            { cmd: 'دين', desc: '🕌 أسئلة دينية' },
            { cmd: 'خمن', desc: '🎭 خمن الشخصية' },
            { cmd: 'شنق', desc: '✏️ املأ الفراغ' },
            { cmd: 'ايموجي', desc: '😊 تخمين الإيموجي' },
            { cmd: 'انمي', desc: '🎌 خمن الشخصية' },
            { cmd: 'عاصمة', desc: '🏛️ لعبة العواصم' },
            { cmd: 'تحدي_حجر_ورقة', desc: '✊ حجر ورقة' },
            { cmd: 'تفكيك', desc: '🧩 تفكيك الكلمات' },
            { cmd: 'ترتيب', desc: '🔤 ترتيب الحروف' },
            { cmd: 'نرد', desc: '🎲 رمي النرد' },
            { cmd: 'حظ', desc: '🍀 اختبار الحظ' }
        ] 
    },
    'bank': { 
        name: '💰 البنك', 
        emoji: '💰',
        commands: [
            { cmd: 'رصيد', desc: '💎 عرض الرصيد' },
            { cmd: 'بنك', desc: '🏦 معلومات البنك' },
            { cmd: 'مستوى', desc: '📈 المستوى' },
            { cmd: 'يومية', desc: '🎁 مكافأة يومية' },
            { cmd: 'إيداع', desc: '📥 إيداع' },
            { cmd: 'سحب', desc: '📤 سحب' },
            { cmd: 'تحويل', desc: '🔄 تحويل نقاط' },
            { cmd: 'هدية', desc: '🎀 إرسال هدية' },
            { cmd: 'سرقة', desc: '🥷 سرقة عملات' },
            { cmd: 'نهب', desc: '⚔️ نهب XP' },
            { cmd: 'متصدرين', desc: '🏆 المتصدرين' },
            { cmd: 'عمل', desc: '💼 عمل يومي' },
            { cmd: 'توب', desc: '🏅 قائمة الأغنياء' }
        ] 
    },
    'anime': { 
        name: '🎌 الأنمي', 
        emoji: '🎌',
        commands: [
            { cmd: 'شخصية_انمي', desc: '👤 معلومات شخصية' },
            { cmd: 'اقتباس_انمي', desc: '💬 اقتباسات' },
            { cmd: 'افضل_انمي', desc: '⭐ أفضل الأنميات' },
            { cmd: 'رشحلي_انمي', desc: '📺 ترشيح أنمي' },
            { cmd: 'انمي_صور', desc: '🖼️ صور أنمي' }
        ] 
    },
    'admins': { 
        name: '🛡️ الإدارة', 
        emoji: '🛡️',
        commands: [
            { cmd: 'تفعيل', desc: '✅ تفعيل' },
            { cmd: 'قفل', desc: '🔒 قفل الأوامر' },
            { cmd: 'فتح', desc: '🔓 فتح الأوامر' },
            { cmd: 'طرد', desc: '🚫 طرد عضو' },
            { cmd: 'حظر', desc: '⛔ حظر عضو' },
            { cmd: 'فك-حظر', desc: '✅ فك الحظر' },
            { cmd: 'كشف_البوتات', desc: '🤖 كشف البوتات' },
            { cmd: 'منشن', desc: '📢 منشن الجميع' },
            { cmd: 'ترقية', desc: '⬆️ ترقية مشرف' },
            { cmd: 'تنزيل', desc: '⬇️ تنزيل مشرف' }
        ] 
    },
    'download': { 
        name: '⬇️ التحميلات', 
        emoji: '⬇️',
        commands: [
            { cmd: 'تحميل', desc: '📥 تحميل عام' },
            { cmd: 'يوتيوب', desc: '▶️ يوتيوب' },
            { cmd: 'تيك', desc: '🎵 تيك توك' },
            { cmd: 'فيس', desc: '📘 فيسبوك' },
            { cmd: 'انستغرام', desc: '📸 انستغرام' },
            { cmd: 'صور', desc: '🖼️ بحث صور' },
            { cmd: 'شغل', desc: '🎶 تشغيل أغنية' },
            { cmd: 'تحميل_اغنية', desc: '🎵 تحميل أغنية' }
        ] 
    },
    'ai': { 
        name: '🧠 الذكاء', 
        emoji: '🧠',
        commands: [
            { cmd: 'ذكاء', desc: '🤖 محادثة ذكية' },
            { cmd: 'جيميناي', desc: '✨ Gemini' },
            { cmd: 'ديبسيك', desc: '🧠 DeepSeek' },
            { cmd: 'توليد_صورة', desc: '🎨 توليد صورة' },
            { cmd: 'اسأل', desc: '❓ اسأل الذكاء' },
            { cmd: 'ai', desc: '🤖 AI مساعد' }
        ] 
    },
    'fun': { 
        name: '🎭 ترفيه', 
        emoji: '🎭',
        commands: [
            { cmd: 'نكتة', desc: '😂 نكت' },
            { cmd: 'مغازلة', desc: '💕 مغازلة' },
            { cmd: 'تاج', desc: '🏷️ منشن عشوائي' },
            { cmd: 'غباء', desc: '🧠 اختبار الغباء' },
            { cmd: 'ذكاء', desc: '⚡ اختبار الذكاء' },
            { cmd: 'تهكير', desc: '💻 تهكير وهمي' },
            { cmd: 'صراحة', desc: '🗣️ أسئلة صراحة' },
            { cmd: 'لو', desc: '🤔 لو خيروك' },
            { cmd: 'مدح', desc: '🌟 مدح' },
            { cmd: 'قمع', desc: '🔇 قمع' },
            { cmd: 'اقتباس', desc: '📜 اقتباس' },
            { cmd: 'نصيحة', desc: '💡 نصيحة' }
        ] 
    },
    'owner': { 
        name: '👑 المطور', 
        emoji: '👑',
        commands: [
            { cmd: 'رستارت', desc: '🔄 إعادة تشغيل' },
            { cmd: 'تنظيف', desc: '🧹 تنظيف' },
            { cmd: 'حظر_من_البوت', desc: '⛔ حظر' },
            { cmd: 'فك_حظر_من_البوت', desc: '✅ فك حظر' },
            { cmd: 'ضيف_مطور', desc: '➕ إضافة مطور' },
            { cmd: 'نزع_مطور', desc: '➖ إزالة مطور' },
            { cmd: 'نقاط+', desc: '⬆️ إضافة نقاط' },
            { cmd: 'نقاط-', desc: '⬇️ خصم نقاط' },
            { cmd: 'عملات+', desc: '⬆️ إضافة عملات' },
            { cmd: 'عملات-', desc: '⬇️ خصم عملات' },
            { cmd: 'ماس+', desc: '💎 إضافة ماس' },
            { cmd: 'ماس-', desc: '💎 خصم ماس' }
        ] 
    },
    'tools': { 
        name: '🛠️ الأدوات', 
        emoji: '🛠️',
        commands: [
            { cmd: 'ترجمة', desc: '🌐 ترجمة' },
            { cmd: 'حاسبة', desc: '🧮 آلة حاسبة' },
            { cmd: 'كيو_ار', desc: '📱 QR Code' },
            { cmd: 'نسخ', desc: '📋 نسخ النص' },
            { cmd: 'تعديل', desc: '🎨 تعديل الصور' },
            { cmd: 'جودة', desc: '✨ تحسين جودة' },
            { cmd: 'لينك', desc: '🔗 رابط المجموعة' },
            { cmd: 'tomp3', desc: '🎵 فيديو إلى MP3' },
            { cmd: 'قص', desc: '✂️ قص فيديو' }
        ] 
    },
    'info': { 
        name: '📋 معلومات', 
        emoji: '📋',
        commands: [
            { cmd: 'معلومات', desc: '📊 معلومات البوت' },
            { cmd: 'حالة', desc: '📡 حالة البوت' },
            { cmd: 'وقت', desc: '🕐 التوقيت' },
            { cmd: 'المتصلين', desc: '📱 المتصلين' },
            { cmd: 'تاريخ', desc: '📅 التاريخ' }
        ] 
    },
    'sticker': { 
        name: '🌄 الملصقات', 
        emoji: '🌄',
        commands: [
            { cmd: 'ستيكر', desc: '🎨 تحويل إلى ملصق' },
            { cmd: 'نص_ستيكر', desc: '📝 ملصق نصي' },
            { cmd: 'ستيكر_متحرك', desc: '🎬 ملصق متحرك' },
            { cmd: 'كولاج', desc: '🖼️ كولاج صور' }
        ] 
    }
};

/* 📂 عرض القسم — single_select للأوامر */
async function showCategory(m, { conn, bot, catKey }) {
    const cat = CATEGORIES[catKey];
    if (!cat) {
        await m.reply(`🍁 *قسم غير موجود*`);
        return;
    }

    const v = verse();
    const commands = cat.commands;

    /* ✅ تصميم مضغوط */
    const caption = `${cat.emoji} *${cat.name}*
📌 *عدد الأوامر:* ${commands.length}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
📂 *اختر أمر من الزر* 👇`;

    /* ✅ single_select للأوامر */
    const buttons = [
        {
            name: 'single_select',
            params: {
                title: `📂 أوامر ${cat.name}`,
                sections: [
                    {
                        title: `${cat.emoji} ${cat.name}`,
                        rows: commands.map(cmd => ({
                            header: cat.emoji,
                            title: cmd.desc,
                            description: `🍁 ${cmd.cmd}`,
                            id: `.${cmd.cmd}`
                        }))
                    }
                ]
            }
        },
        {
            name: 'quick_reply',
            params: {
                display_text: `🔙 رجوع`,
                id: `.اقسام`
            }
        },
        {
            name: 'cta_url',
            params: {
                display_text: `📢 القناة`,
                url: BRAND.channelLink
            }
        }
    ];

    try {
        await conn.sendButtonNormal(m.chat, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: caption,
            buttons: buttons,
            mentions: [m.sender],
            newsletter: {
                name: BRAND.channelName,
                jid: BRAND.channelId
            }
        }, m);
    } catch (e) {
        try {
            await conn.sendButton(m.chat, {
                imageUrl: getRandomImage(),
                bodyText: caption,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: buttons,
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            await m.reply(caption);
        }
    }
}

/* 🏠 عرض القائمة الرئيسية — single_select للأقسام */
async function showMainMenu(m, { conn, bot }) {
    const v = verse();
    const user = global.db?.data?.users?.[m.sender];
    const level = user?.level || 0;
    const monedas = user?.monedas || 0;
    const diamond = user?.diamond || 0;

    /* ✅ تصميم مضغوط */
    const caption = `🍁 *${BRAND.shortName}*
👤 ${m.pushName || 'مجهول'}
📈 Lv ${level} | 🪙 ${monedas.toLocaleString('ar-EG')} | 💎 ${diamond}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
📂 *اختر قسم من الزر* 👇`;

    /* ✅ single_select للأقسام */
    const buttons = [
        {
            name: 'single_select',
            params: {
                title: '📂 اختر القسم',
                sections: [
                    {
                        title: '🍁 أقسام البوت',
                        rows: Object.keys(CATEGORIES).map(key => ({
                            header: CATEGORIES[key].emoji,
                            title: CATEGORIES[key].name,
                            description: `🍁 ISAGI BOT`,
                            id: `.قسم_${key}`
                        }))
                    }
                ]
            }
        },
        {
            name: 'cta_url',
            params: {
                display_text: `📢 قناة البوت`,
                url: BRAND.channelLink
            }
        }
    ];

    try {
        await conn.sendButtonNormal(m.chat, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: caption,
            buttons: buttons,
            mentions: [m.sender],
            newsletter: {
                name: BRAND.channelName,
                jid: BRAND.channelId
            }
        }, m);
    } catch (e) {
        try {
            await conn.sendButton(m.chat, {
                imageUrl: getRandomImage(),
                bodyText: caption,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: buttons,
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            await m.reply(caption);
        }
    }
}

/* 🎯 المعالج الرئيسي */
const handler = async (m, { conn, bot, command, args }) => {
    if (command.startsWith('قسم_')) {
        const key = command.replace('قسم_', '');
        if (CATEGORIES[key]) {
            await showCategory(m, { conn, bot, catKey: key });
            return;
        }
        await m.reply(`🍁 *قسم غير موجود*`);
        return;
    }

    await showMainMenu(m, { conn, bot });
};

handler.before = async (m, { conn, bot }) => {
    const body = m.body || '';

    if (body.startsWith('.قسم_')) {
        const key = body.replace('.قسم_', '');
        if (CATEGORIES[key]) {
            await showCategory(m, { conn, bot, catKey: key });
            return true;
        }
        await m.reply(`🍁 *قسم غير موجود*`);
        return true;
    }

    if (body === '.اقسام' || body === '.قائمة_ازرار' || body === '.sections') {
        await showMainMenu(m, { conn, bot });
        return true;
    }

    return false;
};

handler.command = ['قائمة_ازرار', 'اقسام', 'sections'];
export default handler;