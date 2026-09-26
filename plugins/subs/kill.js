/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — مسح الجلسات (kill)
   📁 /home/container/plugins/sub/kill.js
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
    groupLink:   'https://chat.whatsapp.com/Hd5SRXu6WRX5njUtvT9e9e',
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

/* 🍁 إرسال رسالة موحّدة — بدون رابط في النص */
const sendMessage = async (conn, chat, text, mentions = []) => {
    try {
        return await conn.sendButtonNormal(chat, {
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
                },
                {
                    name: 'cta_url',
                    params: {
                        display_text: `🔗 مجموعة الدعم`,
                        url: BRAND.groupLink
                    }
                }
            ],
            mentions: mentions,
            newsletter: {
                name: BRAND.channelName,
                jid: BRAND.channelId
            }
        });
    } catch (e) {
        try {
            return await conn.sendButton(chat, {
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
                    },
                    {
                        name: 'cta_url',
                        params: {
                            display_text: `🔗 مجموعة الدعم`,
                            url: BRAND.groupLink
                        }
                    }
                ],
                mentions: mentions,
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 20 }
            });
        } catch (e2) {
            return conn.sendMessage(chat, { text });
        }
    }
};

/* ═══════════════════════════════════════════
   📝 الرسائل — بدون رابط في النص
   ═══════════════════════════════════════════ */
const getKillSelfMsg = () => {
    const v = verse();
    return `${BRAND.emoji} *⛔ تم إلغاء الجلسة*

━━━━━

📌 *السبب:* مسح ذاتي
🔒 *الحالة:* الجلسة محذوفة

━━━━━

📌 *للتنصيب مرة أخرى:*
▸ .تنصيب

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;
};

const getKillAllMsg = () => {
    const v = verse();
    return `${BRAND.emoji} *⚠️ تم إلغاء جلستك*

━━━━━

📌 *السبب:* أمر من أحد المطورين
🔒 *الحالة:* الجلسة محذوفة

━━━━━

📌 *للتنصيب مرة أخرى:*
▸ .تنصيب

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;
};

/* ═══════════════════════════════════════════
   🎯 الدالة الرئيسية
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, bot, text }) => {
    const sub = global.subBots;
    const v = verse();
    
    if (!sub) {
        return m.reply(`${BRAND.emoji} *❌ نظام البوتات الفرعية غير متاح*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
    }

    const arg = (text || '').trim().toLowerCase();

    /* ═══════════════════════════════════════
       🗑️ .kill all — للمطورين
       ═══════════════════════════════════════ */
    if (arg === 'all') {
        if (!m.isOwner) {
            return m.reply(`${BRAND.emoji} *❌ الأمر ده للمطورين فقط*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
        }

        const bots = sub.list();
        if (!bots.length) {
            return m.reply(`${BRAND.emoji} *📭 لا يوجد بوتات فرعية متصلة*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
        }

        let warned = 0, removed = 0;
        const killAllMsg = getKillAllMsg();

        /* 1️⃣ تنبيه كل البوتات */
        for (const b of bots) {
            if (b.id === bot.id) continue;
            try {
                const ownJid = b.phone ? `${b.phone}@s.whatsapp.net` : null;
                if (!ownJid) continue;

                const botConn = sub.get(b.id);
                const sock = botConn?.sock;

                if (sock) {
                    await sendMessage(sock, ownJid, killAllMsg, [ownJid]);
                } else {
                    await sendMessage(conn, ownJid, killAllMsg, [ownJid]);
                }
                warned++;
            } catch {}
        }

        await new Promise(r => setTimeout(r, 3000));

        /* 2️⃣ حذف الجلسات */
        for (const b of bots) {
            if (b.id === bot.id) continue;
            try {
                if (b.phone && (await sub.removeByPhone(b.phone))) removed++;
            } catch {}
        }

        const resultText = `${BRAND.emoji} *تم تنبيه وحذف*

━━━━━

⚠️ *تم تنبيه:* ${warned}
🗑️ *تم حذف:* ${removed}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        return sendMessage(conn, m.chat, resultText, [m.sender]);
    }

    /* ═══════════════════════════════════════
       🗑️ .kill — مسح الجلسة الحالية
       ═══════════════════════════════════════ */
    const bots = sub.list();
    const me = bots.find(b => b.id === bot.id);

    if (!me) {
        return m.reply(`${BRAND.emoji} *❌ الأمر ده للبوتات الفرعية بس*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
    }

    const killSelfMsg = getKillSelfMsg();

    try {
        await sendMessage(conn, m.chat, killSelfMsg, [m.sender]);
    } catch {}

    await new Promise(r => setTimeout(r, 1500));

    try {
        if (me.phone) await sub.removeByPhone(me.phone);
    } catch {}
};

handler.usage    = ['kill', 'kill all'];
handler.category = 'sub';
handler.command  = ['kill'];
handler.noSub    = false;

export default handler;