/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — تنصيب البوتات الفرعية
   📁 /home/container/plugins/sub/تنصيب.js
   ✅ تنصيب مباشر | أزرار كاملة | بدون مسافات فارغة
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

/* 👑 المطور الرئيسي */
const DEVELOPER_PHONE = '212634266182';

/* ═══════════════════════════════════════════
   🎯 الدالة الرئيسية
   ═══════════════════════════════════════════ */
const run = async (m, { args, conn, bot }) => {
    if (!global.subBots) {
        return m.reply(`${BRAND.emoji} *نظام البوتات الفرعية غير متاح*`);
    }

    try {
        const subList = global.subBots.list?.() || [];
        if (subList.length >= 50) {
            return m.reply(`${BRAND.emoji} *تم الوصول للحد الأقصى (50 بوت)*`);
        }
    } catch {}

    if (global.db?.noSub) {
        return m.reply(`${BRAND.emoji} *المطور قفل التنصيب مؤقتاً*`);
    }

    const chatId = m.chat;
    if (chatId.includes('@g.us')) {
        if (!global._subSettings) global._subSettings = {};
        const settings = global._subSettings[chatId];
        
        if (settings?.noSub === true) {
            return m.reply(`${BRAND.emoji} *🚫 التنصيب موقف في هذه المجموعة*
━━━━━
📌 للتواصل مع المطور: .المطور`);
        }
    }

    try {
        const num = m.sender.split("@")[0].replace(/[+\s-]/g, '');

        if (!/^\d+$/.test(num)) {
            return m.reply(`${BRAND.emoji} *⚠️ رقم الهاتف غير صالح*`);
        }

        const sub = global.subBots;
        if (!sub) {
            return m.reply(`${BRAND.emoji} *❌ نظام البوتات الفرعية غير متاح*`);
        }

        const init = await m.reply(`${BRAND.emoji} *⏳ جاري التنصيب...*
📱 *الرقم:* +${num}
━━━━━
📌 *انتظر كود الاقتران*`);

        let state = { uid: null, pairDone: false, resolved: false, pending: null };

        const img = getRandomImage();

        const cleanup = () => {
            sub.off('pair', handlers.pair);
            sub.off('ready', handlers.ready);
            sub.off('error', handlers.error);
        };

        const handlers = {
            pair: (id, code) => {
                if (state.pairDone) return;
                if (!state.uid) { 
                    state.pending = { id, code }; 
                    return; 
                }
                if (id !== state.uid) return;
                state.pairDone = true;
                Func.pair(conn, code, num, m, init);
            },
            ready: (id) => {
                if (id !== state.uid || state.resolved) return;
                state.resolved = true;
                Func.ready(conn, num, m, img);
                cleanup();
            },
            error: (id, err) => {
                if (id !== state.uid || state.resolved) return;
                state.resolved = true;
                
                if (err?.message?.includes('already running')) {
                    Func.alreadyRunning(conn, num, m);
                } else {
                    Func.error(conn, num, err, m);
                }
                cleanup();
            },
        };

        sub.on('pair', handlers.pair);
        sub.on('ready', handlers.ready);
        sub.on('error', handlers.error);

        try {
            state.uid = await sub.add(num);
        } catch (addError) {
            cleanup();
            
            if (addError?.message?.includes('already running')) {
                return Func.alreadyRunning(conn, num, m);
            }
            
            throw addError;
        }

        if (state.pending?.id === state.uid && !state.pairDone) {
            state.pairDone = true;
            Func.pair(conn, state.pending.code, num, m, init);
        }

        setTimeout(() => {
            if (state.resolved) return;
            state.resolved = true;
            Func.timeout(conn, m, state.pairDone);
            cleanup();
        }, 120000);

    } catch (error) {
        console.error(`${BRAND.emoji} خطأ في التنصيب:`, error?.message);
        
        const num = m.sender.split("@")[0].replace(/[+\s-]/g, '');
        
        if (error?.message?.includes('already running')) {
            return Func.alreadyRunning(conn, num, m);
        }
        
        const v = verse();
        await m.reply(`${BRAND.emoji} *❌ حدث خطأ*
📌 ${error.message?.slice(0, 100) || 'خطأ غير معروف'}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
📌 حاول مرة أخرى`);
    }
};

run.command = ["تنصيب", "install", "setup"];
run.category = "sub";
run.usage = ["تنصيب"];

export default run;

/* ═══════════════════════════════════════════
   🍁 دوال مساعدة — بدون مسافات فارغة
   ═══════════════════════════════════════════ */
const Func = {
    /* ✅ رقم منصب مسبقاً */
    alreadyRunning: async (conn, num, m) => {
        const v = verse();
        
        /* ✅ تصميم مضغوط */
        const bodyText = `${BRAND.emoji} *البوت شغال مسبقاً*
📱 *الرقم:* +${num}
🟢 *الحالة:* متصل
━━━━━
📌 *الخيارات:* 👇
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        try {
            return await conn.sendButtonNormal(m.chat, {
                media: { url: getRandomImage() },
                mediaType: 'image',
                caption: bodyText,
                buttons: [
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `🛑 ايقاف البوت`,
                            id: `.ايقاف_بوت ${num}`
                        }
                    },
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `🗑️ حذف البوت`,
                            id: `.حذف_بوت ${num}`
                        }
                    },
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
                    bodyText: bodyText,
                    footerText: `${BRAND.emoji} ${BRAND.botName}`,
                    buttons: [
                        {
                            name: 'quick_reply',
                            params: {
                                display_text: `🛑 ايقاف البوت`,
                                id: `.ايقاف_بوت ${num}`
                            }
                        },
                        {
                            name: 'quick_reply',
                            params: {
                                display_text: `🗑️ حذف البوت`,
                                id: `.حذف_بوت ${num}`
                            }
                        },
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
                return m.reply(bodyText);
            }
        }
    },

    /* ✅ كود الاقتران */
    pair: async (conn, code, num, m, reply_status) => {
        const v = verse();
        
        /* ✅ تصميم مضغوط */
        const bodyText = `${BRAND.emoji} *نظام البوتات الفرعية*
📱 *الرقم:* +${num}
🔑 *كود الاقتران:* \`${code}\`
━━━━━
📌 *الخطوات:*
1️⃣ افتح واتساب
2️⃣ الإعدادات > الأجهزة المرتبطة
3️⃣ ربط جهاز برقم الهاتف
4️⃣ أدخل الكود أعلاه
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        try {
            await conn.sendButtonNormal(m.chat, {
                media: { url: getRandomImage() },
                mediaType: 'image',
                caption: bodyText,
                buttons: [
                    { 
                        name: "cta_copy", 
                        params: { 
                            display_text: `${BRAND.emoji} نسخ الكود`, 
                            copy_code: code 
                        } 
                    },
                    {
                        name: "cta_url",
                        params: {
                            display_text: `${BRAND.emoji} تواصل مع المطور`,
                            url: `https://wa.me/${DEVELOPER_PHONE}`
                        }
                    }
                ],
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                }
            }, reply_status);
        } catch (e) {
            try {
                await conn.sendButton(m.chat, {
                    imageUrl: getRandomImage(),
                    bodyText: bodyText,
                    footerText: `${BRAND.emoji} ${BRAND.botName}`,
                    buttons: [
                        { 
                            name: "cta_copy", 
                            params: { 
                                display_text: `${BRAND.emoji} نسخ الكود`, 
                                copy_code: code 
                            } 
                        },
                        {
                            name: "cta_url",
                            params: {
                                display_text: `${BRAND.emoji} تواصل مع المطور`,
                                url: `https://wa.me/${DEVELOPER_PHONE}`
                            }
                        }
                    ],
                    mentions: [m.sender],
                    newsletter: {
                        name: BRAND.channelName,
                        jid: BRAND.channelId
                    },
                    interactiveConfig: { buttons_limits: 20 }
                }, reply_status);
            } catch (e2) {
                await conn.sendMessage(m.chat, {
                    text: `${BRAND.emoji} *كود الاقتران*
🔑 \`${code}\`
📱 +${num}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`
                });
            }
        }
    },

    /* ✅ نجاح */
    ready: async (conn, num, m, img) => {
        const v = verse();
        
        try {
            await m.react("✅");
        } catch {}

        /* ✅ تصميم مضغوط */
        const bodyText = `${BRAND.emoji} *تم الاتصال بنجاح*
📱 *الرقم:* +${num}
🟢 *الحالة:* متصل
━━━━━
✅ *البوت جاهز للاستخدام الآن*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        try {
            await conn.sendButtonNormal(m.chat, {
                media: { url: img },
                mediaType: 'image',
                caption: bodyText,
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
            await conn.sendMessage(m.chat, {
                text: bodyText,
                mentions: [m.sender]
            }, { quoted: m });
        }
    },

    /* ✅ خطأ */
    error: async (conn, num, err, m) => {
        const v = verse();
        
        await m.reply(`${BRAND.emoji} *فشل الاقتران*
📱 *الرقم:* +${num}
⚠️ *الخطأ:* ${err?.message?.slice(0, 80) || 'غير معروف'}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
📌 حاول مرة أخرى`);
    },

    /* ✅ انتهاء الوقت */
    timeout: async (conn, m, pairDone) => {
        const v = verse();
        
        await m.reply(pairDone
            ? `${BRAND.emoji} *⏰ تم إرسال الكود لكن لم يتم تأكيد الاتصال*
📌 تأكد من إدخال الكود في واتساب خلال 120 ثانية
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`
            : `${BRAND.emoji} *⏰ لم يتم استلام كود الاقتران خلال 120 ثانية*
📌 الرجاء المحاولة مرة أخرى
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`
        );
    }
};