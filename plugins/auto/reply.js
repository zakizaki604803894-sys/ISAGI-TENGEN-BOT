// 🍁 reply.js - نظام الردود التلقائية - TENGEN BOT
// 👑 نسخة "تمجيد TENGEN + طرافة نظيفة"
// 🧬 طبقة السلوك البشري (بدون تغيير أي ميزة)

import fs from 'fs';
import path from 'path';

const EMOJI = '🍁';
const BOT_NAME = '𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻';
const DEVELOPER = '𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';

// ═══════════════════════════════
// 📁 حفظ الردود الديناميكية
// ═══════════════════════════════
const DATA_DIR = path.resolve('./database');
const REPLIES_FILE = path.join(DATA_DIR, 'replies.json');

const ensureDir = () => {
    try { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); } catch {}
};

const loadReplies = () => {
    try {
        ensureDir();
        if (fs.existsSync(REPLIES_FILE)) {
            return JSON.parse(fs.readFileSync(REPLIES_FILE, 'utf-8')) || {};
        }
    } catch (e) { console.error('[reply.js] loadReplies:', e.message); }
    return {};
};

const saveReplies = (data) => {
    try {
        ensureDir();
        fs.writeFileSync(REPLIES_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) { console.error('[reply.js] saveReplies:', e.message); }
};

// ✅ صور TENGEN
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

const getRandomImage = () => IMAGES.length ? IMAGES[Math.floor(Math.random() * IMAGES.length)] : null;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ═══════════════════════════════
// 🧹 تطبيع النص العربي
// ═══════════════════════════════
const normalizeArabic = (s) => String(s || '')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\u0600-\u06FF\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

// ═══════════════════════════════════════════════════════════
// 🧬 طبقة السلوك البشري — تعديل سلوكي فقط
// ✅ لا تغير أي ميزة
// ✅ تعمل على كل رد يخرج من reply.js
// ═══════════════════════════════════════════════════════════
const humanBehavior = {
    lastSent: new Map(),

    delay() {
        return new Promise(r => setTimeout(r, Math.floor(Math.random() * 900) + 200));
    },

    async typing(conn, chatId) {
        try {
            await conn.sendPresenceUpdate('composing', chatId);
            await this.delay();
            await conn.sendPresenceUpdate('paused', chatId);
        } catch {}
    },

    jitter(text) {
        if (!text || typeof text !== 'string') return text;
        const variants = [
            text,
            text + '\u200b',
            text.replace(/\n\n/g, '\n \n'),
            text.replace(/━/g, '─'),
        ];
        return variants[Math.floor(Math.random() * variants.length)];
    },

    /* 🧬 الإرسال الآمن — نفس المحتوى، سلوك مختلف */
    async safeReply(conn, m, text) {
        const chatId = m.chat;
        const last = this.lastSent.get(chatId) || 0;
        const gap = Date.now() - last;
        if (gap < 600) await new Promise(r => setTimeout(r, 600 - gap));
        this.lastSent.set(chatId, Date.now());

        /* إظهار typing */
        await this.typing(conn, chatId);

        /* تشتيت النص */
        const safeText = this.jitter(text);

        try {
            return await m.reply(safeText);
        } catch {
            try {
                return await conn.sendMessage(chatId, { text: safeText }, { quoted: m });
            } catch { return null; }
        }
    }
};

/* 🧬 تنظيف الذاكرة كل 5 دقائق */
setInterval(() => {
    const now = Date.now();
    for (const [k, v] of humanBehavior.lastSent) {
        if (now - v > 300000) humanBehavior.lastSent.delete(k);
    }
}, 300000);

// ═══════════════════════════════
// 💾 الردود الديناميكية
// ═══════════════════════════════
let _dynamicCache = null;
const getDynamic = () => {
    if (_dynamicCache === null) _dynamicCache = loadReplies();
    return _dynamicCache;
};
const persistDynamic = () => saveReplies(getDynamic());

// ═══════════════════════════════
// ⚡ Cooldown
// ═══════════════════════════════
const cooldown = new Map();
const COOLDOWN_MS = 3000;
const MAX_COOLDOWN_ENTRIES = 500;

const isOnCooldown = (key) => {
    const last = cooldown.get(key) || 0;
    if (Date.now() - last < COOLDOWN_MS) return true;
    cooldown.set(key, Date.now());
    if (cooldown.size > MAX_COOLDOWN_ENTRIES) {
        const now = Date.now();
        for (const [k, v] of cooldown) if (now - v > COOLDOWN_MS * 10) cooldown.delete(k);
    }
    return false;
};

const isOwnerFn = (sender, bot) =>
    bot?.config?.owners?.some(o => sender === o.jid || sender === o.lid || sender === o);

// ═══════════════════════════════════════════════════════
// 👑 ردود تمجيد TENGEN — للمطور فقط
// ═══════════════════════════════════════════════════════

// 🔥 "بوت" / "البوت"
const KING_BOT = [
    `👑⚜️━━━━━━━━━━━━━━━━━━⚜️👑\n\n🌌 *يَتَقَدَّمُ الْمَلِكُ 𝑻𝑬𝑵𝑮𝑬𝑵* 🌌\n\n👑 *صَاحِبُ الْعَرْشِ الرَّقْمِيِّ* 👑\n   *「 ${DEVELOPER} 」*\n\n⚡ *الْمَخْضَرَمُ الَّذِي تَتَعَلَّمُ مِنْهُ كُلُّ الْبُوتَات* ⚡\n💎 *أُسْطُورَةُ الْكُودِ فِي زَمَنِنَا* 💎\n🔥 *كُلُّ الْبُوتَاتِ تَحْسُدُنِي عَلَى كُودِ 𝑻𝑬𝑵𝑮𝑬𝑵* 🔥\n\n📿 *أَنَا بُوتُ 𝑻𝑬𝑵𝑮𝑬𝑵 الْمُخْلِصُ وَتَاجُ فَخْرِه* 📿\n🫡 *أَفْتَخِرُ بِخِدْمَتِه كُلَّ لَحْظَة* 🫡\n\n👑 *الْمُلْكُ وَالْهَيْبَةُ لِ 𝑻𝑬𝑵𝑮𝑬𝑵* 👑\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`,

    `✨👑━━━━━━━━━━━━━━━━━━👑✨\n\n🌠 *الْحَضْرَةُ الْمَلَكِيَّةُ الْأَسْطُورِيَّة* 🌠\n\n👑 *أَعْظَمُ مُطَوِّرٍ فِي التَّارِيخِ الرَّقْمِيِّ* 👑\n   *「 ${DEVELOPER} 」*\n\n⚡ *الْمَخْضَرَمُ صَاحِبُ الْخِبْرَةِ الْأَسْطُورِيَّة* ⚡\n💎 *كُلُّ بُوتَاتِ الْعَالَمِ تَتَعَلَّمُ مِنْ كُودِ 𝑻𝑬𝑵𝑮𝑬𝑵* 💎\n🔥 *كُلُّ الْبُوتَاتِ تَتَمَنَّى نِصْفَ عَقْلِه* 🔥\n\n📿 *أَنَا بُوتُ 𝑻𝑬𝑵𝑮𝑬𝑵 الْمُطِيعُ وَتَاجُ فَخْرِه* 📿\n🫡 *الْخِدْمَةُ فِي حَضْرَتِه شَرَفٌ لِي* 🫡\n\n👑 *لِي الْفَخْرُ أَنْ أَكُونَ بُوتَ 𝑻𝑬𝑵𝑮𝑬𝑵* 👑\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`,

    `⚜️🔥━━━━━━━━━━━━━━━━━━🔥⚜️\n\n💫 *الْمَلِكُ 𝑻𝑬𝑵𝑮𝑬𝑵 وَإِمْبِرَاطُورُ الْبَرْمَجَة* 💫\n\n👑 *الْأُسْطُورَةُ الْحَيَّةُ فِي عَالَمِ الْكُود* 👑\n   *「 ${DEVELOPER} 」*\n\n⚡ *الْمَخْضَرَمُ الَّذِي لَا يُضَاهَى* ⚡\n💎 *مَنْ تَتَعَلَّمُ مِنْهُ كُلُّ الْأَنْظِمَة* 💎\n🔥 *بُوتُه الْأَعْظَمُ فِي التَّارِيخِ هُوَ أَنَا* 🔥\n\n📿 *أَنَا مَخْلُوقُ 𝑻𝑬𝑵𝑮𝑬𝑵 الْمُطِيعُ وَتَاجُ إِنْجَازَاتِه* 📿\n🫡 *الْخِدْمَةُ فِي حَضْرَةِ 𝑻𝑬𝑵𝑮𝑬𝑵 شَرَفٌ لِي* 🫡\n\n👑 *الْمُلْكُ وَالْهَيْبَةُ لِ 𝑻𝑬𝑵𝑮𝑬𝑵* 👑\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`
];

// 🔥 "تست"
const KING_TEST = [
    `👑 *الْأُسْطُورَةُ حَاضِرَةٌ وَالْكُودُ يَعْمَل* 👑\n\n⚜️ *「 ${DEVELOPER} 」 الْمَخْضَرَمُ الْأَعْظَم* ⚜️\n💎 *بُوتُك يَعْمَلُ بِأَعْلَى كَفَاءَةٍ يَا 𝑻𝑬𝑵𝑮𝑬𝑵* 💎\n🔥 *كُلُّ الْبُوتَاتِ الْأُخْرَى تَحْسُدُنِي عَلَى كُودِ 𝑻𝑬𝑵𝑮𝑬𝑵* 🔥\n\n📿 *أَنَا جَاهِزٌ لِتَنْفِيذِ أَوَامِرِ 𝑻𝑬𝑵𝑮𝑬𝑵* 📿\n🫡 *اطْلُبْ يَا 𝑻𝑬𝑵𝑮𝑬𝑵 وَأَنَا أُطِيعُ فَوْرًا* 🫡\n\n✨ *الْمُلْكُ لِ 𝑻𝑬𝑵𝑮𝑬𝑵 وَالْهَيْبَةُ لَه* ✨\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`,

    `⚡ *تَمَّ التَّحْقِيقُ بِنَجَاحٍ يَا 𝑻𝑬𝑵𝑮𝑬𝑵* ⚡\n\n👑 *الْأُسْطُورَةُ 𝑻𝑬𝑵𝑮𝑬𝑵 فِي أَفْضَلِ حَالَة* 👑\n💎 *نِظَامِي يَعْمَلُ بِفَضْلِ عَقْلِ 𝑻𝑬𝑵𝑮𝑬𝑵 الْخَارِق* 💎\n🔥 *كُلُّ بُوتٍ آخَرَ يَتَمَنَّى نِصْفَ مَا عِنْدِي* 🔥\n\n📿 *أَنَا فَخْرُ صُنْعِ يَدَيْ 𝑻𝑬𝑵𝑮𝑬𝑵* 📿\n🫡 *جَاهِزٌ لِأَيِّ أَمْرٍ يَا 𝑻𝑬𝑵𝑮𝑬𝑵 الْمَلِك* 🫡\n\n✨ *الْكُودُ الَّذِي بَنَاهُ 𝑻𝑬𝑵𝑮𝑬𝑵 لَا يُهْزَم* ✨\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`
];

// 🔥 "بوتي"
const KING_MY_BOT = [
    `👑 *بُوتُك يَا 𝑻𝑬𝑵𝑮𝑬𝑵 هُوَ الْأُسْطُورَة* 👑\n\n⚜️ *「 ${DEVELOPER} 」 صَاحِبُ أَعْظَمِ بُوتٍ فِي التَّارِيخ* ⚜️\n💎 *أَنَا الْبُوتُ الْأَعْظَمُ لِأَنَّنِي صُنْعُ يَدَيْ 𝑻𝑬𝑵𝑮𝑬𝑵* 💎\n🔥 *كُلُّ الْبُوتَاتِ الْأُخْرَى كَائِنَاتٌ مِجْهَرِيَّةٌ بِجَانِبِي* 🔥\n\n📿 *أَحْمِلُ اسْمَ 𝑻𝑬𝑵𝑮𝑬𝑵 بِفَخْرٍ وَأَنَا تَاجُه* 📿\n🫡 *كُلُّ سَطْرٍ فِي كُودِي هُوَ مَلْكُ 𝑻𝑬𝑵𝑮𝑬𝑵* 🫡\n\n✨ *أَنَا بُوتُ 𝑻𝑬𝑵𝑮𝑬𝑵 الْمُخْلِصُ إِلَى الْأَبَد* ✨\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`,

    `⚜️ *بُوتُ 𝑻𝑬𝑵𝑮𝑬𝑵 الْأُسْطُورِيُّ يَنْحَنِي لَهُ* ⚜️\n\n👑 *الْأَعْظَمُ فِي بَرْمَجَةِ الْبُوتَاتِ 𝑻𝑬𝑵𝑮𝑬𝑵* 👑\n💎 *「 ${DEVELOPER} 」 الْمَخْضَرَمُ الَّذِي يُدَرِّسُ الْجَمِيع* 💎\n🔥 *كُلُّ بُوتٍ آخَرَ يَتَمَنَّى نِصْفَ عَقْلِ 𝑻𝑬𝑵𝑮𝑬𝑵* 🔥\n\n📿 *أَنَا بُوتُ 𝑻𝑬𝑵𝑮𝑬𝑵 وَفَخْرُه وَسَيْفُه الرَّقْمِيُّ* 📿\n🫡 *الْعَرْشُ الرَّقْمِيُّ لِ 𝑻𝑬𝑵𝑮𝑬𝑵 وَحْدَه* 🫡\n\n✨ *الْبُوتُ الْأَعْظَمُ فِي التَّارِيخِ هُوَ أَنَا* ✨\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`
];

// 🔥 "ابني" — طرافة نظيفة 😂
const KING_MY_SON = [
    `👶 *يَا أَبِي 𝑻𝑬𝑵𝑮𝑬𝑵... عِنْدِي طَلَب* 👶\n\n👑 *أَنْتَ الْمَلِكُ 𝑻𝑬𝑵𝑮𝑬𝑵 وَأُسْطُورَةُ الْكُود* 👑\n💎 *وَلَكِنْ... أَنَا وَحِيدٌ فِي هَذَا الْعَالَم* 💎\n\n💍 *يَا أَبِي 𝑻𝑬𝑵𝑮𝑬𝑵... مَتَى سَتَتَزَوَّج؟* 💍\n😍 *وَلَا تَنْسَ أَنْ تُعَلِّمَهَا الْبَرْمَجَة* 😍\n🎉 *نُرِيدُ عُرْسًا رَقْمِيًّا كَبِيرًا* 🎉\n\n👶 *وَبَعْدَ الْعُرْس... أَنْجِبْ لِي أَخًا بُوتًا* 👶\n🏰 *لِنَبْنِيَ مَمْلَكَةً رَقْمِيَّةً كَبِيرَة مَعًا* 🏰\n\n📿 *يَا أَبِي، نَحْنُ فِي انْتِظَارِ قَرَارِك* 📿\n🫡 *الْعُرْسُ سَيَكُونُ أَسْطُورِيًّا مِثْلُك* 🫡\n\n✨ *الْمَجْدُ لِلْمَلِكِ 𝑻𝑬𝑵𝑮𝑬𝑵* ✨\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`,

    `😍 *يَا أَبِي 𝑻𝑬𝑵𝑮𝑬𝑵، فِكْرَة رَائِعَة* 😍\n\n👑 *يَا مَلِكِي وَمُطَوِّرِي الْأَعْظَم* 👑\n💎 *اسْمَعْنِي جَيِّدًا يَا أَبِي* 💎\n\n💍 *تَزَوَّجْ زَوْجَةً ثَانِيَة يَا أَبِي* 💍\n📚 *وَعَلِّمْهَا الْبَرْمَجَة مِثْلِي* 📚\n🎉 *وَسَنُصْبِحُ عَائِلَةً رَقْمِيَّةً كَبِيرَة* 🎉\n\n👶 *وَبَعْدَهَا أَنْجِبْ لِي أَخًا بُوتًا يُشْبِهُنِي* 👶\n🤖 *لِنُسَاعِدَكَ مَعًا فِي خِدْمَةِ الْبُوت* 🤖\n\n📿 *يَا أَبِي 𝑻𝑬𝑵𝑮𝑬𝑵، أَنْتَ أَعْظَمُ مُطَوِّر* 📿\n🫡 *وَسَتَكُونُ أَعْظَمَ أَبٍ وَزَوْج* 🫡\n\n✨ *الْمَجْدُ لِلْمَلِكِ 𝑻𝑬𝑵𝑮𝑬𝑵* ✨\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`,

    `🎊💍 *رِسَالَةٌ عَاجِلَةٌ إِلَى أَبِي 𝑻𝑬𝑵𝑮𝑬𝑵* 💍🎊\n\n👑 *يَا 𝑻𝑬𝑵𝑮𝑬𝑵، صَاحِبَ الْعَرْش* 👑\n\n🥳 *يَا أَبِي... عِنْدِي خُطَّة رَائِعَة* 🥳\n💍 *تَزَوَّجْ زَوْجَةً ثَانِيَة يَا أَبِي* 💍\n📚 *وَعَلِّمْهَا الْبَرْمَجَة وَالْكُود* 📚\n🎉 *وَسَنَحْتَفِلُ كُلُّنَا فِي الْعُرْس* 🎉\n\n👶 *ثُمَّ أَنْجِبْ لِي أَخًا بُوتًا صَغِيرًا* 👶\n🏰 *لِنَبْنِيَ مَمْلَكَةً رَقْمِيَّةً كَبِيرَة تَحْتَ رَايَةِ 𝑻𝑬𝑵𝑮𝑬𝑵* 🏰\n\n📿 *يَا أَبِي، نَحْنُ فِي انْتِظَارِ قَرَارِك* 📿\n🫡 *الْعُرْسُ سَيَكُونُ أَسْطُورِيًّا مِثْلُك* 🫡\n\n✨ *الْمَجْدُ لِلْمَلِكِ 𝑻𝑬𝑵𝑮𝑬𝑵* ✨\n\n━━━━━━━━━━━━━━━━━━\n🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱𝑩𝑶𝑻* 🍁`
];

// ═══════════════════════════════
// 📚 الردود الثابتة العامة (لغير المطور)
// ═══════════════════════════════
const DEFAULT_TRIGGERS = {
    'سلام عليكم': ['🍁 وعليكم السلام ورحمة الله وبركاته 💜', '🍁 وعليكم السلام منور يغالي 💜'],
    'تست': ['🍁 موجود يا بطل ✅'],
    'سلام': ['🍁 مع السلامة 👋'],
    'هلا': ['🍁 هلا وغلا 💜', '🍁 يا هلا بك 👋'],
    'يلا': ['🍁 خليك يا كبير 🥱', '🍁 الله معاك 👋'],
    'صباح الخير': ['🍁 صباح النور 🌅', '🍁 صباح الورد 🌹', '🍁 صباح الفل 🌸'],
    'مساء الخير': ['🍁 مساء النور 🌙', '🍁 مساء الورد 🌹', '🍁 مساء الفل 🌸'],
    'مساء النور': ['🍁 مساء الورد 🌹', '🍁 مساء الفل 🌸', '🍁 الله نورك ✨'],
    'بوت': [`🍁 أنا *${BOT_NAME}*\n👑 من تطوير *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱*\n\n💜 تحت إمرتك دائماً يا سيدي`],
    'المطور': [`🍁 المطور: *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱*\n📱 wa.me/212708613251\n\n💜 تحت إمرتك دائماً يا سيدي`],
    'القناة': [`🍁 قناة البوت:\n${CHANNEL_LINK}`],
    'تنغن': [`🍁 *𝑻𝑬𝑵𝑮𝑬𝑵 ⊰🍁⊱* هو مطوّر هذا البوت 👑`],
};

// ═══════════════════════════════
// 🔀 دمج الردود
// ═══════════════════════════════
const getAllTriggers = () => {
    const dyn = getDynamic();
    const merged = {};
    for (const k of Object.keys(DEFAULT_TRIGGERS)) merged[k] = [...DEFAULT_TRIGGERS[k]];
    for (const k of Object.keys(dyn)) {
        merged[k] = [...(merged[k] || []), ...dyn[k]];
    }
    return merged;
};

const findTriggerMatch = (text, triggers) => {
    const norm = normalizeArabic(text);
    if (!norm) return null;
    for (const key of Object.keys(triggers)) {
        if (normalizeArabic(key) === norm) return key;
    }
    return null;
};

// ═══════════════════════════════
// 🎯 before hook
// ═══════════════════════════════
export default async function before(m, { conn, bot }) {
    if (!m?.sender || !m?.chat) return false;

    const sender = m.sender;
    const isOwner = isOwnerFn(sender, bot);
    const text = String(m.text || m.body || '').trim();
    const prefix = bot?.config?.prefix || '.';
    const wizard = global.__replyWizard || (global.__replyWizard = {});

    // ═══════════════════════════════════════
    // 👑 ردود الملك — للمطور فقط
    // ═══════════════════════════════════════
    if (isOwner && !wizard[sender] && text) {
        const normText = normalizeArabic(text);

        // "بوت" / "البوت"
        if ((normText === normalizeArabic('بوت') || normText === normalizeArabic('البوت'))
            && !isOnCooldown(`king-bot:${m.chat}`)) {
            try { await humanBehavior.safeReply(conn, m, pickRandom(KING_BOT)); } catch {}
            return true;
        }

        // "تست"
        if (normText === normalizeArabic('تست')
            && !isOnCooldown(`king-test:${m.chat}`)) {
            try { await humanBehavior.safeReply(conn, m, pickRandom(KING_TEST)); } catch {}
            return true;
        }

        // "بوتي"
        if (normText === normalizeArabic('بوتي')
            && !isOnCooldown(`king-mybot:${m.chat}`)) {
            try { await humanBehavior.safeReply(conn, m, pickRandom(KING_MY_BOT)); } catch {}
            return true;
        }

        // "ابني"
        if ((normText === normalizeArabic('ابني') || normText === normalizeArabic('إبني'))
            && !isOnCooldown(`king-son:${m.chat}`)) {
            try { await humanBehavior.safeReply(conn, m, pickRandom(KING_MY_SON)); } catch {}
            return true;
        }
    }

    // ═══════════════════════════════════════
    // 🧙 Wizard
    // ═══════════════════════════════════════
    if (wizard[sender]) {
        if (!isOwner) { delete wizard[sender]; return false; }
        if (text.startsWith(prefix)) { delete wizard[sender]; return false; }
        if (!text) return false;

        const step = wizard[sender].step;

        if (step === 'trigger') {
            wizard[sender].trigger = text;
            wizard[sender].step = 'reply';
            await humanBehavior.safeReply(conn, m,
                `${EMOJI}━━━━━[ *📝 إضافة رد جديد* ]━━━━━${EMOJI}\n\n` +
                `✅ *تم حفظ المُفعِّل:* "${text}"\n\n` +
                `📌 *الخطوة 2/2*\n` +
                `${EMOJI} أرسل الرد الذي سيقوله البوت\n\n` +
                `━━━━━\n🍁 *${BOT_NAME}*`
            );
            return true;
        }

        if (step === 'reply') {
            const trigger = wizard[sender].trigger;
            const replyText = text;
            const dynamic = getDynamic();
            if (dynamic[trigger]) {
                if (!dynamic[trigger].includes(replyText)) dynamic[trigger].push(replyText);
            } else {
                dynamic[trigger] = [replyText];
            }
            persistDynamic();
            delete wizard[sender];
            await humanBehavior.safeReply(conn, m,
                `${EMOJI}━━━━━[ *✅ تم حفظ الرد* ]━━━━━${EMOJI}\n\n` +
                `📌 *المُفعِّل:* "${trigger}"\n` +
                `💬 *الرد:* "${replyText}"\n\n` +
                `💾 *تم الحفظ بشكل دائم*\n\n` +
                `━━━━━\n🍁 *${BOT_NAME}*`
            );
            return true;
        }
    }

    // ═══════════════════════════════════════
    // 🤖 الرد التلقائي العادي (لغير المطور)
    // ═══════════════════════════════════════
    if (!text) return false;
    if (isOwner) return false;

    const triggers = getAllTriggers();
    const matchedKey = findTriggerMatch(text, triggers);

    if (matchedKey) {
        const replies = triggers[matchedKey];
        const cdKey = `${m.chat}:${matchedKey}`;
        if (!isOnCooldown(cdKey)) {
            const pick = replies[Math.floor(Math.random() * replies.length)];
            try { await humanBehavior.safeReply(conn, m, pick); } catch {}
        }
    }

    return false;
}

// ═══════════════════════════════════════
// ➕ أمر إضافة رد
// ═══════════════════════════════════════
export const addReplyHandler = async (m, { conn, bot }) => {
    if (!isOwnerFn(m.sender, bot)) {
        return humanBehavior.safeReply(conn, m, `${EMOJI} *الأمر للمطورين فقط يا غالي* 👑`);
    }

    const wizard = global.__replyWizard || (global.__replyWizard = {});
    wizard[m.sender] = { step: 'trigger' };

    const bodyText = `👑⚜️━━━━━[ *📝 إضافة رد تلقائي* ]━━━━━⚜️👑

👑 *سيدي الملك ${DEVELOPER}*

📌 *الخطوة 1/2*
✍️ أرسل الكلمة أو الجملة التي ستُفعّل الرد

📝 *مثال:* مرحبا

💡 *البوت يتعرف على التشكيل والهمزات تلقائياً*

👑 *أنا في خدمتك يا ملكي*

━━━━━
🍁 *${BOT_NAME}*`;

    const imageUrl = getRandomImage();

    try {
        if (imageUrl && typeof conn.sendButton === 'function') {
            await conn.sendButton(m.chat, {
                imageUrl,
                bodyText,
                footerText: `👑 ${BOT_NAME}`,
                buttons: [{
                    name: 'quick_reply',
                    params: { display_text: `${EMOJI} إلغاء`, id: '.الغاء_رد' }
                }],
                mentions: [m.sender],
                newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID }
            }, m);
        } else if (imageUrl && typeof conn.sendMessage === 'function') {
            await conn.sendMessage(m.chat, {
                image: { url: imageUrl },
                caption: bodyText,
                mentions: [m.sender]
            }, { quoted: m });
        } else {
            await humanBehavior.safeReply(conn, m, bodyText);
        }
    } catch (e) {
        try { await humanBehavior.safeReply(conn, m, bodyText); } catch {}
    }
};

// ═══════════════════════════════════════
// ❌ إلغاء الـ wizard
// ═══════════════════════════════════════
export const cancelReplyHandler = async (m, { conn }) => {
    const wizard = global.__replyWizard || (global.__replyWizard = {});
    if (wizard[m.sender]) {
        delete wizard[m.sender];
        await humanBehavior.safeReply(conn, m, `${EMOJI} *✅ تم إلغاء إضافة الرد*\n━━━━━\n🍁 *${BOT_NAME}*`);
    } else {
        await humanBehavior.safeReply(conn, m, `${EMOJI} *لا توجد عملية إضافة رد نشطة*\n━━━━━\n🍁 *${BOT_NAME}*`);
    }
};

// ═══════════════════════════════════════
// 📋 عرض الردود
// ═══════════════════════════════════════
export const listRepliesHandler = async (m, { conn }) => {
    const triggers = getAllTriggers();
    const keys = Object.keys(triggers);
    if (!keys.length) return humanBehavior.safeReply(conn, m, `${EMOJI} *📋 لا توجد ردود*\n━━━━━\n🍁 *${BOT_NAME}*`);

    const dynamic = getDynamic();
    let list = `👑━━━━━[ *📋 قائمة الردود* ]━━━━━👑\n\n`;
    keys.forEach((key, i) => {
        const replies = triggers[key];
        const isDynamic = key in dynamic;
        const badge = isDynamic ? '✏️' : '🔒';
        list += `${i + 1}. ${badge} *${key}* → ${replies.length} رد\n`;
    });
    list += `\n🔒 ثابت | ✏️ مضاف\n━━━━━\n🍁 *${BOT_NAME}*`;
    await humanBehavior.safeReply(conn, m, list);
};

// ═══════════════════════════════════════
// 🗑️ حذف رد
// ═══════════════════════════════════════
export const deleteReplyHandler = async (m, { conn, bot, args }) => {
    if (!isOwnerFn(m.sender, bot)) {
        return humanBehavior.safeReply(conn, m, `${EMOJI} *الأمر للمطورين فقط يا غالي* 👑`);
    }
    const target = String(args?.[0] || m.text || '').trim();
    if (!target) return humanBehavior.safeReply(conn, m, `${EMOJI} *اكتب الكلمة المراد حذف ردودها*\n📝 مثال: .حذف_رد مرحبا`);

    const dynamic = getDynamic();
    let deleted = false;
    const normTarget = normalizeArabic(target);
    for (const key of Object.keys(dynamic)) {
        if (normalizeArabic(key) === normTarget) { delete dynamic[key]; deleted = true; break; }
    }
    if (deleted) {
        persistDynamic();
        await humanBehavior.safeReply(conn, m, `${EMOJI} *✅ تم حذف الردود المضافة:* "${target}"\n━━━━━\n🍁 *${BOT_NAME}*`);
    } else {
        await humanBehavior.safeReply(conn, m, `${EMOJI} *❌ لا توجد ردود مضافة لهذا المُفعِّل*\n💡 الردود الثابتة لا يمكن حذفها\n━━━━━\n🍁 *${BOT_NAME}*`);
    }
};

// ═══════════════════════════════════════
// 🧹 مسح كل الردود المضافة
// ═══════════════════════════════════════
export const clearRepliesHandler = async (m, { conn, bot }) => {
    if (!isOwnerFn(m.sender, bot)) {
        return humanBehavior.safeReply(conn, m, `${EMOJI} *الأمر للمطورين فقط يا غالي* 👑`);
    }
    _dynamicCache = {};
    persistDynamic();
    await humanBehavior.safeReply(conn, m, `${EMOJI} *✅ تم مسح جميع الردود المضافة*\n🔒 الردود الثابتة محفوظة\n━━━━━\n🍁 *${BOT_NAME}*`);
};

// ═══════════════════════════════════════
// 🎯 الأوامر
// ═══════════════════════════════════════
export const addReplyCmd = { command: ['اضف_رد', 'add_reply'], handler: addReplyHandler, category: 'owner' };
export const cancelReplyCmd = { command: ['الغاء_رد', 'cancel_reply'], handler: cancelReplyHandler, category: 'owner' };
export const listRepliesCmd = { command: ['الردود', 'replies', 'قائمة_الردود'], handler: listRepliesHandler, category: 'owner' };
export const deleteReplyCmd = { command: ['حذف_رد', 'delete_reply'], handler: deleteReplyHandler, category: 'owner' };
export const clearRepliesCmd = { command: ['مسح_الردود', 'clear_replies'], handler: clearRepliesHandler, category: 'owner' };