/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — قائمة الأوامر
   📁 /home/container/plugins/menu.js
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

const MENU_TIMEOUT = 120000;

/* 📂 الأقسام — موحّدة */
const CATEGORIES = [
    [1,  'الـتـحـمـيـل',              'download',  '📂'],
    [2,  'الـمـجـمـوعـات',            'group',     '🍁'],
    [3,  'الـمـلـصـقـات',              'sticker',   '🌄'],
    [4,  'الـمـطـوريـن',              'owner',     '👑'],
    [5,  'الادوات',                    'tools',     '🚀'],
    [6,  'الادمــن',                   'admins',    '👨🏻‍⚖️'],
    [7,  'الالــعـاب',                 'game',      '🎮'],
    [8,  'الـبــنـك',                  'bank',      '💰'],
    [9,  'الـذكـاء الاصـطـنـاعـي',     'ai',        '🤖'],
    [10, 'الانــمــي',                 'anime',     '🎌'],
    [11, 'الـتـرفـيـه',                'fun',       '🎭'],
    [12, 'مـعـلومـات الـبـوت',        'info',      '🗃️']
];

const getCat = n => CATEGORIES.find(c => c[0] === n);

if (!global.menus) global.menus = {};

const clean = () => {
    const now = Date.now();
    Object.keys(global.menus).forEach(k => {
        if (now - global.menus[k].time > MENU_TIMEOUT) delete global.menus[k];
    });
};

const getImg = (bot) => {
    const { images } = bot.config.info;
    return Array.isArray(images) ? images[Math.floor(Math.random() * images.length)] : images;
};

/* 🎯 المعالج الرئيسي */
const menu = async (m, { conn, bot }) => {
    clean();
    const v = verse();
    
    const cmds = await bot.getAllCommands();
    const cats = {};
    
    cmds.forEach(c => {
        if (!c.usage?.length) return;
        const cat = c.category || 'other';
        if (!cats[cat]) cats[cat] = [];
        cats[cat].push(c);
    });

    /* ✅ بناء الأزرار */
    const buttons = CATEGORIES.map(cat => ({
        name: 'quick_reply',
        params: {
            display_text: `${cat[3]} ${cat[1]}`,
            id: `${cat[0]}`
        }
    }));

    buttons.push({
        name: 'cta_url',
        params: {
            display_text: `📢 قناة البوت`,
            url: BRAND.channelLink
        }
    });

    const bodyText = `🍁 *${BRAND.shortName}*

━━━━━

👑 مرحباً ${m.pushName || 'مستخدم'}

━━━━━

📌 *اختر القسم من الأزرار* 👇

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي`;

    try {
        const msg = await conn.sendButtonNormal(m.chat, {
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
        
        if (msg?.key?.id) {
            global.menus[msg.key.id] = { cats, chatId: m.chat, time: Date.now() };
        }
    } catch (e) {
        try {
            const msg = await conn.sendButton(m.chat, {
                imageUrl: getRandomImage(),
                bodyText: bodyText,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: buttons,
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
            
            if (msg?.key?.id) {
                global.menus[msg.key.id] = { cats, chatId: m.chat, time: Date.now() };
            }
        } catch (e2) {
            await m.reply(bodyText);
        }
    }
};

/* 🎯 معالج اختيار القسم */
menu.before = async (m, { conn, bot }) => {
    clean();
    
    const menuData = global.menus[m.quoted?.id];
    if (!menuData) return false;
    
    const cat = getCat(parseInt(m.text));
    if (!cat) {
        await conn.sendMessage(m.chat, { text: `🍁 *اختر رقم من القائمة فقط*` }, { quoted: m });
        return true;
    }
    
    const cmds = menuData.cats[cat[2]];
    if (!cmds?.length) {
        await conn.sendMessage(m.chat, { text: `🍁 *القسم فاضي*` }, { quoted: m });
        return true;
    }
    
    await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.quoted.id, fromMe: true } });
    delete global.menus[m.quoted.id];
    
    const v = verse();
    
    /* ✅ بناء أزرار الأوامر */
    const cmdButtons = [];
    cmds.forEach(c => {
        c.usage.forEach(u => {
            if (u && u !== 'undefined') {
                cmdButtons.push({
                    name: 'quick_reply',
                    params: {
                        display_text: `${cat[3]} ${u}`,
                        id: `.${u}`
                    }
                });
            }
        });
    });
    
    cmdButtons.push({
        name: 'quick_reply',
        params: {
            display_text: `🔙 رجوع`,
            id: `.الاوامر`
        }
    });
    
    const bodyText = `${cat[3]} *قـسـم ${cat[1]}*

━━━━━

📌 *عدد الأوامر:* ${cmdButtons.length - 1}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي`;

    try {
        await conn.sendButtonNormal(m.chat, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: bodyText,
            buttons: cmdButtons.slice(0, 20),
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
                bodyText: bodyText,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: cmdButtons.slice(0, 20),
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            const cmdsList = cmds.map(c => `/${c.usage.join(`\n/`)}`).join('\n');
            await conn.sendMessage(m.chat, { 
                text: `${bodyText}\n\n${cmdsList}`
            }, { quoted: m });
        }
    }
    
    return true;
};

menu.command = ['الاوامر', 'القائمة', 'menu', 'امر', 'قائمة'];
export default menu;