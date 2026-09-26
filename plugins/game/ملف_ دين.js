/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة أسئلة دينية
   📁 /home/container/plugins/game/دين.js
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

/* ────────────────[الأسئلة الدينية]──────────────── */
const RELIGION_QUESTIONS = [
    { question: "كم عدد سور القرآن الكريم؟", response: "114", options: ["111", "112", "113", "114"] },
    { question: "في أي الأيام خلق سيدنا آدم عليه السلام؟", response: "الجمعة", options: ["السبت", "الجمعة", "الخميس", "الاحد"] },
    { question: "كم عدد السنوات التي نام فيها أهل الكهف؟", response: "309", options: ["300", "309", "400", "409"] },
    { question: "سورة قصيرة من قرأها ثلاثا فكأنما قرأ كل القرآن؟", response: "الاخلاص", options: ["الناس", "الاخلاص", "الفلق"] },
    { question: "من هو النبي الذي كانت إحدى معجزاته العصا التي تتحول إلى حية تسعى؟", response: "موسى", options: ["موسى", "عيسى", "اسحاق"] },
    { question: "من هو النبي الملقب بالذبيح؟", response: "اسماعيل", options: ["اسماعيل", "ابراهيم", "اسحاق"] },
    { question: "من هو النبي الذي أرسل إلى قوم ثمود؟", response: "صالح", options: ["صالح", "هود", "نوح"] },
    { question: "الشهر الثامن في التقويم الهجري؟", response: "شعبان", options: ["شعبان", "محرم", "شوال"] },
    { question: "كم عدد آيات سورة البقرة؟", response: "286", options: ["286", "280", "277"] },
    { question: "كم عدد القراءات الصحيحة للقرآن الكريم؟", response: "10", options: ["10", "8", "9"] },
    { question: "من أول من لقب بأمير المؤمنين؟", response: "عمر", options: ["عثمان", "خالد", "عمر"] },
    { question: "ما آخر سورة نزلت في مكة؟", response: "المرسلات", options: ["النصر", "القارعة", "المرسلات"] },
    { question: "كم عدد السور التي ابتدأت بالحروف المقطعة (الم)؟", response: "6", options: ["6", "5", "4"] },
    { question: "أين ذكرت الآية الكريمة: (وما آتاكم الرسول فخذوه وما نهاكم عنه فانتهوا)؟", response: "الحشر", options: ["الحشر", "الصف", "الجمعة"] },
    { question: "من هو النبي الذي دعا ربه (توفني مسلما وألحقني بالصالحين)؟", response: "يوسف", options: ["يوسف", "صالح", "ابراهيم"] },
    { question: "في أي سورة وردت الآية التالية (ولبثوا في كهفهم ثلاث مئة سنين وازدادوا تسعا)؟", response: "الكهف", options: ["الكهف", "فصلت", "مريم"] },
    { question: "ما هي أطول سورة في القرآن الكريم؟", response: "البقرة", options: ["البقرة", "آل عمران", "النساء"] },
    { question: "من هو ثاني نبي من بعد نبي ادم عليه سلام", response: "شيث", options: ["نوح", "ابراهيم", "ادريس", "شيث"] },
    { question: "ما السورة التي ختمت باسم وقت من أوقات الصلاة؟", response: "القدر", options: ["القدر", "البلد", "الفجر"] },
    { question: "كم مرة ذكرت السيدة مريم في القرآن الكريم؟", response: "34", options: ["34", "42", "43"] },
    { question: "ما اسم السورة التي تنتهي آياتها بحرف السين؟", response: "الناس", options: ["الضحى", "الناس", "الصمد"] },
    { question: "ما هو عدد حملة العرش يوم القيامة والمذكورين في القرآن الكريم؟", response: "8", options: ["6", "8", "9"] },
    { question: "ما هي السورة التي يطلق عليها أم الكتاب؟", response: "الفاتحة", options: ["الفاتحة", "يس", "البقرة"] },
    { question: "من الذي لقب الرسول الكريم بالطيب المطيب؟", response: "عمار", options: ["عمار", "أنس", "أسامة"] },
    { question: "ما هي السورة التي تسمى سورة التوديع؟", response: "النصر", options: ["الحج", "النصر", "الفيل"] },
    { question: "كم عدد السور التي افتتحت بثلاثة أحرف؟", response: "13", options: ["13", "14", "16"] },
    { question: "من أسماء الخيل التي ذكرت في القرآن الكريم؟", response: "العاديات", options: ["النازعات", "الذاريات", "العاديات"] },
    { question: "كم مرة اعتمر النبي صلى الله عليه وسلم؟", response: "4", options: ["4", "5", "3"] },
    { question: "في أي عام هجري وقعت غزوة خيبر؟", response: "7", options: ["5", "9", "7"] },
    { question: "ما هي السورة التي لا تبدأ بالبسملة؟", response: "التوبة", options: ["القصص", "المائدة", "الأنعام", "التوبة"] },
    { question: "في أي سورة ذكرت قصة قابيل وهابيل؟", response: "المائدة", options: ["المائدة", "الأنعام", "القصص"] },
    { question: "بماذا لقب إبراهيم عليه السلام؟", response: "الخليل", options: ["الصديق", "الخليل", "اسرائيل"] },
    { question: "كم كان عمر الرسول صلى الله عليه وسلم عندما بُعث؟", response: "40", options: ["30", "40", "50"] },
    { question: "ما هو العام الهجري الذي احتفل فيه المسلمين بعيد الفطر وعيد الأضحى المبارك؟", response: "الثاني", options: ["الأول", "الثاني", "الثالث"] },
    { question: "ما هي السورة التي لا تحتوي على حرف الميم؟", response: "الكوثر", options: ["الكوثر", "النصر", "الفيل"] },
    { question: "كم كان عمر النبي صلى الله عليه وسلم حين وفاة زوجته خديجة بنت خويلد رضى الله عنها؟", response: "51", options: ["45", "48", "51", "53"] },
    { question: "كم عدد التكبيرات في الركعة الأولى في صلاة العيد؟", response: "7", options: ["7", "8", "9"] },
    { question: "ما اسم أول نبي خط بالقلم؟", response: "ادريس", options: ["ادريس", "نوح", "اسحاق"] },
    { question: "ما اسم النبي الذي قبض الله روحه بالسماء؟", response: "ادريس", options: ["إسماعيل", "ادريس", "إبراهيم"] },
    { question: "ما اسم النبي الذي لم يمت حتى يومنا هذا وما يزال على قيد الحياة؟", response: "عيسى", options: ["عيسى", "ادم", "اليسع"] },
    { question: "ما هي عدد المرات التي تم فيها ذِكر النبي محمد صل الله عليه وسلم في القرآن الكريم؟", response: "4", options: ["4", "6", "7"] },
    { question: "من هي السيدة التي تم ذكرها في القرآن الكريم وكانت امرأة فرعون؟", response: "اسيا", options: ["أم موسى", "زليخا", "آسيا"] },
    { question: "من هو الصحابي الجليل الذي كان مُلقباً بـأسد الله الغالب؟", response: "علي", options: ["عمر", "علي", "زيد"] },
    { question: "من هو النبي الذي تم تكليفه بقتل المسيح الدجال؟", response: "عيسى", options: ["عيسى", "نوح", "ادم"] },
    { question: "من هو النبي الذي له لقب أبو الأنبياء؟", response: "ابراهيم", options: ["سليمان", "آدم", "إبراهيم"] },
    { question: "من هو أول نبي يقوم بقرع باب الجنّة يوم القيامة؟", response: "محمد", options: ["يوسف", "محمد", "ابراهيم"] },
    { question: "من هو شيخ المُرسلين من الأنبياء؟", response: "نوح", options: ["إبراهيم", "موسى", "نوح"] },
    { question: "بماذا كانت تدعي زوجة لوط ؟", response: "والهة", options: ["زليخة", "والهة", "اسيا"] },
    { question: "يوجد لقب قد أطلق علي نبي الله إسماعيل ألا وهو ؟", response: "الذبيح", options: ["الذبيح", "كليم الله", "شيخ المرسلين"] },
    { question: "من هو الصحابي الذي قد أستلم الحجر الأسود ؟", response: "الزبير", options: ["الزبير", "زيد", "عمر"] },
    { question: "في سنة 8 هجريا حدث فتح كريم علي المسلمين ونصر من الله أعزهم، اين هذا الفتح ؟", response: "مكة", options: ["مكة", "مصر", "بلاد ما وراء النهر"] },
    { question: "تتواجد بعض الحشرات التي قد أوصانا رسول الله بقتلها فور رؤيتها، فمنها ؟", response: "البرص", options: ["البرص", "الذباب", "النحل"] },
    { question: "من هو خازن النار ؟", response: "مالك", options: ["مالك", "جبريل", "إسرافيل"] },
    { question: "من هم الذين قال فيهم القرآن الكريم الخراصون ؟", response: "الكاذبون", options: ["الصادقون", "الكاذبون", "المنافقين"] },
    { question: "ما المهنة التي عمل بها رسول الله ؟", response: "الرعي", options: ["النجارة", "الحدادة", "الرعي"] },
    { question: "توفي جعفر بن أبي طالب في غزوة ؟", response: "مؤتة", options: ["مؤتة", "حنين", "أحد"] }
];

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
    conn.religionGame = conn.religionGame || {};
    let id = m.chat;

    if (id in conn.religionGame) {
        await m.reply(`${BRAND.emoji} *سؤال نشط!*
━━━━━
📌 أكمل السؤال الحالي`);
        return;
    }

    const randomIndex = Math.floor(Math.random() * RELIGION_QUESTIONS.length);
    const questionData = RELIGION_QUESTIONS[randomIndex];
    const correctAnswer = questionData.response;

    let allOptions = [...questionData.options];
    if (!allOptions.includes(correctAnswer)) {
        allOptions.push(correctAnswer);
    }
    allOptions = allOptions.sort(() => Math.random() - 0.5);

    /* ✅ تصميم مضغوط — بدون آيات */
    const bodyText = `${BRAND.emoji} *اختبار ديني* 🕌
━━━━━
📌 ${questionData.question}
⏰ ${(timeout / 1000).toFixed(0)}ث | 💰 ${poin}XP
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    const buttons = allOptions.map((opt, i) => ({
        name: 'quick_reply',
        params: {
            display_text: `${i + 1}. ${opt}`,
            id: `.din_${i + 1}`
        }
    }));

    buttons.push({
        name: 'quick_reply',
        params: {
            display_text: `${BRAND.emoji} استسلم`,
            id: `.din_استسلم`
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
        interactiveConfig: { buttons_limits: 6 }
    }, m);

    let timer = setTimeout(async () => {
        if (conn.religionGame[id]) {
            await m.reply(`${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.religionGame[id];
        }
    }, timeout);

    conn.religionGame[id] = {
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
    conn.religionGame = conn.religionGame || {};
    let id = m.chat;

    if (!(id in conn.religionGame)) return;

    const gameData = conn.religionGame[id];

    /* ✅ معالجة الأزرار */
    if (m.body?.startsWith('.din_')) {
        if (m.body === '.din_استسلم') {
            clearTimeout(gameData.timer);
            await m.reply(`${BRAND.emoji} *استسلمت!*
━━━━━
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.religionGame[id];
            return true;
        }

        const selectedIndex = parseInt(m.body.replace('.din_', ''));
        const selectedOption = gameData.options[selectedIndex - 1];
        const isCorrect = selectedOption === gameData.correctAnswer;

        clearTimeout(gameData.timer);

        if (isCorrect) {
            const result = await addExp(m.sender, gameData.poin);
            
            let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🕌 *الإجابة:* ${gameData.correctAnswer}
💰 *+${gameData.poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
            
            if (result.leveledUp) {
                msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
            }
            
            msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
            
            await m.reply(msg);
            delete conn.religionGame[id];
        } else {
            await m.reply(`${BRAND.emoji} *غلط!* ❌
✅ *الإجابة:* ${gameData.correctAnswer}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.religionGame[id];
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
        delete conn.religionGame[id];
        return true;
    }

    const isCorrect = userAnswer === gameData.correctAnswer.toLowerCase();
    if (isCorrect) {
        clearTimeout(gameData.timer);
        
        const result = await addExp(m.sender, gameData.poin);
        
        let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🕌 *الإجابة:* ${gameData.correctAnswer}
💰 *+${gameData.poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
        
        if (result.leveledUp) {
            msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
        }
        
        msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
        
        await m.reply(msg);
        delete conn.religionGame[id];
        return true;
    }

    return false;
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['دين'];
handler.tags = ['game'];
handler.command = ['دين', 'اسلامي', 'islamic'];

export default handler;