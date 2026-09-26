/* ═══════════════════════════════════════════════════════════
   🎮 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — إكس أو (ضد الذكاء الاصطناعي)
   📁 /home/container/plugins/games/xo.js
   ✅ ذكاء قوي (فوز + منع + استراتيجية)
   ✅ تصميم مصغّر | أصوات | إحصائيات
   ═══════════════════════════════════════════════════════════ */

import { Buffer } from 'buffer';

const BRAND = {
  botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  developer:   'ISAGI 🍁',
  channelLink: 'https://whatsapp.com/channel/0029VbBeu0o002T9NQnURQ2V',
  emoji:       '🍁'
};

const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🎮 إكس أو</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body {
    background: linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #1a5a9a 75%, #0d47a1 100%);
    color: #fff;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 8px;
    overflow: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 20%, rgba(41,121,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(13,71,161,0.3) 0%, transparent 50%);
    pointer-events: none;
  }

  .game-card {
    width: 100%;
    max-width: 340px;
    background: rgba(13, 71, 161, 0.3);
    border-radius: 16px;
    padding: 10px;
    border: 2px solid rgba(41, 121, 255, 0.5);
    text-align: center;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .header {
    background: linear-gradient(145deg, #0d47a1, #1565c0);
    border-radius: 12px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .header h2 {
    font-size: 18px;
    color: #ffd700;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  .header p {
    font-size: 10px;
    color: #e3f2fd;
    margin: 2px 0 0;
  }

  .status-display {
    background: linear-gradient(145deg, rgba(13,71,161,0.5), rgba(21,101,192,0.5));
    padding: 8px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .status-display.winner {
    background: linear-gradient(145deg, rgba(255, 215, 0, 0.3), rgba(255, 152, 0, 0.3));
    animation: pulse 1s infinite;
    border-color: #ffd700;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }

  .turn-indicator {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    animation: bounce 1s infinite;
  }

  .turn-you { background: #ff6b6b; }
  .turn-ai  { background: #ffd700; }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }

  .board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    aspect-ratio: 1;
  }

  .cell {
    background: linear-gradient(145deg, rgba(21,101,192,0.4), rgba(13,71,161,0.4));
    border: 2px solid rgba(41, 121, 255, 0.4);
    border-radius: 12px;
    cursor: pointer;
    font-size: 36px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    aspect-ratio: 1;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    touch-action: manipulation;
  }

  .cell:active { transform: scale(0.95); }

  .cell.x {
    color: #ff6b6b;
    border-color: #ff6b6b;
    background: rgba(255, 107, 107, 0.2);
  }

  .cell.o {
    color: #ffd700;
    border-color: #ffd700;
    background: rgba(255, 215, 0, 0.2);
  }

  .cell.winning {
    animation: winAnimation 0.5s infinite;
    background: rgba(255, 215, 0, 0.4);
  }

  @keyframes winAnimation {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }

  .score-board {
    display: flex;
    gap: 4px;
  }

  .score-item {
    background: linear-gradient(145deg, rgba(13,71,161,0.5), rgba(21,101,192,0.5));
    padding: 6px;
    border-radius: 8px;
    flex: 1;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .score-label { font-size: 9px; opacity: 0.8; margin-bottom: 2px; }
  .score-value { font-size: 16px; font-weight: bold; }
  .score-you  { color: #ff6b6b; }
  .score-ai   { color: #ffd700; }
  .score-draw { color: #4ecdc4; }

  .controls {
    display: flex;
    gap: 6px;
    direction: ltr;
  }

  .btn {
    flex: 1;
    background: linear-gradient(145deg, #1565c0, #0d47a1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 8px;
    color: white;
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.15s;
    text-align: center;
  }

  .btn:active { transform: scale(0.95); }

  .btn-reset { background: linear-gradient(145deg, #1976d2, #1565c0); }
  .btn-new-game { background: linear-gradient(145deg, #42a5f5, #1e88e5); }

  .footer-info { font-size: 8px; color: #90caf9; line-height: 1.3; }
  .footer-info a { color: #ffd700; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🎮 إكس أو</h2>
    <p>العب ضد الذكاء الاصطناعي!</p>
  </div>

  <div class="status-display" id="statusDisplay">
    <span>دورك!</span>
    <span class="turn-indicator turn-you"></span>
    <span>X</span>
  </div>

  <div class="score-board">
    <div class="score-item">
      <div class="score-label">أنت (X)</div>
      <div class="score-value score-you" id="scoreYou">0</div>
    </div>
    <div class="score-item">
      <div class="score-label">تعادل</div>
      <div class="score-value score-draw" id="scoreDraw">0</div>
    </div>
    <div class="score-item">
      <div class="score-label">الذكاء (O)</div>
      <div class="score-value score-ai" id="scoreAI">0</div>
    </div>
  </div>

  <div class="board" id="board">
    <div class="cell" data-index="0"></div>
    <div class="cell" data-index="1"></div>
    <div class="cell" data-index="2"></div>
    <div class="cell" data-index="3"></div>
    <div class="cell" data-index="4"></div>
    <div class="cell" data-index="5"></div>
    <div class="cell" data-index="6"></div>
    <div class="cell" data-index="7"></div>
    <div class="cell" data-index="8"></div>
  </div>

  <div class="controls" dir="ltr">
    <button class="btn btn-reset" id="resetBtn">🔄 جولة جديدة</button>
    <button class="btn btn-new-game" id="newGameBtn">✨ تصفير</button>
  </div>

  <div class="footer-info">
    👑 ISAGI TENGEN BOT • <a href="${BRAND.channelLink}" target="_blank">القناة</a>
  </div>
</div>

<script>
(function() {
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.getElementById('statusDisplay');
  const scoreYouElement = document.getElementById('scoreYou');
  const scoreAIElement = document.getElementById('scoreAI');
  const scoreDrawElement = document.getElementById('scoreDraw');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;
  let isAIThinking = false;
  let scores = { X: 0, O: 0, draw: 0 };

  /* 🔊 الصوت */
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch(e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }
  function playTone(freq, dur, type, vol) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol || 0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + dur);
    } catch(e) {}
  }
  function soundMove() { playTone(600, 0.08, 'sine', 0.1); }
  function soundWin() {
    playTone(800, 0.1, 'sine', 0.15);
    setTimeout(() => playTone(1000, 0.1, 'sine', 0.15), 80);
    setTimeout(() => playTone(1200, 0.15, 'sine', 0.15), 160);
  }
  function soundLose() {
    playTone(300, 0.2, 'sawtooth', 0.15);
    setTimeout(() => playTone(200, 0.3, 'sawtooth', 0.15), 150);
  }
  function soundDraw() {
    playTone(500, 0.15, 'triangle', 0.12);
    setTimeout(() => playTone(400, 0.15, 'triangle', 0.12), 150);
  }

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function updateStatus() {
    if (!gameActive) return;

    const isPlayer = currentPlayer === 'X';
    const playerName = isPlayer ? 'دورك!' : 'الذكاء يفكر...';

    statusDisplay.innerHTML =
      '<span>' + playerName + '</span>' +
      '<span class="turn-indicator ' + (isPlayer ? 'turn-you' : 'turn-ai') + '"></span>' +
      '<span>' + currentPlayer + '</span>';
  }

  function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '' || currentPlayer !== 'X' || isAIThinking) return;

    initAudio();

    gameBoard[index] = 'X';
    cells[index].textContent = 'X';
    cells[index].classList.add('x');
    soundMove();

    if (checkWinner('X')) {
      gameActive = false;
      scores.X++;
      updateScores();
      highlightWinningCells();
      statusDisplay.innerHTML = '<span>🎉 فزت! أنت رائع!</span>';
      statusDisplay.classList.add('winner');
      soundWin();
      setTimeout(() => statusDisplay.classList.remove('winner'), 3000);
    } else if (gameBoard.every(c => c !== '')) {
      gameActive = false;
      scores.draw++;
      updateScores();
      statusDisplay.innerHTML = '<span>🤝 تعادل!</span>';
      soundDraw();
    } else {
      currentPlayer = 'O';
      updateStatus();
      setTimeout(aiMove, 500);
    }
  }

  function aiMove() {
    if (!gameActive || currentPlayer !== 'O') return;

    isAIThinking = true;
    const bestMove = getBestAIMove();

    if (bestMove !== -1) {
      gameBoard[bestMove] = 'O';
      cells[bestMove].textContent = 'O';
      cells[bestMove].classList.add('o');
      soundMove();

      if (checkWinner('O')) {
        gameActive = false;
        scores.O++;
        updateScores();
        highlightWinningCells();
        statusDisplay.innerHTML = '<span>😅 فاز الذكاء! حاول مرة أخرى!</span>';
        statusDisplay.classList.add('winner');
        soundLose();
        setTimeout(() => statusDisplay.classList.remove('winner'), 3000);
      } else if (gameBoard.every(c => c !== '')) {
        gameActive = false;
        scores.draw++;
        updateScores();
        statusDisplay.innerHTML = '<span>🤝 تعادل!</span>';
        soundDraw();
      } else {
        currentPlayer = 'X';
        updateStatus();
      }
    }

    isAIThinking = false;
  }

  function getBestAIMove() {
    /* 1️⃣ فوز فوري للذكاء */
    for (let i = 0; i < 9; i++) {
      if (gameBoard[i] === '') {
        gameBoard[i] = 'O';
        if (checkWinner('O')) {
          gameBoard[i] = '';
          return i;
        }
        gameBoard[i] = '';
      }
    }

    /* 2️⃣ منع فوز اللاعب */
    for (let i = 0; i < 9; i++) {
      if (gameBoard[i] === '') {
        gameBoard[i] = 'X';
        if (checkWinner('X')) {
          gameBoard[i] = '';
          return i;
        }
        gameBoard[i] = '';
      }
    }

    /* 3️⃣ المركز */
    if (gameBoard[4] === '') return 4;

    /* 4️⃣ الزوايا */
    const corners = [0, 2, 6, 8].filter(i => gameBoard[i] === '');
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    /* 5️⃣ الأطراف */
    const edges = [1, 3, 5, 7].filter(i => gameBoard[i] === '');
    if (edges.length > 0) {
      return edges[Math.floor(Math.random() * edges.length)];
    }

    return -1;
  }

  function checkWinner(player) {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
        return combo;
      }
    }
    return null;
  }

  function highlightWinningCells() {
    const combo = checkWinner('X') || checkWinner('O');
    if (combo) {
      combo.forEach(i => cells[i].classList.add('winning'));
    }
  }

  function updateScores() {
    scoreYouElement.textContent = scores.X;
    scoreAIElement.textContent = scores.O;
    scoreDrawElement.textContent = scores.draw;
  }

  function resetRound() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    isAIThinking = false;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x', 'o', 'winning');
    });
    updateStatus();
  }

  function newGame() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScores();
    resetRound();
  }

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      handleCellClick(parseInt(cell.dataset.index));
    });
    cell.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleCellClick(parseInt(cell.dataset.index));
    }, { passive: false });
  });

  document.getElementById('resetBtn').addEventListener('click', resetRound);
  document.getElementById('resetBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    resetRound();
  }, { passive: false });

  document.getElementById('newGameBtn').addEventListener('click', newGame);
  document.getElementById('newGameBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    newGame();
  }, { passive: false });

  document.addEventListener('touchstart', initAudio, { once: true });
  document.addEventListener('mousedown', initAudio, { once: true });

  updateStatus();
})();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'xo-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'tic-tac-toe-isagi',
    sections: [{
      view_model: {
        primitive: {
          __typename: 'GenAIaeacdsnwHtmlPrimitive',
          payload: HTML_PAGE,
          trusted_sources: ['nixel.dev']
        },
        __typename: 'GenAISingleLayoutViewModel'
      }
    }]
  })).toString('base64');

  await client.relayMessage(
    m.chat,
    {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2,
        botMetadata: {
          messageDisclaimerText: '',
          botResponseId: uniqueId,
          verificationMetadata: {
            proofs: [{
              version: 1,
              useCase: 1,
              signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
              certificateChain: [
                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ=='
              ]
            }]
          }
        }
      },
      botForwardedMessage: {
        message: {
          richResponseMessage: {
            messageType: 1,
            submessages: [{
              messageType: 2,
              messageText: '🎮 إكس أو - جاهزة!'
            }],
            unifiedResponse: { data },
            contextInfo: {
              forwardingScore: 1,
              isForwarded: true,
              forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
              forwardOrigin: 4
            }
          }
        }
      }
    },
    {}
  );
};

handler.command = ['اكس_او', 'xo', 'tictactoe', 'لعبة_اكس_او'];
handler.category = 'games';
handler.help = ['اكس_او', 'xo'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;