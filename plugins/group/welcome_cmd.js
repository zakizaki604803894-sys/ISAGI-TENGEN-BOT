/* ═══════════════════════════════════════════════════════════
   🎛️ 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — أوامر التحكم بالترحيب
   📁 /home/container/plugins/group/welcome_cmd.js
   ✅ تشغيل_الترحيب / ايقاف_الترحيب
   ✅ بدون كلمة .تفعيل — كلمات مباشرة
   ═══════════════════════════════════════════════════════════ */

const BRAND = {
  botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  emoji:       '🍁'
};

const VERSES = [
  '﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾',
  '﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾',
  '﴿ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ﴾',
  '﴿ وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾',
  '﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾'
];

const getVerse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* 👑 المطورون */
const OWNER_NUMBERS = [
  '212708613251',
  '212722502470',
  '212710825724',
  '212634266182',
  '212638583402',
  '212687411464',
  '212605726220',
  '212602159396',
  '212704509751'
];

const isOwner = (jid) => {
  if (!jid) return false;
  const num = jid.split('@')[0];
  return OWNER_NUMBERS.includes(num);
};

const handler = async (m, { conn, bot, command }) => {
  const chatId = m.chat;
  const v = getVerse();

  /* 🛡️ التحقق من الصلاحيات */
  const isOwnerUser = isOwner(m.sender);
  const isAdminUser = m.isAdmin || false;

  if (!isOwnerUser && !isAdminUser) {
    return m.reply(`${BRAND.emoji} *「⚠️」 هذا الأمر للمشرفين فقط*`);
  }

  /* 🛡️ تهيئة */
  if (!global._gs) global._gs = {};
  if (!global._gs[chatId]) global._gs[chatId] = {};
  const g = global._gs[chatId];

  console.log(`🍁 [welcome-cmd] command="${command}" | chat=${chatId}`);

  /* ✅ تشغيل الترحيب */
  if (command === 'تشغيل_الترحيب' || command === 'welcome_on') {
    g.welcomeDisabled = false;
    console.log(`🍁 [welcome-cmd] ✅ welcomeDisabled = false`);
    return m.reply(`${BRAND.emoji} *✅ تم تشغيل الترحيب* 🎉
━━━━━
📌 البوت سيرحب بالأعضاء الجدد
━━━━━
${v}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
  }

  /* ❌ إيقاف الترحيب */
  if (command === 'ايقاف_الترحيب' || command === 'welcome_off') {
    g.welcomeDisabled = true;
    console.log(`🍁 [welcome-cmd] ⛔ welcomeDisabled = true`);
    return m.reply(`${BRAND.emoji} *✅ تم إيقاف الترحيب*
━━━━━
📌 لن يرسل البوت رسائل ترحيب
━━━━━
${v}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
  }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['تشغيل_الترحيب', 'ايقاف_الترحيب', 'welcome_on', 'welcome_off'];
handler.category = 'group';
handler.usePrefix = true;

export default handler;