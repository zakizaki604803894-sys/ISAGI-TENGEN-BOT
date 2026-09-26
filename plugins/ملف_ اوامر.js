/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — قائمة الأوامر النصية
   📁 /home/container/plugins/info/اوامر_نصية.js
   ✅ تصميم هاتف | Cache | بدون مسافات فارغة
   ═══════════════════════════════════════════════════════════ */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

/* ✅ دالة التحقق من النص العربي */
const isArabic = (text) => {
    if (!text) return false;
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
};

/* ⚡ Cache — 5 دقائق */
let commandsCache = null;
let commandsCacheTime = 0;

/* ✅ جلب الأقسام من مجلد plugins */
function getCategories() {
    /* ⚡ إذا كان الكاش صالح */
    if (commandsCache && Date.now() - commandsCacheTime < 300_000) {
        return commandsCache;
    }

    const pluginsPath = path.join(__dirname);
    const categories = {};
    const exclude = ['group.js', 'id.js', 'menu_builder.js', 'menu2.js', 'اوامر.js', 'قائمة_ازرار.js'];

    try {
        const items = fs.readdirSync(pluginsPath);
        for (const item of items) {
            const itemPath = path.join(pluginsPath, item);
            if (!fs.statSync(itemPath).isDirectory()) continue;
            if (exclude.includes(item)) continue;
            
            const catName = translateCategory(item);
            categories[item] = { name: catName, path: itemPath, commands: [] };
        }
    } catch (e) {
        /* صامت */
    }
    return categories;
}

/* ✅ ترجمة أسماء المجلدات */
function translateCategory(folder) {
    const map = {
        'admins': '🛡️ الإدارة',
        'ai': '🧠 الذكاء الاصطناعي',
        'anime': '🎌 الأنمي',
        'auto': '⚡ تلقائي',
        'bank': '🏦 البنك',
        'download': '⬇️ التحميلات',
        'fun': '🎭 الترفيه',
        'game': '🎮 الألعاب',
        'gif': '✴️ الـ GIF',
        'group': '👥 المجموعات',
        'info': '📋 المعلومات',
        'islamic': '🕌 إسلاميات',
        'owner': '👑 المطور',
        'protection': '🛡️ الحماية',
        'religion': '🕋 الدين',
        'search': '🌐 البحث',
        'settings': '⚙️ الإعدادات',
        'sticker': '🌄 الملصقات',
        'subs': '📦 البوتات الفرعية',
        'tools': '🛠️ الأدوات'
    };
    return map[folder] || `📁 ${folder}`;
}

/* ✅ جلب الأوامر العربية من الملفات */
function getArabicCommands(categories) {
    /* ⚡ إذا كان الكاش صالح */
    if (commandsCache && Date.now() - commandsCacheTime < 300_000) {
        return commandsCache;
    }

    const allCommands = {};

    for (const [folder, data] of Object.entries(categories)) {
        const folderPath = data.path;
        const commandsSet = new Set();

        try {
            const files = fs.readdirSync(folderPath);
            for (const file of files) {
                if (!file.endsWith('.js')) continue;
                const filePath = path.join(folderPath, file);
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    
                    const commandMatch = content.match(/\.command\s*=\s*\[([^\]]*)\]/);
                    if (commandMatch) {
                        const cmds = commandMatch[1].split(',').map(c => 
                            c.trim().replace(/^['"]|['"]$/g, '')
                        );
                        for (const cmd of cmds) {
                            if (cmd && isArabic(cmd) && !['قائمة', 'اوامر', 'menu', 'help', 'أوامر'].includes(cmd)) {
                                commandsSet.add(cmd);
                            }
                        }
                    }
                    
                    const singleMatch = content.match(/\.command\s*=\s*['"]([^'"]+)['"]/);
                    if (singleMatch) {
                        const cmd = singleMatch[1];
                        if (cmd && isArabic(cmd) && !['قائمة', 'اوامر', 'menu', 'help', 'أوامر'].includes(cmd)) {
                            commandsSet.add(cmd);
                        }
                    }
                } catch (e) {
                    /* صامت */
                }
            }
        } catch (e) {
            /* صامت */
        }

        if (commandsSet.size > 0) {
            allCommands[data.name] = [...commandsSet].sort();
        }
    }

    /* ⚡ حفظ في الكاش */
    commandsCache = allCommands;
    commandsCacheTime = Date.now();
    return allCommands;
}

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون مسافات فارغة
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, usedPrefix, command }) => {
    const chatId = m.chat;
    const v = verse();

    const categories = getCategories();
    const allCommands = getArabicCommands(categories);

    let totalCommands = 0;
    
    /* ✅ تصميم مضغوط — بدون مسافات فارغة */
    let menuText = `🍁 *قائمة الأوامر*
👑 مرحباً ${m.pushName || 'مستخدم'}
━━━━━
`;

    for (const [category, cmds] of Object.entries(allCommands)) {
        if (cmds.length === 0) continue;
        totalCommands += cmds.length;
        menuText += `${category}\n`;
        cmds.forEach(cmd => {
            menuText += `▸ ${cmd}\n`;
        });
        menuText += `━━━━━\n`;
    }

    if (totalCommands === 0) {
        menuText += `🍁 *لا توجد أوامر عربية*\n`;
    }

    menuText += `📌 *عدد الأوامر:* ${totalCommands}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;

    try {
        await conn.sendButtonNormal(chatId, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: menuText,
            buttons: [
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
            }
        }, m);
    } catch (e) {
        try {
            await conn.sendButton(chatId, {
                imageUrl: getRandomImage(),
                bodyText: menuText,
                footerText: `🍁 ${BRAND.botName}`,
                buttons: [
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
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e2) {
            await conn.sendMessage(chatId, {
                text: menuText,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, { quoted: m });
        }
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['اوامر_نص', 'تكست', 'اوامر_نصية', 'help', 'أوامر'];
handler.category = 'info';

export default handler;