// ════════════════════════════════════════
//  قسم "الأنمي" (anime) - 10 أوامر
//  ORACLE
// ════════════════════════════════════════

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const QUOTES = [
    '"لو معرفتش تخاف، معرفتش تحترم القوة الحقيقية." — Attack on Titan 🗡️',
    '"مفيش حاجة اسمها حظ، فيه بس مجهود بيتراكم." — Hunter x Hunter ⚡',
    '"الهزيمة مش نهاية الطريق، دي بداية طريق جديد." — Naruto 🍥',
    '"الملك الحقيقي مش اللي يحكم، ده اللي يحمي." — One Piece 👑',
    '"القوة من غير هدف، سيستم من غير كود." — My Hero Academia 🦾'
];
const CHARACTERS = ['ناروتو','ساسكي','لوفي','زورو','ايتاتشي','ليفاي','غوجو ساتورو','ديكو','تانجيرو','إيرين'];
const ANIME_LIST = ['Naruto','One Piece','Attack on Titan','Jujutsu Kaisen','Demon Slayer','Death Note','Hunter x Hunter','My Hero Academia','Bleach','One Punch Man'];
const GENRES = ['شونين حماسي 🔥','رومانسي هادي ❤️','رعب نفسي 👻','كوميدي خفيف 😂','إيسيكاي عوالم غريبة 🌌','رياضي تحفيزي 🏆'];

const handler = async (m, { command, text }) => {
    switch (command) {
        case 'اقتباس_انمي': {
            return m.reply(`💬 *اقتباس ملوكي من عالم الأنمي:*\n\n${pick(QUOTES)}`);
        }

        case 'شخصية_انمي': {
            return m.reply(`🥷 *شخصية اليوم:* *${pick(CHARACTERS)}*\n_يا صايع دي شخصية أسطورية فعلاً._`);
        }

        case 'افضل_انمي': case 'رشحلي_انمي': {
            return m.reply(`🎬 *الأنمي اللي السيستم رشحهولك:*\n👉 *${pick(ANIME_LIST)}*\n_شغل وشوف، مش هتندم._`);
        }

        case 'بطل_انمي': {
            return m.reply(`⚔️ *بطلك النهاردة:* *${pick(CHARACTERS)}*\n_قوته زي سيرفر شغال بلا انقطاع._`);
        }

        case 'قوة_هاكي': {
            const lvl = Math.floor(Math.random() * 100) + 1;
            return m.reply(`👊 *مستوى الهاكي بتاعك:* *${lvl}%*\n_${lvl > 70 ? 'إنت لورد يا صايع 🔥' : 'كمّل تمرين وهتوصل.'}_`);
        }

        case 'تشاكرا': {
            const lvl = Math.floor(Math.random() * 100) + 1;
            return m.reply(`🍥 *مستوى التشاكرا:* *${lvl}%*\n_${lvl > 70 ? 'موضع هوكاجي مفتوحلك 👑' : 'محتاج تتمرن زيادة يا فنان.'}_`);
        }

        case 'صنف_انمي': case 'نوع_انمي': {
            return m.reply(`🎭 *الصنف المناسب لمودك دلوقتي:*\n👉 *${pick(GENRES)}*`);
        }

        case 'اسم_انمي_عشوائي': {
            return m.reply(`🎲 *اسم أنمي عشوائي:* *${pick(ANIME_LIST)}*`);
        }

        case 'فريق_احلامي': {
            const team = new Set();
            while (team.size < 4) team.add(pick(CHARACTERS));
            return m.reply(`🛡️ *فريق أحلامك يا لورد:*\n${[...team].map(c => `⚡ ${c}`).join('\n')}`);
        }

        case 'قوة_شريرة': case 'اقتباس_شرير': {
            const villains = [
                '"القوة الحقيقية مبتتولدش من الحب، بتتولد من اليأس." 😈',
                '"العالم مش عادل، وأنا هخليه يدفع التمن." 😈',
                '"مفيش خير أو شر، فيه بس أقوى يفوز." 😈'
            ];
            return m.reply(`🖤 *كلام الأشرار:*\n${pick(villains)}`);
        }
    }
};

handler.usage = [
    'اقتباس_انمي','شخصية_انمي','افضل_انمي','بطل_انمي','قوة_هاكي',
    'تشاكرا','صنف_انمي','اسم_انمي_عشوائي','فريق_احلامي','قوة_شريرة'
];
handler.category = 'anime';
handler.command  = [
    'اقتباس_انمي','شخصية_انمي','افضل_انمي','رشحلي_انمي','بطل_انمي',
    'قوة_هاكي','تشاكرا','صنف_انمي','نوع_انمي','اسم_انمي_عشوائي',
    'فريق_احلامي','قوة_شريرة','اقتباس_شرير'
];

export default handler;
