// 🍁 ملف: انستغرام.js - تحميل من انستغرام - ISAGI TENGEN BOT

import axios from 'axios';

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const DEVELOPER = 'تنغن كيرا';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';
const MAIN_IMAGE = 'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9af3b0fe0a.jpg';

const CHANNEL_INFO = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: CHANNEL_JID,
            newsletterName: CHANNEL_NAME,
            serverMessageId: -1
        }
    }
};

const processedMessages = new Set();

function extractUniqueMedia(mediaData = []) {
    const seen = new Set();
    return mediaData.filter((m) => {
        if (!m?.url || seen.has(m.url)) return false;
        seen.add(m.url);
        return true;
    });
}

// ✅ APIs بديلة لتحميل انستغرام
const INSTAGRAM_APIS = [
    async (url) => {
        const res = await axios.get(`https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(url)}`, {
            timeout: 15000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        return res.data;
    },
    async (url) => {
        const res = await axios.get(`https://api-aswin-sparky.koyeb.app/api/downloader/instagram?url=${encodeURIComponent(url)}`, {
            timeout: 15000
        });
        return res.data;
    },
    async (url) => {
        const res = await axios.get(`https://jerrycoder.oggyapi.workers.dev/down/insta?url=${encodeURIComponent(url)}`, {
            timeout: 15000
        });
        return res.data;
    }
];

const handler = async (m, { conn, text, command }) => {
    const chatId = m.chat;
    const url = text?.trim();

    try {
        // ✅ منع التكرار
        if (processedMessages.has(m.key.id)) return;
        processedMessages.add(m.key.id);
        setTimeout(() => processedMessages.delete(m.key.id), 5 * 60 * 1000);

        if (!url) {
            const bodyText = `${EMOJI}━━━[ *📸 تحميل انستغرام* ]━━━${EMOJI}

📌 *طريقة الاستخدام:*
▸ .انستغرام رابط منشور/ريل/فيديو

📝 *مثال:*
▸ .انستغرام https://instagram.com/p/...

${EMOJI} *${BOT_NAME}*`;

            try {
                await conn.sendButton(chatId, {
                    imageUrl: MAIN_IMAGE,
                    bodyText: bodyText,
                    footerText: `${EMOJI} ${BOT_NAME}`,
                    buttons: [
                        {
                            name: 'cta_url',
                            params: {
                                display_text: `${EMOJI} قناة البوت`,
                                url: CHANNEL_LINK
                            }
                        }
                    ],
                    mentions: [m.sender],
                    newsletter: {
                        name: CHANNEL_NAME,
                        jid: CHANNEL_JID
                    },
                    interactiveConfig: { buttons_limits: 20 }
                }, m);
            } catch (e) {
                await conn.sendMessage(chatId, {
                    text: bodyText,
                    ...CHANNEL_INFO
                }, { quoted: m });
            }
            return;
        }

        // ✅ التحقق من صحة الرابط
        const igRegex = /https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(p|reel|tv)\//i;
        if (!igRegex.test(url)) {
            return await conn.sendMessage(chatId, {
                text: `${EMOJI} ❌ *رابط انستغرام غير صالح*\n\n📌 *يرجى إرسال رابط منشور، ريل، أو فيديو صحيح.*`,
                ...CHANNEL_INFO
            }, { quoted: m });
        }

        await conn.sendMessage(chatId, { react: { text: "🔄", key: m.key } });

        let mediaList = [];

        // ✅ تجربة جميع APIs
        for (const api of INSTAGRAM_APIS) {
            try {
                const data = await api(url);
                
                // ✅ استخراج البيانات من API 1 (siputzx)
                if (data?.data?.length > 0) {
                    mediaList = data.data.map(item => ({
                        url: item.url || item.downloadUrl,
                        type: item.type || (item.url?.includes('.mp4') ? 'video' : 'image')
                    }));
                    break;
                }
                
                // ✅ استخراج من API 2 (aswin-sparky)
                if (data?.data?.url || data?.result?.url) {
                    const item = data.data || data.result;
                    mediaList = [{
                        url: item.url || item.video || item.hd || item.sd,
                        type: item.type || (item.url?.includes('.mp4') ? 'video' : 'image')
                    }];
                    break;
                }
                
                // ✅ استخراج من API 3 (jerrycoder)
                if (data?.data?.media?.length > 0) {
                    mediaList = data.data.media.map(item => ({
                        url: item.url || item.downloadUrl,
                        type: item.type || 'image'
                    }));
                    break;
                }
            } catch (e) {
                console.log(`${EMOJI} API فشلت:`, e.message);
                continue;
            }
        }

        // ✅ إذا لم يتم العثور على بيانات
        if (!mediaList.length) {
            // محاولة استخدام ruhend-scraper كبديل
            try {
                const { igdl } = await import('ruhend-scraper');
                const res = await igdl(url);
                if (res?.data?.length) {
                    mediaList = res.data.map(item => ({
                        url: item.url,
                        type: item.type || (item.url?.includes('.mp4') ? 'video' : 'image')
                    }));
                }
            } catch (e) {
                console.log(`${EMOJI} ruhend-scraper فشل:`, e.message);
            }
        }

        if (!mediaList.length) {
            return await conn.sendMessage(chatId, {
                text: `${EMOJI} ❌ *لا توجد وسائط للتحميل*\n\n📌 *قد يكون المنشور خاصاً أو غير متاح.*`,
                ...CHANNEL_INFO
            }, { quoted: m });
        }

        // ✅ تصفية وتحديد عدد الملفات
        const uniqueMedia = extractUniqueMedia(mediaList).slice(0, 10);

        for (let i = 0; i < uniqueMedia.length; i++) {
            const media = uniqueMedia[i];
            const isVideo = media.type === 'video' ||
                /\.(mp4|mov|webm|mkv)$/i.test(media.url) ||
                url.includes('/reel/') ||
                url.includes('/tv/');

            const caption = `${EMOJI}━━━[ *📸 انستغرام* ]━━━${EMOJI}

📌 *${isVideo ? '🎬 فيديو' : '🖼️ صورة'} ${i + 1}/${uniqueMedia.length}*

${EMOJI} *${BOT_NAME}*`;

            if (isVideo) {
                await conn.sendMessage(chatId, {
                    video: { url: media.url },
                    mimetype: 'video/mp4',
                    caption: caption,
                    ...CHANNEL_INFO
                }, { quoted: m });
            } else {
                await conn.sendMessage(chatId, {
                    image: { url: media.url },
                    caption: caption,
                    ...CHANNEL_INFO
                }, { quoted: m });
            }

            if (i < uniqueMedia.length - 1) {
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        await conn.sendMessage(chatId, { react: { text: "✅", key: m.key } });

    } catch (err) {
        console.error('❌ خطأ في تحميل انستغرام:', err);

        await conn.sendMessage(chatId, { react: { text: "❌", key: m.key } });

        await conn.sendMessage(chatId, {
            text: `${EMOJI} ❌ *فشل تحميل الوسائط*\n\n📌 *السبب:* ${err.message || 'يرجى المحاولة مرة أخرى'}`,
            ...CHANNEL_INFO
        }, { quoted: m });
    }
};

handler.command = ['انستغرام', 'instagram', 'ig', 'انستا', 'insta', 'تحميل_انستغرام'];
handler.category = 'download';

export default handler;