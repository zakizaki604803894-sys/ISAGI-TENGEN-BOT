// 🦋 bot_protection.js - حماية من تعارضات البوتات - شينوبو بوت 🦋

/**
 * يجمع كل الـ ids المحتملة لرقم/مستخدم معين (jid عادي + رقم خام + lid لو موجود)
 */
const allIdsOf = (...vals) => {
    const out = new Set();
    for (const v of vals) {
        if (!v) continue;
        out.add(v);
        const num = v.split('@')[0]?.split(':')[0];
        if (num) {
            out.add(`${num}@s.whatsapp.net`);
            out.add(`${num}@lid`);
            out.add(num);
        }
    }
    return out;
};

/**
 * فحص لو participant معين يطابق target (بمقارنة كل الحقول المحتملة: id, jid, lid, pn)
 * ضروري بسبب نظام LID في Baileys v7 اللي بيخلي meta.participants[].id يكون lid
 * مش رقم هاتف عادي، وممكن conn.user.id يكون بصيغة مختلفة
 */
const participantMatches = (p, targetIds) => {
    const candidates = allIdsOf(p.id, p.jid, p.lid, p.pn, p.phoneNumber);
    for (const c of candidates) {
        if (targetIds.has(c)) return true;
    }
    return false;
};

/**
 * فحص لو البوت نفسه ادمن فعلي (مش متأخر الـ metadata)
 * يجيب الـ metadata من جديد بدل ما يعتمد على الـ cache القديم
 * بيتعامل مع نظام LID في Baileys v7 (participant.id ممكن يكون @lid مش @s.whatsapp.net)
 */
export const isBotActualAdmin = async (chat, conn) => {
    try {
        const meta = await conn.groupMetadata(chat);
        if (!meta?.participants) return false;

        const botIds = allIdsOf(
            conn?.user?.id,
            conn?.user?.lid,
            conn?.user?.jid,
            conn?.user?.pn
        );

        const botParticipant = meta.participants.find(p => participantMatches(p, botIds));

        if (process.env.DEBUG_ADMIN_CHECK === '1') {
            console.log('🦋 [AdminCheck] botIds:', [...botIds]);
            console.log('🦋 [AdminCheck] conn.user:', conn?.user);
            console.log('🦋 [AdminCheck] matched participant:', botParticipant);
        }

        return botParticipant?.admin === 'admin' || botParticipant?.admin === 'superadmin';
    } catch (e) {
        if (process.env.DEBUG_ADMIN_CHECK === '1') console.log('🦋 [AdminCheck] error:', e?.message);
        return false;
    }
};

/**
 * فحص لو المستخدم ادمن فعلي (live check)
 * بيتعامل مع نظام LID في Baileys v7
 */
export const isUserActualAdmin = async (sender, chat, conn) => {
    try {
        const meta = await conn.groupMetadata(chat);
        if (!meta?.participants) return false;

        const senderIds = allIdsOf(sender);
        const userParticipant = meta.participants.find(p => participantMatches(p, senderIds));
        return userParticipant?.admin === 'admin' || userParticipant?.admin === 'superadmin';
    } catch {
        return false;
    }
};

/**
 * قائمة البوتات المعروفة (تعديل حسب احتياجك)
 * إضافة أي بوت تاني بتحتاج تتعامل معه
 */
const KNOWN_BOTS = [
    // 🦋 شينوبو بوت نفسه (يتم تجاهله)
    '212708613251@s.whatsapp.net',
    '212705081267@s.whatsapp.net',
    '212710825724@s.whatsapp.net',
    '212634266182@s.whatsapp.net',
    // يمكنك إضافة بوتات أخرى هنا
];

/**
 * فحص لو الرسالة من بوت معروف (تجاهله)
 */
export const isFromKnownBot = (sender) => {
    return KNOWN_BOTS.some(bot => 
        sender === bot || 
        sender.split(':')[0] + '@s.whatsapp.net' === bot
    );
};

/**
 * نظام الـ cooldown - منع تنفيذ نفس الأمر مرتين في نفس الثانية
 */
const commandCooldowns = new Map();
const COOLDOWN_MS = 2000; // ثانيتين

export const checkCommandCooldown = (cmd, sender, chat) => {
    const key = `${cmd}_${sender}_${chat}`;
    const now = Date.now();
    
    if (commandCooldowns.has(key)) {
        const lastTime = commandCooldowns.get(key);
        const elapsed = now - lastTime;
        
        if (elapsed < COOLDOWN_MS) {
            return { 
                allowed: false, 
                waitMs: COOLDOWN_MS - elapsed 
            };
        }
    }
    
    commandCooldowns.set(key, now);
    
    // تنظيف القديمة (أكبر من 5 دقائق)
    if (commandCooldowns.size > 1000) {
        for (const [k, v] of commandCooldowns.entries()) {
            if (now - v > 300_000) commandCooldowns.delete(k);
        }
    }
    
    return { allowed: true, waitMs: 0 };
};

/**
 * guard سريع: تحقق لو البوت ادمن وضيف البيانات الحقيقية (live) للـ message object
 * fallback: لو فشل الفحص الـ live في إيجاد تطابق، يحافظ على القيمة الأصلية
 * (اللي جايه من الـ engine) بدل ما يفترض إن البوت مش ادمن
 */
export const adminGuard = async (m, { conn, bot }) => {
    // تجاهل لو من بوت معروف
    if (isFromKnownBot(m.sender)) return false;

    const originalBotAdmin  = m.isBotAdmin;
    const originalUserAdmin = m.isAdmin;

    try {
        const liveBotAdmin  = await isBotActualAdmin(m.chat, conn);
        const liveUserAdmin = await isUserActualAdmin(m.sender, m.chat, conn);

        m.isBotAdmin = liveBotAdmin;
        m.isUserAdmin = liveUserAdmin;
    } catch {
        m.isBotAdmin  = originalBotAdmin;
        m.isUserAdmin = originalUserAdmin;
    }

    return false;
};

/**
 * helper: رسالة الخطأ موحدة
 */
export const notAdminMsg = () => 
    '🦋 *ارفعني مشرف يا سيدي وبعدين نفذ الأمر*\n💜 تحت إمرتك دائماً';

export const notAuthMsg = () => 
    '🦋 *هذا الأمر للمشرفين فقط*\n💜 تحت إمرتك دائماً';

// 🦋 إحصائيات النظام
const stats = {
    adminChecks: 0,
    cooldownHits: 0,
    botDetections: 0
};

export const getProtectionStats = () => {
    return { ...stats };
};

// 🦋 عرض إحصائيات في الكونسول
setInterval(() => {
    console.log(`
🦋━━━[ *نظام حماية البوت* ]━━━🦋
📊 *الإحصائيات:*
• فحوصات الأدمن: ${stats.adminChecks}
• منع تنفيذ متكرر: ${stats.cooldownHits}
• بوتات مكتشفة: ${stats.botDetections}
💜 تحت إمرتك دائماً يا سيدي
`);
}, 300000); // كل 5 دقائق

console.log(`
🦋━━━[ *نظام حماية البوت* ]━━━🦋
✅ تم تفعيل نظام الحماية من تعارضات البوتات
📌 الميزات:
• كشف صلاحيات الأدمن (Live)
• منع تنفيذ نفس الأمر مرتين
• تجاهل البوتات المعروفة
💜 تحت إمرتك دائماً يا سيدي
`);

export default {
    isBotActualAdmin,
    isUserActualAdmin,
    isFromKnownBot,
    checkCommandCooldown,
    adminGuard,
    notAdminMsg,
    notAuthMsg,
    getProtectionStats
};