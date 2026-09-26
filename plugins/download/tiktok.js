/* ═══════════════════════════════════════════════════════════
   🎬 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — بحث تيك توك + قائمة نتائج
   📁 /home/container/plugins/download/tiktok.js
   ✅ أمر .تيك <بحث>
   ✅ قائمة منسدلة (single_select) بالنتائج
   ✅ عند الاختيار → تحميل مباشر
   ✅ يستخدم tikwm.com (تحميل) + FetchLayer (بحث)
   ═══════════════════════════════════════════════════════════ */

import axios from 'axios';

/* ═══════════════════════════════════════════
   🏆 الهوية
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

/* 🖼️ صور */
const IMAGES = [
  'https://i.postimg.cc/DZcTw8Dq/lllybyb.jpg',
  'https://i.postimg.cc/Ls393WJK/mntnmanlanlamlt.jpg',
  'https://i.postimg.cc/cLd4h99Q/1ec6d4d9d187860bebecd5655c2130a7.jpg',
  'https://i.postimg.cc/L5m0w1r1/6539a3ddd4b8e9804e2235afa2928e4a.jpg',
  'https://i.postimg.cc/BQHBH6yw/49361b48a01156b70d4e94f5a954aa3f.jpg'
];

const getRandomImage = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

/* ═══════════════════════════════════════════
   🎬 APIs
   ═══════════════════════════════════════════ */
const FETCHLAYER_API_KEY = 'ss-fa7497b1296b94476f42b3b9aef2e1dde4a40db31769e9be366f10152274';
const FETCHLAYER_URL = 'https://api.fetchlayer.dev/tiktok/search-videos';
const TIKWM_DL_URL = 'https://www.tikwm.com/api/';

/* ═══════════════════════════════════════════
   🛠️ أدوات
   ═══════════════════════════════════════════ */
const cleanText = (text, max = 180) => {
  if (!text) return 'بدون وصف';
  text = String(text).replace(/\s+/g, ' ').trim();
  if (text.length > max) return text.slice(0, max - 3) + '...';
  return text;
};

const formatNumber = (num) => {
  if (num == null) return '0';
  num = Number(num);
  if (Number.isNaN(num)) return '0';
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return String(num);
};

const getVideoAsset = (video) => {
  if (!video?.assets || !Array.isArray(video.assets)) return null;
  return video.assets.find(x => x?.kind === 'video' && x?.url) || null;
};

/* ═══════════════════════════════════════════
   💾 كاش النتائج
   ═══════════════════════════════════════════ */
const resultCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

const cacheResults = (userId, results) => {
  resultCache.set(userId, { results, time: Date.now() });
};

const getCachedResults = (userId) => {
  const entry = resultCache.get(userId);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL) {
    resultCache.delete(userId);
    return null;
  }
  return entry.results;
};

/* ═══════════════════════════════════════════
   🎬 تحميل فيديو — عبر tikwm.com
   ═══════════════════════════════════════════ */
async function getTikTokVideo(tiktokUrl) {
  /* 🔗 طلب tikwm */
  const response = await axios.get(TIKWM_DL_URL, {
    params: {
      url: tiktokUrl,
      hd: 1
    },
    timeout: 30_000,
    validateStatus: () => true
  });

  if (response.status !== 200) {
    throw new Error(`tikwm HTTP ${response.status}`);
  }

  const data = response.data;

  if (data?.code !== 0 || !data?.data) {
    throw new Error(data?.msg || 'tikwm لم يرجع فيديو');
  }

  const videoData = data.data;

  /* 🎯 اختيار رابط الفيديو */
  let directUrl = null;

  /* أولاً: HD إن وُجد */
  if (videoData.hdplay) directUrl = videoData.hdplay;
  else if (videoData.play) directUrl = videoData.play;
  else if (videoData.wmplay) directUrl = videoData.wmplay;

  if (!directUrl) {
    throw new Error('لم يتم العثور على رابط الفيديو');
  }

  /* 📥 تحميل الفيديو */
  const videoResponse = await axios.get(directUrl, {
    responseType: 'arraybuffer',
    timeout: 60_000,
    maxContentLength: 100 * 1024 * 1024,
    maxBodyLength: 100 * 1024 * 1024,
    validateStatus: () => true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36',
      'Accept': 'video/mp4,video/*,*/*;q=0.8',
      'Referer': 'https://www.tikwm.com/'
    }
  });

  if (videoResponse.status !== 200) {
    throw new Error(`تحميل HTTP ${videoResponse.status}`);
  }

  const buffer = Buffer.from(videoResponse.data);
  if (!buffer.length) throw new Error('الفيديو فارغ');

  return {
    buffer,
    directUrl,
    title: videoData.title || '',
    author: videoData.author?.nickname || videoData.author?.unique_id || 'TikTok'
  };
}

/* ═══════════════════════════════════════════
   🔍 بحث TikTok — عبر FetchLayer
   ═══════════════════════════════════════════ */
async function searchTikTok(query) {
  const response = await axios.post(
    FETCHLAYER_URL,
    { query, limit: 15, pages: 1, format: 'json', timeoutMs: 30_000 },
    {
      headers: {
        Authorization: `Bearer ${FETCHLAYER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 45_000,
      validateStatus: () => true
    }
  );

  if (response.status === 401) throw new Error('مفتاح FetchLayer غير صحيح');
  if (response.status === 402) throw new Error('رصيد FetchLayer غير كافٍ');
  if (response.status === 429) throw new Error('FetchLayer وصل لحد الطلبات');
  if (response.status >= 400) throw new Error(`FetchLayer HTTP ${response.status}`);

  if (!Array.isArray(response.data?.videos)) throw new Error('FetchLayer لم يرجع نتائج');

  return response.data.videos;
}

/* ═══════════════════════════════════════════
   🎯 تحميل وإرسال
   ═══════════════════════════════════════════ */
async function downloadAndSend(conn, m, video) {
  const v = verse();

  await conn.sendMessage(m.chat, {
    react: { text: '⏳', key: m.key }
  }).catch(() => {});

  try {
    /* 🎬 تحميل من tikwm */
    const downloaded = await getTikTokVideo(video.url);

    /* 📊 بيانات */
    const author = video.author?.nickname || video.author?.uniqueId || downloaded.author || 'TikTok';
    const username = video.author?.uniqueId ? `@${video.author.uniqueId}` : '';
    const title = cleanText(video.description || downloaded.title, 200);
    const views = formatNumber(video.stats?.playCount);
    const likes = formatNumber(video.stats?.diggCount);
    const comments = formatNumber(video.stats?.commentCount);
    const shares = formatNumber(video.stats?.shareCount);

    /* 📤 إرسال */
    await conn.sendMessage(m.chat, {
      video: downloaded.buffer,
      mimetype: 'video/mp4',
      caption:
`🎬 *${title}*

👤 ${author} ${username}

👁️ المشاهدات: ${views}
❤️ الإعجابات: ${likes}
💬 التعليقات: ${comments}
🔁 المشاركات: ${shares}

━━━━━

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

🍁 *${BRAND.shortName}*`,
      mentions: [m.sender],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: BRAND.channelId,
          newsletterName: BRAND.channelName,
          serverMessageId: 0
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    }).catch(() => {});

  } catch (e) {
    console.log('🍁 [tiktok/dl] error:', e.message);
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    }).catch(() => {});

    await conn.sendMessage(m.chat, {
      text: `❌ *فشل التحميل*\n\n📌 ${e.message?.slice(0, 100) || 'خطأ'}`
    }, { quoted: m });
  }
}

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn, text }) => {
  const input = String(text || '').trim();
  const userId = m.sender;

  /* ═══ 🎯 1) اختيار من القائمة ═══ */
  if (/^\d+$/.test(input)) {
    const idx = parseInt(input, 10);

    if (idx < 1 || idx > 10) {
      return conn.sendMessage(m.chat, {
        text: `❌ *رقم غير صحيح*\n\n📌 اختر من 1 إلى 10`
      }, { quoted: m });
    }

    const cached = getCachedResults(userId);

    if (!cached) {
      return conn.sendMessage(m.chat, {
        text: `❌ *انتهت صلاحية النتائج*\n\n📌 ابحث من جديد: .تيك <بحث>`
      }, { quoted: m });
    }

    const video = cached[idx - 1];
    if (!video) {
      return conn.sendMessage(m.chat, {
        text: `❌ *الفيديو غير موجود*`
      }, { quoted: m });
    }

    return downloadAndSend(conn, m, video);
  }

  /* ═══ 🔍 2) بحث جديد ═══ */
  const query = input;

  if (!query) {
    const v = verse();
    return conn.sendMessage(m.chat, {
      text:
`╭━━━ ✦ 🍁 𝐈𝐒𝐀𝐆𝐈 𝐁𝐎𝐓 ✦ ━━━╮

🎬 *بحث تيك توك*

📌 *الاستخدام:*
.تيك كانيكي

╰━━━ ✦ 𝐄𝐍𝐃 ✦ ━━━╯

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

🍁 *${BRAND.shortName}*`
    }, { quoted: m });
  }

  await conn.sendMessage(m.chat, {
    react: { text: '⏳', key: m.key }
  }).catch(() => {});

  try {
    /* 🔍 بحث */
    let results = await searchTikTok(query);

    results = results.filter(video => {
      if (!video) return false;
      if (video.isPhotoPost === true) return false;
      if (video.isAd === true) return false;
      const asset = getVideoAsset(video);
      return !!asset && !!video.url;
    });

    if (!results.length) {
      await conn.sendMessage(m.chat, {
        react: { text: '❌', key: m.key }
      }).catch(() => {});
      return conn.sendMessage(m.chat, {
        text: `❌ *لا توجد نتائج*\n\n📌 ${cleanText(query, 100)}`
      }, { quoted: m });
    }

    const top10 = results.slice(0, 10);
    cacheResults(userId, top10);

    /* 🎯 بناء القائمة المنسدلة */
    const rows = top10.map((video, i) => {
      const author = video.author?.nickname || video.author?.uniqueId || 'TikTok';
      const views = formatNumber(video.stats?.playCount);
      const title = cleanText(video.description || 'فيديو', 40);

      return {
        header: `🎬 ${i + 1}`,
        title: title,
        description: `👤 ${author} • 👁️ ${views}`,
        id: `.تيك ${i + 1}`
      };
    });

    /* 🎴 الأزرار */
    const buttons = [
      {
        name: 'single_select',
        params: {
          title: '📋 اختر الفيديو',
          sections: [
            {
              title: '🎬 نتائج البحث',
              rows: rows
            }
          ]
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

    /* 📋 النص */
    const v = verse();
    const bodyText =
`╭━━━ ✦ 🍁 𝐈𝐒𝐀𝐆𝐈 𝐁𝐎𝐓 ✦ ━━━╮

🎬 *نتائج تيك توك*

🔎 البحث: *${cleanText(query, 80)}*
🎞️ النتائج: *${top10.length}*

📌 *افتح القائمة واختر الفيديو* 👇

╰━━━ ✦ 𝐄𝐍𝐃 ✦ ━━━╯

﴿ ${v.text} ﴾
📖 ${v.ref}

━━━━━

🍁 *${BRAND.shortName}*`;

    const img = getRandomImage();

    /* 📤 إرسال */
    try {
      await conn.sendButtonNormal(m.chat, {
        media: { url: img },
        mediaType: 'image',
        caption: bodyText,
        buttons: buttons,
        mentions: [m.sender],
        newsletter: {
          name: BRAND.channelName,
          jid: BRAND.channelId
        }
      }, m);
    } catch (e) {
      console.log('🍁 [sendButtonNormal]', e.message);
      try {
        await conn.sendButton(m.chat, {
          imageUrl: img,
          bodyText: bodyText,
          footerText: `${BRAND.emoji} ${BRAND.botName}`,
          buttons: buttons,
          mentions: [m.sender],
          newsletter: {
            name: BRAND.channelName,
            jid: BRAND.channelId
          },
          interactiveConfig: { buttons_limits: 20 }
        }, m);
      } catch (e2) {
        await conn.sendMessage(m.chat, {
          image: { url: img },
          caption: bodyText
        }, { quoted: m });
      }
    }

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    }).catch(() => {});

  } catch (error) {
    console.error('[TikTok Error]', error);
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    }).catch(() => {});

    let msg = '❌ حصل خطأ أثناء البحث.';
    const errorText = String(error?.message || '');

    if (errorText.includes('401') || errorText.includes('مفتاح')) {
      msg = '❌ مفتاح FetchLayer غير صحيح.';
    } else if (errorText.includes('402') || errorText.includes('رصيد')) {
      msg = '❌ رصيد FetchLayer غير كافٍ.';
    } else if (errorText.includes('429')) {
      msg = '⏳ FetchLayer عليه ضغط، جرب بعد قليل.';
    }

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
  }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['تيك', 'tiktok', 'tik'];
handler.category = 'download';
handler.usage = ['تيك <بحث>'];
handler.usePrefix = true;

export default handler;