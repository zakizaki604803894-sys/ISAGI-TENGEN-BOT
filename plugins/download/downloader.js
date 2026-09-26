// 🍁 ملف: downloader.js - تحميل شامل - ISAGI TENGEN BOT

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

const handler = async (m, { conn, text, command }) => {
    const chatId = m.chat;
    let url = text?.trim();

    // ✅ إذا كان رد على رسالة، استخرج الرابط
    if (!url && m.quoted) {
        const quotedText = m.quoted.text || m.quoted.caption || '';
        const match = quotedText.match(/https?:\/\/[^\s]+/gi);
        if (match) url = match[0];
    }

    if (!url || !url.startsWith('http')) {
        const bodyText = `${EMOJI}━━━[ *📥 تحميل شامل* ]━━━${EMOJI}

📌 *طريقة الاستخدام:*
▸ .تحميل رابط

📝 *الروابط المدعومة:*
▸ إنستغرام 📸
▸ فيسبوك 📘
▸ يوتيوب 🎬
▸ ثريدز 🧵
▸ تويتر / X 🐦

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

    try {
        await conn.sendMessage(chatId, { react: { text: "⏳", key: m.key } });

        let mediaUrl = null;
        let mediaType = 'video';
        let title = 'ميديا';

        // ═══════════════════════════════════════
        // 1. إنستغرام 📸
        // ═══════════════════════════════════════
        if (url.includes('instagram.com')) {
            const apis = [
                `https://api-aswin-sparky.koyeb.app/api/downloader/instagram?url=${encodeURIComponent(url)}`,
                `https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(url)}`
            ];
            for (const api of apis) {
                try {
                    const { data } = await axios.get(api, { timeout: 15000 });
                    mediaType = data?.data?.type || data?.result?.type || 'video';
                    mediaUrl = data?.result?.url || data?.result?.video || data?.data?.url || data?.data?.video || data?.url;
                    if (mediaUrl) break;
                } catch (e) { continue; }
            }
            title = '📸 إنستغرام';
        }

        // ═══════════════════════════════════════
        // 2. يوتيوب 🎬
        // ═══════════════════════════════════════
        else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const apis = [
                `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`,
                `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(url)}`
            ];
            for (const api of apis) {
                try {
                    const { data } = await axios.get(api, { timeout: 15000 });
                    mediaUrl = data?.data?.dl || data?.data?.url || data?.result?.download_url || data?.result?.url || data?.result?.video || data?.url;
                    if (mediaUrl) break;
                } catch (e) { continue; }
            }
            title = '🎬 يوتيوب';
        }

        // ═══════════════════════════════════════
        // 3. فيسبوك 📘
        // ═══════════════════════════════════════
        else if (url.includes('facebook.com') || url.includes('fb.watch')) {
            const apis = [
                `https://api-aswin-sparky.koyeb.app/api/downloader/fbdl?url=${encodeURIComponent(url)}`,
                `https://api.siputzx.my.id/api/d/fb?url=${encodeURIComponent(url)}`
            ];
            for (const api of apis) {
                try {
                    const { data } = await axios.get(api, { timeout: 20000 });
                    const result = data?.data || data?.result || data;
                    mediaUrl = result?.high || result?.hd || result?.sd || result?.video || result?.url || result?.download;
                    if (mediaUrl) break;
                } catch (e) { continue; }
            }
            title = '📘 فيسبوك';
        }

        // ═══════════════════════════════════════
        // 4. ثريدز 🧵
        // ═══════════════════════════════════════
        else if (url.includes('threads.net')) {
            const api = `https://api-aswin-sparky.koyeb.app/api/downloader/threads?url=${encodeURIComponent(url)}`;
            try {
                const { data } = await axios.get(api, { timeout: 15000 });
                mediaUrl = data?.result?.video_url || data?.data?.url;
            } catch (e) {}
            title = '🧵 ثريدز';
        }

        // ═══════════════════════════════════════
        // 5. تويتر / X 🐦
        // ═══════════════════════════════════════
        else if (url.includes('twitter.com') || url.includes('x.com')) {
            const apis = [
                `https://eliteprotech-apis.zone.id/x?url=${encodeURIComponent(url)}`,
                `https://api.siputzx.my.id/api/d/twitter?url=${encodeURIComponent(url)}`
            ];
            for (const api of apis) {
                try {
                    const { data } = await axios.get(api, { timeout: 15000 });
                    mediaUrl = data?.result?.video_url || data?.data?.url || data?.result?.hd || data?.url || data?.result?.media?.[0]?.url;
                    if (mediaUrl) break;
                } catch (e) { continue; }
            }
            title = '🐦 تويتر';
        }

        // ═══════════════════════════════════════
        // رابط غير مدعوم
        // ═══════════════════════════════════════
        else {
            return await conn.sendMessage(chatId, {
                text: `${EMOJI} ❌ *رابط غير مدعوم*\n\n📌 *الروابط المدعومة:*\n▸ إنستغرام\n▸ فيسبوك\n▸ يوتيوب\n▸ ثريدز\n▸ تويتر/X`,
                ...CHANNEL_INFO
            }, { quoted: m });
        }

        if (!mediaUrl) {
            throw new Error('لا يمكن العثور على رابط التحميل');
        }

        // ✅ تحديد نوع الميديا
        const messageType = mediaType?.toLowerCase() === 'image' ? 'image' : 'video';

        // ✅ إرسال الميديا
        const caption = `${EMOJI}━━━[ *📥 تحميل* ]━━━${EMOJI}

${title}

${EMOJI} *${BOT_NAME}*`;

        await conn.sendMessage(chatId, {
            [messageType]: { url: mediaUrl },
            caption: caption,
            ...CHANNEL_INFO
        }, { quoted: m });

        await conn.sendMessage(chatId, { react: { text: "✅", key: m.key } });

    } catch (err) {
        console.error('❌ خطأ في التحميل:', err);

        await conn.sendMessage(chatId, { react: { text: "❌", key: m.key } });

        await conn.sendMessage(chatId, {
            text: `${EMOJI} ❌ *فشل التحميل*\n\n📌 *السبب:* ${err.message || 'يرجى المحاولة مرة أخرى'}`,
            ...CHANNEL_INFO
        }, { quoted: m });
    }
};

handler.command = ['تحميل', 'download', 'dl', 'تنزيل'];
handler.category = 'download';

export default handler;