/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — الملف الرئيسي (نهائي)
   📁 /home/container/index.js
   ⚡ استجابة فورية | Cache | بدون تكرار
   ✅ يدعم أحداث البوتات الفرعية → البلوجنات
   ✅ يدعم 9 أحداث: add/remove/promote/demote/subject/icon/settings/announce/restrict
   🧬 طبقة السلوك البشري (بدون تغيير أي ميزة)
   🛡️ حماية مدمجة من ZodError (تنقية owners)
   ═══════════════════════════════════════════════════════════ */

import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ═══════════════════════════════════════════
   🏆 الهوية الموحّدة
   ═══════════════════════════════════════════ */
const BRAND = {
  botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  fullName:    'ISAGI TENGEN BOT',
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

/* 🖼️ صور ISAGI TENGEN */
const IMAGES = [
  'https://i.postimg.cc/DZcTw8Dq/lllybyb.jpg',
  'https://i.postimg.cc/Ls393WJK/mntnmanlanlamlt.jpg',
  'https://i.postimg.cc/cLd4h99Q/1ec6d4d9d187860bebecd5655c2130a7.jpg',
  'https://i.postimg.cc/L5m0w1r1/6539a3ddd4b8e9804e2235afa2928e4a.jpg',
  'https://i.postimg.cc/BQHBH6yw/49361b48a01156b70d4e94f5a954aa3f.jpg',
  'https://i.postimg.cc/J7JkdFqB/fe5a547f50ff075c6697d8802c96f31f.jpg',
  'https://i.postimg.cc/T1CG4GHh/c4bac4df1cf0be95920442ceae42fa8e.jpg',
  'https://i.postimg.cc/tTBM0TpC/c8c75a230d652e70a57f364f2c3c20b9.jpg',
  'https://i.postimg.cc/L8FvbfL5/bb5f15bce9d3efdb69edae96cd559cb9.jpg',
  'https://i.postimg.cc/nhnSLBrZ/41187c79fcad726d466fa80e90a51207.jpg',
  'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9afb0fe0a.jpg',
  'https://i.postimg.cc/JnTyPJ74/telechargement-(4).jpg',
  'https://i.postimg.cc/XJx2L2ys/anime-7-63864269925437.jpg'
];

/* 👑 قائمة المطورين */
const OWNER_NUMBERS = [
  '212708613251',
  '212722502470',
  '212710825724',
  '212634266182',
  '212640684235',
  '212687411464',
  '212605726220',
  '212602159396',
  '212704509751'
];

const OWNER_SET = new Set(OWNER_NUMBERS);

const ownerCache = new Map();
const isOwnerFast = (sender) => {
  if (!sender) return false;
  if (ownerCache.has(sender)) return ownerCache.get(sender);
  const num = sender.split('@')[0];
  const result = OWNER_SET.has(num);
  ownerCache.set(sender, result);
  return result;
};

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '212640684235',
  prefix: [".", "/", "!"],
  owners: [
    { name: "kira 🍁 | مطور",          jid: "212714785380@s.whatsapp.net", lid: "" },
    { name: "TENGEN 🍁 | مطور",        jid: "212722502470@s.whatsapp.net", lid: "" },
    { name: "ZAKI 🍁 | مطور",          jid: "212721087309@s.whatsapp.net", lid: "" },
    { name: "ISAGI  | مطور",           jid: "212634266182@s.whatsapp.net", lid: "" },
    { name: "زكرياء 🦋 | مطور",         jid: "212638583402@s.whatsapp.net", lid: "" },
    { name: "زاكي007 🦋 | مطور",        jid: "212640684235@s.whatsapp.net", lid: "" },
    { name: "ايساغي تنغن 🍁 | مطور",    jid: "212701308460@s.whatsapp.net", lid: "" },
    { name: "ايساغي تنغن 🍁 | مطور",    jid: "212602159396@s.whatsapp.net", lid: "" },
    { name: "مطور زاكي عمي 🍁 | مطور",  jid: "212717709503@s.whatsapp.net", lid: "" }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins',
  autoReconnect: true,
  reconnectDelay: 3000,
  maxReconnectAttempts: 999999
});

/* ═══════════════════════════════════════════════════════════
   🛡️ حماية مدمجة من ZodError
   ✅ تنقية config.owners بعد الإنشاء
   ✅ تنقية أي قائمة مشابهة
   ═══════════════════════════════════════════════════════════ */

/* 🔧 تنظيف عنصر owner */
const cleanOwner = (o) => ({
  name: String(o?.name || ''),
  jid:  String(o?.jid  || ''),
  lid:  String(o?.lid  || '')
});

/* 🔧 تنظيف مصفوفة owners */
const cleanOwnersArray = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(o => o && typeof o === 'object')
    .map(cleanOwner)
    .filter(o => o.jid || o.lid);
};

/* 🛡️ تنقية config.owners */
const sanitizeConfigOwners = () => {
  const cfg = client.config || {};
  if (!cfg.owners || !Array.isArray(cfg.owners)) return;
  cfg.owners = cleanOwnersArray(cfg.owners);
};

/* 🛡️ تنقية global.db.extraOwners */
const sanitizeDbExtraOwners = () => {
  try {
    if (!global.db?.data?.extraOwners) return;
    global.db.data.extraOwners = cleanOwnersArray(global.db.data.extraOwners);
  } catch {}
};

/* 🛡️ تنقية كل شيء */
const sanitizeAll = () => {
  sanitizeConfigOwners();
  sanitizeDbExtraOwners();
};

/* تنقية فورية بعد إنشاء client */
sanitizeConfigOwners();

/* 🔁 تنقية دورية كل 30 ثانية */
setInterval(sanitizeAll, 30000);

/* 🔁 تنقية عند أي إضافة/إزالة مطور من UltraDB */
const _hookDb = () => {
  if (!global.db) return false;
  if (global.db.__ownersHooked) return true;

  const _add = global.db.addExtraOwner?.bind(global.db);
  const _rem = global.db.removeExtraOwner?.bind(global.db);

  if (typeof global.db.addExtraOwner === 'function') {
    global.db.addExtraOwner = function (...args) {
      const cleanedArgs = args.map(a =>
        (a && typeof a === 'object' && (a.jid || a.lid)) ? cleanOwner(a) : a
      );
      const r = _add?.(...cleanedArgs);
      sanitizeAll();
      return r;
    };
  }
  if (typeof global.db.removeExtraOwner === 'function') {
    global.db.removeExtraOwner = function (...args) {
      const r = _rem?.(...args);
      sanitizeAll();
      return r;
    };
  }
  global.db.__ownersHooked = true;
  return true;
};

/* ═══════════════════════════════════════════════════════════
   🧬 طبقة السلوك البشري
   ═══════════════════════════════════════════════════════════ */
const humanBehavior = {
  lastSent: new Map(),

  delay() {
    return new Promise(r => setTimeout(r, Math.floor(Math.random() * 350) + 150));
  },

  async typing(client, chatId) {
    try {
      await client.sendPresenceUpdate('composing', chatId);
      await this.delay();
      await client.sendPresenceUpdate('paused', chatId);
    } catch {}
  },

  jitter(text) {
    if (!text || typeof text !== 'string') return text;
    const variants = [
      text,
      text + '\u200b',
      text.replace(/\n\n/g, '\n \n'),
      text.replace(/━/g, '─'),
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  },

  async send(originalSend, client, chatId, content, options) {
    if (content?.delete || content?.edit || content?.react) {
      return originalSend(chatId, content, options);
    }

    const last = this.lastSent.get(chatId) || 0;
    const gap = Date.now() - last;
    if (gap < 300) await new Promise(r => setTimeout(r, 300 - gap));
    this.lastSent.set(chatId, Date.now());

    if (content?.text && !content?.image && !content?.media) {
      await this.typing(client, chatId);
    } else {
      await this.delay();
    }

    const safeContent = { ...content };
    if (safeContent.text)    safeContent.text    = this.jitter(safeContent.text);
    if (safeContent.caption) safeContent.caption = this.jitter(safeContent.caption);

    try { return await originalSend(chatId, safeContent, options); }
    catch { return null; }
  }
};

/* حقن في client.sendMessage بعد الاتصال */
const injectHumanBehavior = () => {
  if (!client.sendMessage || typeof client.sendMessage !== 'function') return false;
  if (client.__humanInjected) return true;

  const __originalSend = client.sendMessage.bind(client);
  client.sendMessage = function (chatId, content, options) {
    return humanBehavior.send(__originalSend, client, chatId, content, options);
  };
  client.__humanInjected = true;
  console.log('🧬 [human] injected into client.sendMessage');
  return true;
};

if (typeof client.on === 'function') {
  try {
    client.on('ready', () => {
      if (injectHumanBehavior()) console.log('🧬 [human] injected on ready');
    });
  } catch {}
}

const __injectTimer = setInterval(() => {
  if (injectHumanBehavior()) clearInterval(__injectTimer);
}, 500);
setTimeout(() => clearInterval(__injectTimer), 60000);

setInterval(() => {
  const now = Date.now();
  for (const [k, v] of humanBehavior.lastSent) {
    if (now - v > 300000) humanBehavior.lastSent.delete(k);
  }
}, 300000);

/* =========== Database ========== */
if (!global.db) global.db = new UltraDB();
if (!global.db.data) global.db.data = {};
if (!global.db.data.antiLink) global.db.data.antiLink = {};
if (!global.db.data.chats) global.db.data.chats = {};
if (!global._gs) global._gs = {};
if (!global.groups) global.groups = {};

/* تطبيق hook قاعدة البيانات + تنقية المطورين */
_hookDb();
sanitizeAll();

/* =========== Config ========== */
const { config } = client;
config.info = {
  nameBot: BRAND.botName,
  nameChannel: BRAND.channelName,
  idChannel: BRAND.channelId,
  urls: {
    repo: BRAND.channelLink,
    api: "https://emam-api.web.id",
    channel: BRAND.channelLink
  },
  copyright: {
    pack: '🍁 ايساغي تنغن بوت',
    author: 'ايساغي تنغن 🍁'
  },
  images: IMAGES
};

/* ═══════════════════════════════════════════
   🛡️ نظام مضاد الروابط وجهات الاتصال
   ═══════════════════════════════════════════ */
const antiLinkSystem = {
  warnings: new Map(),
  stats: { totalWarnings: 0, totalKicks: 0, activeGroups: new Set() },
  groupCache: new Map(),

  getGroupCache(chatId) {
    const cached = this.groupCache.get(chatId);
    if (cached && Date.now() - cached.time < 60_000) return cached.meta;
    return null;
  },

  async getGroupMeta(client, chatId) {
    const cached = this.getGroupCache(chatId);
    if (cached) return cached;
    try {
      const meta = await client.groupMetadata(chatId);
      this.groupCache.set(chatId, { meta, time: Date.now() });
      return meta;
    } catch { return null; }
  },

  getGroupStatus(chatId) {
    return global.db.data.antiLink[chatId] !== false;
  },

  setGroupStatus(chatId, status) {
    global.db.data.antiLink[chatId] = status;
    if (!global.db.data.chats[chatId]) global.db.data.chats[chatId] = {};
    global.db.data.chats[chatId].antiLink = status;
  },

  hasLink(text) {
    if (!text) return false;
    return /(chat\.whatsapp\.com|whatsapp\.com\/channel|wa\.me)/i.test(text);
  },

  hasContact(message) {
    return !!(message?.contactMessage ||
             message?.contactsArrayMessage ||
             message?.vcardMessage ||
             message?.documentMessage?.fileName?.toLowerCase()?.endsWith('.vcf'));
  },

  async handleMessage(m, client) {
    try {
      if (!m.isGroup) return;

      const senderNum = m.sender?.split('@')[0];
      if (!senderNum) return;
      if (OWNER_SET.has(senderNum)) return;

      const text = m.body || m.text || '';
      const hasLink = text ? this.hasLink(text) : false;
      const hasContact = this.hasContact(m.message);
      if (!hasLink && !hasContact) return;

      if (!this.getGroupStatus(m.chat)) return;

      const meta = await this.getGroupMeta(client, m.chat);
      if (!meta) return;

      const botJid = client.user?.id;
      const botPart = meta.participants.find(p => p.id === botJid);
      if (!botPart || botPart.admin !== 'admin') return;

      const senderPart = meta.participants.find(p => p.id === m.sender);
      if (senderPart?.admin === 'admin' || senderPart?.admin === 'superadmin') return;

      const warningKey = `${m.chat}_${m.sender}`;
      const newWarnings = (this.warnings.get(warningKey) || 0) + 1;
      this.warnings.set(warningKey, newWarnings);

      client.sendMessage(m.chat, { delete: m.key }).catch(() => {});

      const violationType = hasContact ? '📇 جهة اتصال' : '🔗 رابط واتساب';
      const v = verse();

      if (newWarnings === 1) {
        this.stats.totalWarnings++;
        this.stats.activeGroups.add(m.chat);
        return client.sendMessage(m.chat, {
          text: `⚠️ *تنبيه*

━━━━━

👤 @${senderNum}
📋 السبب: ${violationType}
⚡ الإنذار: 1/2

━━━━━

📌 المخالفة القادمة = طرد فوري

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`,
          mentions: [m.sender]
        });
      }

      if (newWarnings >= 2) {
        this.warnings.delete(warningKey);
        this.stats.totalKicks++;
        this.stats.activeGroups.add(m.chat);

        client.sendMessage(m.chat, {
          text: `🚪 *طرد فوري*

━━━━━

👤 @${senderNum}
📋 السبب: ${violationType}

━━━━━

✅ تم تنظيف المجموعة

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`,
          mentions: [m.sender]
        }).catch(() => {});

        client.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch(() => {});
      }

    } catch {}
  }
};

const combinedAccess = async (m, client) => {
  antiLinkSystem.handleMessage(m, client).catch(() => {});
  try { if (access) await access(m, client); } catch {}
};

client.onGroupEvent(group);
client.onCommandAccess(combinedAccess);

/* SubBots events */
const SUB_EVENTS = [
  'add', 'remove', 'promote', 'demote',
  'subject', 'icon', 'settings', 'announce', 'restrict'
];

let subEventsRegistered = false;
const registerSubEvents = () => {
  if (subEventsRegistered) return true;
  if (!global.subBots) return false;

  try {
    SUB_EVENTS.forEach((evType) => {
      global.subBots.on(evType, async (uid, event) => {
        try {
          const bot = global.subBots.get(uid);
          const sock = bot?.sock;
          if (!sock || !event?.chat) return;
          const ctx = { sock, client: sock, uid };
          await group(ctx, event, evType);
        } catch {}
      });
    });

    subEventsRegistered = true;
    console.log(`🍁 ✅ SubBots events registered (${SUB_EVENTS.length} events) → plugins`);
    return true;
  } catch (e) {
    console.log(`🍁 ⚠️ SubBots events failed:`, e.message);
    return false;
  }
};

setTimeout(() => {
  if (!registerSubEvents()) {
    const retry = setInterval(() => {
      if (registerSubEvents()) clearInterval(retry);
    }, 5000);
    setTimeout(() => clearInterval(retry), 60_000);
  }
}, 3000);

/* أوامر المضاد */
client.onCommandAccess(async (m) => {
  if (!m.isGroup || !m.body) return;
  const text = m.body.trim();

  if (!text.startsWith('.')) return;

  const chatId = m.chat;

  if (text === '.مضاد' || text === '.حالة_مضاد') {
    const v = verse();
    const status = antiLinkSystem.getGroupStatus(chatId);
    return client.sendMessage(chatId, {
      text: `🛡️ *حالة المضاد*

━━━━━

📌 الحالة: ${status ? '🟢 مفعل' : '🔴 معطل'}
🔗 روابط واتساب: ${status ? '✅' : '❌'}
📇 جهات الاتصال: ${status ? '✅' : '❌'}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`
    });
  }

  if (text === '.احصائيات_مضاد') {
    if (!isOwnerFast(m.sender)) return client.sendMessage(chatId, { text: `❌ *للمطورين فقط*` });
    const v = verse();
    return client.sendMessage(chatId, {
      text: `📊 *إحصائيات المضاد*

━━━━━

⚠️ الإنذارات: ${antiLinkSystem.stats.totalWarnings}
🚫 المطرودين: ${antiLinkSystem.stats.totalKicks}
📌 النشطة: ${antiLinkSystem.stats.activeGroups.size}
👑 المطورون: ${OWNER_NUMBERS.length}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`
    });
  }

  if (!text.startsWith('.تفعيل_مضاد') && !text.startsWith('.ايقاف_مضاد')) {
    return;
  }

  let isAdmin = false;
  const meta = await antiLinkSystem.getGroupMeta(client, chatId);
  if (meta) {
    const sender = meta.participants.find(p => p.id === m.sender);
    isAdmin = sender?.admin === 'admin' || sender?.admin === 'superadmin';
  }
  const isOwner = isOwnerFast(m.sender);

  if (text === '.تفعيل_مضاد') {
    if (!isAdmin && !isOwner) return client.sendMessage(chatId, { text: `❌ *للمشرفين فقط*` });
    antiLinkSystem.setGroupStatus(chatId, true);
    const v = verse();
    return client.sendMessage(chatId, {
      text: `✅ *تم تفعيل المضاد*

━━━━━

🔗 روابط واتساب: ✅
📇 جهات الاتصال: ✅
⚡ العقوبة: طرد فوري

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`
    });
  }

  if (text === '.ايقاف_مضاد') {
    if (!isAdmin && !isOwner) return client.sendMessage(chatId, { text: `❌ *للمشرفين فقط*` });
    antiLinkSystem.setGroupStatus(chatId, false);
    const v = verse();
    return client.sendMessage(chatId, {
      text: `❌ *تم إيقاف المضاد*

━━━━━

📌 للتفعيل: .تفعيل_مضاد

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

${BRAND.emoji} *${BRAND.shortName}*`
    });
  }
});

/* ═══════════════════════════════════════════════════════════
   🛡️ معالجة الأخطاء الذكية
   ═══════════════════════════════════════════════════════════ */
const errorStats = {
  zod: 0,
  session: 0,
  rate: 0,
  network: 0,
  other: 0
};

const classifyError = (msg) => {
  const m = String(msg || '').toLowerCase();
  if (m.includes('zod') || m.includes('unrecognized_keys')) return 'zod';
  if (m.includes('session') || m.includes('bad mac') || m.includes('prekey')) return 'session';
  if (m.includes('rate-overlimit') || m.includes('rate limit')) return 'rate';
  if (m.includes('econnreset') || m.includes('etimedout') || m.includes('enotfound')) return 'network';
  return 'other';
};

process.on('uncaughtException', (e) => {
  const type = classifyError(e.message);
  errorStats[type]++;

  if (type === 'rate') return;
  if (type === 'session') return;

  console.error(`${BRAND.emoji} ❌ [${type}]`, e.message);
});

process.on('unhandledRejection', (err) => {
  const msg = err?.message || String(err);
  const type = classifyError(msg);
  errorStats[type]++;

  if (type === 'rate' || type === 'session') return;

  console.error(`${BRAND.emoji} ❌ [${type}]`, msg);
});

/* 💾 حفظ قبل الخروج */
const safeExit = () => {
  try {
    if (global.db && typeof global.db.forceSave === 'function') {
      global.db.forceSave();
      console.log('🍁 [exit] ✅ تم حفظ قاعدة البيانات');
    }
  } catch {}
};

process.on('SIGINT', () => { safeExit(); process.exit(0); });
process.on('SIGTERM', () => { safeExit(); process.exit(0); });

/* ═══════════════════════════════════════════════════════════
   🚀 بدء التشغيل
   ═══════════════════════════════════════════════════════════ */
console.log(`
╔════════════════════════════════════════╗
║                                        ║
║   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 🍁          ║
║                                        ║
║   ⚡ استجابة فورية                     ║
║   🛡️ مضاد مفعل                        ║
║   👑 ${OWNER_NUMBERS.length} مطورين                      ║
║   📡 ${SUB_EVENTS.length} أحداث مدعومة               ║
║                                        ║
╚════════════════════════════════════════╝
`);

client.start();

setTimeout(async () => {
  if (client.commandSystem) {
    try { sub(client); } catch (e) { console.log('🍁 sub error:', e?.message); }
  }
}, 1000);