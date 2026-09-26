/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة أسئلة كرة قدم
   📁 /home/container/plugins/game/رياضة.js
   ✅ بدون آيات | بدون صورة | تصميم هاتف
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

const CHANNEL_INFO = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: BRAND.channelId,
            newsletterName: BRAND.channelName,
            serverMessageId: -1
        }
    }
};

/* ────────────────[إعدادات اللعبة]──────────────── */
let timeout = 60000;
let poin = 500;

/* ────────────────[أسئلة كرة القدم]──────────────── */
const SPORT_TRIVIA_QUESTIONS = [
    { question: "من فاز في كأس العالم 2022", correctAnswer: "الارجنتين", incorrectAnswers: ["فرنسا", "كرواتيا", "المغرب"] },
    { question: "من هو اللاعب الذي حقق الكرة الذهبية عام 2018", correctAnswer: "مودريتش", incorrectAnswers: ["رونالدو", "ميسي", "جريزمان"] },
    { question: "من هو النادي المتوج بدوري ابطال اوروبا 1996", correctAnswer: "يوفنتوس", incorrectAnswers: ["أياكس", "ميلان", "ريال مدريد"] },
    { question: "من هو الهداف التاريخي لمنتخب البرازيل", correctAnswer: "نيمار", incorrectAnswers: ["بيليه", "رونالدو الظاهرة", "روماريو"] },
    { question: "من هو النادي الاكثر تتويجا بالدوري الالماني", correctAnswer: "بايرن ميونخ", incorrectAnswers: ["بوروسيا دورتموند", "هامبورغ", "شالكه"] },
    { question: "من هو اللاعب الذي سجل هدف الفوز في نهائي دوري ابطال اوروبا 2023", correctAnswer: "رودري", incorrectAnswers: ["هالاند", "دي بروين", "برناردو سيلفا"] },
    { question: "من هو النادي المتوج بالدوري الايطالي 2016", correctAnswer: "يوفنتوس", incorrectAnswers: ["نابولي", "روما", "ميلان"] },
    { question: "من هو الهداف التاريخي لمنتخب البرتغال", correctAnswer: "كريستيانو رونالدو", incorrectAnswers: ["أوزيبيو", "لويس فيغو", "باوليتا"] },
    { question: "من هو اللاعب الذي فاز بجائزة افضل لاعب في كأس العالم 2022", correctAnswer: "ليونيل ميسي", incorrectAnswers: ["مبابي", "مودريتش", "جريزمان"] },
    { question: "لاعب انتقل حديثا من ميلان الى نيوكاسل", correctAnswer: "تونالي", incorrectAnswers: ["كيسي", "ليفاو", "دياز"] },
    { question: "من هو اللاعب الملقب بالظاهرة", correctAnswer: "رونالدو البرازيلي", incorrectAnswers: ["رونالدو البرتغالي", "ميسي", "روبيرتو باجيو"] },
    { question: "ماذا يطلق على المباراة التي تجمع ريال مدريد مع برشلونة", correctAnswer: "الكلاسيكو", incorrectAnswers: ["الديربي", "السوبر كلاسيكو", "ديربي الأرض"] },
    { question: "ما هو اسم ابن جورج ويا الذي يلعب مع اليوفنتوس حاليا", correctAnswer: "تيموثي ويا", incorrectAnswers: ["جاكوب ويا", "ليام ويا", "آرثر ويا"] },
    { question: "كم دوري ابطال بحوزة ليفربول", correctAnswer: "ست القاب", incorrectAnswers: ["خمسة القاب", "سبعة القاب", "أربعة القاب"] },
    { question: "كم دوري ابطال بحوزة الريال", correctAnswer: "اربعة عشر", incorrectAnswers: ["ثلاثة عشر", "خمسة عشر", "اثنا عشر"] },
    { question: "من هو الفائز بدوري الابطال عام 1991", correctAnswer: "النجم الاحمر", incorrectAnswers: ["مارسيليا", "ميلان", "برشلونة"] },
    { question: "من هو النادي الاكثر تتويجا بالدوري الاوروبي", correctAnswer: "إشبيلية", incorrectAnswers: ["انتر ميلان", "يوفنتوس", "ليفربول"] },
    { question: "من هو اللاعب الذي حقق كأس العالم 3 مرات", correctAnswer: "بيليه", incorrectAnswers: ["مارادونا", "رونالدو الظاهرة", "كافو"] },
    { question: "من حقق الكرة الذهبيه عام 2017", correctAnswer: "كريستيانو رونالدو", incorrectAnswers: ["ميسي", "نيمار", "بوفون"] },
    { question: "من هو رأس الحربة الحالي لنادي برشلونة", correctAnswer: "ليفاندوفسكي", incorrectAnswers: ["أوباميانغ", "فاتي", "توريس"] },
    { question: "من هو الهداف التاريخي لنادي مانشستر سيتي", correctAnswer: "اغويرو", incorrectAnswers: ["ديفيد سيلفا", "توريس", "دي بروين"] },
    { question: "من هو المنتخب الفائز بكأس العالم 1930", correctAnswer: "الاوروغواي", incorrectAnswers: ["الأرجنتين", "البرازيل", "إيطاليا"] },
    { question: "في اي عام حقق منتخب انجلترا كأس العالم", correctAnswer: "1966", incorrectAnswers: ["1970", "1962", "1958"] },
    { question: "من هو المنتخب الذي يدعى براقصي السامبا", correctAnswer: "البرازيل", incorrectAnswers: ["الأرجنتين", "إسبانيا", "البرتغال"] },
    { question: "من هو المنتخب الذي تحصل على كوبا اميريكا عام 2021", correctAnswer: "الارجنتين", incorrectAnswers: ["البرازيل", "أوروغواي", "كولومبيا"] },
    { question: "بماذا يلقب منتخب الارجنتين", correctAnswer: "التانغو", incorrectAnswers: ["الفهود", "البيسيليستي", "التريكولور"] },
    { question: "لاعب جابوني كان يلعب مع ارسنال", correctAnswer: "اوباميانغ", incorrectAnswers: ["جيرو", "لاكازيت", "سانشيز"] },
    { question: "لاعب برازيلي لعب مع كل من برشلونة وريال مدريد وانتر وميلان", correctAnswer: "رونالدو الظاهرة", incorrectAnswers: ["رونالدينيو", "كاكا", "ريفالدو"] },
    { question: "ماهي افضل بطولة كرة قدم على الاطلاق", correctAnswer: "كأس العالم", incorrectAnswers: ["دوري أبطال أوروبا", "كوبا أمريكا", "اليورو"] },
    { question: "من هو اللاعب المتحصل على الكرة الذهبية عام 2022", correctAnswer: "كريم بنزيما", incorrectAnswers: ["ميسي", "هالاند", "ليفاندوفسكي"] },
    { question: "من هو اللاعب الذي يلعب كجناح ايسر في تشكيلة الريال الاساسيه", correctAnswer: "فينيسيوس", incorrectAnswers: ["رودريغو", "هازارد", "بيل"] },
    { question: "لاعب مصري يلعب في مركز الجناح الايمن مع نادي ليفربول الانجليزي", correctAnswer: "محمد صلاح", incorrectAnswers: ["رياض محرز", "حكيم زياش", "ساديو ماني"] },
    { question: "ماهي النتيجه التي نتجت عن مباراة مصر والسعوديه في كاس العالم 2018", correctAnswer: "فوز السعودية 2-1", incorrectAnswers: ["فوز مصر 2-1", "فوز السعودية 3-1", "تعادل 1-1"] },
    { question: "في اي عام حقق نادي ريال مدريد البطولة رقم 14 في دوري ابطال اوروبا", correctAnswer: "2022", incorrectAnswers: ["2023", "2018", "2014"] },
    { question: "من هو المنتخب الذي اخذ المركز الثالث في بطولة كاس العالم 2018", correctAnswer: "بلجيكا", incorrectAnswers: ["انجلترا", "كرواتيا", "فرنسا"] },
    { question: "لاعب انجليزي انتقل حديثا من توتنهام الى بايرن ميونخ", correctAnswer: "هاري كين", incorrectAnswers: ["ديلي آلي", "سون هيونغ مين", "إيريك داير"] },
    { question: "ماهو المركز الذي تحصل عليه منتخب المغرب في كأس العالم 2022", correctAnswer: "المركز الرابع", incorrectAnswers: ["المركز الثالث", "المركز الخامس", "المركز الثاني"] },
    { question: "من هو الفائز بكأس ايطاليا عام 2023", correctAnswer: "انتر", incorrectAnswers: ["يوفنتوس", "نابولي", "ميلان"] },
    { question: "ماذا يطلق على المباراة التي تجمع فريقين من نفس المدينة", correctAnswer: "مباراة الديربي", incorrectAnswers: ["الكلاسيكو", "القمة", "المواجهة الكبرى"] },
    { question: "من هو هداف نادي يوفنتوس التاريخي", correctAnswer: "ديل بييرو", incorrectAnswers: ["بونيبرتي", "تريزيغيه", "باجيو"] },
    { question: "من هو النادي الاكثر شعبية في العالم", correctAnswer: "ريال مدريد", incorrectAnswers: ["برشلونة", "مانشستر يونايتد", "الأهلي المصري"] },
    { question: "كم حقق كريستيانو رونالدو بطولة لدوري الابطال", correctAnswer: "5 بطولات", incorrectAnswers: ["4 بطولات", "6 بطولات", "7 بطولات"] },
    { question: "متى اخر مرة فاز منتخب ايطاليا بكاس العالم", correctAnswer: "2006", incorrectAnswers: ["1990", "2010", "1982"] },
    { question: "نادي يطلق عليه بالخفافيش", correctAnswer: "فالنسيا", incorrectAnswers: ["أتلتيكو مدريد", "فياريال", "ريال بيتيس"] },
    { question: "كم مرة حقق نادي باريس سان جيرمان دوري ابطال اوروبا", correctAnswer: "ولا مرة", incorrectAnswers: ["مرة واحدة", "مرتان", "ثلاث مرات"] },
    { question: "هل يوجد نادي حقق دوري الابطال اكثر من ريال مدريد", correctAnswer: "لا", incorrectAnswers: ["نعم، ميلان", "نعم، بايرن ميونخ", "نعم، برشلونة"] },
    { question: "من هو النادي المتوج بدوري ابطال اوروبا عام 2015", correctAnswer: "برشلونة", incorrectAnswers: ["يوفنتوس", "ريال مدريد", "بايرن ميونخ"] },
    { question: "من هو اكثر نادي قطري تحقيقا للبطولات", correctAnswer: "السد", incorrectAnswers: ["الريان", "الدحيل", "العربي"] },
    { question: "في اي دولة اقيم كاس العالم 1930", correctAnswer: "الاوروغواي", incorrectAnswers: ["الأرجنتين", "إيطاليا", "البرازيل"] },
    { question: "في اي دولة سيقام يورو 2024", correctAnswer: "المانيا", incorrectAnswers: ["فرنسا", "إسبانيا", "إيطاليا"] },
    { question: "من هي القارة الاكثر تتويجا بكاس العالم", correctAnswer: "قارة اوروبا", incorrectAnswers: ["قارة أمريكا الجنوبية", "قارة أفريقيا", "قارة أمريكا الشمالية"] },
    { question: "من هو اللاعب الاكثر تحقيقا لجائزة الكرة الذهبية", correctAnswer: "ليونيل ميسي", incorrectAnswers: ["كريستيانو رونالدو", "بلاتيني", "يوهان كرويف"] },
    { question: "اكثر نادي ايطالي تحقيقا للبطولات المحلية", correctAnswer: "يوفنتوس", incorrectAnswers: ["ميلان", "إنتر ميلان", "نابولي"] },
    { question: "ما هي اكبر نتيجه في تاريخ كرة القدم", correctAnswer: "149 مقابل لا شيء", incorrectAnswers: ["36 مقابل 0", "22 مقابل 0", "31 مقابل 0"] },
    { question: "ما هي النتيجه التي فاز بها بايرن ميونخ على برشلونة في ربع نهائي دوري الابكال 2020", correctAnswer: "8-2", incorrectAnswers: ["7-0", "5-1", "6-0"] },
    { question: "من هو النادي الاكثر تتويجا بالبطولات في التاريخ", correctAnswer: "الاهلي المصري", incorrectAnswers: ["ريال مدريد", "يوفنتوس", "برشلونة"] }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
let handler = async (m, { conn }) => {
    conn.sportGame = conn.sportGame || {};
    let id = m.chat;

    if (id in conn.sportGame) {
        await m.reply(`${BRAND.emoji} *سؤال نشط!*
━━━━━
📌 أكمل السؤال الحالي`);
        return;
    }

    const randomIndex = Math.floor(Math.random() * SPORT_TRIVIA_QUESTIONS.length);
    const questionData = SPORT_TRIVIA_QUESTIONS[randomIndex];
    const correctAnswer = questionData.correctAnswer;

    const allOptions = [...questionData.incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    /* ✅ تصميم مضغوط — بدون آيات */
    const bodyText = `${BRAND.emoji} *كرة قدم* ⚽
━━━━━
📌 ${questionData.question}
⏰ ${(timeout / 1000).toFixed(0)}ث | 💰 ${poin}XP
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    const buttons = allOptions.map((opt, i) => ({
        name: 'quick_reply',
        params: {
            display_text: `${i + 1}. ${opt}`,
            id: `.sport_${i + 1}`
        }
    }));

    buttons.push({
        name: 'quick_reply',
        params: {
            display_text: `${BRAND.emoji} استسلم`,
            id: `.sport_استسلم`
        }
    });

    /* ✅ sendButton — بدون صورة */
    await conn.sendButton(m.chat, {
        bodyText: bodyText,
        footerText: `${BRAND.emoji} ${BRAND.botName}`,
        buttons: buttons,
        mentions: [m.sender],
        newsletter: {
            name: BRAND.channelName,
            jid: BRAND.channelId
        },
        interactiveConfig: { buttons_limits: 5 }
    }, m);

    let timer = setTimeout(async () => {
        if (conn.sportGame[id]) {
            await m.reply(`${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.sportGame[id];
        }
    }, timeout);

    conn.sportGame[id] = {
        question: questionData.question,
        correctAnswer: correctAnswer,
        options: allOptions,
        correctIndex: allOptions.indexOf(correctAnswer) + 1,
        poin: poin,
        timer: timer
    };
};

/* ────────────────[معالجة الأزرار]──────────────── */
handler.before = async (m, { conn }) => {
    conn.sportGame = conn.sportGame || {};
    let id = m.chat;

    if (!(id in conn.sportGame)) return;

    const gameData = conn.sportGame[id];

    /* ✅ معالجة الأزرار */
    if (m.body?.startsWith('.sport_')) {
        if (m.body === '.sport_استسلم') {
            clearTimeout(gameData.timer);
            await m.reply(`${BRAND.emoji} *استسلمت!*
━━━━━
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.sportGame[id];
            return true;
        }

        const selectedIndex = parseInt(m.body.replace('.sport_', ''));
        const selectedOption = gameData.options[selectedIndex - 1];
        const isCorrect = selectedOption === gameData.correctAnswer;

        clearTimeout(gameData.timer);

        if (isCorrect) {
            const result = await addExp(m.sender, gameData.poin);
            
            let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
⚽ *الإجابة:* ${gameData.correctAnswer}
💰 *+${gameData.poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
            
            if (result.leveledUp) {
                msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
            }
            
            msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
            
            await m.reply(msg);
            delete conn.sportGame[id];
        } else {
            await m.reply(`${BRAND.emoji} *غلط!* ❌
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.sportGame[id];
        }
        return true;
    }

    /* ✅ معالجة الردود النصية */
    const userAnswer = m.text?.toLowerCase().trim();
    if (!userAnswer) return;

    if (userAnswer === 'استسلم' || userAnswer === 'استسلام') {
        clearTimeout(gameData.timer);
        await m.reply(`${BRAND.emoji} *استسلمت!*
━━━━━
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
        delete conn.sportGame[id];
        return true;
    }

    const isCorrect = userAnswer === gameData.correctAnswer.toLowerCase();
    if (isCorrect) {
        clearTimeout(gameData.timer);
        
        const result = await addExp(m.sender, gameData.poin);
        
        let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
⚽ *الإجابة:* ${gameData.correctAnswer}
💰 *+${gameData.poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
        
        if (result.leveledUp) {
            msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
        }
        
        msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
        
        await m.reply(msg);
        delete conn.sportGame[id];
        return true;
    }

    return false;
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['رياضه', 'رياضة'];
handler.tags = ['game'];
handler.command = ['رياضة', 'sport', 'رياضه'];

export default handler;