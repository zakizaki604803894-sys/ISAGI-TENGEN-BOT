/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — بلوجن الترحيب والتوديع (نظيف)
   📁 /home/container/plugins/group/welcome.js
   ✅ يدعم authorPn
   ✅ إرسال موحّد مع زر القناة
   ✅ 🛡️ فلترة صارمة: add/remove/promote/demote فقط
   ✅ ⏱️ تأخير 1.5 ثانية
   ✅ 👥 عدد الأعضاء + نصائح
   ✅ 👑 رسائل مطور متنوعة
   ❌ لا يحتوي على أوامر .تفعيل
   🧬 طبقة السلوك البشري (بدون تغيير أي ميزة)
   ═══════════════════════════════════════════════════════════ */

const BRAND = {
  botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  developer:   'ISAGI 🍁',
  channelId:   '120363428650036031@newsletter',
  channelName: '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  channelLink: 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u',
  emoji:       '🍁'
};

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

let verseCache = null;
let verseCacheTime = 0;
const verse = () => {
  if (verseCache && Date.now() - verseCacheTime < 5_000) return verseCache;
  verseCache = VERSES[Math.floor(Math.random() * VERSES.length)];
  verseCacheTime = Date.now();
  return verseCache;
};

/* 👑 قائمة المطورين */
const OWNERS_DATA = [
  { name: 'kira 🍁',           jid: '212708613251@s.whatsapp.net' },
  { name: 'TENGEN 🍁',         jid: '212722502470@s.whatsapp.net' },
  { name: 'ZAKI 🍁',           jid: '212710825724@s.whatsapp.net' },
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

const isOwner = (jid) => {
  if (!jid) return false;
  const num = jid.split('@')[0].split(':')[0];
  return OWNER_MAP.has(jid) || OWNER_MAP.has(num);
};

const getOwnerName = (jid) => {
  if (!jid) return null;
  const num = jid.split('@')[0].split(':')[0];
  return OWNER_MAP.get(jid) || OWNER_MAP.get(num) || null;
};

/* 🖼️ صور عشوائية */
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

const getRandomImage = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

const userPicCache = new Map();
const getUserPic = async (sock, jid) => {
  if (!jid) return getRandomImage();
  const cached = userPicCache.get(jid);
  if (cached && Date.now() - cached.time < 300_000) return cached.url;
  try {
    const url = await sock.profilePictureUrl(jid, 'image');
    if (url) {
      userPicCache.set(jid, { url, time: Date.now() });
      return url;
    }
  } catch {}
  return getRandomImage();
};

const groupMetaCache = new Map();
const getGroupMeta = async (sock, chatId) => {
  const cached = groupMetaCache.get(chatId);
  if (cached && Date.now() - cached.time < 60_000) return cached.meta;
  try {
    const meta = await sock.groupMetadata(chatId);
    groupMetaCache.set(chatId, { meta, time: Date.now() });
    return meta;
  } catch {
    return null;
  }
};

const extractParticipants = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(p => {
      if (typeof p === 'string') return p;
      return p?.phoneNumber || p?.id || null;
    })
    .filter(Boolean);
};

const getAuthorInfo = async (sock, author, event) => {
  if (!author) return { tag: 'مجهول', name: 'مجهول', jid: null };

  if (event?.authorPn) {
    const num = event.authorPn.split('@')[0];
    let name = num;
    try {
      const n = await sock.getName?.(event.authorPn);
      if (n && !/^\d+$/.test(n)) name = n;
    } catch {}
    return { tag: '@' + num, name, jid: event.authorPn };
  }

  if (author.includes('@s.whatsapp.net')) {
    const num = author.split('@')[0];
    let name = num;
    try {
      const n = await sock.getName?.(author);
      if (n && !/^\d+$/.test(n)) name = n;
    } catch {}
    return { tag: '@' + num, name, jid: author };
  }

  if (author.includes('@lid')) {
    const participant = (event?.participants || []).find(p =>
      (typeof p === 'object' && p?.id === author)
    );
    if (participant?.phoneNumber) {
      const num = participant.phoneNumber.split('@')[0];
      return { tag: '@' + num, name: num, jid: participant.phoneNumber };
    }
  }

  const num = author.split('@')[0];
  return { tag: '@' + num, name: 'مجهول', jid: author };
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

/* ═══════════════════════════════════════════════════════════
   🧬 طبقة السلوك البشري — تعديل سلوكي فقط
   ✅ تعمل قبل sendButtonNormal / sendButton / msgUrl / sendMessage
   ✅ لا تغير أي محتوى
   ═══════════════════════════════════════════════════════════ */
const humanBehavior = {
  // تأخير عشوائي قصير
  jitterDelay() {
    return new Promise(r => setTimeout(r, Math.floor(Math.random() * 900) + 200));
  },

  // تشتيت طفيف للنص (يمنع التطابق الحرفي)
  jitter(text) {
    if (!text || typeof text !== 'string') return text;
    const variants = [
      text,
      text + '\u200b',
      text.replace(/\n\n/g, '\n \n'),
      text.replace(/━/g, '─'),
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }
};

const sendGroupMsg = async (sock, chatId, text, img, mentions) => {
  /* 🧬 تشتيت النص + تأخير بشري إضافي قبل الإرسال */
  text = humanBehavior.jitter(text);
  await humanBehavior.jitterDelay();

  const buttons = [
    {
      name: 'cta_url',
      params: {
        display_text: `📢 قناة البوت`,
        url: BRAND.channelLink
      }
    }
  ];

  if (typeof sock.sendButtonNormal === 'function') {
    try {
      await sock.sendButtonNormal(chatId, {
        media: { url: img },
        mediaType: 'image',
        caption: text,
        buttons: buttons,
        mentions: mentions,
        newsletter: { name: BRAND.channelName, jid: BRAND.channelId }
      });
      console.log('🍁 [welcome/send] ✅ sendButtonNormal');
      return true;
    } catch (e) {
      console.log('🍁 [welcome/send] ❌ sendButtonNormal:', e.message);
    }
  }

  if (typeof sock.sendButton === 'function') {
    try {
      await sock.sendButton(chatId, {
        imageUrl: img,
        bodyText: text,
        footerText: `${BRAND.emoji} ${BRAND.botName}`,
        buttons: buttons,
        mentions: mentions,
        newsletter: { name: BRAND.channelName, jid: BRAND.channelId },
        interactiveConfig: { buttons_limits: 20 }
      });
      console.log('🍁 [welcome/send] ✅ sendButton');
      return true;
    } catch (e) {
      console.log('🍁 [welcome/send] ❌ sendButton:', e.message);
    }
  }

  if (typeof sock.msgUrl === 'function') {
    try {
      await sock.msgUrl(chatId, text, {
        img,
        title: BRAND.botName,
        body: `${BRAND.emoji} بوت واتساب من تطوير ${BRAND.developer}`,
        mentions,
        newsletter: { name: BRAND.channelName, jid: BRAND.channelId }
      });
      console.log('🍁 [welcome/send] ✅ msgUrl');
      return true;
    } catch (e) {
      console.log('🍁 [welcome/send] ❌ msgUrl:', e.message);
    }
  }

  try {
    await sock.sendMessage(chatId, {
      image: { url: img },
      caption: text,
      mentions
    });
    console.log('🍁 [welcome/send] ✅ sendMessage');
    return true;
  } catch (e) {
    console.log('🍁 [welcome/send] ❌ sendMessage:', e.message);
  }

  return false;
};

const makeOwnerWelcome = (ownerName) => {
  const v = verse();
  const variants = [
    `👑 *دخل المطور*
👤 ${ownerName}
🔥 النظام تحت أمره
🛡️ الجروب في أمان
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`,

    `👑 *المطور نزل على الجروب* 🔥
👤 ${ownerName}
⚡ استعدوا للأوامر
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`,

    `👑 *${ownerName} هنا* 🍁
🛡️ الجروب في أمان تام
🔥 النظام جاهز
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`
  ];
  return variants[Math.floor(Math.random() * variants.length)];
};

const makeOwnerBye = (ownerName) => {
  const v = verse();
  const variants = [
    `👑 *خرج المطور*
👤 ${ownerName}
🛡️ وضع الحراسة الذاتية
🔥 المهرجان مستمر
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`,

    `👑 *المطور غادر الجروب*
👤 ${ownerName}
> النظام في وضع الحراسة الذاتية 🍁
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`,

    `⚡ *${ownerName} خرج*
> من يجرؤ الآن؟ 🔥
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`
  ];
  return variants[Math.floor(Math.random() * variants.length)];
};

/* ═══════════════════════════════════════════
   🎯 معالج الأحداث فقط
   ═══════════════════════════════════════════ */
const handler = async (ctx, event, explicitEventType) => {
  try {
    if (!event || !event.participants || !Array.isArray(event.participants) || event.participants.length === 0) {
      console.log('🍁 [welcome] ⛔ no participants → skip');
      return null;
    }

    const participants = extractParticipants(event.participants);
    if (!participants.length) {
      console.log('🍁 [welcome] ⛔ empty participants → skip');
      return null;
    }

    const eventType = event.action || explicitEventType;

    if (!['add', 'remove', 'promote', 'demote'].includes(eventType)) {
      console.log(`🍁 [welcome] ⛔ eventType="${eventType}" not member event → skip`);
      return null;
    }

    const chatId = event.chat || event.id;
    if (!chatId) {
      console.log('🍁 [welcome] ⛔ no chatId → skip');
      return null;
    }

    /* 🚫 فحص تعطيل الترحيب */
    if (global._gs?.[chatId]?.welcomeDisabled === true) {
      console.log(`🍁 [welcome] ⛔ welcomeDisabled → skip ${chatId}`);
      return 9999;
    }

    console.log(`🍁 [welcome] ✅ processing ${eventType} in ${chatId}`);

    await delay(1500);

    const author = event.author;
    const authorInfo = await getAuthorInfo(ctx.sock, author, event);
    const authorTag = authorInfo.tag;

    const meta = await getGroupMeta(ctx.sock, chatId);
    const groupName = meta?.subject || 'المجموعة';
    const memberCount = meta?.participants?.length || 0;

    const now = new Date();
    const timeString = now.toLocaleString('ar-EG', {
      timeZone: 'Africa/Casablanca',
      hour: '2-digit',
      minute: '2-digit'
    });

    const v = verse();

    const messages = {
      add: (list) => {
        const displayName = (list[0] || '').split('@')[0] || 'مستخدم';
        return `🍁━━━[ *🎉 أهلاً بك* ]━━━🍁

🌟 *الضيف:* @${displayName}
🏰 *المجموعة:* ${groupName}
👥 *الأعضاء:* ${memberCount}
⏰ *الوقت:* ${timeString}

━━━━━
📋 *قوانين المجموعة*
🚫 ممنوع الشتم
🚫 ممنوع الروابط
🚫 ممنوع الدخول الخاص
✅ الاحترام المتبادل

━━━━━
💡 *نصائح للعضو الجديد:*
▸ استخدم .اوامر لعرض الأوامر
▸ استخدم .قائمة للتنقل
▸ احترم قوانين المجموعة

━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;
      },

      remove: (list) => {
        const displayName = (list[0] || '').split('@')[0] || 'مستخدم';
        return `🍁━━━[ *💔 وداعاً* ]━━━🍁

🌟 *المغادر:* @${displayName}
🏰 *المجموعة:* ${groupName}
👥 *الأعضاء الآن:* ${memberCount}
⏰ *الوقت:* ${timeString}

━━━━━
😹 رجع للغيس ديالو!
🎉 الجماعة تنفست الصعداء!
🌹 نتمنى لك الخير

━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;
      },

      promote: (list) => {
        const displayName = (list[0] || '').split('@')[0] || 'مستخدم';
        return `🍁━━━[ *🎖️ ترقية* ]━━━🍁

🎉 *مبروك:* @${displayName}
👑 *بواسطة:* ${authorTag}
👥 *الأعضاء:* ${memberCount}

━━━━━
⚡ أصبح مشرفاً في المجموعة

━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;
      },

      demote: (list) => {
        const displayName = (list[0] || '').split('@')[0] || 'مستخدم';
        return `🍁━━━[ *📌 تنزيل* ]━━━🍁

👤 *العضو:* @${displayName}
👑 *بواسطة:* ${authorTag}
👥 *الأعضاء:* ${memberCount}

━━━━━
📌 تم إعفاء العضو من الإدارة

━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
🍁 *${BRAND.shortName}*`;
      }
    };

    const txt = messages[eventType]?.(participants);
    if (!txt) return null;

    if (['add', 'remove'].includes(eventType) && participants.length) {
      const isOwnerAffected = participants.some(p => isOwner(p));

      if (isOwnerAffected) {
        const ownerParticipant = participants.find(p => isOwner(p));
        const ownerName = getOwnerName(ownerParticipant) || 'ISAGI 🍁';

        const msg = eventType === 'add'
          ? makeOwnerWelcome(ownerName)
          : makeOwnerBye(ownerName);

        const ownerPic = await getUserPic(ctx.sock, ownerParticipant);
        await sendGroupMsg(ctx.sock, chatId, msg, ownerPic, participants);
        return;
      }
    }

    const targetUser = participants[0];
    const userPic = await getUserPic(ctx.sock, targetUser);

    const mentions = [];
    if (authorInfo.jid) mentions.push(authorInfo.jid);
    participants.forEach(p => { if (!mentions.includes(p)) mentions.push(p); });

    await sendGroupMsg(ctx.sock, chatId, txt, userPic, mentions);

  } catch (e) {
    console.log('🍁 [welcome] error:', e.message);
  }
  return null;
};

handler.event = ['add', 'remove', 'promote', 'demote'];
handler.category = 'group';
handler.command = [];
handler.enabled = true;
handler.autoLoad = true;

export default handler;