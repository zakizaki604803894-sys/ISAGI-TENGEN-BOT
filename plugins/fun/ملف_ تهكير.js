/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — محاكاة تهكير (ترفيهي)
   📁 /home/container/plugins/fun/تهكير.js
   ✅ بدون صورة | دعم المنشن بالرد | بدون آيات
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

const CHANNEL_INFO = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: BRAND.channelId,
            newsletterName: BRAND.channelName,
            serverMessageId: -1
        }
    }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

const randomData = {
    ip: () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    location: () => {
        const lat = (Math.random() * 180 - 90).toFixed(4);
        const lng = (Math.random() * 360 - 180).toFixed(4);
        return `${lat}°${lat > 0 ? 'N' : 'S'}, ${lng}°${lng > 0 ? 'E' : 'W'}`;
    },
    ssn: () => Math.floor(Math.random() * 900000000 + 100000000).toString(),
    mac: () => {
        const chars = '0123456789ABCDEF';
        let mac = '';
        for (let i = 0; i < 6; i++) {
            mac += chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)];
            if (i < 5) mac += ':';
        }
        return mac;
    },
    device: () => pickRandom(['Android-A15', 'iPhone 15 Pro', 'Samsung Galaxy S24', 'Google Pixel 9', 'OnePlus 12', 'Xiaomi 14']),
    isp: () => pickRandom(['Ucom Universal', 'Orange', 'Maroc Telecom', 'Inwi', 'Vodafone', 'AT&T', 'Verizon', 'T-Mobile']),
    router: () => pickRandom(['Toshiba', 'TP-Link', 'D-Link', 'Netgear', 'Asus', 'Cisco', 'Huawei']),
    port: () => pickRandom(['8080, 80', '443, 8080', '80, 443', '3000, 8080', '22, 443']),
    gateway: () => `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    wan: () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
};

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, text }) => {
    const chatId = m.chat;

    /* ✅ بدون منشن */
    if (!text) {
        const bodyText = `${BRAND.emoji} *تهكير*
━━━━━
📌 .تهكير @مستخدم
📌 أو رد على رسالة
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        try {
            await conn.sendButton(chatId, {
                bodyText: bodyText,
                footerText: `${BRAND.emoji} ${BRAND.botName}`,
                buttons: [
                    {
                        name: 'cta_url',
                        params: {
                            display_text: `${BRAND.emoji} قناة البوت`,
                            url: BRAND.channelLink
                        }
                    }
                ],
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 1 }
            }, m);
        } catch (e) {
            await conn.sendMessage(chatId, {
                text: bodyText,
                ...CHANNEL_INFO
            }, { quoted: m });
        }
        return;
    }

    /* ✅ تحديد الهدف — منشن أو رد */
    let who = null;

    /* 1️⃣ الرد على رسالة */
    if (m.quoted) {
        who = m.quoted.sender;
    }
    /* 2️⃣ المنشن */
    else if (m.mentionedJid?.length > 0) {
        who = m.mentionedJid[0];
    }
    /* 3️⃣ الرقم في النص */
    else if (text) {
        const phoneMatch = text.match(/\d{10,15}/g);
        if (phoneMatch) {
            who = phoneMatch[0] + '@s.whatsapp.net';
        }
    }

    if (!who) {
        return m.reply(`${BRAND.emoji} *منشن مستخدم أو رد على رسالته*
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
    }

    try {
        await conn.sendMessage(chatId, { react: { text: '💻', key: m.key } });

        const startMsg = `${BRAND.emoji} *جاري الاختراق...* 🔥`;
        const percentages = [
            pickRandom(['21','22','23','24','25','26','27','28','29','30']),
            pickRandom(['31','32','33','34','35','36','37','38','39','40']),
            pickRandom(['51','52','53','54','55','56','57','58','59','60']),
            pickRandom(['71','72','73','74','75','76','77','78','79','80']),
            pickRandom(['91','92','93','94','95','96','97','98','99','100'])
        ];

        const { key } = await conn.sendMessage(chatId, { text: startMsg }, { quoted: m });

        for (const p of percentages) {
            await delay(400);
            await conn.sendMessage(chatId, { text: `${BRAND.emoji} ${p}%`, edit: key });
        }

        await delay(300);

        const targetName = who.split('@')[0];
        const now = new Date();
        const date = now.toLocaleDateString('ar-EG');
        const time = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

        /* ✅ تصميم مضغوط — بدون آيات */
        const resultText = `${BRAND.emoji} *تم الاختراق* 💻
🎯 @${targetName}
📅 ${date} ${time}
━━━━━
🌐 ${randomData.ip()} | 📍 ${randomData.location()}
🖥️ ${randomData.device()} | 📶 ${randomData.isp()}
🔑 ${randomData.ssn()} | 🏷️ ${randomData.mac()}
🔌 ${randomData.gateway()} | 📡 ${randomData.wan()}
🔧 ${randomData.router()} | 🔓 ${randomData.port()}
━━━━━
💀 *اختراق ناجح!*
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        try {
            await conn.sendButton(chatId, {
                bodyText: resultText,
                footerText: `${BRAND.emoji} ${BRAND.botName}`,
                buttons: [
                    {
                        name: 'quick_reply',
                        params: {
                            display_text: `${BRAND.emoji} هكر جديد`,
                            id: `.تهكير`
                        }
                    },
                    {
                        name: 'cta_url',
                        params: {
                            display_text: `${BRAND.emoji} قناة البوت`,
                            url: BRAND.channelLink
                        }
                    }
                ],
                mentions: [who],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                },
                interactiveConfig: { buttons_limits: 2 }
            }, m);
        } catch (e) {
            await conn.sendMessage(chatId, {
                text: resultText,
                mentions: [who],
                ...CHANNEL_INFO
            }, { quoted: m });
        }

        await conn.sendMessage(chatId, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ خطأ:', error);
        await conn.sendMessage(chatId, {
            text: `${BRAND.emoji} *حدث خطأ*
━━━━━
📌 حاول مرة أخرى`,
            ...CHANNEL_INFO
        }, { quoted: m });
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['تهكير', 'هكر', 'دوكس', 'تشفير', 'اختراق'];
handler.category = 'fun';
handler.group = true;

export default handler;