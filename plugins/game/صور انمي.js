/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة خمن الشخصية الجماعية
   📁 /home/container/plugins/game/انمي.js
   ✅ تصميم هاتف | بدون مسافات فارغة | صورة في المعاينة
   ═══════════════════════════════════════════════════════════ */

import { addExp } from '../bank/نظام_البنك.js';

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
    { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* 🎮 ثوابت اللعبة */
const MAX_ROUNDS = 10;

const CHARACTERS = [
  { name: "ايرين", search: "Eren Yeager" },
  { name: "نيزوكو", search: "Nezuko Kamado" },
  { name: "سوكونا", search: "Sukuna" },
  { name: "موزان", search: "Muzan Kibutsuji" },
  { name: "كيلوا", search: "Killua Zoldyck" },
  { name: "غون", search: "Gon Freecss" },
  { name: "ايتاتشي", search: "Itachi Uchiha" },
  { name: "ساسكي", search: "Sasuke Uchiha" },
  { name: "دابي", search: "Dabi" },
  { name: "اوبيتو", search: "Obito Uchiha" },
  { name: "نوبارا", search: "Nobara Kugisaki" },
  { name: "ليفاي", search: "Levi Ackerman" },
  { name: "يوتا", search: "Yuta Okkotsu" },
  { name: "فريزا", search: "Frieza" },
  { name: "ياماتو", search: "Yamato One Piece" },
  { name: "نامي", search: "Nami One Piece" },
  { name: "انيا", search: "Anya Forger" },
  { name: "جينبي", search: "Jinbe One Piece" },
  { name: "بوروتو", search: "Boruto Uzumaki" },
  { name: "شانكس", search: "Shanks One Piece" },
  { name: "لاو", search: "Trafalgar Law" },
  { name: "لوفي", search: "Monkey D Luffy" },
  { name: "زورو", search: "Roronoa Zoro" },
  { name: "اكازا", search: "Akaza" },
  { name: "ميكاسا", search: "Mikasa Ackerman" },
  { name: "دوما", search: "Doma Demon Slayer" },
  { name: "كانيكي", search: "Kaneki Ken" },
  { name: "غوجو", search: "Satoru Gojo" },
  { name: "ساي", search: "Sai Naruto" },
  { name: "نيجي", search: "Neji Hyuga" },
  { name: "ساكورا", search: "Sakura Haruno" },
  { name: "اوريتشمارو", search: "Orochimaru" },
  { name: "ماهيتو", search: "Mahito Jujutsu Kaisen" },
  { name: "جيرايا", search: "Jiraiya" },
  { name: "روبين", search: "Nico Robin" },
  { name: "سانجي", search: "Sanji One Piece" },
  { name: "ميهوك", search: "Dracule Mihawk" },
  { name: "كايدو", search: "Kaido One Piece" },
  { name: "كورابيكا", search: "Kurapika" },
  { name: "شيغاراكي", search: "Tomura Shigaraki" },
  { name: "تينغن", search: "Tengen Uzui" },
  { name: "تانجيرو", search: "Tanjiro Kamado" },
  { name: "ميدوريا", search: "Izuku Midoriya" },
  { name: "كونان", search: "Konan Naruto" },
  { name: "شوتو", search: "Shoto Todoroki" },
  { name: "غارا", search: "Gaara" },
  { name: "باكوغو", search: "Katsuki Bakugo" },
  { name: "ماكيما", search: "Makima Chainsaw Man" },
  { name: "توجا", search: "Toga Himiko" },
  { name: "كوراما", search: "Kurama Naruto" }
];

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

/* ✅ جلب صورة الشخصية من AniList */
async function fetchCharacterImage(searchName) {
  const query = `query ($search: String) {
    Character(search: $search) {
      name { full }
      image { large }
    }
  }`;
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ query, variables: { search: searchName } })
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`AniList API error (status ${res.status})`);
  const json = await res.json();
  return json?.data?.Character?.image?.large || null;
}

async function pickCharacterWithImage(excludeName) {
  const pool = CHARACTERS.filter(c => c.name !== excludeName);
  const tried = new Set();
  for (let i = 0; i < 6 && tried.size < pool.length; i++) {
    const remaining = pool.filter(c => !tried.has(c.name));
    const char = remaining[Math.floor(Math.random() * remaining.length)];
    tried.add(char.name);
    const img = await fetchCharacterImage(char.search);
    if (img) return { char, img };
  }
  throw new Error("مقدرش ألاقي صورة لأي شخصية");
}

/* ✅ الجوائز */
const getPrize = (rank) => {
  if (rank === 0) return { xp: 500, cookies: 10, emoji: "👑" };
  if (rank === 1) return { xp: 300, cookies: 5, emoji: "🥈" };
  if (rank === 2) return { xp: 200, cookies: 3, emoji: "🥉" };
  return { xp: 100, cookies: 2, emoji: "⭐" };
};

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
  const chatId = m.chat;
  const v = verse();
  
  if (!global.gameAnime) global.gameAnime = {};

  const g = global.gameAnime[chatId];

  /* ✅ إذا كانت اللعبة منتهية */
  if (!g || g.round >= MAX_ROUNDS) {
    if (g && g.round >= MAX_ROUNDS) {
      const sorted = Object.entries(g.scores).sort((a, b) => b[1] - a[1]);
      
      if (sorted.length === 0) {
        await conn.sendMessage(chatId, {
          text: `${BRAND.emoji} *لا يوجد مشاركين*
━━━━━
📌 اكتب .انمي للعب`
        });
        delete global.gameAnime[chatId];
        return;
      }

      const prizes = [];
      for (let i = 0; i < sorted.length; i++) {
        const [id, score] = sorted[i];
        const prize = getPrize(i);
        
        const result = await addExp(id, prize.xp);
        
        if (global.db?.users[id]) {
          global.db.users[id].cookies = (global.db.users[id].cookies || 0) + prize.cookies;
        }
        
        let prizeText = `${prize.emoji} @${id.split('@')[0]} - ${score}ن (+${prize.xp}XP)`;
        if (result.leveledUp) {
          prizeText += ` 🎉`;
        }
        prizes.push(prizeText);
      }

      /* ✅ تصميم مضغوط */
      const resultText = `${BRAND.emoji} *انتهت اللعبة!* 🏆
━━━━━
${prizes.join('\n')}
━━━━━
📌 .انمي للعب مرة أخرى
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

      await conn.sendMessage(chatId, {
        text: resultText,
        mentions: sorted.map(s => s[0])
      });
      delete global.gameAnime[chatId];
      return;
    }

    global.gameAnime[chatId] = { 
      round: 0, 
      scores: {}, 
      current: null,
      participants: new Set()
    };
  }

  const g2 = global.gameAnime[chatId];
  
  /* ✅ إذا كانت هناك لعبة نشطة */
  if (g2.current) {
    const buttons = g2.current.opts.map((opt, i) => ({
      name: 'quick_reply',
      params: {
        display_text: `${i + 1}. ${opt}`,
        id: `.anime_ans_${opt}`
      }
    }));

    try {
      await conn.sendButtonNormal(m.chat, {
        media: { url: g2.current.img },
        mediaType: 'image',
        caption: g2.current.caption,
        buttons: buttons,
        mentions: [m.sender],
        newsletter: {
          name: BRAND.channelName,
          jid: BRAND.channelId
        }
      }, m);
    } catch (e) {
      try {
        await conn.sendButton(m.chat, {
          imageUrl: g2.current.img,
          bodyText: g2.current.caption,
          footerText: `${BRAND.emoji} ${BRAND.botName}`,
          buttons: buttons,
          mentions: [m.sender],
          newsletter: {
            name: BRAND.channelName,
            jid: BRAND.channelId
          },
          interactiveConfig: { buttons_limits: 4 }
        }, m);
      } catch (e2) {
        await m.reply(g2.current.caption);
      }
    }
    return;
  }

  g2.round++;
  
  const { char, img } = await pickCharacterWithImage(null);
  const wrong = shuffle(CHARACTERS.filter(c => c.name !== char.name)).slice(0, 3).map(c => c.name);
  const opts = shuffle([char.name, ...wrong]);

  /* ✅ تصميم مضغوط */
  const caption = `${BRAND.emoji} *خمن الشخصية* (${g2.round}/${MAX_ROUNDS})
💰 *100XP* لكل إجابة صحيحة
━━━━━
📌 *اختر الإجابة* 👇`;

  const buttons = opts.map((opt, i) => ({
    name: 'quick_reply',
    params: {
      display_text: `${i + 1}. ${opt}`,
      id: `.anime_ans_${opt.toLowerCase()}`
    }
  }));

  /* ✅ sendButtonNormal — يضمن الصورة في المعاينة */
  try {
    await conn.sendButtonNormal(m.chat, {
      media: { url: img },
      mediaType: 'image',
      caption: caption,
      buttons: buttons,
      mentions: [m.sender],
      newsletter: {
        name: BRAND.channelName,
        jid: BRAND.channelId
      }
    }, m);
  } catch (e) {
    try {
      await conn.sendButton(m.chat, {
        imageUrl: img,
        bodyText: caption,
        footerText: `${BRAND.emoji} ${BRAND.botName}`,
        buttons: buttons,
        mentions: [m.sender],
        newsletter: {
          name: BRAND.channelName,
          jid: BRAND.channelId
        },
        interactiveConfig: { buttons_limits: 4 }
      }, m);
    } catch (e2) {
      await m.reply(caption);
    }
  }

  g2.current = {
    answer: char.name.toLowerCase(),
    opts: opts.map(o => o.toLowerCase()),
    img,
    caption,
    timer: setTimeout(async () => {
      if (global.gameAnime[chatId]?.current) {
        const ans = global.gameAnime[chatId].current.answer;
        global.gameAnime[chatId].current = null;
        await conn.sendMessage(chatId, {
          text: `${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${ans}
━━━━━
📌 .انمي للتالي
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`
        });
      }
    }, 30000)
  };
};

/* ═══════════════════════════════════════════
   ✅ معالجة الأزرار والردود
   ═══════════════════════════════════════════ */
handler.before = async (m, { conn }) => {
  const g = global.gameAnime?.[m.chat];
  if (!g?.current) return;

  const v = verse();

  /* ✅ معالجة الأزرار */
  if (m.body?.startsWith('.anime_ans_')) {
    const answer = m.body.replace('.anime_ans_', '').toLowerCase().trim();
    const cur = g.current;

    if (!cur.opts.includes(answer)) {
      await m.reply(`${BRAND.emoji} *❌ غلط*`);
      return true;
    }

    clearTimeout(cur.timer);
    g.current = null;

    if (answer === cur.answer) {
      g.scores[m.sender] = (g.scores[m.sender] || 0) + 1;
      g.participants.add(m.sender);
      
      const result = await addExp(m.sender, 100);
      
      /* ✅ تصميم مضغوط */
      let msg = `${BRAND.emoji} *صحيح!* ✅
🎯 *النقاط:* ${g.scores[m.sender]}
💰 *+100XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
      
      if (result.leveledUp) {
        msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
      }
      
      await conn.sendMessage(m.chat, {
        text: msg,
        mentions: [m.sender]
      });
      setTimeout(() => handler(m, { conn }), 300);
    } else {
      await m.reply(`${BRAND.emoji} *❌ غلط*`);
    }
    return true;
  }

  /* ✅ معالجة الردود */
  if (m.quoted?.id !== g.current.id) return;

  const cur = g.current;
  const answer = m.text?.toLowerCase().trim();
  if (!cur.opts.includes(answer)) return;

  clearTimeout(cur.timer);
  g.current = null;

  if (answer === cur.answer) {
    g.scores[m.sender] = (g.scores[m.sender] || 0) + 1;
    g.participants.add(m.sender);
    
    const result = await addExp(m.sender, 100);
    
    let msg = `${BRAND.emoji} *صحيح!* ✅
🎯 *النقاط:* ${g.scores[m.sender]}
💰 *+100XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
    
    if (result.leveledUp) {
      msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
    }
    
    await conn.sendMessage(m.chat, {
      text: msg,
      mentions: [m.sender]
    });
    setTimeout(() => handler(m, { conn }), 300);
  } else {
    await m.reply(`${BRAND.emoji} *❌ غلط*`);
  }
  return true;
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['انمي', 'anime'];
handler.usage = ['انمي'];
handler.category = 'game';

export default handler;