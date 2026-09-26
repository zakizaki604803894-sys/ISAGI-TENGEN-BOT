/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — عرض المستوى والتقدم
   📁 /home/container/plugins/rpg/Rpg•لفل.js
   ✅ تصميم هاتف | بدون مسافات فارغة | صورة في المعاينة
   ═══════════════════════════════════════════════════════════ */

import { xpRange, canLevelUp, getProgressBar, getLevelUpMessage } from '../../system/levelling.js';
import { ensureUser, getRole, formatNumber } from '../bank/نظام_البنك.js';
import { getLevelImage, getRandomImage } from '../../lib/images.js';

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

/* 🕌 الآيات */
const VERSES = [
    { text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', ref: 'الشرح: 6' },
    { text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', ref: 'الرعد: 28' },
    { text: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', ref: 'الطلاق: 3' },
    { text: 'وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', ref: 'البقرة: 153' },
    { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

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

/* ────────────────[دالة حساب التقدم]──────────────── */
function getProgress(level, exp) {
    const expForNext = level * 100 || 100;
    return Math.min(100, Math.floor((exp / expForNext) * 100));
}

/* ═══════════════════════════════════════════
   🎯 الأمر الرئيسي — بدون مسافات فارغة
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
    const v = verse();
    
    try {
        /* ─── جلب بيانات المستخدم ────────────────────────── */
        const user = ensureUser(m.sender);
        const name = m.pushName || 'مستخدم';
        
        let level = user.level || 0;
        const exp = user.exp || 0;
        const role = user.role || getRole(level);
        const points = user.points || 0;
        
        /* ─── الحصول على صورة المستوى ────────────────────── */
        const levelImage = getLevelImage(level);
        const randomImage = getRandomImage();
        const useRandom = Math.random() < 0.3;
        const imageUrl = useRandom ? randomImage : levelImage;

        /* ─── حساب التقدم ────────────────────────────────── */
        const progressPercent = getProgress(level, exp);
        const expForNext = level * 100 || 100;
        const xpNeeded = expForNext - exp;

        /* ─── شريط التقدم ────────────────────────────────── */
        const barLength = 15;
        const filled = Math.min(barLength, Math.floor((progressPercent / 100) * barLength));
        const progressBar = '█'.repeat(filled) + '░'.repeat(barLength - filled);

        /* ─── بناء الرسالة — بدون مسافات فارغة ───────────────── */
        const text = `${BRAND.emoji} *حارسك الشخصي*
👤 *${name}*
━━━━━
📊 *المستوى:* ${level} | 👑 *الرتبة:* ${role}
💎 *النقاط:* ${formatNumber(points)}
${progressBar} ${progressPercent}%
━━━━━
✨ *الخبرة:* ${formatNumber(exp)} XP
🎯 *المتبقي:* ${xpNeeded > 0 ? formatNumber(xpNeeded) : '0'} XP
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
📌 *تفاعل لترفع مستواك!*
📌 *.بنك* لعرض الترتيب
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        /* ─── الأزرار ────────────────────────────────── */
        const buttons = [
            {
                name: 'quick_reply',
                params: {
                    display_text: `🏦 البنك`,
                    id: `.بنك`
                }
            },
            {
                name: 'quick_reply',
                params: {
                    display_text: `🏆 المتصدرين`,
                    id: `.متصدرين`
                }
            },
            {
                name: 'cta_url',
                params: {
                    display_text: `📢 قناة البوت`,
                    url: BRAND.channelLink
                }
            }
        ];

        /* ─── إرسال — sendButtonNormal يضمن الصورة ───────── */
        try {
            await conn.sendButtonNormal(m.chat, {
                media: { url: imageUrl },
                mediaType: 'image',
                caption: text,
                buttons: buttons,
                mentions: [m.sender],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                }
            }, m);
        } catch (e) {
            /* 🅱️ Fallback: رسالة عادية مع صورة */
            try {
                await conn.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: text,
                    mentions: [m.sender],
                    ...CHANNEL_INFO
                }, { quoted: m });
            } catch (e2) {
                /* 🅱️ Fallback نصي */
                await conn.sendMessage(m.chat, {
                    text: text,
                    mentions: [m.sender],
                    ...CHANNEL_INFO
                }, { quoted: m });
            }
        }

    } catch (error) {
        console.error('❌ خطأ في أمر المستوى:', error);
        
        await conn.sendMessage(m.chat, {
            text: `${BRAND.emoji} *حدث خطأ*
━━━━━
📌 ${error.message || 'يرجى المحاولة مرة أخرى'}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`,
            ...CHANNEL_INFO
        }, { quoted: m });
    }
};

/* ────────────────[إعدادات الأمر]──────────────── */
handler.command = ['مستوى', 'lvl', 'levelup', 'level', 'لفل', 'رتبتي', 'بروفايلي', 'myprofile'];
handler.category = 'rpg';
handler.description = '📈 عرض المستوى والتقدم';
handler.usage = '.مستوى';

export default handler;