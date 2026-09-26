// 🍁 ملف: capcut.js - تحميل فيديو من كاب كت - ISAGI TENGEN BOT

// ✅ التصحيح: استيراد pkg ثم استخراج capcut
import pkg from 'btch-downloader';
const { capcut } = pkg;

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const DEVELOPER = 'تنغن كيرا';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';
const MAIN_IMAGE = 'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9af3b0fe0a.jpg';

function extractVideoUrl(data) {
    const d = data?.data || data;
    return d?.video_url || d?.video || d?.url || d?.download_url || d?.play || d?.downloadUrl;
}

const handler = async (m, { conn, text }) => {
    const chatId = m.chat;

    if (!text) {
        const bodyText = `${EMOJI}━━━[ *📥 تحميل كاب كت* ]━━━${EMOJI}

📌 *طريقة الاستخدام:*
▸ .كاب_كت رابط الفيديو

📝 *مثال:*
▸ .كاب_كت https://www.capcut.com/...

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
            await m.reply(bodyText);
        }
        return;
    }

    if (!text.includes('capcut.com') && !text.includes('capcut.link')) {
        return m.reply(`${EMOJI} ❌ *الرابط مش من كاب كت*`);
    }

    try {
        await m.react('⏳');
        await m.reply(`${EMOJI} ⏳ *جاري تحميل الفيديو من كاب كت...*`);

        const result = await capcut(text.trim());
        console.log(`${EMOJI} [capcut.js] رد المكتبة:`, JSON.stringify(result).slice(0, 300));

        const videoUrl = extractVideoUrl(result);
        if (!videoUrl) {
            throw new Error('ما قدرتش أجيب رابط الفيديو من الرد');
        }

        const fileRes = await fetch(videoUrl, { signal: AbortSignal.timeout(60000) });
        if (!fileRes.ok) {
            throw new Error(`السيرفر رجع خطأ ${fileRes.status}`);
        }
        const buffer = Buffer.from(await fileRes.arrayBuffer());

        const d = result?.data || result;
        const caption = `${EMOJI}━━━[ *🎬 تحميل كاب كت* ]━━━${EMOJI}

📌 *العنوان:* ${d?.title || 'فيديو كاب كت'}

${EMOJI} *${BOT_NAME}*`;

        await conn.sendMessage(chatId, {
            video: buffer,
            caption: caption,
            mimetype: 'video/mp4'
        }, { quoted: m });

        await m.react('✅');

    } catch (e) {
        console.error(`${EMOJI} خطأ في تحميل كاب كت:`, e);
        await m.react('❌');
        await m.reply(`${EMOJI} ❌ *فشل التحميل:*\n📌 ${e.message?.slice(0, 150)}`);
    }
};

handler.usage = ['كاب_كت'];
handler.command = ['كاب_كت', 'capcut', 'كابكت'];
handler.category = 'downloads';

export default handler;