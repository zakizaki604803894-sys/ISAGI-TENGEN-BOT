/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — معلومات المطور
   📁 /home/container/plugins/owner.js
   ✅ تصميم هاتف | بدون رابط في النص | 9 مطورين
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

/* 👑 قائمة المطورين (9) */
const OWNERS_PHONES = [
    { phone: '212708613251', name: 'kira 🍁' },
    { phone: '212705081267', name: 'TENGEN 🍁' },
    { phone: '212710825724', name: 'ZAKI 🍁' },
    { phone: '212634266182', name: 'ISAGI 🍁' },
    { phone: '212638583402', name: 'شينوبو 🦋' },
    { phone: '212687411464', name: 'شينوبو 🦋' },
    { phone: '212605726220', name: 'ايساغي تنغن 🍁' },
    { phone: '212602159396', name: 'ايساغي تنغن 🍁' },
    { phone: '212704509751', name: 'مطور جديد 🍁' }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
let handler = async (m, { conn, bot }) => {
    const v = verse();
    
    // ✅ بناء جهة الاتصال
    let quoted = {
        key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
        message: { conversation: BRAND.botName }
    };
    
    // ✅ استخدام أول رقم مطور
    const num = OWNERS_PHONES[0].phone;
    let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${BRAND.developer}
TEL;type=CELL;waid=${num}:+${num}
END:VCARD`;

    // ✅ صورة عشوائية
    let img = getRandomImage();

    // ✅ بناء النص
    let ownerList = `🍁━━━━━[ *${BRAND.shortName}* ]━━━━━🍁

👑 *المطور الأساسي:*
${BRAND.developer}

━━━━━

📱 *قائمة المطورين (${OWNERS_PHONES.length}):*

`;

    OWNERS_PHONES.forEach((owner, index) => {
        ownerList += `${index + 1}. ${owner.name}\n   📱 +${owner.phone}\n\n`;
    });

    ownerList += `━━━━━

📌 *الحالة:* 🟢 متصل
💜 تحت إمرتك دائماً يا سيدي

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
        },
        {
            name: 'cta_url',
            params: {
                display_text: `💬 تواصل مع المطور`,
                url: `https://wa.me/${OWNERS_PHONES[3].phone}`
            }
        }
    ];

    try {
        // ✅ إرسال جهة الاتصال مع الصورة والأزرار
        await conn.sendMessage(m.chat, {
            contacts: { 
                displayName: BRAND.developer, 
                contacts: [{ vcard }] 
            },
            contextInfo: {
                forwardingScore: 2023,
                externalAdReply: {
                    title: `🍁 ${BRAND.botName}`,
                    body: `👑 ${BRAND.developer}`,
                    thumbnailUrl: img,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: true
                },
                mentionedJid: [m.sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: BRAND.channelId,
                    newsletterName: BRAND.channelName,
                    serverMessageId: 0
                }
            }
        }, { quoted });
        
        // ✅ إرسال الرسالة مع الأزرار
        try {
            await conn.sendButtonNormal(m.chat, {
                media: { url: img },
                mediaType: 'image',
                caption: ownerList,
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
                    imageUrl: img,
                    bodyText: ownerList,
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
                await m.reply(ownerList);
            }
        }

    } catch (e) {
        console.log('🍁 فشل إرسال معلومات المطور:', e.message);
        await m.reply(ownerList);
    }
};

handler.command = /^(owner|مطور|المطور|المطورين)$/i;

export default handler;