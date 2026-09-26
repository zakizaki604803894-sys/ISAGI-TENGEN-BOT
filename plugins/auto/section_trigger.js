// 🍁 ملف: قسم.js - اختصارات الأقسام - ISAGI TENGEN BOT

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';
const MAIN_IMAGE = 'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9af3b0fe0a.jpg';

const SECTIONS = {
    'المشرفين': 'admins',
    'الادمن': 'admins',
    'المطورين': 'owner',
    'المطور': 'owner',
    'التنزيلات': 'downloads',
    'التحميل': 'downloads',
    'الالعاب': 'game',
    'العاب': 'game',
    'التسلية': 'fun',
    'الدين': 'religion',
    'البنك': 'bank',
    'البوتات': 'subs',
    'السبس': 'subs',
};

export default async function before(m, { conn, bot }) {
    if (!m.text || m.fromMe) return false;

    const raw = (m.text || '').trim().replace(/^[.\/!]/, '');

    const sectionKey = Object.keys(SECTIONS).find(k => raw === k);
    if (!sectionKey) return false;

    const category = SECTIONS[sectionKey];

    const commandSystem = bot?.commandSystem || global._commandSystem;
    if (!commandSystem) return false;

    try {
        const handlers = commandSystem.handlers || [];
        let cmds = [];

        if (category) {
            cmds = handlers
                .filter(h => h.category === category && h.command?.length)
                .flatMap(h => h.command || [])
                .filter((v, i, a) => a.indexOf(v) === i)
                .slice(0, 30);
        }

        if (!cmds.length) return false;

        // ✅ تحويل إلى أزرار
        const buttons = cmds.map(c => ({
            name: 'quick_reply',
            params: {
                display_text: `${EMOJI} ${c}`,
                id: `.${c}`
            }
        }));

        const bodyText = `${EMOJI}━━━[ *🛡️ قسم ${sectionKey}* ]━━━${EMOJI}

📜 *عدد الأوامر:* ${cmds.length}
${EMOJI} *اختر الأمر المناسب 👇*`;

        await conn.sendButton(m.chat, {
            imageUrl: MAIN_IMAGE,
            bodyText: bodyText,
            footerText: `${EMOJI} ${BOT_NAME}`,
            buttons: buttons,
            mentions: [m.sender],
            interactiveConfig: { buttons_limits: 20 }
        }, m);

        return true;
    } catch {}
    return false;
}