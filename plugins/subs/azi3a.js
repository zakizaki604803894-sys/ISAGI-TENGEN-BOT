/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — إذاعة البوتات الفرعية
   📁 /home/container/plugins/sub/broadcast_sub.js
   ✅ يعمل من البوت الأساسي + الفرعي
   ✅ إذاعة في كل المجموعات
   ═══════════════════════════════════════════════════════════ */

const run = async (m, { conn, bot }) => {
  /* 🛡️ التحقق من الرد */
  if (!m.quoted) {
    return m.reply(
`📝 *قم بالرد على الرسالة التي تريد إذاعتها*

━━━━━

📌 *الاستخدام:*
.اذاعة_فرعي (رد على رسالة)

━━━━━

🍁 *𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻*`
    );
  }

  /* 🔍 كشف نوع البوت */
  const isSubBot = bot?.isSubBot === true || bot?.config?.isSubBot === true;
  const sub = global.subBots;

  /* 📊 إحصائيات */
  let success = 0;
  let fail = 0;
  let groupCount = 0;
  let botCount = 0;

  /* ═══════════════════════════════════════════
     🅰️ البوت الفرعي — يستخدم sock الخاص به
     ═══════════════════════════════════════════ */
  if (isSubBot) {
    const sock = bot?.sock || conn;
    if (!sock) {
      return m.reply('❌ *لا يمكن الوصول للاتصال*');
    }

    try {
      const groups = await sock.groupFetchAllParticipating();
      const groupList = Object.values(groups);
      groupCount = groupList.length;

      if (groupCount === 0) {
        return m.reply('📭 *لا يوجد مجموعات*');
      }

      botCount = 1;

      /* 📤 الإذاعة لكل مجموعة */
      for (const group of groupList) {
        try {
          const groupMetadata = await sock.groupMetadata(group.id);
          const participants = groupMetadata.participants.map(p => p.id);

          await sock.sendMessage(group.id, {
            forward: m.quoted.fakeObj(),
            mentions: participants
          }, { quoted: global.reply_status || m });

          success++;
          await new Promise(r => setTimeout(r, 2000));
        } catch (e) {
          fail++;
        }
      }

      return m.reply(
`✅⤿ *تـم الـإذاعـه*
⊱⋅ ──────────── ⋅⊰
✓ ✅ الـنـجـاح: ${success}
✓ 🚫 فـشـل: ${fail}
✓ 🤖 الـبـوت: فرعي
✓ 👥 الـجـروبـات: ${groupCount}
⊱⋅ ──────────── ⋅⊰
> *🍁 ISAGI SubBot System*`
      );

    } catch (e) {
      return m.reply(`❌ *خطأ:* ${e.message}`);
    }
  }

  /* ═══════════════════════════════════════════
     🅱️ البوت الأساسي — يستخدم global.subBots
     ═══════════════════════════════════════════ */
  if (!sub) {
    return m.reply('❌ *نظام البوتات الفرعية غير متاح*');
  }

  const bots = sub.list();
  const activeBots = bots.filter(b => b.connected && b.phone && b.id !== bot?.id);

  if (activeBots.length === 0) {
    return m.reply('📭 *لا يوجد بوتات فرعية متصلة للإذاعة*');
  }

  botCount = activeBots.length;

  for (const b of activeBots) {
    try {
      const botConn = sub.get(b.id);
      const sock = botConn?.sock;
      if (!sock) continue;

      const groups = await sock.groupFetchAllParticipating();
      const groupList = Object.values(groups);
      groupCount += groupList.length;

      for (const group of groupList) {
        try {
          const groupMetadata = await sock.groupMetadata(group.id);
          const participants = groupMetadata.participants.map(p => p.id);

          await sock.sendMessage(group.id, {
            forward: m.quoted.fakeObj(),
            mentions: participants
          }, { quoted: global.reply_status || m });

          success++;
          await new Promise(r => setTimeout(r, 2000));
        } catch (e) {
          fail++;
        }
      }
    } catch (e) {
      fail++;
    }
  }

  await m.reply(
`✅⤿ *تـم الـإذاعـه*
⊱⋅ ──────────── ⋅⊰
✓ ✅ الـنـجـاح: ${success}
✓ 🚫 فـشـل: ${fail}
✓ 🤖 الـبـوتـات: ${activeBots.length}
✓ 👥 الـجـروبـات: ${groupCount}
⊱⋅ ──────────── ⋅⊰
> *🍁 ISAGI SubBot System*`
  );
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
run.command = ['اذاعة_فرعي', 'اذاعه_فرعي', 'broadcast_sub'];
run.usage = ['اذاعة_فرعي'];
run.category = 'sub';

/* ✅ السماح من الفرعي */
run.noSub = false;       /* ← تم التعديل: كان true */

/* ✅ للمطورين فقط */
run.owner = true;

export default run;