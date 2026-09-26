/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — أوامر البوت والمطور
   📁 /home/container/plugins/بوت_ومطور.js
   ✅ أزرار فقط | خلط عشوائي | 9 مطورين | بدون مسافات
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

/* ⚡ خلط عشوائي */
const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/* 👑 قائمة المطورين الكاملة (9) */
const OWNERS_DATA = [
    { phone: '212708613251', name: 'kira 🍁' },
    { phone: '212705081267', name: 'TENGEN 🍁' },
    { phone: '212710825724', name: 'ZAKI 🍁' },
    { phone: '212634266182', name: 'ISAGI 🍁' },
    { phone: '212638583402', name: 'ZAKI 🍁' },
    { phone: '212687411464', name: 'نوبوناغا 🍁' },
    { phone: '212605726220', name: 'ايساغي تنغن 🍁' },
    { phone: '212602159396', name: 'ايساغي تنغن 🍁' },
    { phone: '212704509751', name: 'مطور جديد 🍁' }
];

/* ═══════════════════════════════════════════
   🍁 معلومات المطور — بدون مسافات فارغة
   ═══════════════════════════════════════════ */
const getOwnerInfo = () => {
    const v = verse();
    
    return `${BRAND.emoji} *معلومات المطورين*
👑 *الأساسي:* ${BRAND.developer}
📱 *العدد:* ${OWNERS_DATA.length}
━━━━━
📌 *اختر مطور للتواصل* 👇
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;
};

/* 🍁 رسائل البوت للمطور — بدون مسافات */
const makeOwnerBotMsgs = (ownerName) => {
    const v = verse();
    return [
        `${BRAND.emoji} *تم استشعار المطور*
👤 ${ownerName}
🔥 النظام تحت أمرك 👑
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`,
        `${BRAND.emoji} *${ownerName} هنا* 👑
✅ البوت: شغال
🛡️ الحماية: مفعلة
⚡ السرعة: فائقة
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`,
        `${BRAND.emoji} *أهلاً بك ${ownerName}*
🚀 البوت جاهز لأوامرك
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`
    ];
};

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, bot, command }) => {
    const owners = bot?.config?.owners || [];
    const v = verse();

    /* ✅ التحقق من المطور */
    const ownerEntry = owners.find(o =>
        m.sender === o.jid || 
        m.sender === o.lid ||
        m.sender?.split('@')[0] === o.jid?.split('@')[0]
    );
    const isOwner = !!ownerEntry;
    const ownerName = ownerEntry?.name || BRAND.developer;

    /* ═══════════════════════════════
       🍁 أمر "بوت"
       ═══════════════════════════════ */
    if (command === 'بوت' || command === 'bot') {
        if (isOwner) {
            const msgs = makeOwnerBotMsgs(ownerName);
            return conn.sendMessage(m.chat, {
                text: msgs[Math.floor(Math.random() * msgs.length)]
            }, { quoted: m });
        }
        
        /* ✅ تصميم مضغوط */
        const bodyText = `${BRAND.emoji} أنا *${BRAND.shortName}*
👑 *من تطوير:* ${BRAND.developer}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;

        const buttons = [
            { 
                name: 'cta_url', 
                params: { 
                    display_text: `📢 قناة البوت`, 
                    url: BRAND.channelLink 
                } 
            }
        ];

        try {
            return await conn.sendButtonNormal(m.chat, {
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
            try {
                return await conn.sendButton(m.chat, {
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
                return conn.sendMessage(m.chat, {
                    text: bodyText
                }, { quoted: m });
            }
        }
    }

    /* ═══════════════════════════════
       🍁 أمر "المطور"
       ═══════════════════════════════ */
    if (command === 'المطور' || command === 'مطور' || command === 'owner') {
        if (global.devStatus === 'closed') {
            return conn.sendMessage(m.chat, {
                text: `${BRAND.emoji} *المطور مش فاضي دلوقتي* 🛡️
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`
            }, { quoted: m });
        }

        const bodyText = getOwnerInfo();

        /* ✅ خلط عشوائي */
        const shuffledOwners = shuffleArray(OWNERS_DATA);

        /* ✅ 9 أزرار للمطورين */
        const buttons = shuffledOwners.map((o) => ({
            name: 'cta_url',
            params: {
                display_text: `${BRAND.emoji} ${o.name}`,
                url: `https://wa.me/${o.phone}`
            }
        }));

        /* ✅ إضافة زر القناة */
        buttons.push({
            name: 'cta_url',
            params: {
                display_text: `📢 قناة البوت`,
                url: BRAND.channelLink
            }
        });

        try {
            return await conn.sendButtonNormal(m.chat, {
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
            try {
                return await conn.sendButton(m.chat, {
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
                return conn.sendMessage(m.chat, {
                    text: bodyText
                }, { quoted: m });
            }
        }
    }
};

handler.command = ['بوت', 'bot', 'المطور', 'مطور', 'owner'];
handler.usePrefix = false;

export default handler;