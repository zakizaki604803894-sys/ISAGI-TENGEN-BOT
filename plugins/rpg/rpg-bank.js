/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — عرض البنك والمعلومات المالية
   📁 /home/container/plugins/rpg/rpg-bank.js
   ✅ تصميم هاتف | بدون مسافات فارغة | صورة في المعاينة
   ═══════════════════════════════════════════════════════════ */

import { ensureUser, getRole, formatNumber } from '../bank/نظام_البنك.js';
import { getRandomImage } from '../../lib/images.js';

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

console.log('✅ تم تحميل أمر rpg-bank');

/* 🕌 الآيات */
const VERSES = [
    { text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', ref: 'الشرح: 6' },
    { text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', ref: 'الرعد: 28' },
    { text: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', ref: 'الطلاق: 3' },
    { text: 'وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', ref: 'البقرة: 153' },
    { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' },
    { text: 'فَاذْكُرُونِي أَذْكُرْكُمْ', ref: 'البقرة: 152' },
    { text: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', ref: 'البقرة: 20' },
    { text: 'وَاللَّهُ خَيْرُ الرَّازِقِينَ', ref: 'الجمعة: 11' },
    { text: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', ref: 'الحديد: 4' },
    { text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ', ref: 'هود: 88' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* ────────────────[معلومات القناة]──────────────── */
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

/* ────────────────[دالة رسائل التهنئة]──────────────── */
function getLevelMessage(level) {
    const messages = [
        { condition: level >= 100, message: `👑 *مهيب!* لقد وصلت لمستوى أسطوري!` },
        { condition: level >= 50, message: `🌟 *رائع!* أنت أسطورة حقيقية!` },
        { condition: level >= 30, message: `🔥 *مذهل!* أنت محترف حقيقي!` },
        { condition: level >= 20, message: `💪 *أحسنت!* أنت في طريقك للقمة!` },
        { condition: level >= 10, message: `✨ *جميل!* بدأت تتفوق على الآخرين!` },
        { condition: level >= 5, message: `🎉 *ممتاز!* أنت تتقدم بسرعة!` }
    ];
    
    const found = messages.find(m => m.condition);
    return found ? found.message : `🎊 *مبروك!* أول مستوى لك!`;
}

/* ═══════════════════════════════════════════
   🎯 الأمر الرئيسي — بدون مسافات فارغة
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, args }) => {
    const chatId = m.chat;
    const sender = m.sender;
    const senderName = m.pushName || 'مستخدم';
    const v = verse();

    try {
        console.log('📱 تنفيذ أمر rpg-bank');

        let userId = sender;
        let userName = senderName;

        /* ─── التحقق من المذكورين ────────────────────────── */
        if (args[0] && args[0].startsWith('@')) {
            const mentioned = m.mentionedJid || [];
            if (mentioned && mentioned.length > 0) {
                userId = mentioned[0];
                try {
                    const contact = await conn.getName(userId);
                    userName = contact || 'مستخدم';
                } catch (e) {
                    userName = 'مستخدم';
                }
            }
        }

        /* ─── التحقق من البوت ────────────────────────────── */
        if (userId === conn.user?.id) {
            return conn.sendMessage(chatId, {
                text: `${BRAND.emoji} ❌ لا يمكن عرض بيانات البوت`
            }, { quoted: m });
        }

        /* ─── جلب بيانات المستخدم ────────────────────────── */
        const user = ensureUser(userId);
        
        /* ─── تحديث الاسم ────────────────────────────────── */
        if (!user.name || user.name !== userName) {
            user.name = userName;
        }

        /* ─── حساب البيانات ────────────────────────────── */
        const level = user.level || 0;
        const role = getRole(level);
        const currentExp = user.exp || 0;
        const expForNext = level * 100 || 100;
        const progress = Math.min(Math.floor((currentExp / expForNext) * 100), 100);
        
        /* ─── البيانات المالية ──────────────────────────── */
        const bankAmount = user.bank || 0;
        const monedas = user.monedas || 0;
        const diamond = user.diamond || 0;
        const total = currentExp + bankAmount + monedas + diamond;

        /* ─── إحصائيات الألعاب ──────────────────────────── */
        const gamesWon = user.gamesWon || 0;
        const gamesPlayed = user.gamesPlayed || 0;
        const giftsSent = user.giftsSent || 0;
        const giftsReceived = user.giftsReceived || 0;

        /* ─── الحصول على صورة البروفيل ──────────────────── */
        let imageUrl = null;

        try {
            const ppUrl = await conn.profilePictureUrl(userId, 'image');
            if (ppUrl) {
                imageUrl = ppUrl;
                console.log('📸 تم جلب صورة البروفيل');
            }
        } catch (_e) {
            console.log('📸 لا توجد صورة بروفيل، سيتم استخدام صورة عشوائية');
        }

        if (!imageUrl) {
            imageUrl = getRandomImage();
        }

        /* ─── شريط التقدم ────────────────────────────────── */
        const barLength = 15;
        const filled = Math.min(barLength, Math.floor((progress / 100) * barLength));
        const progressBar = '█'.repeat(filled) + '░'.repeat(barLength - filled);

        /* ─── بناء الرسالة — بدون مسافات فارغة ───────────────── */
        const text = `${BRAND.emoji} *البنك المالي*
👤 *${userName}* | 🆔 @${userId.split('@')[0]}
━━━━━
📈 *المستوى:* ${level} | 👑 *الرتبة:* ${role}
${progressBar} ${progress}%
━━━━━
🪙 *العملات:* ${formatNumber(monedas)}
💎 *الماس:* ${formatNumber(diamond)}
🏦 *البنك:* ${formatNumber(bankAmount)}
✨ *الخبرة:* ${formatNumber(currentExp)}
💰 *الإجمالي:* ${formatNumber(total)}
━━━━━
🎮 *إحصائيات الألعاب:*
🏆 *فوز:* ${formatNumber(gamesWon)} | 🎯 *لعب:* ${formatNumber(gamesPlayed)}
🎁 *أرسل:* ${formatNumber(giftsSent)} | 🎀 *استلم:* ${formatNumber(giftsReceived)}
━━━━━
📅 *التسجيل:* ${new Date(user.registered || Date.now()).toLocaleString('ar-EG')}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
💡 *استخدم .يومي للمكافأة*
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        /* ─── الأزرار ────────────────────────────────── */
        const buttons = [
            {
                name: 'quick_reply',
                params: {
                    display_text: `🎁 المكافأة اليومية`,
                    id: `.يومي`
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

        /* ─── إرسال الصورة مع الكابشن ────────────────────── */
        try {
            await conn.sendButtonNormal(chatId, {
                media: { url: imageUrl },
                mediaType: 'image',
                caption: text,
                buttons: buttons,
                mentions: [userId],
                newsletter: {
                    name: BRAND.channelName,
                    jid: BRAND.channelId
                }
            }, m);
        } catch (e) {
            console.error('❌ فشل sendButtonNormal:', e.message);
            try {
                await conn.sendMessage(chatId, {
                    image: { url: imageUrl },
                    caption: text,
                    mentions: [userId],
                    ...CHANNEL_INFO
                }, { quoted: m });
            } catch (e2) {
                await conn.sendMessage(chatId, {
                    text: text,
                    mentions: [userId],
                    ...CHANNEL_INFO
                }, { quoted: m });
            }
        }

        console.log(`✅ تم إرسال رسالة البنك لـ ${userName} - المستوى: ${level}`);

    } catch (error) {
        console.error('❌ خطأ في أمر rpg-bank:', error);
        await conn.sendMessage(chatId, {
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
handler.command = ['بنك', 'bank', 'البنك', 'banco', 'points', 'نقاط', 'رصيد', 'حسابي', 'محفظتي', 'فلوسي', 'مالي'];
handler.category = 'rpg';
handler.description = '💰 عرض النقاط والمستوى والترتيب مع الدور الخاص بك';
handler.usage = '.بنك';

export default handler;