/* ═══════════════════════════════════════════════════════════
   🎮 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة تتريس (مُصلحة)
   📁 /home/container/plugins/games/tetris.js
   ✅ أزرار بالترتيب الصحيح (LTR)
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
<title>🎮 تتريس</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { 
    background: #1a1a2e; 
    color: #fff; 
    font-family: 'Courier New', monospace;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    min-height: 100vh; 
    overflow: hidden;
    padding: 6px;
  }
  
  .gameboy-container {
    max-width: 400px;
    width: 100%;
    background: linear-gradient(145deg, #2a2a4a, #1a1a2e);
    border-radius: 20px;
    padding: 12px 10px;
    border: 3px solid #3a3a5a;
    box-shadow: 0 8px 32px rgba(0,0,0,0.8);
  }
  
  .gameboy-header {
    text-align: center;
    margin-bottom: 8px;
  }
  
  .gameboy-header h1 {
    color: #7fff00;
    font-size: 18px;
    text-shadow: 0 0 10px rgba(127,255,0,0.3);
    letter-spacing: 2px;
    margin: 0;
  }
  
  .gameboy-header p {
    color: #8a8aaa;
    font-size: 9px;
    margin-top: 2px;
  }
  
  .screen-wrapper {
    display: flex;
    gap: 6px;
    align-items: flex-start;
    direction: ltr;
  }
  
  .screen {
    flex: 1;
    background: #0a3d0a;
    border-radius: 10px;
    padding: 6px;
    border: 3px solid #2a5a2a;
    box-shadow: inset 0 0 20px rgba(0,255,0,0.1);
    position: relative;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: auto;
    image-rendering: pixelated;
    border-radius: 5px;
    background: #0a3d0a;
  }
  
  .next-piece {
    background: #0a3d0a;
    border-radius: 8px;
    padding: 6px;
    border: 2px solid #2a5a2a;
    min-width: 60px;
    text-align: center;
  }
  
  .next-piece-label {
    color: #7fff00;
    font-size: 9px;
    margin-bottom: 4px;
    font-weight: bold;
  }
  
  .next-piece canvas {
    background: transparent;
    width: 100%;
  }
  
  /* 🎯 شريط الأزرار — LTR */
  .gameboy-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    gap: 6px;
    direction: ltr;   /* ✅ إصلاح الانعكاس */
  }
  
  .controls-left, .controls-right {
    display: flex;
    gap: 5px;
    flex: 1;
  }
  
  .controls-left {
    justify-content: flex-start;   /* ✅ يسار */
  }
  
  .controls-right {
    justify-content: flex-end;     /* ✅ يمين */
  }
  
  .btn {
    background: linear-gradient(145deg, #3a3a5a, #2a2a4a);
    border: none;
    border-radius: 10px;
    padding: 10px 10px;
    color: #aaa;
    font-size: 14px;
    cursor: pointer;
    touch-action: manipulation;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    transition: all 0.05s ease;
    min-width: 42px;
    text-align: center;
    font-weight: bold;
  }
  
  .btn:active {
    transform: scale(0.9);
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }
  
  .btn-green { background: linear-gradient(145deg, #2a7a2a, #1a5a1a); color: #7fff00; }
  .btn-red { background: linear-gradient(145deg, #7a2a2a, #5a1a1a); color: #ff4444; }
  .btn-blue { background: linear-gradient(145deg, #2a3a7a, #1a2a5a); color: #4488ff; }
  .btn-gold { background: linear-gradient(145deg, #7a6a2a, #5a4a1a); color: #ffd700; }
  
  .info-display {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    padding: 6px 8px;
    background: rgba(0,0,0,0.3);
    border-radius: 8px;
    font-size: 11px;
    color: #7fff00;
  }
  
  .info-item {
    text-align: center;
    flex: 1;
  }
  
  .info-value {
    font-size: 14px;
    font-weight: bold;
    margin-top: 2px;
  }
  
  .footer-info {
    text-align: center;
    margin-top: 8px;
    font-size: 8px;
    color: #4a4a6a;
    line-height: 1.4;
  }
  
  .footer-info a {
    color: #7fff00;
    text-decoration: none;
  }
</style>
</head>
<body>

<div class="gameboy-container">
  <div class="gameboy-header">
    <h1>🎮 TETRIS PRO</h1>
    <p>⬅️ ➡️ تحريك | ⬆️ تدوير | ⬇️ هبوط</p>
  </div>

  <div class="screen-wrapper">
    <div class="screen">
      <canvas id="gameCanvas" width="200" height="400"></canvas>
    </div>
    <div class="next-piece">
      <div class="next-piece-label">التالي</div>
      <canvas id="nextCanvas" width="60" height="60"></canvas>
    </div>
  </div>

  <!-- ✅ الأزرار مع dir="ltr" -->
  <div class="gameboy-controls" dir="ltr">
    <div class="controls-left">
      <button class="btn btn-blue" id="leftBtn">◀</button>
      <button class="btn btn-blue" id="rotateBtn">🔄</button>
      <button class="btn btn-blue" id="rightBtn">▶</button>
    </div>
    <div class="controls-right">
      <button class="btn btn-gold" id="pauseBtn">⏸️</button>
      <button class="btn btn-green" id="dropBtn">⬇</button>
      <button class="btn btn-red" id="resetBtn">⏹</button>
    </div>
  </div>

  <div class="info-display">
    <div class="info-item">
      <div>النقاط</div>
      <div class="info-value" id="scoreDisplay">0</div>
    </div>
    <div class="info-item">
      <div>المستوى</div>
      <div class="info-value" id="levelDisplay">1</div>
    </div>
    <div class="info-item">
      <div>الصفوف</div>
      <div class="info-value" id="linesDisplay">0</div>
    </div>
  </div>

  <div class="footer-info">
    👑 ISAGI TENGEN BOT • <a href="${BRAND.channelLink}" target="_blank">القناة</a>
  </div>
</div>

<script>
(function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const nextCanvas = document.getElementById('nextCanvas');
  const nctx = nextCanvas.getContext('2d');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const levelDisplay = document.getElementById('levelDisplay');
  const linesDisplay = document.getElementById('linesDisplay');

  const COLS = 10;
  const ROWS = 20;
  const BLOCK_SIZE = 20;
  const EMPTY = 0;
  
  let board = [];
  let score = 0;
  let lines = 0;
  let level = 1;
  let gameOver = false;
  let isPaused = false;
  let dropCounter = 0;
  let dropInterval = 1000;
  let lastTime = 0;
  let animationId = null;
  let combo = 0;
  let particles = [];
  
  let audioContext = null;
  let audioInitialized = false;
  
  function initAudio() {
    if (audioInitialized) return;
    audioInitialized = true;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }
  
  function playTone(freq, duration, type = 'square', volume = 0.15) {
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = volume;
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {}
  }
  
  function soundMove() { playTone(300, 0.05, 'square', 0.1); }
  function soundRotate() { playTone(500, 0.06, 'square', 0.1); }
  function soundDrop() { playTone(150, 0.1, 'sawtooth', 0.15); }
  function soundClear() {
    playTone(800, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(1000, 0.1, 'sine', 0.2), 50);
    setTimeout(() => playTone(1200, 0.15, 'sine', 0.2), 100);
  }
  function soundGameOver() {
    playTone(400, 0.2, 'sawtooth', 0.2);
    setTimeout(() => playTone(300, 0.2, 'sawtooth', 0.2), 150);
    setTimeout(() => playTone(200, 0.4, 'sawtooth', 0.2), 300);
  }
  function soundLevelUp() {
    playTone(600, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(800, 0.1, 'sine', 0.2), 80);
    setTimeout(() => playTone(1000, 0.15, 'sine', 0.2), 160);
  }

  const PIECES = [
    { shape: [[1,1,1,1]], color: '#00f0f0', name: 'I' },
    { shape: [[1,1],[1,1]], color: '#f0f000', name: 'O' },
    { shape: [[0,1,0],[1,1,1]], color: '#a000f0', name: 'T' },
    { shape: [[0,1,1],[1,1,0]], color: '#00f000', name: 'S' },
    { shape: [[1,1,0],[0,1,1]], color: '#f00000', name: 'Z' },
    { shape: [[1,0,0],[1,1,1]], color: '#f0a000', name: 'L' },
    { shape: [[0,0,1],[1,1,1]], color: '#0000f0', name: 'J' }
  ];

  let currentPiece = null;
  let nextPiece = null;
  let pieceX = 0;
  let pieceY = 0;

  function createBoard() {
    board = [];
    for (let y = 0; y < ROWS; y++) {
      board.push(new Array(COLS).fill(EMPTY));
    }
  }

  function randomPiece() {
    const idx = Math.floor(Math.random() * PIECES.length);
    const piece = PIECES[idx];
    return {
      shape: piece.shape.map(row => [...row]),
      color: piece.color,
      name: piece.name
    };
  }

  function rotatePiece(shape) {
    const rotated = [];
    for (let i = 0; i < shape[0].length; i++) {
      rotated.push([]);
      for (let j = shape.length - 1; j >= 0; j--) {
        rotated[i].push(shape[j][i]);
      }
    }
    return rotated;
  }

  function collide(shape, offsetX, offsetY) {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const boardX = offsetX + x;
          const boardY = offsetY + y;
          if (boardX < 0 || boardX >= COLS || boardY >= ROWS || boardY < 0) {
            return true;
          }
          if (boardY >= 0 && board[boardY][boardX] !== EMPTY) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function mergePiece() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          const boardX = pieceX + x;
          const boardY = pieceY + y;
          if (boardY < 0) {
            gameOver = true;
            soundGameOver();
            return;
          }
          board[boardY][boardX] = currentPiece.color;
        }
      }
    }
    clearLines();
    spawnPiece();
  }

  function clearLines() {
    let cleared = 0;
    for (let y = ROWS - 1; y >= 0; ) {
      let full = true;
      for (let x = 0; x < COLS; x++) {
        if (board[y][x] === EMPTY) {
          full = false;
          break;
        }
      }
      if (full) {
        board.splice(y, 1);
        board.unshift(new Array(COLS).fill(EMPTY));
        cleared++;
      } else {
        y--;
      }
    }
    
    if (cleared > 0) {
      const points = [0, 100, 300, 500, 800];
      const basePoints = points[Math.min(cleared, 4)];
      const comboBonus = combo * 50;
      score += (basePoints + comboBonus) * level;
      combo++;
      
      lines += cleared;
      soundClear();
      createClearParticles(cleared);
      
      const newLevel = Math.floor(lines / 10) + 1;
      if (newLevel > level) {
        level = newLevel;
        dropInterval = Math.max(100, 1000 - (level - 1) * 80);
        soundLevelUp();
      }
      
      updateDisplay();
    } else {
      combo = 0;
    }
  }
  
  function createClearParticles(rowCount) {
    for (let i = 0; i < rowCount * 10; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 30,
        color: ['#ff6b6b', '#ffd700', '#4ecdc4', '#ff9ff3'][Math.floor(Math.random() * 4)],
        size: 3
      });
    }
  }

  function spawnPiece() {
    if (!nextPiece) {
      nextPiece = randomPiece();
    }
    currentPiece = nextPiece;
    nextPiece = randomPiece();
    pieceX = Math.floor((COLS - currentPiece.shape[0].length) / 2);
    pieceY = 0;
    
    drawNext();
    
    if (collide(currentPiece.shape, pieceX, pieceY)) {
      gameOver = true;
      soundGameOver();
    }
  }

  function movePiece(dx, dy) {
    if (gameOver || isPaused) return false;
    if (!collide(currentPiece.shape, pieceX + dx, pieceY + dy)) {
      pieceX += dx;
      pieceY += dy;
      if (dx !== 0) soundMove();
      return true;
    }
    if (dy === 1) {
      mergePiece();
      soundDrop();
    }
    return false;
  }

  function rotatePieceAction() {
    if (gameOver || isPaused) return;
    const rotated = rotatePiece(currentPiece.shape);
    if (!collide(rotated, pieceX, pieceY)) {
      currentPiece.shape = rotated;
      soundRotate();
    } else {
      if (!collide(rotated, pieceX - 1, pieceY)) {
        currentPiece.shape = rotated;
        pieceX -= 1;
        soundRotate();
      } else if (!collide(rotated, pieceX + 1, pieceY)) {
        currentPiece.shape = rotated;
        pieceX += 1;
        soundRotate();
      }
    }
  }

  function hardDrop() {
    if (gameOver || isPaused) return;
    while (!collide(currentPiece.shape, pieceX, pieceY + 1)) {
      pieceY++;
    }
    soundDrop();
    mergePiece();
  }
  
  function togglePause() {
    if (gameOver) return;
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? '▶️' : '⏸️';
    if (!isPaused) {
      lastTime = performance.now();
    }
  }

  function updateDisplay() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    linesDisplay.textContent = lines;
  }

  function drawBlock(context, x, y, color, size = BLOCK_SIZE) {
    context.fillStyle = color;
    context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
    context.fillStyle = 'rgba(255,255,255,0.2)';
    context.fillRect(x * size + 1, y * size + 1, size - 2, 2);
    context.fillStyle = 'rgba(0,0,0,0.2)';
    context.fillRect(x * size + 1, y * size + size - 4, size - 2, 2);
  }
  
  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.fillStyle = '#0a3d0a';
    ctx.fillRect(0, 0, w, h);
    
    ctx.strokeStyle = 'rgba(0,255,0,0.05)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * BLOCK_SIZE, 0);
      ctx.lineTo(x * BLOCK_SIZE, h);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * BLOCK_SIZE);
      ctx.lineTo(w, y * BLOCK_SIZE);
      ctx.stroke();
    }
    
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (board[y][x] !== EMPTY) {
          drawBlock(ctx, x, y, board[y][x]);
        }
      }
    }
    
    if (currentPiece && !gameOver) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            drawBlock(ctx, pieceX + x, pieceY + y, currentPiece.color);
          }
        }
      }
      
      let ghostY = pieceY;
      while (!collide(currentPiece.shape, pieceX, ghostY + 1)) {
        ghostY++;
      }
      if (ghostY > pieceY) {
        ctx.globalAlpha = 0.2;
        for (let y = 0; y < currentPiece.shape.length; y++) {
          for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x] !== 0) {
              drawBlock(ctx, pieceX + x, ghostY + y, currentPiece.color);
            }
          }
        }
        ctx.globalAlpha = 1;
      }
    }
    
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.globalAlpha = 1;
    });
    
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 24px "Courier New"';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', w/2, h/2 - 30);
      ctx.fillStyle = '#7fff00';
      ctx.font = '16px "Courier New"';
      ctx.fillText('النقاط: ' + score, w/2, h/2 + 10);
      ctx.fillStyle = '#ffd700';
      ctx.font = '14px "Courier New"';
      ctx.fillText('أعلى مستوى: ' + level, w/2, h/2 + 35);
      ctx.fillStyle = '#fff';
      ctx.font = '12px "Courier New"';
      ctx.fillText('اضغط ⏹', w/2, h/2 + 65);
    }
    
    if (isPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px "Courier New"';
      ctx.textAlign = 'center';
      ctx.fillText('⏸️ إيقاف', w/2, h/2);
      ctx.fillStyle = '#7fff00';
      ctx.font = '14px "Courier New"';
      ctx.fillText('اضغط ▶️ للمتابعة', w/2, h/2 + 30);
    }
  }
  
  function drawNext() {
    const w = nextCanvas.width;
    const h = nextCanvas.height;
    nctx.clearRect(0, 0, w, h);
    
    if (!nextPiece) return;
    
    const shape = nextPiece.shape;
    const size = 14;
    const offsetX = (w - shape[0].length * size) / 2;
    const offsetY = (h - shape.length * size) / 2;
    
    nctx.fillStyle = nextPiece.color;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          nctx.fillRect(offsetX + x * size + 1, offsetY + y * size + 1, size - 2, size - 2);
        }
      }
    }
  }

  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    if (!gameOver && !isPaused) {
      dropCounter += deltaTime;
      if (dropCounter > dropInterval) {
        dropCounter = 0;
        movePiece(0, 1);
      }
      
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        return p.life > 0;
      });
    }
    
    draw();
    animationId = requestAnimationFrame(update);
  }

  function resetGame() {
    createBoard();
    score = 0;
    lines = 0;
    level = 1;
    gameOver = false;
    isPaused = false;
    dropCounter = 0;
    dropInterval = 1000;
    lastTime = performance.now();
    combo = 0;
    particles = [];
    nextPiece = null;
    
    document.getElementById('pauseBtn').textContent = '⏸️';
    
    spawnPiece();
    updateDisplay();
    
    if (animationId) cancelAnimationFrame(animationId);
    update();
  }

  function bindButton(id, action) {
    const el = document.getElementById(id);
    el.addEventListener('touchstart', e => { e.preventDefault(); initAudio(); action(); }, { passive: false });
    el.addEventListener('mousedown', e => { e.preventDefault(); initAudio(); action(); });
  }
  
  bindButton('leftBtn', () => movePiece(-1, 0));
  bindButton('rightBtn', () => movePiece(1, 0));
  bindButton('rotateBtn', rotatePieceAction);
  bindButton('dropBtn', hardDrop);
  bindButton('resetBtn', resetGame);
  bindButton('pauseBtn', togglePause);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') movePiece(-1, 0);
    else if (e.key === 'ArrowRight') movePiece(1, 0);
    else if (e.key === 'ArrowUp') rotatePieceAction();
    else if (e.key === 'ArrowDown') movePiece(0, 1);
    else if (e.key === ' ') { e.preventDefault(); hardDrop(); }
    else if (e.key === 'p' || e.key === 'P') togglePause();
    else if (e.key === 'r' || e.key === 'R') resetGame();
  });

  resetGame();
})();
</script>
</body>
</html>`;

const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'gameboy-tetris-pro-fixed',
    sections: [
      {
        view_model: {
          primitive: {
            __typename: 'GenAIaeacdsnwHtmlPrimitive',
            payload: HTML_PAGE,
            trusted_sources: ['nixel.dev']
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }
    ]
  })).toString('base64');

  await conn.relayMessage(
    m.chat,
    {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2,
        botMetadata: {
          messageDisclaimerText: '',
          botResponseId: 'tetris-pro-fixed-response',
          verificationMetadata: {
            proofs: [
              {
                version: 1,
                useCase: 1,
                signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                certificateChain: [
                  'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                  'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ=='
                ]
              }
            ]
          }
        }
      },
      botForwardedMessage: {
        message: {
          richResponseMessage: {
            messageType: 1,
            submessages: [
              { messageType: 2, messageText: '🎮 TETRIS PRO - جاهز للعب!' }
            ],
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

handler.command = ['تتريس', 'tetris', 'لعبة_تتريس'];
handler.category = 'games';
handler.help = ['تتريس', 'tetris'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;