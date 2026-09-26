// جدولة فتح وقفل الجروب أوتوماتيك بوقت معين كل يوم
// .جدولة فتح 08:00   -> يفتح الجروب الساعة دي كل يوم
// .جدولة قفل 23:00   -> يقفل الجروب الساعة دي كل يوم
// .جدولة تفعيل / .جدولة الغاء
// .جدولة عرض
// .جدولة حذف

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { adminGuard, checkCommandCooldown, notAdminMsg, notAuthMsg } from '../../system/bot_protection.js';

const SCHEDULE_FILE = './system/group_schedule.json';

const loadConfig = () => {
    try { return existsSync(SCHEDULE_FILE) ? JSON.parse(readFileSync(SCHEDULE_FILE, 'utf-8')) : {}; }
    catch { return {}; }
};

const saveConfig = (cfg) => {
    try { writeFileSync(SCHEDULE_FILE, JSON.stringify(cfg, null, 2)); } catch {}
};

// تحليل وقت بصيغتين:
// 1) 24 ساعة: "08:00" أو "23:00"
// 2) 12 ساعة + ص/م: "8:00 ص" أو "8:00 م" (يقبل مسافة أو من غيرها: "8:00م")
// بترجع "HH:MM" بصيغة 24 ساعة دايمًا (اللي بيتخزن وبيتقارن بيه فعليًا)
const parseTime = (str) => {
    if (!str) return null;
    const cleaned = str.trim();

    // صيغة 12 ساعة مع ص/م
    const m12 = cleaned.match(/^(\d{1,2}):(\d{2})\s*(ص|م)$/);
    if (m12) {
        let h = parseInt(m12[1]);
        const min = parseInt(m12[2]);
        const period = m12[3];
        if (h < 1 || h > 12 || min < 0 || min > 59) return null;

        if (period === 'م' && h !== 12) h += 12;      // مساءً (غير 12م)
        if (period === 'ص' && h === 12) h = 0;         // 12 ص = منتصف الليل

        return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    }

    // صيغة 24 ساعة عادية
    const m24 = cleaned.match(/^(\d{1,2}):(\d{2})$/);
    if (m24) {
        const h = parseInt(m24[1]), min = parseInt(m24[2]);
        if (h < 0 || h > 23 || min < 0 || min > 59) return null;
        return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    }

    return null;
};

// عرض وقت 24 ساعة "HH:MM" بصيغة 12 ساعة + ص/م للعرض على المستخدم (أوضح)
const formatTime12 = (time24) => {
    if (!time24) return null;
    const [hStr, min] = time24.split(':');
    let h = parseInt(hStr);
    const period = h < 12 ? 'ص' : 'م';
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${h}:${min} ${period}`;
};

// ===== الماتور: بيشتغل كل 30 ثانية، محمي من التكرار (نفس أسلوب prayer_reminder.js) =====
if (!global.__groupScheduleInterval) {
    global.__groupScheduleInterval = setInterval(async () => {
        const conn = global._conn;
        if (!conn) return;

        const cfg = loadConfig();
        if (!Object.keys(cfg).length) return;

        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const dayKey = now.toISOString().slice(0, 10); // YYYY-MM-DD عشان منكررش نفس اليوم

        for (const [chatId, s] of Object.entries(cfg)) {
            if (!s.active) continue;

            if (s.openTime === currentTime) {
                const fireKey = `open_${chatId}_${dayKey}_${currentTime}`;
                if (!global.__groupScheduleFired) global.__groupScheduleFired = {};
                if (!global.__groupScheduleFired[fireKey]) {
                    global.__groupScheduleFired[fireKey] = true;
                    try {
                        await conn.groupSettingUpdate(chatId, 'not_announcement');
                        await conn.sendMessage(chatId, {
                            text: `🔓 *تم فتح الجروب تلقائيًا* 🔓\n⏰ حسب الجدولة الساعة ${formatTime12(currentTime)}`
                        });
                    } catch {}
                }
            }

            if (s.closeTime === currentTime) {
                const fireKey = `close_${chatId}_${dayKey}_${currentTime}`;
                if (!global.__groupScheduleFired) global.__groupScheduleFired = {};
                if (!global.__groupScheduleFired[fireKey]) {
                    global.__groupScheduleFired[fireKey] = true;
                    try {
                        await conn.groupSettingUpdate(chatId, 'announcement');
                        await conn.sendMessage(chatId, {
                            text: `🔒 *تم قفل الجروب تلقائيًا* 🔒\n⏰ حسب الجدولة الساعة ${formatTime12(currentTime)}`
                        });
                    } catch {}
                }
            }
        }

        // تنظيف مفاتيح الأيام القديمة عشان الميموري متكبرش
        if (global.__groupScheduleFired) {
            for (const k of Object.keys(global.__groupScheduleFired)) {
                if (!k.includes(dayKey)) delete global.__groupScheduleFired[k];
            }
        }
    }, 30_000);
}

const handler = async (m, { conn, command, args, bot }) => {
    if (!m.isGroup) return m.reply('*❌ في الجروبات بس*');

    if (!global._conn) global._conn = conn;

    await adminGuard(m, { conn, bot });

    const cooldown = checkCommandCooldown(command, m.sender, m.chat);
    if (!cooldown.allowed) {
        return m.reply(`*⏳ استنى ${Math.ceil(cooldown.waitMs / 1000)} ثانية*`);
    }

    if (!m.isAdmin) return m.reply(notAuthMsg());
    if (!m.isBotAdmin) return m.reply(notAdminMsg());

    const cfg = loadConfig();
    const chatId = m.chat;
    if (!cfg[chatId]) cfg[chatId] = { openTime: null, closeTime: null, active: false };

    const sub = args[0]?.toLowerCase()?.trim();
    // بندمج باقي الكلمات كلها عشان نستوعب "8:00 م" (فيها مسافة) و"8:00م" و"08:00" لوحدها
    const value = args.slice(1).join(' ').trim();

    if (sub === 'فتح' || sub === 'open') {
        const t = parseTime(value);
        if (!t) return m.reply('*❌ اكتب الوقت صح، مثال:*\n.جدولة فتح 8:00 ص\n.جدولة فتح 08:00');
        cfg[chatId].openTime = t;
        cfg[chatId].active = true;
        saveConfig(cfg);
        return m.reply(`✅ *تم ضبط موعد فتح الجروب الساعة ${formatTime12(t)} (${t}) يوميًا*`);
    }

    if (sub === 'قفل' || sub === 'close') {
        const t = parseTime(value);
        if (!t) return m.reply('*❌ اكتب الوقت صح، مثال:*\n.جدولة قفل 11:00 م\n.جدولة قفل 23:00');
        cfg[chatId].closeTime = t;
        cfg[chatId].active = true;
        saveConfig(cfg);
        return m.reply(`✅ *تم ضبط موعد قفل الجروب الساعة ${formatTime12(t)} (${t}) يوميًا*`);
    }

    if (sub === 'تفعيل' || sub === 'on') {
        if (!cfg[chatId].openTime && !cfg[chatId].closeTime) {
            return m.reply('*❌ محتاج تحدد وقت فتح أو قفل الأول*');
        }
        cfg[chatId].active = true;
        saveConfig(cfg);
        return m.reply('✅ *تم تفعيل جدولة الجروب*');
    }

    if (sub === 'الغاء' || sub === 'off' || sub === 'إلغاء') {
        cfg[chatId].active = false;
        saveConfig(cfg);
        return m.reply('🚫 *تم إيقاف جدولة الجروب* (المواعيد لسه محفوظة)');
    }

    if (sub === 'حذف' || sub === 'delete') {
        delete cfg[chatId];
        saveConfig(cfg);
        return m.reply('🗑️ *تم حذف جدولة الجروب نهائيًا*');
    }

    // عرض الحالة (بدون أي سبكوماند أو "عرض")
    const s = cfg[chatId];
    return m.reply(
        `*📅 جدولة الجروب*\n\n` +
        `🔓 وقت الفتح: ${s.openTime ? `${formatTime12(s.openTime)} (${s.openTime})` : 'غير محدد'}\n` +
        `🔒 وقت القفل: ${s.closeTime ? `${formatTime12(s.closeTime)} (${s.closeTime})` : 'غير محدد'}\n` +
        `⚡ الحالة: ${s.active ? 'مفعّلة ✅' : 'متوقفة 🚫'}\n\n` +
        `*الأوامر:*\n` +
        `.جدولة فتح 8:00 ص\n` +
        `.جدولة قفل 11:00 م\n` +
        `.جدولة تفعيل\n` +
        `.جدولة الغاء\n` +
        `.جدولة حذف`
    );
};

handler.usage    = ['جدولة فتح <وقت> [ص/م]', 'جدولة قفل <وقت> [ص/م]', 'جدولة عرض'];
handler.category = 'auto';
handler.command  = ['جدولة', 'جدولة_الجروب', 'group_schedule', 'schedule'];
handler.admin    = true;
handler.botAdmin = true;

export default handler;
