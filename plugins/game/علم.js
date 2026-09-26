/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة احزر العلم
   📁 /home/container/plugins/game/علم.js
   ✅ تصميم هاتف | بدون مسافات فارغة | صورة في المعاينة
   ═══════════════════════════════════════════════════════════ */

import fetch from 'node-fetch';
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

/* 🖼️ الصورة الاحتياطية */
const MAIN_IMAGE = 'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9afb0fe0a.jpg';

/* ⏱️ وقت اللعبة */
const timeout = 30000;

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
let handler = async (m, { conn, command }) => {
    const v = verse();
    
    /* ═══════════════════════════════
       🎯 معالجة الأزرار
       ═══════════════════════════════ */
    if (command.startsWith('اجاب_')) {
        let id = m.chat;
        let game = conn.game?.[id];

        if (!game) {
            await m.reply(`${BRAND.emoji} *لا توجد لعبة نشطة*
━━━━━
📌 اكتب .علم للبدء`);
            return;
        }

        let selectedIndex = parseInt(command.split('_')[1]);
        if (isNaN(selectedIndex) || selectedIndex < 1 || selectedIndex > 4) {
            await m.reply(`${BRAND.emoji} *اختر (1-4)*`);
            return;
        }

        let selectedAnswer = game.options[selectedIndex - 1];
        let isCorrect = game.correctAnswer === selectedAnswer;

        /* ✅ إجابة صحيحة */
        if (isCorrect) {
            const result = await addExp(m.sender, 100);
            
            if (global.db?.users[m.sender]) {
                global.db.users[m.sender].cookies = (global.db.users[m.sender].cookies || 0) + 2;
            }
            
            /* ✅ تصميم مضغوط */
            let msg = `${BRAND.emoji} *صحيح!* ✅
🌍 *الإجابة:* ${game.correctAnswer}
💰 *+100XP* | 🍪 *+2* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
            
            if (result.leveledUp) {
                msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
            }
            
            await m.reply(msg);
            
            clearTimeout(game.timer);
            delete conn.game[id];
        } else {
            game.attempts -= 1;
            if (game.attempts > 0) {
                await m.reply(`${BRAND.emoji} *غلط!* ❌
⚔️ *المحاولات المتبقية:* ${game.attempts}`);
            } else {
                await m.reply(`${BRAND.emoji} *انتهت!* ❌
✅ *الإجابة:* ${game.correctAnswer}`);
                clearTimeout(game.timer);
                delete conn.game[id];
            }
        }
        return;
    }

    /* ═══════════════════════════════
       🎮 بدء اللعبة
       ═══════════════════════════════ */
    if (command === 'علم' || command === 'اعلام') {
        try {
            conn.game = conn.game || {};
            let id = m.chat;

            if (conn.game[id]) {
                await m.reply(`${BRAND.emoji} *لعبة نشطة!*
━━━━━
📌 أكمل اللعبة الحالية`);
                return;
            }

            const res = await fetch("https://gist.githubusercontent.com/Kyutaka101/799d5646ceed992bf862026847473852/raw/dcbecff259b1d94615d7c48079ed1396ed42ef67/gistfile1.txt");
            const data = await res.json();
            const country = data[Math.floor(Math.random() * data.length)];

            let options = [country.name];
            while (options.length < 4) {
                let random = data[Math.floor(Math.random() * data.length)].name;
                if (!options.includes(random)) options.push(random);
            }
            options.sort(() => Math.random() - 0.5);

            /* ✅ تصميم مضغوط */
            const bodyText = `${BRAND.emoji} *احزر العلم*
⏱️ *30ث* | 💰 *100XP+2🍪* | ⚔️ *2 محاولات*
━━━━━
📌 *اختر الإجابة* 👇`;

            /* ✅ sendButtonNormal — يضمن الصورة في المعاينة */
            try {
                await conn.sendButtonNormal(m.chat, {
                    media: { url: country.img || MAIN_IMAGE },
                    mediaType: 'image',
                    caption: bodyText,
                    buttons: options.map((option, index) => ({
                        name: 'quick_reply',
                        params: {
                            display_text: `${index + 1}. ${option}`,
                            id: `.اجاب_${index + 1}`
                        }
                    })),
                    mentions: [m.sender],
                    newsletter: { 
                        name: BRAND.channelName, 
                        jid: BRAND.channelId 
                    }
                }, m);
            } catch (e) {
                /* 🅱️ Fallback: sendButton */
                try {
                    await conn.sendButton(m.chat, {
                        imageUrl: country.img || MAIN_IMAGE,
                        bodyText: bodyText,
                        footerText: `${BRAND.emoji} ${BRAND.botName}`,
                        buttons: options.map((option, index) => ({
                            name: 'quick_reply',
                            params: {
                                display_text: `${index + 1}. ${option}`,
                                id: `.اجاب_${index + 1}`
                            }
                        })),
                        mentions: [m.sender],
                        newsletter: { 
                            name: BRAND.channelName, 
                            jid: BRAND.channelId 
                        },
                        interactiveConfig: { buttons_limits: 4 }
                    }, m);
                } catch (e2) {
                    /* 🅱️ Fallback نصي */
                    await m.reply(bodyText);
                }
            }

            conn.game[id] = {
                correctAnswer: country.name,
                options: options,
                image: country.img,
                attempts: 2,
                timer: setTimeout(async () => {
                    if (conn.game[id]) {
                        await m.reply(`${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${country.name}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`);
                        delete conn.game[id];
                    }
                }, timeout)
            };

        } catch (e) {
            console.error(`${BRAND.emoji} خطأ:`, e);
            await m.reply(`${BRAND.emoji} *حدث خطأ!*
━━━━━
📌 حاول مرة أخرى`);
        }
    }
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['علم', 'اعلام'];
handler.tags = ['game'];
handler.command = /^(علم|اعلام|اجاب_\d+)$/i;
handler.usage = ['علم', 'اعلام'];

export default handler;