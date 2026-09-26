/**
 * 🦋 نظام Rate Limiting للبوت - شينوبو بوت 🦋
 * يمنع الإرسال السريع اللي بيسبب حظر واتساب
 */

const userCooldowns  = new Map(); // per user
const chatCooldowns  = new Map(); // per chat
const globalCounter  = { count: 0, resetAt: Date.now() + 60000 };

const LIMITS = {
    userMs:    3000,   // مستخدم واحد: أمر كل 3 ثواني
    chatMs:    1500,   // جروب: رسالة كل 1.5 ثانية
    globalRpm: 80,     // البوت كله: 80 رسالة في الدقيقة
};

// 🦋 إحصائيات النظام
const stats = {
    totalChecks: 0,
    totalAllowed: 0,
    totalDenied: 0,
    lastCheck: null
};

/**
 * @returns { allowed: bool, waitMs: number, reason: string }
 */
export const checkLimit = (userId, chatId) => {
    const now = Date.now();
    stats.totalChecks++;
    stats.lastCheck = now;

    // reset global counter كل دقيقة
    if (now > globalCounter.resetAt) {
        globalCounter.count  = 0;
        globalCounter.resetAt = now + 60000;
        console.log('🦋 [Rate Limit] تم إعادة تعيين العداد العالمي');
    }

    // global rpm
    if (globalCounter.count >= LIMITS.globalRpm) {
        stats.totalDenied++;
        console.log(`🦋 [Rate Limit] تجاوز الحد العالمي (${LIMITS.globalRpm}/دقيقة)`);
        return { 
            allowed: false, 
            waitMs: globalCounter.resetAt - now,
            reason: 'الحد العالمي للبوت'
        };
    }

    // per user
    const lastUser = userCooldowns.get(userId) || 0;
    if (now - lastUser < LIMITS.userMs) {
        stats.totalDenied++;
        const wait = LIMITS.userMs - (now - lastUser);
        console.log(`🦋 [Rate Limit] مستخدم ${userId?.split('@')[0]} يرسل بسرعة (انتظر ${Math.ceil(wait/1000)}ث)`);
        return { 
            allowed: false, 
            waitMs: wait,
            reason: 'إرسال سريع من المستخدم'
        };
    }

    // per chat
    const lastChat = chatCooldowns.get(chatId) || 0;
    if (now - lastChat < LIMITS.chatMs) {
        stats.totalDenied++;
        const wait = LIMITS.chatMs - (now - lastChat);
        console.log(`🦋 [Rate Limit] رسائل سريعة في المجموعة (انتظر ${Math.ceil(wait/1000)}ث)`);
        return { 
            allowed: false, 
            waitMs: wait,
            reason: 'إرسال سريع في المجموعة'
        };
    }

    // كل حاجة تمام
    stats.totalAllowed++;
    userCooldowns.set(userId, now);
    chatCooldowns.set(chatId, now);
    globalCounter.count++;

    return { 
        allowed: true, 
        waitMs: 0,
        reason: 'مسموح'
    };
};

// 🦋 الحصول على إحصائيات النظام
export const getRateLimitStats = () => {
    return {
        ...stats,
        activeUsers: userCooldowns.size,
        activeChats: chatCooldowns.size,
        globalCount: globalCounter.count,
        globalResetIn: Math.max(0, globalCounter.resetAt - Date.now()),
        limits: LIMITS
    };
};

// 🦋 عرض إحصائيات في الكونسول
setInterval(() => {
    const now = Date.now();
    const resetIn = Math.max(0, globalCounter.resetAt - now);
    console.log(`
🦋━━━[ *نظام Rate Limit* ]━━━🦋
📊 *الإحصائيات:*
• إجمالي الفحوصات: ${stats.totalChecks}
• ✅ المسموح: ${stats.totalAllowed}
• ❌ المرفوض: ${stats.totalDenied}
• 👤 المستخدمين النشطين: ${userCooldowns.size}
• 💬 المجموعات النشطة: ${chatCooldowns.size}
• 🌍 العداد العالمي: ${globalCounter.count}/${LIMITS.globalRpm}
• ⏳ إعادة الضبط بعد: ${Math.ceil(resetIn/1000)} ثانية
💜 تحت إمرتك دائماً يا سيدي
`);
}, 120000); // كل دقيقتين

// تنظيف الـ maps كل 10 دقايق عشان ما تاكلش memory
setInterval(() => {
    const now = Date.now();
    let userRemoved = 0;
    let chatRemoved = 0;
    
    for (const [k, v] of userCooldowns) {
        if (now - v > 60000) {
            userCooldowns.delete(k);
            userRemoved++;
        }
    }
    for (const [k, v] of chatCooldowns) {
        if (now - v > 60000) {
            chatCooldowns.delete(k);
            chatRemoved++;
        }
    }
    
    if (userRemoved > 0 || chatRemoved > 0) {
        console.log(`🦋 [Rate Limit] تنظيف: ${userRemoved} مستخدم, ${chatRemoved} مجموعة`);
    }
}, 600000);

console.log(`
🦋━━━[ *نظام Rate Limit* ]━━━🦋
✅ تم تفعيل نظام منع الإرسال السريع
📌 الحدود:
• مستخدم واحد: ${LIMITS.userMs/1000} ثانية بين الأوامر
• مجموعة: ${LIMITS.chatMs/1000} ثانية بين الرسائل
• البوت كله: ${LIMITS.globalRpm} رسالة في الدقيقة
💜 تحت إمرتك دائماً يا سيدي
`);

export default { 
    checkLimit, 
    LIMITS,
    getRateLimitStats
};