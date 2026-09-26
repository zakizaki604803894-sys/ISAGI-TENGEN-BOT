/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — تحليل الشخصيات
   📁 /home/container/plugins/fun/اوصف.js
   ✅ تصميم هاتف | بدون رابط في النص | بدون مسافات فارغة
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
   🎲 دوال مساعدة
   ═══════════════════════════════════════════ */
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

const PERCENTAGES = [
    '6%', '12%', '20%', '27%', '35%', '41%', '49%', '54%',
    '60%', '66%', '73%', '78%', '84%', '92%', '96%', '99%', '0%', '4%'
];

const randomPercent = () => pickRandom(PERCENTAGES);

/* ═══════════════════════════════════════════
   📊 قوائم التحليل
   ═══════════════════════════════════════════ */
const PERSONALITY_TYPES = [
    'طيب القلب', 'متكبر', 'بخيل', 'كريم', 'متواضع', 'خجول', 'جبان',
    'متطفل', 'متفائل', 'انطوائي', 'ساخر', 'غامض', 'عاطفي', 'محبوب',
    'عصبي', 'هادئ', 'مغامر', 'حكيم', 'مرح', 'جريء'
];

const NATURES = [
    'هادئ', 'نشيط', 'اجتماعي', 'انطوائي', 'مرح', 'جاد',
    'غامض', 'مزعج', 'ممل', 'مضحك'
];

const TRAITS = [
    'ذكي', 'صبور', 'كريم', 'شجاع', 'مبدع', 'وفيّ',
    'غبي', 'بخيل', 'جبان', 'كسول'
];

const HABITS = [
    'منزعجاً', 'شارد الذهن', 'كثير الثرثرة', 'يشتري أشياء',
    'يشاهد الأنمي', 'على الإنترنت', 'كسولاً', 'يبحث عن الإثارة',
    'يخطط للمهرجانات', 'يمارس الرياضة', 'يشرب القهوة', 'يقرأ الكتب',
    'يسافر', 'يلعب الألعاب'
];

const HOBBIES = [
    'القراءة', 'السفر', 'الرياضة', 'الكتابة', 'البرمجة',
    'الرسم', 'النوم', 'الأكل', 'التسوق', 'السباحة'
];

const AMBITIONS = [
    'النجاح', 'السعادة', 'التعلم', 'التميز', 'الاستقرار',
    'التأثير', 'الثراء', 'الشهرة', 'الزواج', 'السفر'
];

const SOCIAL_TRAITS = [
    'رجل', 'امرأة', 'ودود', 'متحفظ', 'قائد', 'تابع',
    'مرح', 'جاد', 'اجتماعي', 'انطوائي'
];

const PREDICTIONS = [
    'قد يكون ملك المهرجانات!', 'لا يمكن التنبؤ به.', 'شخصيته كالفصول.',
    'يحتاج للنوم.', 'شخص فريد!', 'مستقبل مشرق!', 'قد يفاجئ الجميع!',
    'قلبه أبيض كالثلج!'
];

const RATINGS = [
    'شخص رائع 🎯', 'مميز جداً 💎', 'طيب القلب ❤️', 'مبدع 🎨',
    'ذكي 🧠', 'محبوب 🌟', 'شخص عادي 👤', 'ممل بعض الشيء 😴',
    'مزعج أحياناً 🤪', 'غريب الأطوار 🎭'
];

const CONCLUSIONS = [
    'الحمد لله على كل حال 🙏', 'سبحان الله وبحمده 🌟',
    'لا حول ولا قوة إلا بالله 💫', 'الله أكبر 🕌',
    'استغفر الله واتوب اليه 📿'
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون مسافات فارغة
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, command, text, usedPrefix }) => {
    const v = verse();
    
    try {
        const chatId = m.chat;

        let targetUser = null;
        let targetName = text;

        /* ✅ تحديد الهدف */
        if (m.quoted) {
            targetUser = m.quoted.sender;
            targetName = m.quoted.pushName || targetUser?.split('@')[0] || 'مجهول';
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            targetUser = m.mentionedJid[0];
            targetName = text || targetUser?.split('@')[0] || 'مجهول';
        } else if (text) {
            targetName = text;
            let phoneMatch = text.match(/\d{10,15}/g);
            if (phoneMatch) {
                targetUser = phoneMatch[0] + '@s.whatsapp.net';
            }
        } else {
            /* ✅ تصميم مضغوط */
            const errText = `${BRAND.emoji} *منشن شخص أو رد على رسالته*
━━━━━
📌 *الاستخدام:* .شخصية @مستخدم
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

            try {
                return await conn.sendButtonNormal(chatId, {
                    media: { url: getRandomImage() },
                    mediaType: 'image',
                    caption: errText,
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
                return m.reply(errText);
            }
        }

        /* ✅ تحديث الاسم من المجموعة */
        if (targetUser && targetName === targetUser?.split('@')[0]) {
            try {
                const metadata = await conn.groupMetadata(chatId);
                const participant = metadata?.participants?.find(p => 
                    (p.id || p.jid) === targetUser
                );
                if (participant?.name) {
                    targetName = participant.name;
                }
            } catch (e) {}
        }

        if (targetName === targetUser?.split('@')[0]) {
            targetName = m.pushName || targetUser.split('@')[0];
        }

        await conn.sendMessage(chatId, {
            react: { text: '🔮', key: m.key }
        });

        /* ✅ صورة البروفيل */
        let pp;
        if (targetUser) {
            try {
                pp = await conn.profilePictureUrl(targetUser, 'image');
            } catch (e) {
                pp = getRandomImage();
            }
        } else {
            pp = getRandomImage();
        }

        /* ═══════════════════════════════
           📊 التحليل الشامل — بدون مسافات
           ═══════════════════════════════ */
        const analysis = `${BRAND.emoji} *تحليل الشخصية*
👤 *${targetName}*
${targetUser ? `📱 @${targetUser.split('@')[0]}` : ''}
━━━━━
📊 *الإحصائيات:*
🌸 الأخلاق: ${randomPercent()}
🧠 الذكاء: ${randomPercent()}
💪 الشجاعة: ${randomPercent()}
🍀 الحظ: ${randomPercent()}
━━━━━
🎭 *الشخصية:*
• النوع: ${pickRandom(PERSONALITY_TYPES)}
• الطبيعة: ${pickRandom(NATURES)}
• الصفات: ${pickRandom(TRAITS)}
━━━━━
🎯 *الأنشطة:*
• دائماً: ${pickRandom(HABITS)}
• الهوايات: ${pickRandom(HOBBIES)}
• الطموح: ${pickRandom(AMBITIONS)}
━━━━━
👥 *اجتماعي:* ${pickRandom(SOCIAL_TRAITS)}
━━━━━
🔮 *توقع:* ${pickRandom(PREDICTIONS)}
━━━━━
⭐ *التقييم:* ${pickRandom(RATINGS)}
━━━━━
📝 *الخلاصة:* ${pickRandom(CONCLUSIONS)}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        const mentions = targetUser ? [targetUser] : [m.sender];

        /* ✅ إرسال التحليل */
        try {
            await conn.sendButtonNormal(chatId, {
                media: { url: pp },
                mediaType: 'image',
                caption: analysis,
                buttons: [
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `🔮 تحليل آخر`,
                            id: `.شخصية ${targetUser ? '@' + targetUser.split('@')[0] : ''}`
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
                mentions: mentions,
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                }
            }, m);
        } catch (e) {
            /* 🅱️ Fallback: رسالة عادية مع صورة */
            try {
                await conn.sendMessage(chatId, {
                    image: { url: pp },
                    caption: analysis,
                    mentions: mentions,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: BRAND.channelId,
                            newsletterName: BRAND.channelName,
                            serverMessageId: -1
                        }
                    }
                }, { quoted: m });
            } catch (e2) {
                await conn.sendMessage(chatId, {
                    text: analysis,
                    mentions: mentions
                }, { quoted: m });
            }
        }

    } catch (error) {
        console.error(`${BRAND.emoji} خطأ:`, error);
        
        /* ✅ تصميم مضغوط */
        const errMsg = `${BRAND.emoji} *فشل التحليل*
━━━━━
📌 حاول مرة أخرى
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`;
        
        await conn.sendMessage(m.chat, {
            text: errMsg
        }, { quoted: m });
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.usage = ['شخصية @مستخدم'];
handler.category = 'fun';
handler.command = ['شخصية', 'تحليل', 'اوصف'];
handler.description = '🔮 تحليل شخصية عشوائي شامل';

export default handler;