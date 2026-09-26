/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — أوامر الإدارة
   📁 /home/container/plugins/admins/control.js
   ⚡ نسخة سريعة | معلومات المطور | قناة البوت
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   🏆 الهوية الموحّدة
   ═══════════════════════════════════════════ */
const BRAND = {
    botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
    shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
    developer:   'ISAGI 🍁',
    devNumber:   'wa.me/212708613251',
    channelId:   '120363428650036031@newsletter',
    channelName: '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
    channelLink: 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u',
    emoji:       '🍁'
};

/* 🕌 الآيات */
const VERSES = [
    '﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾',
    '﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾',
    '﴿ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ﴾',
    '﴿ وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾',
    '﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾',
    '﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾'
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* 🖼️ صور ISAGI TENGEN */
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
    'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9af3b0fe0a.jpg',
    'https://i.postimg.cc/JnTyPJ74/telechargement-(4).jpg',
    'https://i.postimg.cc/XJx2L2ys/anime-7-63864269925437.jpg'
];

const getRandomImage = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
let control = async (m, { command, text, conn, bot }) => {
    const v = verse();

    /* ✅ دالة إرسال سريعة مع صورة + قناتك */
    const sendReply = async (msg) => {
        const bodyText = `${BRAND.emoji} *${BRAND.shortName}*

━━━━━

${msg}

━━━━━

${v}

━━━━━

👑 *المطور:* ${BRAND.developer}
📱 ${BRAND.devNumber}
📢 ${BRAND.channelLink}

💜 تحت إمرتك دائماً يا سيدي`;

        const imageUrl = getRandomImage();

        /* محاولة 1: sendButtonNormal (الأسرع) */
        try {
            if (conn.sendButtonNormal) {
                return await conn.sendButtonNormal(m.chat, {
                    media: { url: imageUrl },
                    mediaType: 'image',
                    caption: bodyText,
                    buttons: [{
                        name: 'cta_url',
                        params: { display_text: '📢 قناة البوت', url: BRAND.channelLink }
                    }],
                    mentions: [m.sender],
                    newsletter: { name: BRAND.channelName, jid: BRAND.channelId }
                }, m);
            }
        } catch {}

        /* محاولة 2: sendButton */
        try {
            if (conn.sendButton) {
                return await conn.sendButton(m.chat, {
                    imageUrl,
                    bodyText,
                    footerText: `${BRAND.emoji} ${BRAND.botName}`,
                    buttons: [{
                        name: 'cta_url',
                        params: { display_text: '📢 قناة البوت', url: BRAND.channelLink }
                    }],
                    mentions: [m.sender],
                    newsletter: { name: BRAND.channelName, jid: BRAND.channelId }
                }, m);
            }
        } catch {}

        /* محاولة 3: sendMessage */
        try {
            if (conn.sendMessage) {
                return await conn.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: bodyText,
                    mentions: [m.sender]
                }, { quoted: m });
            }
        } catch {}

        /* الحل الأخير */
        try { return await m.reply(bodyText); } catch {}
    };

    /* ✅ التحقق من المطور (سريع) */
    const isBotOwner = (userId) => {
        if (!bot?.config?.owners) return false;
        return bot.config.owners.some(o => {
            if (typeof o === 'string') return o === userId;
            return o.jid === userId || o.lid === userId;
        });
    };

    /* ✅ جلب المستخدم المستهدف */
    const getUser = () => {
        if (m.quoted?.sender) return m.quoted.sender;
        if (m.mentionedJid?.length > 0) return m.mentionedJid[0];
        if (text) {
            const num = String(text).replace(/[^\d]/g, '');
            if (num.length >= 8) return num + '@s.whatsapp.net';
        }
        return null;
    };

    /* ✅ JID البوت */
    const botJid = conn?.user?.id || conn?.user?.jid || '';

    try {
        /* ═══════════════════════════════
           ➕ أمر "ضيف"
           ═══════════════════════════════ */
        if (command === "ضيف") {
            const target = getUser();
            if (!target) return sendReply(`❌ فين الرقم أو العضو؟`);

            try {
                const res = await conn.groupParticipantsUpdate(m.chat, [target], 'add');
                const status = res?.[0]?.status;
                if (status === '403') return sendReply(`❌ الرقم لا يسمح بالإضافة`);
                if (status === '409') return sendReply(`ℹ️ العضو موجود بالفعل`);
                if (status === '408') return sendReply(`❌ الرقم غير مسجل في واتساب`);
                return sendReply(`✅ *تمت الإضافة بنجاح*`);
            } catch (e) {
                return sendReply(`❌ فشل الإضافة: ${e.message}`);
            }
        }

        /* ═══════════════════════════════
           🚫 أمر "طرد"
           ═══════════════════════════════ */
        if (command === "طرد") {
            const user = getUser();
            if (!user) return sendReply(`❌ منشن أو رد على العضو`);

            /* لو الهدف مطور أو البوت → اطرد اللي بيطرد */
            if (isBotOwner(user) || user === botJid) {
                await sendReply(`😹 *بتهزر؟*\n\nمش هتقدر تطرد مطور 🍁`);
                if (!isBotOwner(m.sender)) {
                    try { await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove'); } catch {}
                }
                return;
            }

            try {
                await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                return sendReply(`✅ *تم الطرد بنجاح*`);
            } catch (e) {
                return sendReply(`❌ فشل الطرد: ${e.message}`);
            }
        }

        /* ═══════════════════════════════
           ⬆️ أمر "رفع"
           ═══════════════════════════════ */
        if (command === "رفع") {
            const user = getUser();
            if (!user) return sendReply(`❌ منشن أو رد على العضو`);

            try {
                await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
                return sendReply(`✅ *تم رفع العضو مشرفاً*`);
            } catch (e) {
                return sendReply(`❌ فشل الرفع: ${e.message}`);
            }
        }

        /* ═══════════════════════════════
           ⬇️ أمر "خفض"
           ═══════════════════════════════ */
        if (command === "خفض") {
            const user = getUser();
            if (!user) return sendReply(`❌ منشن أو رد على العضو`);

            try {
                await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
                return sendReply(`✅ *تم خفض العضو*`);
            } catch (e) {
                return sendReply(`❌ فشل الخفض: ${e.message}`);
            }
        }

    } catch (error) {
        try { await sendReply(`❌ ${error.message}`); } catch {}
    }
};

control.usage = ['ضيف', 'طرد', 'رفع', 'خفض'];
control.command = ['ضيف', 'طرد', 'رفع', 'خفض'];
control.admin = true;
control.botAdmin = true;
control.category = "admin";
export default control;