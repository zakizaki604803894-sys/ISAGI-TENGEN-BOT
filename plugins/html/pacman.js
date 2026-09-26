/* ═══════════════════════════════════════════════════════════
   👻 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — Pacman الكلاسيكية (محسّنة)
   📁 /home/container/plugins/games/pacman.js
   ✅ سرعة متوازنة | 4 أشباح بذكاء مختلف
   ✅ متاهة كلاسيكية | مستويات | أصوات
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
<title>👻 Pacman</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body {
    background: #0a0a1a;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    padding: 6px;
    gap: 6px;
  }

  .game-card {
    width: 100%;
    max-width: 340px;
    background: rgba(15, 18, 30, 0.95);
    border-radius: 16px;
    padding: 8px;
    border: 2px solid #ffcc00;
    box-shadow: 0 0 30px rgba(255, 204, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .header h2 {
    font-size: 18px;
    color: #ffcc00;
    text-align: center;
    margin: 0;
    text-shadow: 0 0 10px #ffcc00;
  }
  .header p { font-size: 9px; color: #999; text-align: center; margin: 2px 0 0; }

  .hud {
    display: flex;
    justify-content: space-between;
    gap: 4px;
  }
  .hud-item {
    flex: 1;
    background: rgba(255,204,0,0.1);
    border: 1px solid rgba(255,204,0,0.3);
    border-radius: 8px;
    padding: 4px;
    text-align: center;
    font-size: 9px;
    font-weight: bold;
    color: #ffcc00;
  }
  .hud-value { font-size: 14px; margin-top: 2px; }

  .canvas-container {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    background: #000;
    border: 2px solid #1a1a3a;
    position: relative;
  }
  canvas { display: block; width: 100%; height: auto; }

  /* 🎮 أزرار التحكم */
  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 4px;
    direction: ltr;
  }
  .btn-dir {
    background: linear-gradient(145deg, #2a2a4a, #1a1a3a);
    border: 2px solid #ffcc00;
    border-radius: 12px;
    color: #ffcc00;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.1s;
  }
  .btn-dir:active {
    transform: scale(0.9);
    background: #ffcc00;
    color: #000;
  }
  .btn-up    { grid-column: 2; grid-row: 1; }
  .btn-left  { grid-column: 1; grid-row: 2; }
  .btn-down  { grid-column: 2; grid-row: 2; }
  .btn-right { grid-column: 3; grid-row: 2; }

  .footer-info { font-size: 8px; color: #666; text-align: center; }
  .footer-info a { color: #ffcc00; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>👻 PACMAN</h2>
    <p>كل النقاط واهرب من الأشباح!</p>
  </div>

  <div class="hud">
    <div class="hud-item">النقاط<div class="hud-value" id="scoreDisplay">0</div></div>
    <div class="hud-item">المستوى<div class="hud-value" id="levelDisplay">1</div></div>
    <div class="hud-item">الأرواح<div class="hud-value" id="livesDisplay">❤️❤️❤️</div></div>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="400" height="440"></canvas>
  </div>

  <div class="controls">
    <button class="btn-dir btn-up"    id="upBtn">⬆️</button>
    <button class="btn-dir btn-left"  id="leftBtn">⬅️</button>
    <button class="btn-dir btn-down"  id="downBtn">⬇️</button>
    <button class="btn-dir btn-right" id="rightBtn">➡️</button>
  </div>

  <div class="footer-info">
    👑 ISAGI TENGEN BOT • <a href="${BRAND.channelLink}" target="_blank">القناة</a>
  </div>
</div>

<script>
(function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const levelDisplay = document.getElementById('levelDisplay');
  const livesDisplay = document.getElementById('livesDisplay');

  /* ═══════════════════════════════════════════
     📐 المتاهة الكلاسيكية (15×16)
     ═══════════════════════════════════════════ */
  const MAP = [
    "###############",
    "#.............#",
    "#.##.#####.##.#",
    "#o##.#####.##o#",
    "#.............#",
    "#.##.##.##.##.#",
    "#....##.##....#",
    "####.##.##.####",
    "   #.......#   ",
    "####.##.##.####",
    "#....##.##....#",
    "#.##.##.##.##.#",
    "#o...........o#",
    "#.##.#####.##.#",
    "#.............#",
    "###############"
  ];

  const COLS = 15;
  const ROWS = 16;
  const TILE = 25;
  const CANVAS_W = COLS * TILE;
  const CANVAS_H = ROWS * TILE;

  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  /* ═══════════════════════════════════════════
     🔊 الصوت
     ═══════════════════════════════════════════ */
  let audioCtx = null;
  let soundReady = false;

  function initAudio() {
    if (!soundReady) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        soundReady = true;
      } catch(e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playTone(freq, dur, type, vol) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol || 0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + dur);
    } catch(e) {}
  }

  function soundEat() { playTone(600, 0.06, 'square', 0.08); }
  function soundEnergizer() { playTone(400, 0.15, 'sine', 0.15); }
  function soundEatGhost() {
    playTone(800, 0.1, 'sine', 0.15);
    setTimeout(() => playTone(1000, 0.1, 'sine', 0.15), 50);
  }
  function soundDeath() {
    playTone(300, 0.3, 'sawtooth', 0.15);
    setTimeout(() => playTone(200, 0.3, 'sawtooth', 0.15), 150);
    setTimeout(() => playTone(100, 0.5, 'sawtooth', 0.15), 300);
  }

  /* ═══════════════════════════════════════════
     🎯 حالة اللعبة
     ═══════════════════════════════════════════ */
  let score = 0;
  let level = 1;
  let lives = 3;
  let gameActive = true;
  let gameOver = false;
  let dots = [];
  let energizers = [];
  let frames = 0;
  let frightTimer = 0;
  let ghostEatCombo = 0;
  let animationId = null;
  let deathPauseTimer = 0;

  /* ⏱️ توقيتات الحركة */
  let pacmanMoveTimer = 0;
  let ghostMoveTimer = 0;

  const PACMAN_SPEED = 18;   /* 🐢 كل 18 إطار (بطيء) */
  const GHOST_SPEED  = 26;   /* 👻 كل 26 إطار (أبطأ) */
  const FRIGHT_DURATION = 70; /* ⏱️ مدة الرعب */

  /* 🟡 Pacman */
  const pacman = {
    x: 7, y: 12,
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    mouth: 0
  };

  /* 👻 4 أشباح */
  const ghosts = [
    { name: 'blinky', x: 7, y: 1, dir: { x: -1, y: 0 }, color: '#ff0000', mode: 'chase', home: {x:7,y:1} },
    { name: 'pinky',  x: 7, y: 5, dir: { x: 1,  y: 0 }, color: '#ffb8ff', mode: 'ambush', home: {x:7,y:5} },
    { name: 'inky',   x: 5, y: 5, dir: { x: 0,  y: -1 }, color: '#00ffff', mode: 'patrol', home: {x:5,y:5} },
    { name: 'clyde',  x: 9, y: 5, dir: { x: 0,  y: 1 },  color: '#ffb852', mode: 'random', home: {x:9,y:5} }
  ];

  /* ═══════════════════════════════════════════
     🗺️ فحص الجدار
     ═══════════════════════════════════════════ */
  function isWall(x, y) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return true;
    const row = MAP[y];
    if (!row) return true;
    return row[x] === '#';
  }

  /* ═══════════════════════════════════════════
     ⚪ تهيئة النقاط
     ═══════════════════════════════════════════ */
  function initDots() {
    dots = [];
    energizers = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const ch = MAP[y][x];
        if (ch === '.') dots.push({ x, y, eaten: false });
        else if (ch === 'o') energizers.push({ x, y, eaten: false });
      }
    }
  }

  /* ═══════════════════════════════════════════
     🎯 إعادة تعيين المواقع
     ═══════════════════════════════════════════ */
  function resetPositions() {
    pacman.x = 7; pacman.y = 12;
    pacman.dir = { x: 1, y: 0 };
    pacman.nextDir = { x: 1, y: 0 };
    pacman.mouth = 0;

    ghosts[0].x = 7;  ghosts[0].y = 1;
    ghosts[1].x = 7;  ghosts[1].y = 5;
    ghosts[2].x = 5;  ghosts[2].y = 5;
    ghosts[3].x = 9;  ghosts[3].y = 5;

    ghosts.forEach(g => {
      g.dir = { x: -1, y: 0 };
      g.mode = g.name === 'pinky' ? 'ambush' : g.name === 'inky' ? 'patrol' : g.name === 'clyde' ? 'random' : 'chase';
    });

    frightTimer = 0;
    ghostEatCombo = 0;
    pacmanMoveTimer = 0;
    ghostMoveTimer = 0;
  }

  /* ═══════════════════════════════════════════
     🎮 التحكم
     ═══════════════════════════════════════════ */
  function setDir(dx, dy) {
    if (!gameActive || gameOver) return;
    initAudio();
    pacman.nextDir = { x: dx, y: dy };
  }

  /* ═══════════════════════════════════════════
     🟡 حركة Pacman
     ═══════════════════════════════════════════ */
  function movePacman() {
    /* محاولة تطبيق الاتجاه التالي */
    const nx = pacman.x + pacman.nextDir.x;
    const ny = pacman.y + pacman.nextDir.y;
    if (!isWall(nx, ny)) {
      pacman.dir = { ...pacman.nextDir };
    }

    /* التحرك */
    const tx = pacman.x + pacman.dir.x;
    const ty = pacman.y + pacman.dir.y;

    if (!isWall(tx, ty)) {
      pacman.x = tx;
      pacman.y = ty;
      pacman.mouth = (pacman.mouth + 1) % 4;

      /* أكل النقاط */
      for (let d of dots) {
        if (!d.eaten && d.x === pacman.x && d.y === pacman.y) {
          d.eaten = true;
          score += 10;
          scoreDisplay.textContent = score;
          soundEat();
          break;
        }
      }

      /* أكل الكرات الكبيرة */
      for (let e of energizers) {
        if (!e.eaten && e.x === pacman.x && e.y === pacman.y) {
          e.eaten = true;
          score += 50;
          scoreDisplay.textContent = score;
          soundEnergizer();
          frightTimer = FRIGHT_DURATION;
          ghostEatCombo = 0;
          ghosts.forEach(g => g.mode = 'frightened');
          break;
        }
      }

      /* المستوى الجديد */
      const remaining = dots.filter(d => !d.eaten).length + energizers.filter(e => !e.eaten).length;
      if (remaining === 0) {
        level++;
        levelDisplay.textContent = level;
        initDots();
        resetPositions();
      }
    }
  }

  /* ═══════════════════════════════════════════
     👻 ذكاء الأشباح
     ═══════════════════════════════════════════ */
  function getGhostTarget(ghost) {
    if (ghost.mode === 'frightened') {
      return { x: COLS - pacman.x, y: ROWS - pacman.y };
    }

    switch (ghost.name) {
      case 'blinky': return { x: pacman.x, y: pacman.y };
      case 'pinky': return {
        x: pacman.x + pacman.dir.x * 3,
        y: pacman.y + pacman.dir.y * 3
      };
      case 'inky': return {
        x: Math.max(0, Math.min(COLS - 1, pacman.x + (Math.random() > 0.5 ? 4 : -4))),
        y: Math.max(0, Math.min(ROWS - 1, pacman.y + (Math.random() > 0.5 ? 3 : -3)))
      };
      case 'clyde': return {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      };
    }
    return { x: pacman.x, y: pacman.y };
  }

  function moveGhosts() {
    ghosts.forEach(ghost => {
      if (ghost.mode === 'frightened') {
        const dirs = [
          { x: 1, y: 0 }, { x: -1, y: 0 },
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ].filter(d => !isWall(ghost.x + d.x, ghost.y + d.y));

        if (dirs.length) {
          ghost.dir = dirs[Math.floor(Math.random() * dirs.length)];
        }
      } else {
        const target = getGhostTarget(ghost);
        const dirs = [
          { x: 1, y: 0 }, { x: -1, y: 0 },
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ].filter(d =>
          !isWall(ghost.x + d.x, ghost.y + d.y) &&
          !(d.x === -ghost.dir.x && d.y === -ghost.dir.y)
        );

        if (dirs.length) {
          let best = dirs[0];
          let bestDist = Infinity;
          dirs.forEach(d => {
            const nx = ghost.x + d.x;
            const ny = ghost.y + d.y;
            const dist = Math.abs(nx - target.x) + Math.abs(ny - target.y);
            if (dist < bestDist) {
              bestDist = dist;
              best = d;
            }
          });
          ghost.dir = best;
        }
      }

      const tx = ghost.x + ghost.dir.x;
      const ty = ghost.y + ghost.dir.y;
      if (!isWall(tx, ty)) {
        ghost.x = tx;
        ghost.y = ty;
      } else {
        ghost.dir = { x: -ghost.dir.x, y: -ghost.dir.y };
      }
    });
  }

  /* ═══════════════════════════════════════════
     💥 فحص الاصطدام
     ═══════════════════════════════════════════ */
  function checkCollision() {
    if (deathPauseTimer > 0) return;

    ghosts.forEach(ghost => {
      if (ghost.x === pacman.x && ghost.y === pacman.y) {
        if (ghost.mode === 'frightened') {
          ghostEatCombo++;
          const points = 200 * Math.pow(2, ghostEatCombo - 1);
          score += points;
          scoreDisplay.textContent = score;
          soundEatGhost();

          ghost.x = ghost.home.x;
          ghost.y = ghost.home.y;
          ghost.mode = 'chase';
        } else {
          /* موت Pacman */
          lives--;
          updateLivesDisplay();
          soundDeath();
          deathPauseTimer = 30;

          if (lives <= 0) {
            gameOver = true;
            gameActive = false;
          } else {
            setTimeout(() => {
              resetPositions();
              deathPauseTimer = 0;
            }, 500);
          }
        }
      }
    });
  }

  function updateLivesDisplay() {
    livesDisplay.textContent = '❤️'.repeat(Math.max(0, lives)) || '💔';
  }

  /* ═══════════════════════════════════════════
     🎨 الرسم
     ═══════════════════════════════════════════ */
  function drawMap() {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const ch = MAP[y][x];
        const px = x * TILE;
        const py = y * TILE;

        if (ch === '#') {
          ctx.fillStyle = '#1a1a5a';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.strokeStyle = '#4a4aff';
          ctx.lineWidth = 2;
          ctx.strokeRect(px + 1, py + 1, TILE - 2, TILE - 2);
        } else {
          ctx.fillStyle = '#000';
          ctx.fillRect(px, py, TILE, TILE);
        }
      }
    }
  }

  function drawDots() {
    ctx.fillStyle = '#ffb8a0';
    dots.forEach(d => {
      if (!d.eaten) {
        ctx.beginPath();
        ctx.arc(d.x * TILE + TILE/2, d.y * TILE + TILE/2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.fillStyle = '#ffff00';
    ctx.shadowColor = '#ffff00';
    ctx.shadowBlur = 8;
    energizers.forEach(e => {
      if (!e.eaten) {
        const pulse = Math.sin(frames / 6) * 1.5 + 4;
        ctx.beginPath();
        ctx.arc(e.x * TILE + TILE/2, e.y * TILE + TILE/2, pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.shadowBlur = 0;
  }

  function drawPacman() {
    const px = pacman.x * TILE + TILE/2;
    const py = pacman.y * TILE + TILE/2;
    const r = TILE/2 - 1;

    let startAngle = 0;
    let endAngle = Math.PI * 2;
    const mouthWidth = 0.2 + (pacman.mouth % 2) * 0.2;

    if (pacman.dir.x === 1) {
      startAngle = mouthWidth * Math.PI; endAngle = (2 - mouthWidth) * Math.PI;
    } else if (pacman.dir.x === -1) {
      startAngle = (1 + mouthWidth) * Math.PI; endAngle = (1 - mouthWidth) * Math.PI;
    } else if (pacman.dir.y === 1) {
      startAngle = (0.5 + mouthWidth) * Math.PI; endAngle = (1.5 - mouthWidth) * Math.PI;
    } else if (pacman.dir.y === -1) {
      startAngle = (1.5 + mouthWidth) * Math.PI; endAngle = (2.5 - mouthWidth) * Math.PI;
    }

    ctx.fillStyle = '#ffff00';
    ctx.shadowColor = '#ffff00';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, r, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#000';
    const eyeX = px + pacman.dir.x * 3;
    const eyeY = py + pacman.dir.y * 3;
    ctx.beginPath();
    ctx.arc(eyeX, eyeY - 3, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawGhosts() {
    ghosts.forEach(ghost => {
      const px = ghost.x * TILE + TILE/2;
      const py = ghost.y * TILE + TILE/2;
      const r = TILE/2 - 1;

      let color = ghost.color;
      if (ghost.mode === 'frightened') {
        if (frightTimer < 15 && Math.floor(frightTimer / 3) % 2 === 0) {
          color = '#ffffff';
        } else {
          color = '#2121de';
        }
      }

      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py - 2, r, Math.PI, 0);
      ctx.lineTo(px + r, py + r - 2);
      ctx.lineTo(px + r * 0.66, py + r - 5);
      ctx.lineTo(px + r * 0.33, py + r - 2);
      ctx.lineTo(px, py + r - 5);
      ctx.lineTo(px - r * 0.33, py + r - 2);
      ctx.lineTo(px - r * 0.66, py + r - 5);
      ctx.lineTo(px - r, py + r - 2);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      if (ghost.mode === 'frightened') {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(px - 3, py - 3, 2, 0, Math.PI * 2);
        ctx.arc(px + 3, py - 3, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(px - 3, py - 3, 3, 0, Math.PI * 2);
        ctx.arc(px + 3, py - 3, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        const ex = ghost.dir.x * 1.5;
        const ey = ghost.dir.y * 1.5;
        ctx.beginPath();
        ctx.arc(px - 3 + ex, py - 3 + ey, 1.5, 0, Math.PI * 2);
        ctx.arc(px + 3 + ex, py - 3 + ey, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  /* ═══════════════════════════════════════════
     🔁 دورة اللعبة (محسّنة)
     ═══════════════════════════════════════════ */
  function loop() {
    frames++;

    if (!gameActive || gameOver) {
      drawMap();
      drawDots();
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ff0000';
      ctx.font = 'bold 32px Arial';
      ctx.fillText('💀 GAME OVER', CANVAS_W/2, CANVAS_H/2 - 30);
      ctx.fillStyle = '#ffcc00';
      ctx.font = 'bold 22px Arial';
      ctx.fillText('النقاط: ' + score, CANVAS_W/2, CANVAS_H/2 + 10);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText('اضغط أي زر للعب', CANVAS_W/2, CANVAS_H/2 + 50);
      return;
    }

    /* 🟡 Pacman يتحرك كل PACMAN_SPEED إطار */
    pacmanMoveTimer++;
    if (pacmanMoveTimer >= PACMAN_SPEED) {
      pacmanMoveTimer = 0;
      movePacman();
      checkCollision();

      /* تقليل مؤقت الرعب */
      if (frightTimer > 0) {
        frightTimer--;
        if (frightTimer === 0) {
          ghosts.forEach(g => {
            if (g.mode === 'frightened') {
              g.mode = g.name === 'pinky' ? 'ambush' : g.name === 'inky' ? 'patrol' : g.name === 'clyde' ? 'random' : 'chase';
            }
          });
          ghostEatCombo = 0;
        }
      }
    }

    /* 👻 الأشباح تتحرك كل GHOST_SPEED إطار */
    ghostMoveTimer++;
    if (ghostMoveTimer >= GHOST_SPEED) {
      ghostMoveTimer = 0;
      moveGhosts();
      checkCollision();
    }

    if (deathPauseTimer > 0) deathPauseTimer--;

    /* الرسم */
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    drawMap();
    drawDots();
    drawPacman();
    drawGhosts();

    animationId = requestAnimationFrame(loop);
  }

  /* ═══════════════════════════════════════════
     🎯 الأزرار
     ═══════════════════════════════════════════ */
  function bindDir(id, dx, dy) {
    const el = document.getElementById(id);
    el.addEventListener('touchstart', e => { e.preventDefault(); setDir(dx, dy); }, { passive: false });
    el.addEventListener('mousedown', e => { e.preventDefault(); setDir(dx, dy); });
  }

  bindDir('upBtn', 0, -1);
  bindDir('downBtn', 0, 1);
  bindDir('leftBtn', -1, 0);
  bindDir('rightBtn', 1, 0);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'w') { e.preventDefault(); setDir(0, -1); }
    if (e.key === 'ArrowDown' || e.key === 's') { e.preventDefault(); setDir(0, 1); }
    if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); setDir(-1, 0); }
    if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); setDir(1, 0); }
  });

  let touchStartX = 0, touchStartY = 0;
  canvas.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  canvas.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20) {
      setDir(dx > 0 ? 1 : -1, 0);
    } else if (Math.abs(dy) > 20) {
      setDir(0, dy > 0 ? 1 : -1);
    }
  }, { passive: true });

  /* 🚀 البداية */
  initDots();
  resetPositions();
  updateLivesDisplay();
  loop();

  document.addEventListener('touchstart', initAudio, { once: true });
  document.addEventListener('mousedown', initAudio, { once: true });
})();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'pacman-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'pacman-isagi',
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
              messageText: '👻 Pacman الكلاسيكية - جاهزة!'
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

handler.command = ['باكمان', 'pacman', 'باك_مان'];
handler.category = 'games';
handler.help = ['باكمان', 'pacman'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;