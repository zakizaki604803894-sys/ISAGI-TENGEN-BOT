// 🍁 ملف: اكس.js - لعبة XO مع ربط البنك - ISAGI TENGEN BOT

import { addExp } from '../bank/نظام_البنك.js';

const EMOJI = '🍁';
const BOT_NAME = '┆𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻┆';

const drawBoard = b => [0,3,6].map(i =>
    b.slice(i,i+3).map((c,idx) => c ? (c==='X'?'❌':'⭕') : `${i+idx+1}️⃣`).join(' │ ')
).join('\n──────────\n');

const checkWinner = b => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a,c,d] of lines) if (b[a] && b[a]===b[c] && b[a]===b[d]) return b[a];
    return null;
};

// إرسال اللوحة مع قائمة منسدلة بالخانات الفاضية فقط
const sendBoard = async (conn, chat, board, caption, mentions, m) => {
    const freeSlots = board
        .map((c, i) => c ? null : { index: i+1, label: `${i+1}️⃣ — خانة ${i+1}` })
        .filter(Boolean);

    if (!freeSlots.length) {
        return conn.sendMessage(chat, { text: caption, mentions });
    }

    try {
        await conn.sendList(chat, {
            title: '🎮 XO | اختر خانة',
            buttonText: '📋 اختر رقم الخانة',
            description: caption,
            listSections: [{
                title: `الخانات المتاحة (${freeSlots.length} خانة)`,
                rows: freeSlots.map(s => ({
                    title: s.label,
                    rowId: `.xo ${s.index}`,
                    description: `اضغط للعب في الخانة رقم ${s.index}`
                }))
            }],
            mentions,
            newsletter: { name: CHANNEL_NAME, jid: CHANNEL_JID }
        }, m);
    } catch {
        const nums = freeSlots.map(s => s.index).join(' | ');
        await conn.sendMessage(chat, {
            text: `${caption}\n\n🎯 *الخانات المتاحة:* ${nums}`,
            mentions
        });
    }
};

async function handler(m, { command, text, conn, bot }) {
    global.xoGames ??= {};
    const game = global.xoGames[m.chat];
    const txt = (text || '').trim().toLowerCase();
    const isDelete = txt === 'delete' || txt === 'حذف';
    const isJoin   = txt === 'join'   || txt === 'انضمام' || !txt;

    // حذف اللعبة
    if (isDelete) {
        if (!game) return m.reply('❌ مفيش لعبة نشطة!');
        if (game.player1 !== m.sender && game.player2 !== m.sender)
            return m.reply('❌ بس اللاعبين يقدروا يحذفوا اللعبة!');
        delete global.xoGames[m.chat];
        return m.reply('🗑️ تم حذف اللعبة!');
    }

    // انضمام / إنشاء
    if (isJoin) {
        if (!game) {
            global.xoGames[m.chat] = {
                player1: m.sender, player2: null,
                board: Array(9).fill(null), turn: 'X', status: 'waiting'
            };
            return m.reply(
                `${EMOJI} *🎮 لعبة XO جديدة!*\n\n` +
                `👤 @${m.sender.split('@')[0]} (❌) ينتظر خصم\n\n` +
                `✉️ اكتب *.xo* للانضمام\n` +
                `🗑️ اكتب *.xo حذف* للإلغاء`, null,
                { mentions: [m.sender] }
            );
        }
        if (game.status === 'playing') return m.reply('❌ اللعبة بدأت بالفعل!');
        if (game.player1 === m.sender) return m.reply('❌ مش ممكن تلعب مع نفسك!');

        game.player2 = m.sender;
        game.status = 'playing';

        const caption =
            `${EMOJI} *🎮 بدأت اللعبة!*\n\n` +
            `${drawBoard(game.board)}\n\n` +
            `👤 @${game.player1.split('@')[0]} (❌)\n` +
            `👤 @${game.player2.split('@')[0]} (⭕)\n\n` +
            `🎯 @${game.player1.split('@')[0]} يبدأ! اختر خانة 👇`;

        return sendBoard(conn, m.chat, game.board, caption, [game.player1, game.player2], m);
    }

    // لعب برقم مكتوب مباشرة
    const num = parseInt(txt);
    if (num >= 1 && num <= 9) {
        if (!game || game.status !== 'playing') return m.reply('❌ مفيش لعبة نشطة!');
        return processMove(m, conn, num - 1, game);
    }

    // لو في لعبة نشطة
    if (game) {
        return m.reply(
            game.status === 'waiting'
                ? `⏳ @${game.player1.split('@')[0]} ينتظر خصم\nاكتب *.xo* للانضمام`
                : '❌ في لعبة نشطة! اكتب *.xo حذف* لإلغائها',
            null, { mentions: [game.player1] }
        );
    }

    // إنشاء لعبة جديدة تلقائياً
    global.xoGames[m.chat] = {
        player1: m.sender, player2: null,
        board: Array(9).fill(null), turn: 'X', status: 'waiting'
    };
    return m.reply(
        `${EMOJI} *🎮 لعبة XO جديدة!*\n\n👤 @${m.sender.split('@')[0]} (❌) ينتظر خصم\n\n✉️ اكتب *.xo* للانضمام`,
        null, { mentions: [m.sender] }
    );
}

async function processMove(m, conn, moveIdx, game) {
    const currentPlayer = game.turn === 'X' ? game.player1 : game.player2;
    if (m.sender !== currentPlayer) return false;
    if (game.board[moveIdx] !== null) {
        await m.reply('❌ الخانة دي مشغولة! اختار تانية');
        return true;
    }

    game.board[moveIdx] = game.turn;
    const winner = checkWinner(game.board);
    const isDraw  = !winner && game.board.every(c => c);

    if (winner || isDraw) {
        let text;
        let winnerJid = null;
        if (winner) {
            winnerJid = winner === 'X' ? game.player1 : game.player2;
            
            // ✅ ربط مع نظام البنك - إضافة نقاط للفائز
            const result = await addExp(winnerJid, 500);
            
            text =
                `${drawBoard(game.board)}\n\n` +
                `🎉 *@${winnerJid.split('@')[0]} فاز!* 🏆\n\n` +
                `💰 *ربحت:* +500 XP\n` +
                `💵 *رصيدك:* ${(result.user.exp || 0).toLocaleString('ar-EG')} XP`;
                
            if (result.leveledUp) {
                text += `\n\n${result.levelUpMsg}`;
            }
        } else {
            // ✅ في حالة التعادل - نقاط مشاركة للطرفين
            text = `${drawBoard(game.board)}\n\n🤝 *تعادل!*`;
            
            // إضافة نقاط مشاركة للطرفين
            await addExp(game.player1, 100);
            await addExp(game.player2, 100);
            text += `\n\n💰 *كلا اللاعبين حصل على +100 XP للمشاركة*`;
        }
        await conn.sendMessage(m.chat, { text, mentions: winnerJid ? [winnerJid] : [] });
        delete global.xoGames[m.chat];
        return true;
    }

    game.turn = game.turn === 'X' ? 'O' : 'X';
    const nextPlayer = game.turn === 'X' ? game.player1 : game.player2;
    const symbol = game.turn === 'X' ? '❌' : '⭕';

    const caption =
        `${drawBoard(game.board)}\n\n` +
        `🎯 دور @${nextPlayer.split('@')[0]} (${symbol}) 👇`;

    await sendBoard(conn, m.chat, game.board, caption, [nextPlayer], m);
    return true;
}

// interceptor - يلتقط الأرقام المكتوبة مباشرة أثناء اللعب
handler.before = async (m, { conn }) => {
    const game = global.xoGames?.[m.chat];
    if (!game || game.status !== 'playing') return false;
    const num = parseInt((m.text || '').trim());
    if (num >= 1 && num <= 9) return processMove(m, conn, num - 1, game);
    return false;
};

handler.usage    = ['اكس'];
handler.category = 'game';
handler.command  = ['اكس', 'xo'];
handler.usePrefix = true;
export default handler;