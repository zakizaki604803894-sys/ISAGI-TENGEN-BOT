// 🍁 ملف: المتصلين.js - قائمة المتصلين بالإنترنت - ISAGI TENGEN BOT

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';

const handler = async (m, { conn, participants, bot }) => {
    const chatId = m.chat;

    if (!m.isGroup) {
        return m.reply(`${EMOJI} للمجموعات فقط`);
    }

    try {
        await conn.sendMessage(chatId, {
            react: { text: '🌐', key: m.key }
        });

        const groupMetadata = await conn.groupMetadata(chatId);
        const allParticipants = groupMetadata.participants.map(v => v.id);
        
        const botId = conn.user?.id?.split(':')[0] + '@s.whatsapp.net';
        const filteredParticipants = allParticipants.filter(p => p !== botId);

        let onlineUsers = [];
        
        try {
            if (global.store?.messages?.[chatId]) {
                const messagesInChat = global.store.messages[chatId] || [];
                const recentMessages = messagesInChat.slice(-100);
                onlineUsers = recentMessages
                    .map(item => item.key?.participant || item.key?.remoteJid)
                    .filter(p => p && filteredParticipants.includes(p))
                    .filter((value, index, self) => self.indexOf(value) === index);
            }
        } catch (e) {}

        if (onlineUsers.length === 0) {
            onlineUsers = filteredParticipants.slice(0, 30);
        }

        const sortedOnline = onlineUsers.sort((a, b) => 
            a.split('@')[0].localeCompare(b.split('@')[0])
        );

        let onlineList = '';
        if (sortedOnline.length === 0) {
            onlineList = '❌ لا يوجد متصلين';
        } else {
            onlineList = sortedOnline.map((k, i) => 
                `${i + 1}. @${k.split('@')[0]}`
            ).join('\n');
        }

        const totalMembers = filteredParticipants.length;
        const onlineCount = sortedOnline.length;

        // ✅ رسالة قصيرة
        const response = `${EMOJI} *🌐 المتصلين*\n👥 ${totalMembers} | 🟢 ${onlineCount}\n\n${onlineList}`;

        await conn.sendMessage(chatId, {
            text: response,
            mentions: sortedOnline,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: CHANNEL_JID,
                    newsletterName: CHANNEL_NAME,
                    serverMessageId: -1
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error(`${EMOJI} خطأ:`, error);
        await conn.sendMessage(chatId, {
            text: `${EMOJI} فشل جلب المتصلين`
        }, { quoted: m });
    }
};

handler.usage = ['المتصلين'];
handler.category = 'group';
handler.command = ['المتصلين', 'اونلاين', 'online', 'متصلين', 'النشطين'];
handler.group = true;
handler.description = '🌐 عرض المتصلين';

export default handler;