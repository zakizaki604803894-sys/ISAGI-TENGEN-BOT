// 🦋 auto-join-channel.js - الانضمام للقناة - شينوبو بوت 🦋

const EMOJI = '🦋';
const BOT_NAME = '┆𝑺𝑯𝑰𝑵𝑶𝑩𝑼 ⊰🦋⊱ 𝑩𝑶𝑻┆';
const CHANNEL_JID = '120363428650036031@newsletter';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u';
const DEVELOPER = 'شينوبو 🦋';

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

const autoJoinChannel = async (client, channelJid = CHANNEL_JID) => {
    // ✅ لا انضمام تلقائي - فقط عرض معلومات القناة
    console.log(`${EMOJI} [AutoJoin] الانضمام التلقائي للقناة معطل (امتثالاً لسياسة واتساب)`);
    
    // ✅ عرض معلومات القناة مع صورة شينوبو
    console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║     🦋 *${BOT_NAME}* 🦋                           ║
║                                                    ║
║  📌 *معلومات القناة:*                              ║
║  • الرابط: ${CHANNEL_LINK}                        ║
║  • JID: ${CHANNEL_JID}                            ║
║  • المطور: ${DEVELOPER}                           ║
║                                                    ║
║  💜 تحت إمرتك دائماً يا سيدي                       ║
║                                                    ║
╚════════════════════════════════════════════════════╝
`);
    
    // ✅ إرجاع معلومات القناة بدلاً من الانضمام
    return {
        success: false,
        message: 'الانضمام التلقائي معطل',
        channel: {
            jid: CHANNEL_JID,
            link: CHANNEL_LINK,
            name: BOT_NAME,
            image: getRandomImage(),
            developer: DEVELOPER
        }
    };
};

export default autoJoinChannel;