
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
    { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' },
    { text: 'فَاذْكُرُونِي أَذْكُرْكُمْ', ref: 'البقرة: 152' },
    { text: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', ref: 'البقرة: 20' },
    { text: 'وَاللَّهُ خَيْرُ الرَّازِقِينَ', ref: 'الجمعة: 11' },
    { text: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', ref: 'الحديد: 4' },
    { text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ', ref: 'هود: 88' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* ═══════════════════════════════════════════
   🛡️ إعدادات الحماية
   ═══════════════════════════════════════════ */

/* ✅ فقط روابط واتساب (مجموعات + قنوات) */
const WHATSAPP_LINK_REGEX = /(chat\.whatsapp\.com\/[A-Za-z0-9]+)|(whatsapp\.com\/channel\/[A-Za-z0-9]+)/i;

/* ═══════════════════════════════════════════
   🛡️ دوال التفعيل
   ═══════════════════════════════════════════ */
const autoEnableAll = () => {
    if (!global._gs) global._gs = {};
    if (!global._gs.antilink) global._gs.antilink = {};
    if (!global._gs.anticontact) global._gs.anticontact = {};
    if (global._gs.antilinkGlobal === undefined) global._gs.antilinkGlobal = true;
    if (global._gs.anticontactGlobal === undefined) global._gs.anticontactGlobal = true;
    
    try {
        if (global.db?.saveSync) global.db.saveSync();
        if (global.db?.saveGsSync) global.db.saveGsSync();
    } catch {}
};

const isEnabled = (groupId, type) => {
    const globalKey = type === 'link' ? 'antilinkGlobal' : 'anticontactGlobal';
    const localKey = type === 'link' ? 'antilink' : 'anticontact';
    
    if (global._gs?.[globalKey] === false) return false;
    const local = global._gs?.[localKey] || {};
    if (local[groupId] === false) return false;
    return true;
};

/* ⚡ كاش المجموعات — 60 ثانية */
const groupMetaCache = new Map();
const getGroupMetaFast = async (conn, groupId) => {
    const cached = groupMetaCache.get(groupId);
    if (cached && Date.now() - cached.time < 60_000) return cached.meta;
    try {
        const meta = await conn.groupMetadata(groupId);
        groupMetaCache.set(groupId, { meta, time: Date.now() });
        return meta;
    } catch {
        return null;
    }
};

/* ✅ التحقق إذا كان مشرفاً — من الكاش */
const isAdmin = async (conn, groupId, userId) => {
    try {
        const meta = await getGroupMetaFast(conn, groupId);
        if (!meta) return false;
        
        const participant = meta.participants.find(p => 
            p.id === userId || p.lid === userId
        );
        return participant?.admin === 'admin' || participant?.admin === 'superadmin';
    } catch {
        return false;
    }
};

/* ⚡ طرد فوري + حذف الرسالة + إشعار بالسبب */
const kickAndDelete = async (conn, m, groupId, reason) => {
    const v = verse();
    
    /* 1️⃣ حذف الرسالة — فوري */
    try {
        await conn.sendMessage(m.chat, { delete: m.key });
    } catch {}
    
    /* 2️⃣ طرد العضو — فوري */
    try {
        await conn.groupParticipantsUpdate(groupId, [m.sender], 'remove');
    } catch {}
    
    /* 3️⃣ إشعار المجموعة بالسبب */
    try {
        await conn.sendMessage(groupId, {
            text: `${BRAND.emoji} *⚠️ تم طرد عضو*
━━━━━
👤 @${m.sender.split('@')[0]}
📌 *السبب:* ${reason}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`,
            mentions: [m.sender]
        });
    } catch {}
};

/* ═══════════════════════════════════════════
   🛡️ before hook — الحماية
   ═══════════════════════════════════════════ */
export default async function before(m, { conn, bot }) {
    if (!m?.sender) return false;
    
    autoEnableAll();

    const sender = m.sender;
    const isOwner = bot?.config?.owners?.some(o => sender === o.jid || sender === o.lid);
    const text = (m.text || m.body || '').trim();

    /* 🛡️ المجموعات فقط */
    const isGroup = m.chat?.endsWith('@g.us');
    if (!isGroup || isOwner || !text) return false;
    
    const groupId = m.chat;
    
    /* ✅ استثناء المشرفين — لا يُطردون */
    const senderIsAdmin = await isAdmin(conn, groupId, sender);
    if (senderIsAdmin) return false;

    /* ✅ مضاد الروابط */
    if (isEnabled(groupId, 'link') && WHATSAPP_LINK_REGEX.test(text)) {
        await kickAndDelete(conn, m, groupId, '🚫 نشر رابط واتساب');
        return true;
    }
    
    /* ✅ مضاد جهات الاتصال */
    if (isEnabled(groupId, 'contact')) {
        const hasContact = m.message?.contactMessage || 
                          m.message?.contactsArrayMessage ||
                          m.msg?.vcard ||
                          /BEGIN:VCARD/i.test(text);
        
        if (hasContact) {
            await kickAndDelete(conn, m, groupId, '📱 نشر جهة اتصال');
            return true;
        }
    }

    return false;
}

/* ═══════════════════════════════════════════
   🛡️ أوامر التحكم — للمطورين والمشرفين
   ═══════════════════════════════════════════ */
export const antilinkOnHandler = async (m, { conn, bot }) => {
    const isOwner = bot?.config?.owners?.some(o => m.sender === o.jid || m.sender === o.lid);
    const isAdminUser = m.chat?.endsWith('@g.us') ? await isAdmin(conn, m.chat, m.sender) : false;
    
    if (!isOwner && !isAdminUser) {
        return m.reply(`${BRAND.emoji} *للمطورين والمشرفين فقط*`);
    }
    
    if (!global._gs.antilink) global._gs.antilink = {};
    global._gs.antilink[m.chat] = true;
    
    const v = verse();
    await m.reply(`${BRAND.emoji} *✅ تم تفعيل مضاد الروابط*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
};

export const antilinkOffHandler = async (m, { conn, bot }) => {
    const isOwner = bot?.config?.owners?.some(o => m.sender === o.jid || m.sender === o.lid);
    const isAdminUser = m.chat?.endsWith('@g.us') ? await isAdmin(conn, m.chat, m.sender) : false;
    
    if (!isOwner && !isAdminUser) {
        return m.reply(`${BRAND.emoji} *للمطورين والمشرفين فقط*`);
    }
    
    if (!global._gs.antilink) global._gs.antilink = {};
    global._gs.antilink[m.chat] = false;
    
    const v = verse();
    await m.reply(`${BRAND.emoji} *❌ تم إيقاف مضاد الروابط*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
};

export const anticontactOnHandler = async (m, { conn, bot }) => {
    const isOwner = bot?.config?.owners?.some(o => m.sender === o.jid || m.sender === o.lid);
    const isAdminUser = m.chat?.endsWith('@g.us') ? await isAdmin(conn, m.chat, m.sender) : false;
    
    if (!isOwner && !isAdminUser) {
        return m.reply(`${BRAND.emoji} *للمطورين والمشرفين فقط*`);
    }
    
    if (!global._gs.anticontact) global._gs.anticontact = {};
    global._gs.anticontact[m.chat] = true;
    
    const v = verse();
    await m.reply(`${BRAND.emoji} *✅ تم تفعيل مضاد جهات الاتصال*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
};

export const anticontactOffHandler = async (m, { conn, bot }) => {
    const isOwner = bot?.config?.owners?.some(o => m.sender === o.jid || m.sender === o.lid);
    const isAdminUser = m.chat?.endsWith('@g.us') ? await isAdmin(conn, m.chat, m.sender) : false;
    
    if (!isOwner && !isAdminUser) {
        return m.reply(`${BRAND.emoji} *للمطورين والمشرفين فقط*`);
    }
    
    if (!global._gs.anticontact) global._gs.anticontact = {};
    global._gs.anticontact[m.chat] = false;
    
    const v = verse();
    await m.reply(`${BRAND.emoji} *❌ تم إيقاف مضاد جهات الاتصال*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
};

/* ═══════════════════════════════════════════
   🎯 الأوامر
   ═══════════════════════════════════════════ */
export const antilinkOnCmd = {
    command: ['تفعيل_مضاد_الروابط', 'antilink_on'],
    handler: antilinkOnHandler,
    category: 'owner'
};

export const antilinkOffCmd = {
    command: ['ايقاف_مضاد_الروابط', 'antilink_off'],
    handler: antilinkOffHandler,
    category: 'owner'
};

export const anticontactOnCmd = {
    command: ['تفعيل_مضاد_جهات', 'anticontact_on'],
    handler: anticontactOnHandler,
    category: 'owner'
};

export const anticontactOffCmd = {
    command: ['ايقاف_مضاد_جهات', 'anticontact_off'],
    handler: anticontactOffHandler,
    category: 'owner'
};

autoEnableAll();
console.log(`${BRAND.emoji} ✅ [antilink] تم التفعيل التلقائي`);