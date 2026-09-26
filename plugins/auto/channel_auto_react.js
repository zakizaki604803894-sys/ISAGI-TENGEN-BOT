// 🦋 تفاعل تلقائي مع رسائل القناة - شينوبو بوت 🦋

const REACT_EMOJIS = [
    '😂','🫩','🙃','😉','💋','❤','✨','🌚','✅',
    '🐥','🎭','🙀','🤲🏻','⚜️','🚫','🤖','🥹',
    '🙂‍↔️','🖐🏻','😳','😥','🦋','💜','👑','🔥','💎'
];

// 🦋 قناة شينوبو بوت
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_NAME = '┆𝑺𝑯𝑰𝑵𝑶𝑩𝑼 ⊰🦋⊱ 𝑩𝑶𝑻┆';

export default async function before(m, { conn, bot }) {
    // ✅ التحقق من أن الرسالة من قناة
    if (!m.key?.remoteJid?.includes('@newsletter')) return false;
    const channelJid = m.key.remoteJid;

    // ✅ التحقق من أن القناة مفعلة
    if (!global._channelReact?.[channelJid]) return false;

    // ✅ اختيار إيموجي عشوائي
    const emoji = REACT_EMOJIS[Math.floor(Math.random() * REACT_EMOJIS.length)];

    // ✅ إرسال التفاعل
    try {
        await conn.sendMessage(channelJid, {
            react: { text: emoji, key: m.key }
        });
        console.log(`🦋 تم التفاعل مع رسالة في القناة: ${emoji}`);
    } catch (e) {
        console.log('🦋 فشل إرسال التفاعل:', e.message);
    }

    // ✅ إرسال تفاعلات من البوتات الفرعية
    try {
        const subList = global.subBots?.list?.() || [];
        for (const subBot of subList) {
            const subSock = global.subBots?.get?.(subBot.id)?.sock;
            if (!subSock) continue;
            try {
                const subEmoji = REACT_EMOJIS[Math.floor(Math.random() * REACT_EMOJIS.length)];
                await subSock.sendMessage(channelJid, {
                    react: { text: subEmoji, key: m.key }
                });
                await new Promise(r => setTimeout(r, 500));
            } catch (e) {
                console.log('🦋 فشل تفاعل البوت الفرعي:', e.message);
            }
        }
    } catch (e) {
        console.log('🦋 فشل تفاعل البوتات الفرعية:', e.message);
    }

    return false;
}