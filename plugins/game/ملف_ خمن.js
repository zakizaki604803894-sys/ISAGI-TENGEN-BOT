/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة خمن الشخصية
   📁 /home/container/plugins/game/خمن.js
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

/* ────────────────[الأسئلة]──────────────── */
const guessQuestions = [
    { question: "شعر زهري عيون خضراء صغيرة وتقرأ الافكار", response: "انيا" },
    { question: "شعر احمر وعلى جسمه خطوط زرقاء قوي جدا ويصنع الدونات", response: "اكازا" },
    { question: "ملك القراصنة صاحب فاكهة الشيطان الأسطورية ومالك الكنز الأعظم", response: "روجر" },
    { question: "حاول الانتحار اكثر من مئة مرة ولم ينجح جسمه ضخم ويحمل بيده هراوة", response: "كايدو" },
    { question: "شعر اخضر و هو فتى صغير يحب الصيد وعنده رخصة", response: "غون" },
    { question: "شعره اشقر و وهو رمز للعدالة والبطولة اورث قوته لتلميذه وفقدها", response: "اول مايت" },
    { question: "شعره برتقالي كان انسان عادي واصبح كيان جديد يستخدم السيف", response: "ايتشيغو" },
    { question: "قوي للغاية لديه 6 عيون وشعره احمر", response: "كوكوشيبو" },
    { question: "تحب دراسة العمالقة واكتشافهم عضو في فيلق الاستطلاع واصبحت قائده", response: "هانجي" },
    { question: "شرير لديه فاكهتي شيطان ويتصف بالمكر", response: "تيتش" },
    { question: "احد مساعدي حكام الدمار و مدرب لبطلين في القصة", response: "ويس" },
    { question: "كان طفل صغير وانقتل ابوه وصار يسعى للانتقام", response: "ثورفين" },
    { question: "قوية وهادئة عيونها ارجوانية وشعرها بنفسجي وتحب الفراشات", response: "شينوبو" },
    { question: "لديه 3 زوجات ويحب البهرجة ولديه حاسة سمع قوية", response: "تينغن" },
    { question: "فتى مجرد من السحر لكن قوته البدنية كبيرة يقاتل باكثر من سيف", response: "استا" },
    { question: "فتى عديم القوة شعره اخضر اكتسب قوة جديده عن طريق تناول شعرة", response: "ميدوريا" },
    { question: "شعره وردي اكتسب القوة عن طريق تناول اصبع", response: "ايتادوري" },
    { question: "قط لون بشرته بنفسجي قوته غاشمة ويحب الاكل", response: "بيروس" },
    { question: "الة حرب مع انها فتاة صغيرة تسعى باحثة عن المشاعر الانسانية", response: "فايوليت" },
    { question: "فتى صغير لون شعره ابيض وهو ذكي جدا وتربى في ميتم", response: "نير" },
    { question: "عيون بنفسجيه و قويه شعره احمر نينجا من قرية المطر", response: "ناغاتو" },
    { question: "شعره اصفر يمتلك فاكهة شيطان من نوع لوغيا و يلقب ب إمبراطور اللهب", response: "سابو" },
    { question: "قوي و شخصيه عدوانية قدرتها تسمح له بالإنفجار", response: "باكوغو" },
    { question: "ولد بدون سحر و قوته تعتمد علي إثباته و شعره اسود", response: "ماش" },
    { question: "شخصيه شعرها اصفر و طويل ليس بشرياً و يستخدم سحر الضوء", response: "ليخت" },
    { question: "شخصيه قويه و مغروره و تمتلك فاكهة شيطان من نوع باراميسيا و تلقب ب امبراطورة القراصنة", response: "هانكوك" },
    { question: "طالب سابق لدى بيسكيت كروغر وقام بتدريب غون و كيلوا", response: "وينغ" },
    { question: "كان شرير وعدو البطل و الان اصبح طيب ومسالم ولديه ثلاثة عيون", response: "تينشيهان" },
    { question: "مقاتل من الدرجة الاولى يظهر نتيجة اتحاد بيكولا و غوهان", response: "بيكوهان" },
    { question: "واحد من النينجا الثلاثة الاسطوريين من كونوها و درب الهوكاجي الرابع", response: "جيرايا" },
    { question: "يستخدم تنفس الماء وهو احد الهاشيرا", response: "غيو" },
    { question: "امرأه كبيره في السن وهي مستخدمه ماهره للدمى وكانت تدرب الشينوبي على اسلوب الدمى", response: "تشيو" },
    { question: "حول نفسه الى دميه قويه تحوي انواع كثيره من الاسلحه ويستطيع ان ينقل قلبه من دميه الى اخرى", response: "ساسوري" },
    { question: "فتاه صغيره تحولت الى شيطانه وهي لا تاكل البشر", response: "نيزوكو" },
    { question: "احد افراد فريق مايت غاي وهو زميل لناروتو وينتمي لعشيره الهيوغا", response: "نيجي" },
    { question: "هبطت من الفضاء على الارض قبل 1000 عام واصبحت الحاميه للشجره المقدسه ولديها قوه خارقه", response: "كاغويا" },
    { question: "اصغر افراد عائله زولديك وهي خارقه عن السيطره بقدرتها منح الامنيات", response: "الوكا" },
    { question: "اميرة البياكوغان وزوجه الهوكاجي السابع", response: "هيناتا" },
    { question: "جبان جدا ولا تظهر قدرته الا عند النوم ويحب الفتيات", response: "زينتسو" },
    { question: "لون شعره اصفر واحمر وهو شخص طيب وقوي يستخدم تنفس النار", response: "رينغوكو" },
    { question: "شخصيه قصيره وبارده لكنه قوي ويجلد العمالقه", response: "ليفاي" },
    { question: "عشيره تتميز بقوتها وقدرتها القتاليه واعينهم القرمزيه وانعزالهم عن العالم الخارجي", response: "كورتا" },
    { question: "يلقب بالجوكر وهو منحرف والبعض يعتقد انه ام البطل", response: "هيسوكا" },
    { question: "شخصيه قويه جدا وهي برتبه ملك شياطين وعمره الفا عام", response: "انوس" },
    { question: "تعاني من الصمم منذ صغرها ولا تستطيع النطق بشكل صحيح واصبحت محط السخريه بين زملائها", response: "شوكو" },
    { question: "شخصيه قويه جدا تستخدم سحر الظلام وهو قائد لفرقه الثيران السوداء", response: "يامي" },
    { question: "يرتدي قناع لاخفاء وجهه وهو قائد لفرقه الفجر الذهبي ولديه قوه كبيره", response: "فانجانس" },
    { question: "شخصيه قويه جدا وغير متكبره بالرغم من منصبها الذي تشغله شعره اصفر ويرتدي رداء احمر", response: "يوليوس" },
    { question: "شخصيه بارده وقويه يرتدي نظارات شعره اصفر ويحترم الوقت والمواعيد", response: "نانامي" },
    { question: "شخصيه قويه للغايه ومثال عن الشر الحقيقي ويتصف بثقه كبيره وهو ذكي جدا وجوابك جزء من خطته", response: "ايزن" },
    { question: "متعطش للقتال لا يعرف اسم سيفه ويرتدي عصبه عين للتقليل من قوته حتى يستمتع في القتال", response: "زاراكي" },
    { question: "شخصيه هادئه وقويه يرتدي قبعه وكان قائد سابق في الغوتاي وهو مدرب البطل", response: "اوراهارا" },
    { question: "واحد من السايان قوي جدا ولكنه مهتم بالدراسه ومستقبله", response: "غوهان" },
    { question: "اصلع وعلى جبهته ستة نجوم وهو صديق البطل المقرب", response: "كيريلين" },
    { question: "فتاة ذات شعر ازرق تمتلك قوة التحكم في الزمن وتحب الحلويات", response: "توكا" },
    { question: "صياد أسطوري وأقوى نينجا في التاريخ معروف بعيونه المتقدة", response: "مادارا" },
    { question: "طبيب قراصنة يلبس قناع غزال ويحب المال", response: "كوريا" },
    { question: "فتاة ساحرة تمتلك كتاب غريموار وتتحدث مع النجوم", response: "يونو" },
    { question: "قائد فرقة الهوكاجي السابق معروف بقدرته على النسخ", response: "كاكاشي" },
    { question: "قرصان يلبس قبعة قش وطموحه أن يصبح ملك القراصنة", response: "لوفي" },
    { question: "ساموراي من وانو يمتلك ثلاث سيوف وطموح أن يصبح الأقوى", response: "زورو" },
    { question: "طباخ القراصنة حالم بالبحر الزمردي وشعره أشقر", response: "سانجي" },
    { question: "صياد كرات التنين وأقوى مقاتل في الكون", response: "غوكو" },
    { question: "أمير السايان الفخور والقتال في دمه", response: "فيجيتا" },
    { question: "فتاة ذات شعر وردي تمتلك قوة التحكم في الجاذبية", response: "ميكاسا" },
    { question: "بطل يرتدي بذلة النينجا الخضراء وأقوى جينتشوريكي", response: "ناروتو" },
    { question: "مطور الأسلحة العبقري وصديق لوفي المقرب", response: "فرانكي" },
    { question: "مؤرخة القراصنة تبحث عن التاريخ المفقود", response: "روبن" },
    { question: "ملاح القراصنة تكذب بأنوفها الطويلة", response: "أوسوب" },
    { question: "فتاة الرنة الطبيبة وتحلم بعلاج جميع الأمراض", response: "تشوبر" },
    { question: "ساحرة تعيش في الغابة وتحب الحيوانات", response: "بوا" },
    { question: "نينجا الجيناتيك وصاحب الشارينغان", response: "ساسكي" },
    { question: "قائد الجيش الثوري وأب لوفي", response: "دراغون" },
    { question: "أمير البحر وأقوى قرصان في العالم", response: "وايت بيرد" },
    { question: "فتاة من عشيرة الأوتسوتسوكي تمتلك قوة الآلهة", response: "كاغويا" },
    { question: "نينجا الطبية المشهورة بقدراتها العلاجية", response: "تسونادي" },
    { question: "فتاة التايتان العسكرية وأقوى جندية", response: "أني" },
    { question: "صياد الكنوز وصاحب الرؤية المستقبلية", response: "كاتاكوري" },
    { question: "فتاة التنين تمتلك قوة التحول وتحمي البشر", response: "لوسي" },
    { question: "سيد الظلال وأقوى مستخدم للجيو", response: "غارا" },
    { question: "فتاة السحر تمتلك قوة التحكم في العناصر", response: "ويندي" },
    { question: "ملك العالم السفلي وأقوى الشياطين", response: "ميلين" },
    { question: "فتاة الألعاب عبقرية التخطيط والاستراتيجية", response: "ساكورا" },
    { question: "سيد السيوف وأسرع نينجا في التاريخ", response: "ميناتو" },
    { question: "فتاة الأحلام تمتلك قوة الدخول في عقول الآخرين", response: "رين" }
];

/* ────────────────[دوال مساعدة]──────────────── */
const getOptions = (correctAnswer) => {
    const allAnswers = guessQuestions.map(q => q.response);
    let options = [correctAnswer];
    while (options.length < 4) {
        const random = allAnswers[Math.floor(Math.random() * allAnswers.length)];
        if (!options.includes(random)) {
            options.push(random);
        }
    }
    return shuffleArray(options);
};

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي — بدون آيات
   ═══════════════════════════════════════════ */
let handler = async (m, { conn, usedPrefix }) => {
    conn.guessGame = conn.guessGame || {};
    let id = m.chat;

    if (id in conn.guessGame) {
        await m.reply(`${BRAND.emoji} *سؤال نشط!*
━━━━━
📌 أكمل السؤال الحالي`);
        return;
    }

    const randomIndex = Math.floor(Math.random() * guessQuestions.length);
    const { question, response } = guessQuestions[randomIndex];
    const options = getOptions(response);

    /* ✅ تصميم مضغوط — بدون آيات */
    const bodyText = `${BRAND.emoji} *خمن الشخصية* 🎮
━━━━━
🧩 ${question}
⏰ ${(timeout / 1000).toFixed(0)}ث | 💰 ${poin}XP
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    const buttons = options.map((opt, i) => ({
        name: 'quick_reply',
        params: {
            display_text: `${i + 1}. ${opt}`,
            id: `.خمن_${i + 1}`
        }
    }));

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
        interactiveConfig: { buttons_limits: 4 }
    }, m);

    let timer = setTimeout(async () => {
        if (conn.guessGame[id]) {
            await m.reply(`${BRAND.emoji} *انتهى الوقت!* ⌛
✅ *الإجابة:* ${response}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.guessGame[id];
        }
    }, timeout);

    conn.guessGame[id] = {
        correctAnswer: response.toLowerCase().trim(),
        options: options.map(o => o.toLowerCase().trim()),
        poin: poin,
        timer: timer
    };
};

/* ────────────────[معالجة الأزرار]──────────────── */
handler.before = async (m, { conn }) => {
    conn.guessGame = conn.guessGame || {};
    let id = m.chat;

    if (!(id in conn.guessGame)) return;

    const gameData = conn.guessGame[id];

    /* ✅ معالجة الأزرار */
    if (m.body?.startsWith('.خمن_')) {
        const selectedIndex = parseInt(m.body.replace('.خمن_', ''));
        const selectedOption = gameData.options[selectedIndex - 1];
        const isCorrect = selectedOption === gameData.correctAnswer;

        clearTimeout(gameData.timer);

        if (isCorrect) {
            const result = await addExp(m.sender, gameData.poin);
            
            let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🎭 *الإجابة:* ${gameData.correctAnswer.toUpperCase()}
💰 *+${gameData.poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
            
            if (result.leveledUp) {
                msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
            }
            
            msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
            
            await m.reply(msg);
            delete conn.guessGame[id];
        } else {
            await m.reply(`${BRAND.emoji} *غلط!* ❌
✅ *الإجابة:* ${gameData.correctAnswer.toUpperCase()}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.guessGame[id];
        }
        return true;
    }

    /* ✅ معالجة الردود النصية */
    const userAnswer = m.text?.toLowerCase().trim();
    if (!userAnswer) return;

    if (gameData.options.includes(userAnswer)) {
        const isCorrect = userAnswer === gameData.correctAnswer;
        clearTimeout(gameData.timer);

        if (isCorrect) {
            const result = await addExp(m.sender, gameData.poin);
            
            let msg = `${BRAND.emoji} *صحيح!* ✅
━━━━━
🎭 *الإجابة:* ${gameData.correctAnswer.toUpperCase()}
💰 *+${gameData.poin}XP* | 💵 *${(result.user.exp || 0).toLocaleString('ar-EG')}XP*`;
            
            if (result.leveledUp) {
                msg += `\n🎉 *ترقية!* ${result.levelUpMsg}`;
            }
            
            msg += `\n━━━━━\n${BRAND.emoji} *${BRAND.shortName}*`;
            
            await m.reply(msg);
            delete conn.guessGame[id];
        } else {
            await m.reply(`${BRAND.emoji} *غلط!* ❌
✅ *الإجابة:* ${gameData.correctAnswer.toUpperCase()}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`);
            delete conn.guessGame[id];
        }
        return true;
    }

    return false;
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.help = ['خمن'];
handler.tags = ['game'];
handler.command = ['خمن', 'guess'];

export default handler;