/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — بحث وتحميل من يوتيوب
   📁 /home/container/plugins/downloader/يوتيوب.js
   ✅ تصميم هاتف | بدون رابط في النص | 13 صورة عشوائية
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
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, text, command }) => {
    const v = verse();
    const body = text || m.body || '';

    /* ═══════════════════════════════
       🎵 تحميل صوت
       ═══════════════════════════════ */
    if (body.startsWith('.يوت_اغنيه')) {
        const url = body.replace('.يوت_اغنيه', '').trim();
        if (url) {
            await audioHandler(m, { conn, text: url });
            return;
        }
    }

    /* ═══════════════════════════════
       🎬 تحميل فيديو
       ═══════════════════════════════ */
    if (body.startsWith('.يوتيوب')) {
        const url = body.replace('.يوتيوب', '').trim();
        if (url) {
            await videoHandler(m, { conn, text: url });
            return;
        }
    }

    /* ═══════════════════════════════
       📌 عرض المساعدة
       ═══════════════════════════════ */
    if (!text) {
        const helpText = `${BRAND.emoji} *تحميل من يوتيوب*

━━━━━

📌 *الاستخدام:*
▸ .شغل اسم الأغنية

━━━━━

📝 *مثال:*
▸ .شغل حبيبتي

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        const buttons = [
            {
                name: 'cta_url',
                params: {
                    display_text: `📢 قناة البوت`,
                    url: BRAND.channelLink
                }
            }
        ];

        try {
            return await conn.sendButtonNormal(m.chat, {
                media: { url: getRandomImage() },
                mediaType: 'image',
                caption: helpText,
                buttons: buttons,
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
                    bodyText: helpText,
                    footerText: `${BRAND.emoji} ${BRAND.botName}`,
                    buttons: buttons,
                    mentions: [m.sender],
                    newsletter: {
                        name: BRAND.channelName,
                        jid: BRAND.channelId
                    },
                    interactiveConfig: { buttons_limits: 20 }
                }, m);
            } catch (e2) {
                return m.reply(helpText);
            }
        }
    }

    /* ═══════════════════════════════
       🔍 البحث
       ═══════════════════════════════ */
    try {
        await m.react('🔍');

        const res = await fetch(
            `https://emam-api.web.id/home/sections/Search/api/YouTube/search?q=${encodeURIComponent(text)}`,
            { signal: AbortSignal.timeout(15000) }
        );
        const json = await res.json();
        const data = json?.data;

        if (!Array.isArray(data) || !data.length) {
            await m.react('❌');
            return m.reply(`${BRAND.emoji} ❌ مش لاقي نتائج، جرب كلمة تانية`);
        }

        const { title, image, timestamp: time, url } = data[0];

        if (!url) {
            await m.react('❌');
            return m.reply(`${BRAND.emoji} ❌ مش لاقي الفيديو`);
        }

        await m.react('✅');

        const bodyText = `${BRAND.emoji} *نتيجة البحث*

━━━━━

📌 ${title || 'بدون عنوان'}
⏱️ ${time || ''}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

📌 *اختر التحميل 👇*

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`;

        const buttons = [
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: `🎵 تحميل صوت`, 
                    id: `.يوت_اغنيه ${url}` 
                } 
            },
            { 
                name: 'quick_reply', 
                params: { 
                    display_text: `🎬 تحميل فيديو`, 
                    id: `.يوتيوب ${url}` 
                } 
            },
            {
                name: 'cta_url',
                params: {
                    display_text: `📢 قناة البوت`,
                    url: BRAND.channelLink
                }
            }
        ];

        try {
            return await conn.sendButtonNormal(m.chat, {
                media: { url: image || getRandomImage() },
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
            try {
                return await conn.sendButton(m.chat, {
                    imageUrl: image || getRandomImage(),
                    bodyText: bodyText,
                    footerText: `${BRAND.emoji} ${BRAND.botName}`,
                    buttons: buttons,
                    mentions: [m.sender],
                    newsletter: {
                        name: BRAND.channelName,
                        jid: BRAND.channelId
                    },
                    interactiveConfig: { buttons_limits: 10 }
                }, m);
            } catch (e2) {
                return m.reply(bodyText);
            }
        }

    } catch (e) {
        console.error(`${BRAND.emoji} خطأ:`, e);
        await m.react('❌');
        await m.reply(`${BRAND.emoji} ❌ فشل البحث: ${e.message?.slice(0, 60)}`);
    }
};

/* ═══════════════════════════════════════════
   🎵 تحميل الصوت
   ═══════════════════════════════════════════ */
const audioHandler = async (m, { conn, text }) => {
    const url = text?.trim();
    if (!url) return;
    
    const v = verse();
    await m.react('⏳');
    await m.reply(`${BRAND.emoji} ⏳ *جاري تحميل الصوت...*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
    
    try {
        const apis = [
            `https://xenoytdl-2.vercel.app/api/youtube?url=${encodeURIComponent(url)}`,
            `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`,
            `https://api.doude.pw/api/ytmp3?url=${encodeURIComponent(url)}`
        ];

        let audioUrl = null;
        let title = 'صوت';

        for (const api of apis) {
            try {
                const res = await fetch(api, { signal: AbortSignal.timeout(20000) });
                const data = await res.json();
                
                let audio = data?.data?.dl || data?.data?.download || data?.download || data?.url || data?.result?.audio || data?.audio || data?.link;
                let videoTitle = data?.title || data?.data?.title || data?.result?.title || 'صوت';
                
                if (audio && typeof audio === "string" && audio.startsWith("http")) {
                    audioUrl = audio;
                    title = videoTitle;
                    break;
                }
            } catch (e) {
                console.log(`${BRAND.emoji} API فشلت: ${api}`);
            }
        }

        if (!audioUrl) {
            throw new Error('لا يوجد رابط تحميل');
        }

        const audioRes = await fetch(audioUrl, { signal: AbortSignal.timeout(30000) });
        const audioBuffer = await audioRes.arrayBuffer();

        await conn.sendMessage(m.chat, {
            audio: Buffer.from(audioBuffer),
            mimetype: 'audio/mpeg',
            ptt: false,
            fileName: `${title || 'صوت'}.mp3`
        }, { quoted: m });

        await m.react('✅');
        
        const successText = `${BRAND.emoji} ✅ *تم تحميل الصوت بنجاح!*

━━━━━

🎵 *العنوان:* ${title}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`;
        
        await m.reply(successText);

    } catch (err) {
        console.error(`${BRAND.emoji} خطأ في تحميل الصوت:`, err);
        await m.react('❌');
        await m.reply(`${BRAND.emoji} ❌ *فشل تحميل الصوت:* ${err.message || ''}`);
    }
};

/* ═══════════════════════════════════════════
   🎬 تحميل الفيديو
   ═══════════════════════════════════════════ */
const videoHandler = async (m, { conn, text }) => {
    const url = text?.trim();
    if (!url) return;
    
    const v = verse();
    await m.react('⏳');
    await m.reply(`${BRAND.emoji} ⏳ *جاري تحميل الفيديو...*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}`);
    
    try {
        const apis = [
            `https://xenoytdl-2.vercel.app/api/youtube?url=${encodeURIComponent(url)}`,
            `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`,
            `https://api.doude.pw/api/ytmp4?url=${encodeURIComponent(url)}`
        ];

        let videoUrl = null;
        let title = 'فيديو';

        for (const api of apis) {
            try {
                const res = await fetch(api, { signal: AbortSignal.timeout(20000) });
                const data = await res.json();
                
                let video = data?.data?.video || data?.video || data?.result?.video || data?.result?.url_video || data?.result?.download_url || data?.download || data?.url || data?.link;
                let videoTitle = data?.title || data?.data?.title || data?.result?.title || 'فيديو';
                
                if (!video && data?.data?.links) {
                    const links = data.data.links;
                    const quality720 = links.find(l => l.quality === '720p' || l.qualityLabel === '720p');
                    if (quality720) video = quality720.url || quality720.downloadUrl;
                    if (!video) video = links[links.length - 1]?.url;
                }
                
                if (video && typeof video === "string" && video.startsWith("http")) {
                    videoUrl = video;
                    title = videoTitle;
                    break;
                }
            } catch (e) {
                console.log(`${BRAND.emoji} API فشلت: ${api}`);
            }
        }

        if (!videoUrl) {
            throw new Error('لا يوجد رابط تحميل');
        }

        const videoRes = await fetch(videoUrl, { signal: AbortSignal.timeout(60000) });
        const videoBuffer = await videoRes.arrayBuffer();

        await conn.sendMessage(m.chat, {
            video: Buffer.from(videoBuffer),
            mimetype: 'video/mp4',
            caption: `${BRAND.emoji} *${title || 'فيديو'}*

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`
        }, { quoted: m });
        
        await m.react('✅');

    } catch (err) {
        console.error(`${BRAND.emoji} خطأ في تحميل الفيديو:`, err);
        await m.react('❌');
        await m.reply(`${BRAND.emoji} ❌ *فشل تحميل الفيديو:* ${err.message || ''}`);
    }
};

handler.command = ['شغل', 'play', 'اغنية', 'فيديو', 'اغنيه'];
handler.category = 'downloads';

export default handler;