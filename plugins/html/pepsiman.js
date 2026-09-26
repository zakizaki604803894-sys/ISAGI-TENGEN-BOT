/* ═══════════════════════════════════════════════════════════
   🥤 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — Pepsi Man 3D Runner (محسّن)
   📁 /home/container/plugins/games/pepsiman.js
   ✅ طريق واسع | خطوط واضحة | ألوان زاهية | بطيء
   ✅ مراحل متتالية | مناسب للهاتف
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
<title>🥤 Pepsi Man 3D</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body {
    background: linear-gradient(180deg, #87ceeb 0%, #4a90d9 50%, #2a5a9a 100%);
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
    max-width: 360px;
    background: linear-gradient(145deg, #1a4a8a, #0a2a5a);
    border-radius: 16px;
    padding: 8px;
    border: 3px solid #ffcc00;
    box-shadow: 0 0 30px rgba(255, 204, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .header h2 {
    font-size: 20px;
    color: #ffcc00;
    text-align: center;
    margin: 0;
    text-shadow: 2px 2px 4px #000, 0 0 15px #ffcc00;
    font-weight: 900;
  }
  .header p { font-size: 10px; color: #aaddff; text-align: center; margin: 2px 0 0; }

  .hud {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .hud-item {
    flex: 1;
    background: linear-gradient(145deg, #0050ff, #0030a0);
    border: 2px solid #ffcc00;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    color: #ffcc00;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
  .hud-value { font-size: 16px; margin-top: 2px; color: #fff; font-weight: 900; }

  .canvas-container {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    background: #87ceeb;
    border: 3px solid #ffcc00;
    position: relative;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
  }
  canvas { display: block; width: 100%; height: auto; }

  /* 🎮 أزرار كبيرة وواضحة */
  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 5px;
    direction: ltr;
  }
  .btn-dir {
    background: linear-gradient(145deg, #0050ff, #0030a0);
    border: 3px solid #ffcc00;
    border-radius: 14px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    padding: 12px;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.1s;
    box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  }
  .btn-dir:active {
    transform: scale(0.92);
    background: #ffcc00;
    color: #0030a0;
  }
  .btn-up    { grid-column: 2; grid-row: 1; }
  .btn-left  { grid-column: 1; grid-row: 2; }
  .btn-down  { grid-column: 2; grid-row: 2; }
  .btn-right { grid-column: 3; grid-row: 2; }

  .footer-info { font-size: 9px; color: #aaddff; text-align: center; }
  .footer-info a { color: #ffcc00; text-decoration: none; font-weight: bold; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🥤 PEPSI MAN 3D</h2>
    <p>اجمع البيبسي وتجنب العقبات!</p>
  </div>

  <div class="hud">
    <div class="hud-item">النقاط<div class="hud-value" id="scoreDisplay">0</div></div>
    <div class="hud-item">المرحلة<div class="hud-value" id="levelDisplay">1</div></div>
    <div class="hud-item">🥤<div class="hud-value" id="cansDisplay">0</div></div>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="340" height="420"></canvas>
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
  const cansDisplay = document.getElementById('cansDisplay');

  const W = canvas.width;
  const H = canvas.height;

  /* ═══════════════════════════════════════
     🎨 الأبعاد — واسعة وواضحة
     ═══════════════════════════════════════ */
  const HORIZON_Y = 130;           /* خط الأفق */
  const GROUND_Y = H - 90;          /* نهاية الطريق */
  const ROAD_TOP_WIDTH = 180;       /* عرض الطريق عند الأفق */
  const ROAD_BOTTOM_WIDTH = 340;    /* عرض الطريق عند اللاعب */
  const LANE_COUNT = 3;

  /* ═══════════════════════════════════════
     🔊 الصوت
     ═══════════════════════════════════════ */
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
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
  function soundCoin() {
    playTone(880, 0.06, 'sine', 0.15);
    setTimeout(() => playTone(1200, 0.08, 'sine', 0.12), 50);
  }
  function soundJump() { playTone(600, 0.12, 'sine', 0.15); }
  function soundCrash() {
    playTone(150, 0.3, 'sawtooth', 0.25);
    setTimeout(() => playTone(100, 0.4, 'sawtooth', 0.2), 150);
  }
  function soundLevel() {
    playTone(700, 0.1, 'sine', 0.15);
    setTimeout(() => playTone(900, 0.1, 'sine', 0.15), 80);
    setTimeout(() => playTone(1200, 0.15, 'sine', 0.15), 160);
  }

  /* ═══════════════════════════════════════
     🎯 حالة اللعبة
     ═══════════════════════════════════════ */
  let score = 0;
  let level = 1;
  let cans = 0;
  let gameOver = false;
  let gameStarted = false;
  let gameActive = false;
  let isJumping = false;
  let isSliding = false;
  let jumpTime = 0;
  let slideTime = 0;
  let speed = 2.5;                 /* 🐢 أبطأ */
  let currentLane = 1;             /* 0، 1، 2 */
  let targetLane = 1;
  let objects = [];
  let particles = [];
  let frame = 0;
  let spawnTimer = 0;
  let levelCansNeeded = 8;
  let flashAlpha = 0;
  let animationId = null;

  /* ═══════════════════════════════════════
     🎯 توقع 3D
     z: 1 = بعيد (عند الأفق) | 0 = قريب (عند اللاعب)
     ═══════════════════════════════════════ */
  function project3D(lane, z) {
    /* z = 0 → قريب | z = 1 → بعيد */
    const depth = 1 - z; /* 1 → قريب | 0 → بعيد */

    /* العرض (x) */
    const centerX = W / 2;
    const roadWidth = ROAD_TOP_WIDTH + (ROAD_BOTTOM_WIDTH - ROAD_TOP_WIDTH) * depth;
    const laneWidth = roadWidth / LANE_COUNT;
    const laneCenter = (lane - 1) * laneWidth;
    const x = centerX + laneCenter;

    /* الارتفاع (y) */
    const y = HORIZON_Y + (GROUND_Y - HORIZON_Y) * depth;

    return {
      x: x,
      y: y,
      depth: depth,
      scale: 0.3 + depth * 0.7,
      laneWidth: laneWidth
    };
  }

  /* ═══════════════════════════════════════
     🎨 رسم الخلفية (زاهية)
     ═══════════════════════════════════════ */
  function drawBackground() {
    /* سماء زرقاء فاتحة */
    const skyGrad = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
    skyGrad.addColorStop(0, '#4fc3f7');
    skyGrad.addColorStop(1, '#81d4fa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, HORIZON_Y);

    /* شمس */
    ctx.fillStyle = '#ffee00';
    ctx.shadowColor = '#ffee00';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(W - 60, 40, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    /* غيوم */
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    const cloudOffset = (frame * 0.3) % (W + 100);
    ctx.beginPath();
    ctx.arc(W - cloudOffset, 30, 18, 0, Math.PI * 2);
    ctx.arc(W - cloudOffset + 20, 25, 22, 0, Math.PI * 2);
    ctx.arc(W - cloudOffset + 45, 30, 18, 0, Math.PI * 2);
    ctx.fill();

    const cloudOffset2 = (frame * 0.15 + 200) % (W + 100);
    ctx.beginPath();
    ctx.arc(W - cloudOffset2, 60, 14, 0, Math.PI * 2);
    ctx.arc(W - cloudOffset2 + 16, 55, 18, 0, Math.PI * 2);
    ctx.arc(W - cloudOffset2 + 35, 60, 14, 0, Math.PI * 2);
    ctx.fill();

    /* عشب جانبي */
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(0, HORIZON_Y - 10, W, 10);
    ctx.fillStyle = '#388e3c';
    ctx.fillRect(0, HORIZON_Y, W, 5);
  }

  /* ═══════════════════════════════════════
     🛣️ رسم الطريق (واسع + خطوط واضحة)
     ═══════════════════════════════════════ */
  function drawRoad() {
    const centerX = W / 2;
    const topLeft = centerX - ROAD_TOP_WIDTH / 2;
    const topRight = centerX + ROAD_TOP_WIDTH / 2;
    const bottomLeft = centerX - ROAD_BOTTOM_WIDTH / 2;
    const bottomRight = centerX + ROAD_BOTTOM_WIDTH / 2;

    /* ✅ أسفلت رمادي فاتح */
    ctx.fillStyle = '#555555';
    ctx.beginPath();
    ctx.moveTo(topLeft, HORIZON_Y);
    ctx.lineTo(topRight, HORIZON_Y);
    ctx.lineTo(bottomRight, GROUND_Y);
    ctx.lineTo(bottomLeft, GROUND_Y);
    ctx.closePath();
    ctx.fill();

    /* ✅ حدود الطريق — بيضاء سميكة */
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(topLeft, HORIZON_Y);
    ctx.lineTo(bottomLeft, GROUND_Y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(topRight, HORIZON_Y);
    ctx.lineTo(bottomRight, GROUND_Y);
    ctx.stroke();

    /* ✅ خطوط فاصلة بين المسارات — صفراء متحركة */
    for (let i = 0; i < 20; i++) {
      /* مواضع متحركة */
      const zBase = ((frame * speed * 0.005 + i * 0.08) % 1.2);
      const zStart = zBase;
      const zEnd = zBase + 0.06;

      if (zStart > 1 || zEnd > 1) continue;

      /* خطان فاصلان (بين 3 مسارات) */
      for (let lane = 1; lane <= 2; lane++) {
        const p1 = project3D(lane - 0.5, zStart);
        const p2 = project3D(lane - 0.5, zEnd);

        /* العمق */
        const lineWidth = Math.max(1, 5 * p1.depth);

        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  /* ═══════════════════════════════════════
     🏃 رسم بيبسي مان
     ═══════════════════════════════════════ */
  function drawPepsiMan() {
    const z = 0.15; /* قريب من الأمام */
    const p = project3D(currentLane, z);

    /* القفز/الانحناء */
    let yOffset = 0;
    let squash = 1;
    if (isJumping) {
      const jp = jumpTime / 20;
      yOffset = -Math.sin(jp * Math.PI) * 70;
      squash = 1;
    } else if (isSliding) {
      yOffset = -10;
      squash = 0.7;
    }

    const baseSize = 55;
    const size = baseSize * p.scale;

    ctx.save();
    ctx.translate(p.x, p.y + yOffset);

    /* ═══ الساقان ═══ */
    const legSwing = Math.sin(frame * 0.35) * 4;

    ctx.fillStyle = '#0030a0';
    /* الساق اليسرى */
    ctx.save();
    ctx.translate(-7 * p.scale, 0);
    ctx.rotate(legSwing * 0.05);
    ctx.fillRect(-4, -8 * squash, 8, 22);
    ctx.restore();

    /* الساق اليمنى */
    ctx.save();
    ctx.translate(7 * p.scale, 0);
    ctx.rotate(-legSwing * 0.05);
    ctx.fillRect(-4, -8 * squash, 8, 22);
    ctx.restore();

    /* ═══ الجسم (قميص أزرق) ═══ */
    const bodyH = 35 * squash;
    ctx.fillStyle = '#0050ff';
    ctx.shadowColor = '#00aaff';
    ctx.shadowBlur = 10;
    ctx.fillRect(-20 * p.scale, -bodyH - 10, 40 * p.scale, bodyH);
    ctx.shadowBlur = 0;

    /* ═══ شعار PEPSI على الصدر ═══ */
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold ' + Math.floor(10 * p.scale) + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PEPSI', 0, -bodyH + 8);

    /* الدائرة (أحمر + أزرق) */
    const cR = 7 * p.scale;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -bodyH + 20, cR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(0, -bodyH + 20, cR * 0.8, Math.PI, 0);
    ctx.fill();

    ctx.fillStyle = '#0030a0';
    ctx.beginPath();
    ctx.arc(0, -bodyH + 20, cR * 0.8, 0, Math.PI);
    ctx.fill();

    /* ═══ الذراعان ═══ */
    const armSwing = Math.sin(frame * 0.35) * 6;

    /* اليد اليسرى */
    ctx.save();
    ctx.translate(-20 * p.scale, -bodyH - 2);
    ctx.rotate(armSwing * 0.06);
    ctx.fillStyle = '#ffddaa';
    ctx.fillRect(-3, 0, 6, 20);
    ctx.restore();

    /* اليد اليمنى */
    ctx.save();
    ctx.translate(20 * p.scale, -bodyH - 2);
    ctx.rotate(-armSwing * 0.06);
    ctx.fillStyle = '#ffddaa';
    ctx.fillRect(-3, 0, 6, 20);
    ctx.restore();

    /* ═══ الرأس ═══ */
    const headR = 14 * p.scale;
    const headY = -bodyH - 15;

    /* الوجه */
    ctx.fillStyle = '#ffddaa';
    ctx.beginPath();
    ctx.arc(0, headY, headR, 0, Math.PI * 2);
    ctx.fill();

    /* العيون */
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-5 * p.scale, headY - 2, 4 * p.scale, 0, Math.PI * 2);
    ctx.arc(5 * p.scale, headY - 2, 4 * p.scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-5 * p.scale, headY - 2, 2 * p.scale, 0, Math.PI * 2);
    ctx.arc(5 * p.scale, headY - 2, 2 * p.scale, 0, Math.PI * 2);
    ctx.fill();

    /* الفم */
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, headY + 4, 5 * p.scale, 0.2, Math.PI - 0.2);
    ctx.stroke();

    /* الشعر الأزرق */
    ctx.fillStyle = '#001a60';
    ctx.beginPath();
    ctx.arc(0, headY - 8, headR, Math.PI, 0);
    ctx.fill();

    ctx.restore();
  }

  /* ═══════════════════════════════════════
     🎯 رسم العقبات
     ═══════════════════════════════════════ */
  function drawObjects() {
    /* ترتيب — الأبعد أولاً */
    const sorted = [...objects].sort((a, b) => b.z - a.z);

    sorted.forEach(obj => {
      const p = project3D(obj.lane, obj.z);

      if (p.depth <= 0 || p.depth > 1.1) return;

      const scale = p.scale;

      if (obj.type === 'can') {
        drawPepsiCan(p.x, p.y - 20 * scale, scale);
      } else if (obj.type === 'car') {
        drawCar(p.x, p.y, scale);
      } else if (obj.type === 'hole') {
        drawHole(p.x, p.y, scale);
      } else if (obj.type === 'barrier') {
        drawBarrier(p.x, p.y, scale);
      }
    });
  }

  function drawPepsiCan(x, y, s) {
    const w = 20 * s;
    const h = 30 * s;

    /* توهج */
    ctx.shadowColor = '#00aaff';
    ctx.shadowBlur = 15;

    /* جسم العلبة */
    const grad = ctx.createLinearGradient(x - w/2, 0, x + w/2, 0);
    grad.addColorStop(0, '#0030a0');
    grad.addColorStop(0.5, '#0050ff');
    grad.addColorStop(1, '#001a60');
    ctx.fillStyle = grad;
    ctx.fillRect(x - w/2, y, w, h);

    ctx.shadowBlur = 0;

    /* الشعار */
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y + h * 0.55, w * 0.35, 0, Math.PI * 2);
    ctx.fill();

    /* أحمر */
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(x, y + h * 0.55, w * 0.3, Math.PI, 0);
    ctx.fill();

    /* أزرق */
    ctx.fillStyle = '#0030a0';
    ctx.beginPath();
    ctx.arc(x, y + h * 0.55, w * 0.3, 0, Math.PI);
    ctx.fill();

    /* أعلى العلبة */
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(x - w/2, y - 3 * s, w, 4 * s);
  }

  function drawCar(x, y, s) {
    const w = 55 * s;
    const h = 35 * s;

    /* الجسم */
    ctx.fillStyle = '#ff2020';
    ctx.fillRect(x - w/2, y - h, w, h);

    /* السقف */
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(x - w/3, y - h - 15 * s, w * 2/3, 15 * s);

    /* النوافذ */
    ctx.fillStyle = '#4fc3f7';
    ctx.fillRect(x - w/3 + 4, y - h - 12 * s, w * 2/3 - 8, 12 * s);

    /* الأضواء */
    ctx.fillStyle = '#ffee00';
    ctx.shadowColor = '#ffee00';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(x - w/2 + 6, y - 6 * s, 4 * s, 0, Math.PI * 2);
    ctx.arc(x + w/2 - 6, y - 6 * s, 4 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function drawHole(x, y, s) {
    const w = 65 * s;
    const h = 20 * s;

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(x, y, w/2, h/2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawBarrier(x, y, s) {
    const w = 60 * s;
    const h = 25 * s;

    /* شريط أحمر وأبيض */
    const stripes = 6;
    const stripeW = w / stripes;

    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#ff0000' : '#ffffff';
      ctx.fillRect(x - w/2 + i * stripeW, y - h, stripeW, h);
    }

    /* حدود */
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - w/2, y - h, w, h);
  }

  function drawParticles() {
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function createBurst(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        life: 30,
        size: 3 + Math.random() * 4,
        color: color
      });
    }
  }

  /* ═══════════════════════════════════════
     🎯 التحكم
     ═══════════════════════════════════════ */
  function moveLeft() {
    if (!gameActive || gameOver) return;
    if (currentLane > 0) {
      currentLane--;
      playTone(500, 0.05, 'sine', 0.1);
    }
  }
  function moveRight() {
    if (!gameActive || gameOver) return;
    if (currentLane < 2) {
      currentLane++;
      playTone(500, 0.05, 'sine', 0.1);
    }
  }
  function jump() {
    if (!gameActive || gameOver) return;
    if (isJumping) return;
    isJumping = true;
    jumpTime = 0;
    soundJump();
  }
  function slide() {
    if (!gameActive || gameOver) return;
    if (isSliding) return;
    isSliding = true;
    slideTime = 0;
    playTone(300, 0.1, 'sine', 0.1);
  }

  /* ═══════════════════════════════════════
     🎯 إنشاء عقبة
     ═══════════════════════════════════════ */
  function spawnObject() {
    const lane = Math.floor(Math.random() * 3);
    const rand = Math.random();

    /* لا تكرر نفس المسار لعقبتين متتاليتين */
    if (objects.length > 0) {
      const last = objects[objects.length - 1];
      if (last.lane === lane && Math.abs(last.z - 1) < 0.3) {
        return;
      }
    }

    if (rand < 0.5) {
      /* 🥤 علبة */
      objects.push({ type: 'can', lane, z: 1.05 });
    } else if (rand < 0.75) {
      /* 🚗 سيارة */
      objects.push({ type: 'car', lane, z: 1.05 });
    } else if (rand < 0.88) {
      /* 🕳️ حفرة */
      objects.push({ type: 'hole', lane, z: 1.05 });
    } else {
      /* 🚧 حاجز */
      objects.push({ type: 'barrier', lane, z: 1.05 });
    }
  }

  /* ═══════════════════════════════════════
     🔄 التحديث
     ═══════════════════════════════════════ */
  function update() {
    if (!gameActive || gameOver) return;

    frame++;

    /* القفز */
    if (isJumping) {
      jumpTime++;
      if (jumpTime >= 20) {
        isJumping = false;
        jumpTime = 0;
      }
    }

    /* الانحناء */
    if (isSliding) {
      slideTime++;
      if (slideTime >= 15) {
        isSliding = false;
        slideTime = 0;
      }
    }

    /* تحديث العقبات */
    objects.forEach(obj => {
      obj.z -= speed * 0.006;
    });

    /* فحص التصادم */
    objects.forEach(obj => {
      if (obj.z <= 0.18 && obj.z >= 0.05 && !obj.handled) {
        obj.handled = true;

        /* نفس المسار؟ */
        if (obj.lane === currentLane) {
          if (obj.type === 'can') {
            /* 🥤 نجمع العلبة */
            score += 10;
            cans++;
            scoreDisplay.textContent = score;
            cansDisplay.textContent = cans;
            soundCoin();

            const p = project3D(obj.lane, 0.15);
            createBurst(p.x, p.y - 30, '#00aaff', 12);
            createBurst(p.x, p.y - 30, '#ffcc00', 6);

            /* المرحلة */
            if (cans >= levelCansNeeded) {
              level++;
              levelDisplay.textContent = level;
              levelCansNeeded += 5;
              speed = Math.min(6, speed + 0.3);
              soundLevel();
              flashAlpha = 0.6;
            }
          } else if (obj.type === 'car') {
            if (!isJumping) crash();
          } else if (obj.type === 'hole') {
            if (!isJumping) crash();
          } else if (obj.type === 'barrier') {
            if (!isSliding) crash();
          }
        }
      }
    });

    /* إزالة البعيد */
    objects = objects.filter(obj => obj.z > -0.1);

    /* إنشاء جديد */
    spawnTimer++;
    const spawnInterval = Math.max(50, 100 - level * 5);
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0;
      spawnObject();
    }

    /* الجزيئات */
    particles = particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.life--;
      return p.life > 0;
    });
  }

  function crash() {
    if (gameOver) return;
    gameOver = true;
    gameActive = false;
    soundCrash();

    const p = project3D(currentLane, 0.15);
    createBurst(p.x, p.y - 30, '#ff0000', 25);
    createBurst(p.x, p.y - 30, '#ffcc00', 15);
    createBurst(p.x, p.y - 30, '#0050ff', 10);
  }

  /* ═══════════════════════════════════════
     🎨 الرسم
     ═══════════════════════════════════════ */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    drawBackground();
    drawRoad();
    drawObjects();
    drawPepsiMan();
    drawParticles();

    /* وميض المرحلة */
    if (flashAlpha > 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + flashAlpha + ')';
      ctx.fillRect(0, 0, W, H);
      flashAlpha -= 0.04;
    }

    /* شاشة البداية */
    if (!gameStarted) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(0, 0, W, H);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffcc00';
      ctx.font = 'bold 28px Arial';
      ctx.shadowColor = '#ffcc00';
      ctx.shadowBlur = 15;
      ctx.fillText('🥤 PEPSI MAN', W/2, H/2 - 40);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('اجمع البيبسي!', W/2, H/2);

      ctx.fillStyle = '#aaddff';
      ctx.font = '14px Arial';
      ctx.fillText('اضغط ⬆️ للبدء', W/2, H/2 + 40);
    }

    /* شاشة Game Over */
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, W, H);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ff2020';
      ctx.font = 'bold 30px Arial';
      ctx.shadowColor = '#ff2020';
      ctx.shadowBlur = 20;
      ctx.fillText('💥 اصطدام!', W/2, H/2 - 60);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffcc00';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('النقاط: ' + score, W/2, H/2 - 15);

      ctx.fillStyle = '#4fc3f7';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('المرحلة: ' + level, W/2, H/2 + 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('🥤 ' + cans + ' علبة', W/2, H/2 + 55);

      ctx.fillStyle = '#aaddff';
      ctx.font = '14px Arial';
      ctx.fillText('اضغط ⬆️ لإعادة اللعب', W/2, H/2 + 95);
    }
  }

  /* ═══════════════════════════════════════
     🔁 دورة اللعبة
     ═══════════════════════════════════════ */
  function loop() {
    update();
    draw();
    animationId = requestAnimationFrame(loop);
  }

  /* ═══════════════════════════════════════
     🎯 بدء / إعادة
     ═══════════════════════════════════════ */
  function startGame() {
    score = 0;
    level = 1;
    cans = 0;
    gameOver = false;
    gameStarted = true;
    gameActive = true;
    isJumping = false;
    isSliding = false;
    jumpTime = 0;
    slideTime = 0;
    speed = 2.5;
    currentLane = 1;
    objects = [];
    particles = [];
    frame = 0;
    spawnTimer = 0;
    levelCansNeeded = 8;
    flashAlpha = 0;

    scoreDisplay.textContent = '0';
    levelDisplay.textContent = '1';
    cansDisplay.textContent = '0';
  }

  /* ═══════════════════════════════════════
     🎮 الأحداث
     ═══════════════════════════════════════ */
  function bindBtn(id, action) {
    const el = document.getElementById(id);
    el.addEventListener('touchstart', e => {
      e.preventDefault();
      initAudio();
      if (!gameStarted || gameOver) { startGame(); return; }
      action();
    }, { passive: false });
    el.addEventListener('mousedown', e => {
      e.preventDefault();
      initAudio();
      if (!gameStarted || gameOver) { startGame(); return; }
      action();
    });
  }

  bindBtn('upBtn', jump);
  bindBtn('downBtn', slide);
  bindBtn('leftBtn', moveLeft);
  bindBtn('rightBtn', moveRight);

  /* لوحة المفاتيح */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); moveLeft(); }
    if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); moveRight(); }
    if (e.key === 'ArrowUp' || e.key === 'w') {
      e.preventDefault();
      if (!gameStarted || gameOver) { startGame(); return; }
      jump();
    }
    if (e.key === 'ArrowDown' || e.key === 's') { e.preventDefault(); slide(); }
  });

  /* السحب */
  let tSX = 0, tSY = 0;
  canvas.addEventListener('touchstart', e => {
    tSX = e.touches[0].clientX;
    tSY = e.touches[0].clientY;
  }, { passive: true });

  canvas.addEventListener('touchend', e => {
    if (!gameStarted || gameOver) { startGame(); return; }

    const dx = e.changedTouches[0].clientX - tSX;
    const dy = e.changedTouches[0].clientY - tSY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) {
        if (dx > 0) moveRight();
        else moveLeft();
      }
    } else {
      if (Math.abs(dy) > 30) {
        if (dy > 0) slide();
        else jump();
      }
    }
  }, { passive: true });

  /* بدء */
  loop();
})();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'pepsiman-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'pepsiman-3d-isagi',
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
                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ=='
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
              messageText: '🥤 Pepsi Man 3D - جاهزة!'
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

handler.command = ['بيبسي', 'pepsi', 'pepsiman'];
handler.category = 'games';
handler.help = ['بيبسي', 'pepsi'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;