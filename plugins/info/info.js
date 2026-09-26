// 🦋 ملف: معلومات.js - عرض معلومات البوت - شينوبو بوت 🦋

import os from 'os';

const EMOJI = '🦋';
const BOT_NAME = '┆𝑺𝑯𝑰𝑵𝑶𝑩𝑼 ⊰🦋⊱ 𝑩𝑶𝑻┆';
const DEVELOPER = 'شينوبو 🦋';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑺𝑯𝑰𝑵𝑶𝑩𝑼 ⊰🦋⊱ 𝑩𝑶𝑻┆';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';

// ✅ صور شينوبو (عشوائية)
const SHINOBU_IMAGES = [
    "https://i.pinimg.com/1200x/83/b1/29/83b129d788d7a2fd4ddc678b211b79f3.jpg",
    "https://i.postimg.cc/h42ZJym2/telechargement.jpg",
    "https://i.pinimg.com/736x/07/e7/1a/07e71adcb1f4d9ab2e01b7b366c18ccc.jpg",
    "https://i.pinimg.com/736x/ec/b1/a7/ecb1a71fdcefef463c6f5254583678a4.jpg",
    "https://i.pinimg.com/736x/b9/56/18/b95618533b8131567e4e0dd09f25a4b1.jpg",
    "https://i.pinimg.com/736x/fb/83/7d/fb837dd610d5a761e386a56b1ae58119.jpg",
    "https://i.pinimg.com/736x/0e/4a/e4/0e4ae41be9e8d5df897533ce18c70ce4.jpg",
    "https://i.postimg.cc/W3NLVDRN/telechargement-(1).jpg"
];

const getRandomImage = () => SHINOBU_IMAGES[Math.floor(Math.random() * SHINOBU_IMAGES.length)];

// ✅ أرقام المطورين
const OWNERS_PHONES = [
    '212708613251',
    '212705081267',
    '212710825724',
    '212634266182'
];

// 🦋 سياق الرسالة - مبسط بدون externalAdReply
const getContext = (jid) => ({
    mentionedJid: [jid]
});

const handler = async (m, { conn, bot, config }) => {
    // ✅ معلومات الذاكرة
    const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
    const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
    const heapTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(1);
    const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
    const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);
    
    // ✅ معلومات المعالج
    const cpuCores = os.cpus().length;
    const cpuModel = os.cpus()[0]?.model || 'Unknown';
    const cpuSpeed = (os.cpus()[0]?.speed / 1000).toFixed(1) || '0';
    const cpuUsage = (os.loadavg()[0] * 100).toFixed(1);
    
    // ✅ معلومات النظام
    const platform = os.platform();
    const arch = os.arch();
    const hostname = os.hostname();
    
    // ✅ مدة التشغيل
    const uptime = process.uptime();
    const uptimeHours = Math.floor(uptime / 3600);
    const uptimeMins = Math.floor((uptime % 3600) / 60);
    const uptimeSecs = Math.floor(uptime % 60);
    
    // ✅ معلومات المجموعات
    let groupCount = 0;
    try {
        const groups = await conn.groupFetchAllParticipating();
        groupCount = Object.values(groups).length;
    } catch (e) {
        console.log('🦋 فشل جلب المجموعات:', e);
    }
    
    // ✅ معلومات البوتات الفرعية
    const subBots = global.subBots;
    const subCount = subBots?.list?.()?.length || 0;
    const subConnected = subBots?.list?.()?.filter(b => b.connected).length || 0;
    
    // ✅ معلومات البوت
    const botName = conn.user?.name || BOT_NAME;
    const botNumber = conn.user?.id?.split(':')[0] || 'غير معروف';
    
    // ✅ المطورين
    const owners = bot?.config?.owners || [];
    const mainOwner = owners[0] || { name: DEVELOPER, jid: '212708613251@s.whatsapp.net' };
    
    // ✅ بناء قائمة المطورين
    let ownersList = '';
    OWNERS_PHONES.forEach((phone, index) => {
        ownersList += `   ${index + 1}. +${phone}\n`;
    });

    // ✅ بناء الرسالة
    const msg = `${EMOJI}━━━[ *معلومات البوت* ]━━━${EMOJI}

——> *الـبـوت 🤖*
- *الاسم:* ${botName}
- *الرقم:* wa.me/${botNumber}
- *شغال منذ:* ${String(uptimeHours).padStart(2, '0')}:${String(uptimeMins).padStart(2, '0')}:${String(uptimeSecs).padStart(2, '0')}

——> *الـنـظـام 💻*
- *النظام:* ${platform} ${arch}
- *الجهاز:* ${hostname}
- *المعالج:* ${cpuModel.slice(0, 30)}...
- *النوى:* ${cpuCores} نواة @ ${cpuSpeed}GHz
- *الحمل:* ${cpuUsage}%

——> *الـذاكـرة 🧠*
- *الرام المستخدم:* ${usedRam}MB / ${totalRam}GB
- *الرام الفارغ:* ${freeRam}GB
- *Heap:* ${heapUsed}MB / ${heapTotal}MB

——> *احـصـائـيـات 📊*
- *المجموعات:* ${groupCount}

——> *الـبـوتـات الـفـرعـيـه 🤖*
- *الإجمالي:* ${subCount}
- *المتصل:* ${subConnected}
- *المنفصل:* ${subCount - subConnected}

——> *الـمـالـكـيـن 👑*
- *العدد:* ${OWNERS_PHONES.length}
- *الأرقام:*
${ownersList}

💜 تحت إمرتك دائماً يا سيدي

${EMOJI} *${BOT_NAME}*`;

    // ✅ إرسال الرسالة مع صورة
    try {
        await conn.sendButton(m.chat, {
            imageUrl: getRandomImage(),
            bodyText: msg,
            footerText: `${EMOJI} ${BOT_NAME}`,
            buttons: [
                {
                    name: 'cta_url',
                    params: {
                        display_text: `📢 قناة البوت`,
                        url: CHANNEL_LINK
                    }
                }
            ],
            mentions: [m.sender]
        }, m);
    } catch (e) {
        // ✅ في حالة فشل الزر، إرسال نص فقط
        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: getContext(m.sender)
        }, { quoted: m });
    }
};

handler.command = ["معلومات", "info", "botinfo", "حالة", "stats"];
handler.category = "info";
handler.usage = ["معلومات"];

export default handler;