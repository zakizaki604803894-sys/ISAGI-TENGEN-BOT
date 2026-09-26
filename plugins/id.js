// 🦋 ملف: لمطور.js - عرض معلومات المطورين - شينوبو بوت 🦋

const EMOJI = '🦋';
const BOT_NAME = '┆𝑺𝑯𝑰𝑵𝑶𝑩𝑼 ⊰🦋⊱ 𝑩𝑶𝑻┆';
const DEVELOPER = 'شينوبو 🦋';

// ✅ أرقام المطورين (أرقامك)
const OWNERS = [
    { name: 'شينوبو 🦋', number: '212708613251' },
    { name: 'شينوبو 🦋', number: '212705081267' },
    { name: 'شينوبو 🦋', number: '212710825724' },
    { name: 'شينوبو 🦋', number: '212634266182' }
];

// ✅ روابط المطورين
const OWNER_URLS = [
    'https://wa.me/212708613251',
    'https://wa.me/212705081267',
    'https://wa.me/212710825724',
    'https://wa.me/212634266182'
];

const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';

let user = async (m, { args, command, text, conn }) => {
    
    try {
        // ✅ التحقق من أن المستخدم في جروب
        const groupMetadata = await conn.groupMetadata(m.chat);
        let participant = groupMetadata.participants.find(
            p => p.id === m.sender || 
                 p.id.split('@')[0] === m.sender ||
                 p.phoneNumber === m.sender
        );

        if (!participant) {
            return m.reply(`🦋 الرقم لازم يبقي في الجروب`);
        }

        // ✅ بناء معلومات المستخدم
        const userInfo = {
            name: m.pushName || m.name || "مستخدم",
            jid: participant.phoneNumber || m.sender,
            lid: participant.id || m.sender
        };

        // ✅ بناء رسالة المطورين
        let ownerList = `🦋━━━[ *المطورين* ]━━━🦋\n\n`;
        OWNERS.forEach((owner, index) => {
            ownerList += `👑 *${owner.name}*\n`;
            ownerList += `📱 *الرقم:* ${owner.number}\n`;
            ownerList += `📌 *الحالة:* 🟢 متصل\n\n`;
        });

        // ✅ إضافة معلومات المستخدم
        const replyText = `${ownerList}${EMOJI}━━━[ *معلوماتك* ]━━━${EMOJI}\n\n`;
        const userText = `👤 *الاسم:* ${userInfo.name}\n`;
        const userText2 = `📱 *الرقم:* ${userInfo.jid}\n`;
        const userText3 = `🆔 *المعرف:* ${userInfo.lid}\n\n`;
        const footer = `${EMOJI} *${BOT_NAME}*\n💜 تحت إمرتك دائماً يا سيدي`;

        // ✅ إرسال الرسالة مع زر القناة
        try {
            return conn.sendButton(m.chat, {
                imageUrl: "https://i.pinimg.com/1200x/83/b1/29/83b129d788d7a2fd4ddc678b211b79f3.jpg",
                bodyText: replyText + userText + userText2 + userText3 + footer,
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
                mentions: [m.sender],
                newsletter: { 
                    name: BOT_NAME, 
                    jid: '120363428650036031@newsletter' 
                },
                interactiveConfig: { buttons_limits: 20 }
            }, m);
        } catch (e) {
            // ✅ في حالة فشل الأزرار، إرسال نص عادي
            return m.reply(replyText + userText + userText2 + userText3 + footer);
        }

    } catch (err) {
        m.reply(`🦋 خطأ: ${err.message}`);
    }
};

user.command = ['لمطور', 'id', 'مطورين', 'المطورين'];
user.usePrefix = false;

export default user;