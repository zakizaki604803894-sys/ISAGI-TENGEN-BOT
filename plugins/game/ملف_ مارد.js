/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة المارد الأزرق
   📁 /home/container/plugins/game/مارد.js
   ✅ تصميم هاتف | بدون مسافات فارغة | صورة في المعاينة
   ═══════════════════════════════════════════════════════════ */

import axios from "axios";
import fetch from 'node-fetch';

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
    { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* 🖼️ الصورة الاحتياطية */
const MAIN_IMAGE = 'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9afb0fe0a.jpg';

/* 🔗 API المارد */
const api_obito = "https://mr-obito-api.vercel.app/api";

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
let handler = async function (m, { text, conn }) {
    const v = verse();
    
    if (!conn.aki) conn.aki = {};
    const sessionKey = `${m.chat}-${m.sender}`;
    const session = conn.aki[sessionKey];

    /* ═══════════════════════════════
       ✅ القائمة الرئيسية
       ═══════════════════════════════ */
    if (!text) {
        const bodyText = `${BRAND.emoji} *المارد الأزرق*
━━━━━
📌 *اختر من الأزرار* 👇
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        try {
            await conn.sendButtonNormal(m.chat, {
                media: { url: MAIN_IMAGE },
                mediaType: 'image',
                caption: bodyText,
                buttons: [
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `${BRAND.emoji} بدء اللعبة`,
                            id: `.مارد ابدا`
                        }
                    },
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `📘 مساعدة`,
                            id: `.مارد المساعدة`
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
                await conn.sendButton(m.chat, {
                    imageUrl: MAIN_IMAGE,
                    bodyText: bodyText,
                    footerText: `${BRAND.emoji} ${BRAND.botName}`,
                    buttons: [
                        {
                            name: 'quick_reply',
                            params: {
                                display_text: `${BRAND.emoji} بدء اللعبة`,
                                id: `.مارد ابدا`
                            }
                        },
                        {
                            name: 'quick_reply',
                            params: {
                                display_text: `📘 مساعدة`,
                                id: `.مارد المساعدة`
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
                    interactiveConfig: { buttons_limits: 3 }
                }, m);
            } catch (e2) {
                await m.reply(bodyText);
            }
        }
        return;
    }

    /* ═══════════════════════════════
       📘 المساعدة
       ═══════════════════════════════ */
    if (text === "المساعدة") {
        const helpText = `${BRAND.emoji} *مساعدة المارد*
━━━━━
📌 *الأوامر:*
▸ .مارد ابدا - بدء
▸ .مارد حذف - حذف
▸ .مارد رجوع - رجوع
━━━━━
📝 *الإجابات:*
نعم | لا | ربما | لا أعرف
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`;
        return m.reply(helpText);
    }

    /* ═══════════════════════════════
       🎮 بدء اللعبة
       ═══════════════════════════════ */
    if (text === "ابدا") {
        try {
            const { data } = await axios.post(`${api_obito}/akinator_start`);
            if (!data.session || !data.signature) return m.reply(`${BRAND.emoji} *فشل البدء*`);

            conn.aki[sessionKey] = {
                session: data.session,
                signature: data.signature,
                step: 0,
                progression: 0,
            };

            return await sendQuestion(m.chat, data.question, data.akitude_url || null, m, conn, sessionKey);
        } catch (err) {
            console.error(err);
            return m.reply(`${BRAND.emoji} *خطأ في البدء*`);
        }
    }

    /* ═══════════════════════════════
       🗑️ حذف الجلسة
       ═══════════════════════════════ */
    if (text === "حذف") {
        if (!session) return m.reply(`${BRAND.emoji} *لا توجد جلسة*`);
        delete conn.aki[sessionKey];
        return m.reply(`${BRAND.emoji} *تم الحذف*`);
    }

    /* ═══════════════════════════════
       ↩️ الرجوع
       ═══════════════════════════════ */
    if (text === "رجوع") {
        if (!session) return m.reply(`${BRAND.emoji} *لا توجد جلسة*`);
        try {
            const { data } = await axios.post(`${api_obito}/akinator_back`, {
                session: session.session,
                signature: session.signature,
                step: session.step,
                progression: session.progression,
                cm: "false",
            });

            conn.aki[sessionKey].step = data.step;
            conn.aki[sessionKey].progression = data.progression;

            return await sendQuestion(m.chat, data.question, data.akitude_url || null, m, conn, sessionKey);
        } catch (err) {
            console.error(err);
            return m.reply(`${BRAND.emoji} *لا يمكن الرجوع*`);
        }
    }

    /* ═══════════════════════════════
       ✅ الإجابات
       ═══════════════════════════════ */
    const answers = { "نعم": 0, "لا": 1, "لا أعرف": 2, "ربما": 3, "ربما لا": 4 };
    
    if (answers.hasOwnProperty(text)) {
        if (!session) return m.reply(`${BRAND.emoji} *ابدأ بـ .مارد ابدا*`);

        try {
            const { data } = await axios.post(`${api_obito}/akinator_answer`, {
                session: session.session,
                signature: session.signature,
                step: session.step,
                progression: session.progression,
                answer: answers[text],
                cm: "false",
                sid: "NaN",
                question_filter: "string",
            });

            /* ✅ النتيجة النهائية */
            if (data.name_proposition) {
                delete conn.aki[sessionKey];
                
                const resultText = `${BRAND.emoji} *النتيجة!* 🧞
━━━━━
🎭 *الشخصية:* ${data.name_proposition}
📝 *الوصف:* ${data.description_proposition || 'شخصية غامضة!'}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

                try {
                    await conn.sendButtonNormal(m.chat, {
                        media: { url: data.photo || MAIN_IMAGE },
                        mediaType: 'image',
                        caption: resultText,
                        buttons: [
                            {
                                name: 'quick_reply',
                                params: {
                                    display_text: `${BRAND.emoji} تكرار`,
                                    id: `.مارد ابدا`
                                }
                            },
                            {
                                name: 'quick_reply',
                                params: {
                                    display_text: `${BRAND.emoji} رئيسية`,
                                    id: `.مارد`
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
                        await conn.sendButton(m.chat, {
                            imageUrl: data.photo || MAIN_IMAGE,
                            bodyText: resultText,
                            footerText: `${BRAND.emoji} ${BRAND.botName}`,
                            buttons: [
                                {
                                    name: 'quick_reply',
                                    params: {
                                        display_text: `${BRAND.emoji} تكرار`,
                                        id: `.مارد ابدا`
                                    }
                                },
                                {
                                    name: 'quick_reply',
                                    params: {
                                        display_text: `${BRAND.emoji} رئيسية`,
                                        id: `.مارد`
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
                            interactiveConfig: { buttons_limits: 3 }
                        }, m);
                    } catch (e2) {
                        await m.reply(resultText);
                    }
                }
                return;
            }

            conn.aki[sessionKey].step = data.step;
            conn.aki[sessionKey].progression = data.progression;

            return await sendQuestion(m.chat, data.question, data.akitude_url || null, m, conn, sessionKey);
        } catch (err) {
            console.error(err);
            return m.reply(`${BRAND.emoji} *خطأ في الإجابة*`);
        }
    }
};

/* ═══════════════════════════════════════════
   ✅ دالة إرسال السؤال
   ═══════════════════════════════════════════ */
async function sendQuestion(jid, question, imgUrl, m, conn, sessionKey) {
    const v = verse();
    
    try {
        const session = conn.aki[sessionKey];
        
        const buttons = [
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: '✅ نعم', 
                    id: `.مارد نعم` 
                } 
            },
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: '❌ لا', 
                    id: `.مارد لا` 
                } 
            },
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: '🤔 لا أعرف', 
                    id: `.مارد لا أعرف` 
                } 
            },
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: '🤷 ربما', 
                    id: `.مارد ربما` 
                } 
            },
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: '👎 ربما لا', 
                    id: `.مارد ربما لا` 
                } 
            },
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: '↩️ رجوع', 
                    id: `.مارد رجوع` 
                } 
            },
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: '🛑 إنهاء', 
                    id: `.مارد حذف` 
                } 
            }
        ];

        /* ✅ تصميم مضغوط */
        const bodyText = `${BRAND.emoji} *سؤال ${(session?.step || 0) + 1}*
━━━━━
❓ ${question}
━━━━━
📌 *اختر إجابتك* 👇
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        /* ✅ sendButtonNormal — يضمن الصورة في المعاينة */
        try {
            await conn.sendButtonNormal(jid, {
                media: { url: imgUrl || MAIN_IMAGE },
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
            /* 🅱️ Fallback: sendButton */
            try {
                await conn.sendButton(jid, {
                    imageUrl: imgUrl || MAIN_IMAGE,
                    bodyText: bodyText,
                    footerText: `${BRAND.emoji} ${BRAND.botName}`,
                    buttons: buttons,
                    mentions: [m.sender],
                    newsletter: {
                        name: BRAND.channelName,
                        jid: BRAND.channelId
                    },
                    interactiveConfig: { buttons_limits: 7 }
                }, m);
            } catch (e2) {
                await conn.sendMessage(jid, { text: bodyText }, { quoted: m });
            }
        }

    } catch (e) {
        console.error(`${BRAND.emoji} فشل:`, e);
        await conn.sendMessage(jid, { text: `${BRAND.emoji} ${question}` }, { quoted: m });
    }
}

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = /^مارد$/i;
handler.category = 'game';

export default handler;