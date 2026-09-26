/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — تشغيل/إيقاف التنصيب
   📁 /home/container/plugins/owner/تشغيل_التنصيب.js
   ✅ تصميم هاتف | بدون رابط في النص | آيات قرآنية
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

/* 🍁 إرسال رسالة موحّدة */
const sendReply = async (conn, m, text) => {
    try {
        return await conn.sendButtonNormal(m.chat, {
            media: { url: getRandomImage() },
            mediaType: 'image',
            caption: text,
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
            return await conn.sendButton(m.chat, {
                imageUrl: getRandomImage(),
                bodyText: text,
                footerText: `${BRAND.emoji} ${BRAND.botName}`,
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
            return m.reply(text);
        }
    }
};

/* ✅ دالة جلب اسم المجموعة */
async function getGroupName(conn, jid) {
    try {
        const meta = await conn.groupMetadata(jid);
        return meta.subject || jid;
    } catch (e) {
        return jid;
    }
}

/* ═══════════════════════════════════════════
   🎯 الدالة الرئيسية
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, bot, text, args }) => {
    const v = verse();
    
    /* ✅ التحقق من المطور */
    const isOwner = bot.config.owners.some(o =>
        m.sender === o.jid || m.sender === o.lid
    );
    
    if (!isOwner) {
        return sendReply(conn, m, `${BRAND.emoji} *الأمر للمطورين فقط*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`);
    }

    const targetGroup = m.chat;

    /* ✅ التحقق من المجموعة */
    if (!targetGroup.includes('@g.us')) {
        return sendReply(conn, m, `${BRAND.emoji} *⚠️ هذا الأمر يعمل في المجموعات فقط*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
    }

    const action = args[0]?.toLowerCase().trim();

    /* ✅ تهيئة التخزين */
    if (!global._subSettings) global._subSettings = {};
    if (!global._subSettings[targetGroup]) {
        global._subSettings[targetGroup] = {
            noSub: false,
            disabledCommands: [],
            disabledCategories: []
        };
    }

    const settings = global._subSettings[targetGroup];
    const groupName = await getGroupName(conn, targetGroup);

    /* ═══════════════════════════════════
       ✅ تشغيل التنصيب
       ═══════════════════════════════════ */
    if (action === 'on' || action === 'تشغيل') {
        settings.noSub = false;
        
        const text = `${BRAND.emoji} *✅ تم تشغيل التنصيب*

━━━━━

📌 *المجموعة:* ${groupName}
📌 *الحالة:* ✅ مفعل

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        return sendReply(conn, m, text);
        
    }
    /* ═══════════════════════════════════
       ⏸️ إيقاف التنصيب
       ═══════════════════════════════════ */
    else if (action === 'off' || action === 'ايقاف') {
        settings.noSub = true;
        
        const text = `${BRAND.emoji} *⏸️ تم إيقاف التنصيب*

━━━━━

📌 *المجموعة:* ${groupName}
📌 *الحالة:* ❌ موقف

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        return sendReply(conn, m, text);
        
    }
    /* ═══════════════════════════════════
       📊 عرض الحالة
       ═══════════════════════════════════ */
    else {
        const status = settings.noSub ? '❌ موقف' : '✅ مفعل';
        const prefix = bot.config.prefix?.[0] || '.';
        
        const text = `${BRAND.emoji} *نظام التنصيب*

━━━━━

📌 *المجموعة:* ${groupName}
📌 *الحالة:* ${status}

━━━━━

📝 *الأوامر:*

▸ ${prefix}تشغيل_التنصيب on
▸ ${prefix}تشغيل_التنصيب off

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        return sendReply(conn, m, text);
    }
};

/* ═══════════════════════════════════════════
   🎯 before hook
   ═══════════════════════════════════════════ */
handler.before = async (m, { conn, bot }) => {
    const body = m.body || '';
    
    /* ✅ التحقق من أوامر التنصيب */
    if (!body.startsWith('.تنصيب') && 
        !body.startsWith('.install') && 
        !body.startsWith('.setup')) {
        return false;
    }

    /* ✅ المطورون يستثنون */
    const isOwner = bot.config.owners.some(o =>
        m.sender === o.jid || m.sender === o.lid
    );
    if (isOwner) return false;

    const chatId = m.chat;
    
    /* ✅ التحقق من الإعدادات */
    if (!global._subSettings) global._subSettings = {};
    const settings = global._subSettings[chatId];
    
    /* ✅ إذا كان التنصيب موقفاً */
    if (settings?.noSub) {
        const v = verse();
        
        const text = `${BRAND.emoji} *🚫 التنصيب موقف في هذه المجموعة*

━━━━━

📌 للتواصل مع المطور: .المطور

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        await sendReply(conn, m, text);
        return true;
    }

    return false;
};

handler.command = ['تشغيل_التنصيب', 'تفعيل_التنصيب', 'تنصيب_جروب'];
handler.category = 'owner';

export default handler;