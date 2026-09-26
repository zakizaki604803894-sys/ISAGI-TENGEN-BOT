// 🦋 ملف: ق.js - صورة + صوت عشوائي - شينوبو بوت 🦋

import axios from 'axios';
import { writeFileSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const EMOJI = '🦋';
const BOT_NAME = '┆𝑺𝑯𝑰𝑵𝑶𝑩𝑼 ⊰🦋⊱ 𝑩𝑶𝑻┆';
const DEVELOPER = 'شينوبو 🦋';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';

// ─── قوائم الصور (شينوبو) ───
const IMAGES = [
    "https://i.pinimg.com/1200x/83/b1/29/83b129d788d7a2fd4ddc678b211b79f3.jpg",
    "https://i.postimg.cc/h42ZJym2/telechargement.jpg",
    "https://i.pinimg.com/736x/07/e7/1a/07e71adcb1f4d9ab2e01b7b366c18ccc.jpg",
    "https://i.pinimg.com/736x/ec/b1/a7/ecb1a71fdcefef463c6f5254583678a4.jpg",
    "https://i.pinimg.com/736x/b9/56/18/b95618533b8131567e4e0dd09f25a4b1.jpg",
    "https://i.pinimg.com/736x/fb/83/7d/fb837dd610d5a761e386a56b1ae58119.jpg",
    "https://i.pinimg.com/736x/0e/4a/e4/0e4ae41be9e8d5df897533ce18c70ce4.jpg",
    "https://i.postimg.cc/W3NLVDRN/telechargement-(1).jpg"
];

// ─── قوائم الصوت (احتفظنا بالروابط الموجودة) ───
const AUDIOS = [
    'https://files.catbox.moe/2t3dxz.m4a',
    'https://files.catbox.moe/ofq35x.m4a',
    'https://files.catbox.moe/79l190.m4a',
    'https://files.catbox.moe/fy77hg.mp3',
    'https://files.catbox.moe/cxtuxn.mp3',
    'https://files.catbox.moe/vhpcmw.mp3',
    'https://files.catbox.moe/vzi6xc.mp3',
    'https://files.catbox.moe/g2g30o.mp3',
    'https://files.catbox.moe/dk4vcn.mp3',
    'https://files.catbox.moe/icflub.mp3',
    'https://files.catbox.moe/iqgv5u.m4a',
    'https://files.catbox.moe/oq59gm.m4a',
    'https://files.catbox.moe/794vrl.m4a',
    'https://files.catbox.moe/q6usig.m4a',
    'https://files.catbox.moe/avupxm.mp3',
    'https://files.catbox.moe/lcn6yw.mp3',
    'https://files.catbox.moe/v4tjlu.m4a',
    'https://files.catbox.moe/w3fzy7.m4a'
];

// ─── اختيار عشوائي ───
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

let handler = async (m, { conn }) => {
    const imageUrl = pickRandom(IMAGES);
    const audioUrl = pickRandom(AUDIOS);

    const tmpDir = '/data/data/com.termux/files/home/sovereignx-core/tmp';
    const imagePath = resolve(tmpDir, `q_${Date.now()}.jpg`);
    const audioPath = resolve(tmpDir, `q_${Date.now()}_audio.mp3`);

    try {
        // ─── تحميل الصورة ───
        const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 15000 });
        writeFileSync(imagePath, Buffer.from(imgRes.data));

        // ─── تحميل الصوت ───
        const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer', timeout: 15000 });
        writeFileSync(audioPath, Buffer.from(audioRes.data));

        // ─── إرسال الصورة مع النص ───
        await conn.sendMessage(m.chat, {
            image: { url: imagePath },
            caption: `${EMOJI} *${BOT_NAME}*\n💜 تحت إمرتك دائماً يا سيدي\n\n📌 قناة البوت: ${CHANNEL_LINK}`,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        });

        // ─── إرسال الصوت كـ voice note ───
        await conn.sendMessage(m.chat, {
            audio: { url: audioPath },
            mimetype: 'audio/mpeg',
            ptt: true  // voice note
        });

        // ─── تنظيف الملفات ───
        try {
            unlinkSync(imagePath);
            unlinkSync(audioPath);
        } catch (e) {}

    } catch (error) {
        console.error('🦋 خطأ في الأمر ق:', error);
        m.reply(`${EMOJI} ❌ فشل في جلب الصورة أو الصوت\n💜 تحت إمرتك دائماً يا سيدي`);
    }
};

handler.command = ['ق'];
handler.desc = 'صورة + صوت عشوائي';

export default handler;