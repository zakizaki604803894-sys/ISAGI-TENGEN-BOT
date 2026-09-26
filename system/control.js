/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — نظام التحكم الموحّد (محسّن)
   📁 /home/container/system/control.js
   ⚡ استجابة فورية | بدون مسافات فارغة
   🚫 الترحيب/التوديع → plugins/group/welcome.js
   ✅ يوجّه أحداث المجموعة للبلوجنات تلقائياً (9 أحداث)
   🧬 طبقة السلوك البشري (بدون تغيير أي ميزة)
   ═══════════════════════════════════════════════════════════ */

import fs from 'fs';
import path from 'path';

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
  { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' },
  { text: 'فَاذْكُرُونِي أَذْكُرْكُمْ', ref: 'البقرة: 152' },
  { text: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', ref: 'البقرة: 20' },
  { text: 'وَاللَّهُ خَيْرُ الرَّازِقِينَ', ref: 'الجمعة: 11' },
  { text: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', ref: 'الحديد: 4' },
  { text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ', ref: 'هود: 88' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

let verseCache = null;
let verseCacheTime = 0;
const verseFast = () => {
  if (verseCache && Date.now() - verseCacheTime < 5_000) return verseCache;
  verseCache = verse();
  verseCacheTime = Date.now();
  return verseCache;
};

/* ═══════════════════════════════════════════
   👑 المطورون
   ═══════════════════════════════════════════ */
const OWNERS_DATA = [
  { name: 'kira 🍁',           jid: '212714785380@s.whatsapp.net' },
  { name: 'TENGEN 🍁',         jid: '212722502470@s.whatsapp.net' },
  { name: 'ZAKI 🍁',           jid: '212721087309@s.whatsapp.net' },
  { name: 'ISAGI 🍁',          jid: '212634266182@s.whatsapp.net' },
  { name: 'شينوبو 🦋',          jid: '212638583402@s.whatsapp.net' },
  { name: 'شينوبو 🦋',          jid: '212687411464@s.whatsapp.net' },
  { name: 'ايساغي تنغن 🍁',     jid: '212605726220@s.whatsapp.net' },
  { name: 'ايساغي تنغن 🍁',     jid: '212602159396@s.whatsapp.net' },
  { name: 'مطور جديد 🍁',       jid: '212704509751@s.whatsapp.net' }
];

const OWNER_MAP = new Map();
OWNERS_DATA.forEach(o => {
  OWNER_MAP.set(o.jid, o.name);
  OWNER_MAP.set(o.jid.split('@')[0], o.name);
});

const ownerCache = new Map();
const isOwnerCached = (jid) => {
  if (!jid) return false;
  if (ownerCache.has(jid)) return ownerCache.get(jid);
  const num = jid.split('@')[0].split(':')[0];
  const result = OWNER_MAP.has(jid) || OWNER_MAP.has(num);
  ownerCache.set(jid, result);
  return result;
};

const getOwnerNameFast = (jid) => {
  if (!jid) return null;
  const num = jid.split('@')[0].split(':')[0];
  return OWNER_MAP.get(jid) || OWNER_MAP.get(num) || null;
};

/* 🖼️ الصور */
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

let imageCache = null;
let imageCacheTime = 0;
const getRandomImageFast = () => {
  if (imageCache && Date.now() - imageCacheTime < 3_000) return imageCache;
  imageCache = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  imageCacheTime = Date.now();
  return imageCache;
};

const userPicCache = new Map();
const getUserProfilePic = async (sock, jid) => {
  if (!jid) return getRandomImageFast();
  const cached = userPicCache.get(jid);
  if (cached && Date.now() - cached.time < 300_000) return cached.url;
  try {
    const url = await sock.profilePictureUrl(jid, 'image');
    if (url) {
      userPicCache.set(jid, { url, time: Date.now() });
      return url;
    }
  } catch {}
  return getRandomImageFast();
};

/* 🧬 طبقة السلوك البشري */
const humanBehavior = {
  lastSent: new Map(),
  delay() {
    return new Promise(r => setTimeout(r, Math.floor(Math.random() * 900) + 200));
  },
  async typing(conn, chatId) {
    try {
      await conn.sendPresenceUpdate('composing', chatId);
      await this.delay();
      await conn.sendPresenceUpdate('paused', chatId);
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
  async safeText(conn, chatId, content, options) {
    const last = this.lastSent.get(chatId) || 0;
    const gap = Date.now() - last;
    if (gap < 600) await new Promise(r => setTimeout(r, 600 - gap));
    this.lastSent.set(chatId, Date.now());

    if (content?.text) {
      await this.typing(conn, chatId);
      content = { ...content, text: this.jitter(content.text) };
    } else {
      await this.delay();
    }
    try { return await conn.sendMessage(chatId, content, options); }
    catch { return null; }
  },
  async safeMsgUrl(conn, chatId, text, opts, quoted) {
    await this.delay();
    const safeText = this.jitter(text);
    try { return await conn.msgUrl(chatId, safeText, opts, quoted); }
    catch { return null; }
  },
  async safeButton(conn, chatId, opts, quoted) {
    await this.delay();
    try { return await conn.sendButton(chatId, opts, quoted); }
    catch { return null; }
  }
};

/* 👑 رسائل المطور */
const makeBotReply = (ownerName) => {
  const v = verseFast();
  return `👑 *أهلاً ${ownerName}*
✅ البوت: شغال
🛡️ الحماية: مفعلة
🔗 المضاد: يعمل
⚡ السرعة: فائقة
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;
};

const SUPPORT_TEAM = OWNERS_DATA.map(o => ({
  name: o.name,
  url: `https://wa.me/${o.jid.split('@')[0]}`
}));

/* كاش المجموعات */
const groupMetaCache = new Map();
const getGroupMetaFast = async (sock, chatId) => {
  const cached = groupMetaCache.get(chatId);
  if (cached && Date.now() - cached.time < 60_000) return cached.meta;
  try {
    const meta = await sock.groupMetadata(chatId);
    groupMetaCache.set(chatId, { meta, time: Date.now() });
    return meta;
  } catch { return null; }
};

/* 📦 بلوجنات الأحداث */
let _eventPlugins = null;
let _eventPluginsTime = 0;

const loadEventPlugins = async () => {
  if (_eventPlugins && Date.now() - _eventPluginsTime < 30_000) return _eventPlugins;
  _eventPlugins = [];
  _eventPluginsTime = Date.now();

  try {
    const pluginsDir = path.resolve('./plugins');
    if (!fs.existsSync(pluginsDir)) return _eventPlugins;

    const walk = (dir) => {
      const out = [];
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) out.push(...walk(full));
          else if (entry.name.endsWith('.js')) out.push(full);
        }
      } catch {}
      return out;
    };

    const files = walk(pluginsDir);
    for (const file of files) {
      try {
        const mod = await import(`file://${file}?t=${Date.now()}`);
        const h = mod?.default;
        if (h?.event && Array.isArray(h.event) && h.event.length) {
          _eventPlugins.push({ file, handler: h, events: h.event });
        }
      } catch {}
    }
  } catch {}

  return _eventPlugins;
};

/* 🎯 group — موجّر الأحداث */
const group = async (ctx, event, eventType) => {
  if (!event || !eventType) return null;
  const chatId = event.chat;
  const gs = global._gs?.[chatId];

  if (gs?.welcomeDisabled) return 9999;
  if (gs?.detectDisabled) return 9999;

  try {
    const plugins = await loadEventPlugins();
    if (!plugins.length) return null;

    let called = 0;
    for (const plugin of plugins) {
      if (!plugin.events.includes(eventType)) continue;
      try {
        await plugin.handler(ctx, event, eventType);
        called++;
      } catch (e) {
        console.log(`🍁 [control] ❌ ${path.basename(plugin.file)}:`, e.message);
      }
    }
  } catch (e) {
    console.log(`🍁 [control] ❌ group():`, e.message);
  }

  return null;
};

/* 🛡️ access */
const access = async (msg, checkType, time) => {
  let conn;
  try {
    conn = typeof msg.client === 'function' ? await msg.client() : msg.client;
  } catch { return null; }

  if (!checkType && !msg.isOwner) {
    const sys = global._gs?.__system;
    if (sys && (sys.disabledCommands?.length || sys.disabledCategories?.length)) {
      const body = (msg.body || msg.text || '').trim();
      const cmd = body.split(/\s+/)[0]?.replace(/^[./!]/, '').toLowerCase();
      if (cmd && sys.disabledCommands?.includes(cmd)) {
        const v = verseFast();
        return conn && humanBehavior.safeText(conn, msg.chat, {
          text: `⚠️ *الأمر موقف مؤقتاً*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`
        }).catch(() => {});
      }
    }
  }

  if (!checkType) return null;
  const v = verseFast();

  const quoted = {
    key: {
      participant: `${msg.sender.split('@')[0]}@s.whatsapp.net`,
      remoteJid: 'status@broadcast',
      fromMe: false,
    },
    message: {
      contactMessage: {
        displayName: `${msg.pushName || 'مستخدم'}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${msg.pushName || 'مستخدم'}\nitem1.TEL;waid=${msg.sender.split('@')[0]}:${msg.sender.split('@')[0]}\nEND:VCARD`,
      },
    },
    participant: '0@s.whatsapp.net',
  };

  const messages = {
    cooldown:  `⏱️ *استنى قليلاً*\n⏱️ ${time ? Math.ceil(time / 1000) : 'بعض'} ثانية\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    owner:     `👑 *للمطورين فقط*\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    group:     `👥 *في المجموعات فقط*\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    admin:     `🎖️ *للأدمن فقط*\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    private:   `💬 *في الخاص فقط*\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    botAdmin:  `🛡️ *ارفعني مشرف أولاً*\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    noSub:     `🤖 *في البوت الأساسي فقط*\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    disabled:  `⚠️ *الأمر موقف مؤقتاً*\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`,
    error:     `❌ *حدث خطأ*\n📌 تواصل مع ${BRAND.developer}\n━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n🍁 *${BRAND.shortName}*`
  };

  const msgText = messages[checkType];
  if (!conn || !msgText) return null;

  try {
    if (checkType === 'error') {
      return humanBehavior.safeButton(conn, msg.chat, {
        imageUrl: getRandomImageFast(),
        bodyText: msgText,
        footerText: `${BRAND.emoji} ${BRAND.botName}`,
        buttons: SUPPORT_TEAM.slice(0, 4).map(s => ({
          name: 'cta_url',
          params: { display_text: `${BRAND.emoji} ${s.name}`, url: s.url }
        })),
        mentions: [msg.sender],
        newsletter: { name: BRAND.channelName, jid: BRAND.channelId },
        interactiveConfig: { buttons_limits: 4 }
      }, quoted).catch(() => humanBehavior.safeText(conn, msg.chat, { text: msgText }).catch(() => {}));
    }

    return humanBehavior.safeMsgUrl(conn, msg.chat, msgText, {
      img: getRandomImageFast(),
      title: `${BRAND.emoji} ${BRAND.shortName}`,
      body: `${BRAND.emoji} تنبيهات البوت`,
      newsletter: { name: BRAND.channelName, jid: BRAND.channelId },
      big: false,
      buttons: [{
        name: 'cta_url',
        params: {
          display_text: `📢 قناة ${BRAND.shortName}`,
          url: BRAND.channelLink
        }
      }]
    }, quoted).catch(() => humanBehavior.safeText(conn, msg.chat, { text: msgText }).catch(() => {}));
  } catch {
    return humanBehavior.safeText(conn, msg.chat, { text: msgText }).catch(() => {});
  }
};

export {
  access, group, makeBotReply,
  getOwnerNameFast as getOwnerName,
  verseFast, getRandomImageFast, getUserProfilePic,
  getGroupMetaFast, isOwnerCached, loadEventPlugins,
  BRAND, OWNERS_DATA
};

export default {
  access, group, makeBotReply,
  getOwnerName: getOwnerNameFast,
  verseFast, getRandomImageFast, getUserProfilePic,
  getGroupMetaFast, isOwnerCached, loadEventPlugins,
  BRAND, OWNERS_DATA
};