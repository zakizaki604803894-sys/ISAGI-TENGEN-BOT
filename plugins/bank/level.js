/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — نظام الترقيات
   📁 /home/container/system/levelup.js
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

/* ═══════════════════════════════════════════
   🎯 المستويات — ISAGI TENGEN
   ═══════════════════════════════════════════ */
const LEVELS = [
    { min: 0,     max: 99,      name: '🍁 مبتدئ' },
    { min: 100,   max: 249,     name: '🍁 متدرب' },
    { min: 250,   max: 499,     name: '🍁 مجتهد' },
    { min: 500,   max: 799,     name: '🍁 نشيط' },
    { min: 800,   max: 1199,    name: '🍁 متميز' },
    { min: 1200,  max: 1699,    name: '🍁 محترف' },
    { min: 1700,  max: 2299,    name: '🍁 خبير' },
    { min: 2300,  max: 2999,    name: '🍁 ماهر' },
    { min: 3000,  max: 3799,    name: '🍁 بارع' },
    { min: 3800,  max: 4699,    name: '🍁 نجم' },
    { min: 4700,  max: 5699,    name: '🍁 أسطورة' },
    { min: 5700,  max: 6799,    name: '🍁 سيد' },
    { min: 6800,  max: 7999,    name: '🍁 قائد' },
    { min: 8000,  max: 9299,    name: '🍁 إمبراطور' },
    { min: 9300,  max: 10699,   name: '👑 تاج' },
    { min: 10700, max: 12199,   name: '👑 ملكي' },
    { min: 12200, max: 13799,   name: '👑 سلطان' },
    { min: 13800, max: 15499,   name: '👑 خليفة' },
    { min: 15500, max: 17499,   name: '👑 إمبراطور الظل' },
    { min: 17500, max: 19999,   name: '👑 حارس البوابة' },
    { min: 20000, max: Infinity, name: '🌀 الرقمي الأوحد' }
];

/* ═══════════════════════════════════════════
   🎯 المعالج
   ═══════════════════════════════════════════ */
export default async function before(m, { conn }) {
    if (!global.db?.users?.[m.sender]) return false;
    
    const user = global.db.users[m.sender];
    let xp = user.xp || 0;
    let level = user.level || 0;
    let nameLevel = user.nameLevel || '🍁 مبتدئ';
    
    let newLevel = level;
    let newNameLevel = nameLevel;
    let levelUp = false;
    let oldLevel = level;
    
    for (const lvl of LEVELS) {
        if (xp >= lvl.min && xp <= lvl.max) {
            const currentLevelNum = LEVELS.findIndex(l => l.min === lvl.min);
            if (currentLevelNum !== level) {
                newLevel = currentLevelNum;
                newNameLevel = lvl.name;
                levelUp = true;
                oldLevel = level;
            }
            break;
        }
    }
    
    if (levelUp) {
        user.level = newLevel;
        user.nameLevel = newNameLevel;
        
        const v = verse();
        
        /* ✅ تصميم هاتف */
        const msg = `${BRAND.emoji} *ترقية*

━━━━━

👤 @${m.sender.split('@')[0]}
📊 *المستوى السابق:* ${oldLevel}
📈 *المستوى الجديد:* ${newLevel}

━━━━━

🏷️ *لقبك الجديد:*
✦ ${newNameLevel} ✦

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

🎉 *العرض لسه مخلصش يا بطل*

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;
        
        try {
            await conn.sendMessage(m.chat, {
                image: { url: getRandomImage() },
                caption: msg,
                mentions: [m.sender],
                contextInfo: {
                    mentionedJid: [m.sender],
                    isForwarded: true,
                    forwardingScore: 1,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: BRAND.channelId,
                        newsletterName: BRAND.channelName,
                        serverMessageId: 0
                    },
                    externalAdReply: {
                        title: `${BRAND.emoji} ${BRAND.shortName}`,
                        body: `${BRAND.emoji} ترقية في البوت`,
                        thumbnailUrl: getRandomImage(),
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } catch (e) {
            console.error(`${BRAND.emoji} فشل إرسال الترقية:`, e.message);
            await conn.sendMessage(m.chat, {
                text: msg,
                mentions: [m.sender]
            }, { quoted: m });
        }
    }
    
    return false;
}