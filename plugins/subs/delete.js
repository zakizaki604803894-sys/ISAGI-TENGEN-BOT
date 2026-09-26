/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — حذف بوت فرعي
   📁 /home/container/plugins/sub/حذف_بوت.js
   ✅ تصميم هاتف | حذف الكل | آيات قرآنية
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

/* 🍁 دالة إرسال رسالة مع صورة */
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

/* ═══════════════════════════════════════════
   🎯 الدالة الرئيسية
   ═══════════════════════════════════════════ */
const run = async (m, { args, conn, bot }) => {
    const sub = global.subBots;
    const v = verse();
    
    /* ✅ التحقق من النظام */
    if (!sub) {
        return sendReply(conn, m, `${BRAND.emoji} *❌ نظام البوتات الفرعية غير متاح*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
    }

    const input = args[0]?.toLowerCase();

    /* ═══════════════════════════════════════
       🗑️ حذف الكل
       ═══════════════════════════════════════ */
    if (input === 'الكل' || input === 'all' || input === 'كل') {
        try {
            const subList = sub.list?.() || [];
            
            if (subList.length === 0) {
                return sendReply(conn, m, `${BRAND.emoji} *لا توجد بوتات فرعية*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
            }

            /* ⚡ رسالة تأكيد أولية */
            const confirmText = `${BRAND.emoji} *⚠️ تأكيد الحذف*

━━━━━

📊 *عدد البوتات:* ${subList.length}
🗑️ *سيتم حذفها جميعاً*

━━━━━

📌 للتفعيل — رد بكلمة: *نعم*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

            await sendReply(conn, m, confirmText);

            /* ⚡ انتظار تأكيد */
            const confirm = await new Promise((resolve) => {
                const timeout = setTimeout(() => resolve(false), 30000);
                
                const handler = async (msg) => {
                    if (msg.chat === m.chat && msg.sender === m.sender) {
                        const body = (msg.body || '').trim();
                        if (body === 'نعم' || body === 'yes') {
                            clearTimeout(timeout);
                            sub.off('message', handler);
                            resolve(true);
                        } else if (body === 'لا' || body === 'no') {
                            clearTimeout(timeout);
                            sub.off('message', handler);
                            resolve(false);
                        }
                    }
                };
                
                if (sub?.on) sub.on('message', handler);
            });

            if (!confirm) {
                return sendReply(conn, m, `${BRAND.emoji} *❌ تم إلغاء الحذف*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
            }

            /* ⚡ حذف الكل */
            let deleted = 0;
            let failed = 0;

            for (const subBot of subList) {
                try {
                    const identifier = subBot.uid || subBot.id || subBot.phone || subBot;
                    await sub.removeByPhone(identifier);
                    deleted++;
                } catch (e) {
                    failed++;
                }
            }

            const resultText = `${BRAND.emoji} *✅ تم حذف الكل*

━━━━━

🗑️ *تم الحذف:* ${deleted}
❌ *فشل:* ${failed}
📊 *الإجمالي:* ${subList.length}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

            return sendReply(conn, m, resultText);

        } catch (e) {
            return sendReply(conn, m, `${BRAND.emoji} *❌ فشل حذف الكل*

━━━━━

📌 ${e.message?.slice(0, 80) || 'خطأ غير معروف'}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
        }
    }

    /* ═══════════════════════════════════════
       📝 عرض المساعدة
       ═══════════════════════════════════════ */
    if (!args[0]) {
        const prefix = bot.config.prefix?.[0] || '.';
        
        const helpText = `${BRAND.emoji} *حذف بوت فرعي*

━━━━━

📝 *الاستخدام:*

▸ ${prefix}حذف_بوت <رقم>
▸ ${prefix}حذف_بوت <ترتيب>
▸ ${prefix}حذف_بوت الكل

━━━━━

📌 *أمثلة:*

▸ ${prefix}حذف_بوت 1
▸ ${prefix}حذف_بوت 201234567890
▸ ${prefix}حذف_بوت الكل

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        return sendReply(conn, m, helpText);
    }

    let deleted = false;

    /* ═══════════════════════════════════════
       🔢 حذف بالترتيب
       ═══════════════════════════════════════ */
    if (/^\d+$/.test(input) && input.length <= 2) {
        const idx = parseInt(input);
        try {
            await sub.removeByIndex(idx);
            deleted = true;
        } catch (e) {
            return sendReply(conn, m, `${BRAND.emoji} *❌ فشل الحذف*

━━━━━

📌 ${e.message?.slice(0, 80) || 'خطأ غير معروف'}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
        }
    }
    /* ═══════════════════════════════════════
       📱 حذف بالرقم
       ═══════════════════════════════════════ */
    else if (/^\d+$/.test(input)) {
        deleted = await sub.removeByPhone(input);
        if (!deleted) {
            return sendReply(conn, m, `${BRAND.emoji} *❌ لا يوجد بوت بالرقم* ${input}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
        }
    }

    /* ═══════════════════════════════════════
       ✅ نجاح الحذف
       ═══════════════════════════════════════ */
    if (deleted) {
        const successText = `${BRAND.emoji} *تم حذف البوت بنجاح*

━━━━━

📱 *الرقم/الترتيب:* ${input}
🗑️ *الحالة:* محذوف

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

💜 تحت إمرتك دائماً يا سيدي

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        return sendReply(conn, m, successText);
    }
};

run.command = ["حذف_بوت"];
run.usage = ["حذف_بوت"];
run.category = "sub";
run.noSub = true;

export default run;