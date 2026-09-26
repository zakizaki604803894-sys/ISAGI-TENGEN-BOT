/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — أمر البينغ (السرعة)
   📁 /home/container/plugins/info/بنج.js
   ✅ هوية موحّدة | ديكور فخم | بدون رابط في النص
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   🏆 الهوية الموحّدة
   ═══════════════════════════════════════════ */
const BRAND = {
  botName:     '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  developer:   'تنغن كيرا',
  channelId:   '120363428650036031@newsletter',
  channelName: '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆',
  channelLink: 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u',
  image:       'https://i.pinimg.com/1200x/83/b1/29/83b129d788d7a2fd4ddc678b211b79f3.jpg',
  emoji:       '🍁'
};

/* ═══════════════════════════════════════════
   🕌 الآيات القرآنية
   ═══════════════════════════════════════════ */
const VERSES = [
  { text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', ref: 'الشرح: 6' },
  { text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', ref: 'الرعد: 28' },
  { text: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', ref: 'الطلاق: 3' },
  { text: 'وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', ref: 'البقرة: 153' },
  { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' },
  { text: 'فَاذْكُرُونِي أَذْكُرْكُمْ', ref: 'البقرة: 152' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* ═══════════════════════════════════════════
   🎯 دالة التقييم
   ═══════════════════════════════════════════ */
const getStatus = (ping) => {
  if (ping < 300) return '🟢 ممتاز';
  if (ping < 600) return '🟡 جيد';
  if (ping < 1000) return '🟠 بطيء';
  return '🔴 ضعيف جداً';
};

/* ═══════════════════════════════════════════
   🎨 شريط التقدم
   ═══════════════════════════════════════════ */
const progressBar = (percent, length = 10) => {
  const filled = Math.round((Math.min(percent, 100) / 100) * length);
  return '█'.repeat(filled) + '░'.repeat(length - filled);
};

/* ═══════════════════════════════════════════
   ⏱️ تنسيق وقت التشغيل
   ═══════════════════════════════════════════ */
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
};

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
  try {
    /* ⏱️ بدء القياس */
    const start = process.hrtime.bigint();

    /* 📤 رسالة اختبار */
    await conn.sendMessage(m.chat, { text: '🏓 جاري القياس...' });

    /* ⏱️ انتهاء القياس */
    const end = process.hrtime.bigint();
    const ping = Number(end - start) / 1e6;

    /* 📊 المعلومات */
    const status = getStatus(ping);
    const uptime = formatTime(process.uptime());
    const memory = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
    const v = verse();

    /* 📱 النص المختصر */
    const bodyText = `⚡ *سرعة البوت*

━━━━━━━━━━━━━━━

🏓 السرعة: ${ping.toFixed(2)} ms
📊 التقييم: ${status}
📈 المؤشر: [${progressBar(Math.min(ping / 10, 100))}]

━━━━━━━━━━━━━━━

⏱️ التشغيل: ${uptime}
💾 الذاكرة: ${memory} MB
🌐 الحالة: نشط

━━━━━━━━━━━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━━━━━━━━━━━

🍁 *${BRAND.shortName}*`;

    /* 📤 إرسال النتيجة */
    await conn.msgUrl(m.chat, bodyText, {
      img: BRAND.image,
      title: `⚡ ${BRAND.botName} | Speed Test`,
      body: `${BRAND.emoji} ${BRAND.botName}`,
      newsletter: {
        name: BRAND.channelName,
        jid: BRAND.channelId
      },
      big: false
    }, global.reply_status);

  } catch (e) {
    console.error(`${BRAND.emoji} [بنج] خطأ:`, e.message);

    const v = verse();
    await conn.sendMessage(m.chat, {
      text: `❌ *حدث خطأ*

━━━━━━━━━━━━━━━

📌 ${e.message}

━━━━━━━━━━━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━━━━━━━━━━━

🍁 *${BRAND.shortName}*`
    }, { quoted: m });
  }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ["بنج", "ping", "سرعة"];
handler.category = "info";
handler.usage = ["بنج"];

export default handler;