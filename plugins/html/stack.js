/* ═══════════════════════════════════════════════════════════
   🏗️ 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — Stack Tower (HTML تفاعلية)
   📁 /home/container/plugins/games/stack.js
   ✅ لا senderKeyDistributionMessage
   ✅ botResponseId فريد | trusted_sources صحيح
   ✅ تصميم مصغّر | أصوات احترافية
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
<title>🏗️ Stack Tower</title>
<style>
* { -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; box-sizing: border-box; }
body { margin: 0; background: #0a0c16; font-family: 'Segoe UI', Roboto, sans-serif; color: #eee; touch-action: manipulation; cursor: pointer; padding: 6px; }

.game-container { width: 100%; max-width: 400px; margin: auto; }
.card { background: rgba(15, 18, 30, 0.95); border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6); }

.header { padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; }
.title-sub { font-size: 9px; letter-spacing: 2px; color: #00f0ff; text-transform: uppercase; font-weight: 700; }
.title-main { font-size: 16px; font-weight: 800; color: #fff; text-shadow: 0 0 12px rgba(0, 240, 255, 0.6); }
.stats { display: flex; gap: 8px; align-items: center; }
.stat-box { text-align: right; }
.score-val { font-size: 18px; font-weight: 800; color: #00f0ff; }
.best-val { font-size: 10px; color: rgba(255, 255, 255, 0.6); margin-top: 2px; }
.btn-icon { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.25); color: #00f0ff; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; }
.btn-icon:active { transform: scale(0.9); }

.canvas-wrap { position: relative; padding: 10px; }
canvas { width: 100%; height: auto; background: #0a0c16; border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 12px; display: block; }

.footer-info { text-align: center; margin-top: 8px; font-size: 9px; color: #64748b; }
.footer-info a { color: #00f0ff; text-decoration: none; }
</style>
</head>
<body>

<div class="game-container">
  <div class="card">
    <div class="header">
      <div>
        <div class="title-sub">🍁 ISAGI ARCADE</div>
        <div class="title-main">STACK TOWER</div>
      </div>
      <div class="stats">
        <div class="stat-box">
          <div id="scoreDisplay" class="score-val">0</div>
          <div id="bestDisplay" class="best-val">BEST 0</div>
        </div>
        <button id="soundBtn" class="btn-icon">🔊</button>
        <button id="pauseBtn" class="btn-icon">⏸️</button>
      </div>
    </div>
    <div class="canvas-wrap">
      <canvas id="gameCanvas" width="400" height="500"></canvas>
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
  const scoreDisplay = document.getElementById('scoreDisplay');
  const bestDisplay = document.getElementById('bestDisplay');
  const soundBtn = document.getElementById('soundBtn');
  const pauseBtn = document.getElementById('pauseBtn');

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 500;
  const BLOCK_HEIGHT = 24;
  const INITIAL_BLOCK_WIDTH = 180;

  let gameState = 'START';
  let soundMuted = false;
  let audioCtx = null;

  let score = 0;
  let bestScore = 0;
  let combo = 0;

  let stack = [];
  let currentBlock = null;
  let fallingSlices = [];
  let particles = [];
  let floatingTexts = [];

  let direction = 1;
  let moveSpeed = 3.5;
  let cameraY = 0;
  let targetCameraY = 0;
  let shake = 0;
  let flash = 0;
  let hueBase = 190;

  let lastTime = 0;
  let animId = null;
  let isLoopRunning = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) audioCtx = new AudioCtxClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  }

  function playSound(type, extra) {
    if (typeof extra === 'undefined') extra = 1;
    if (soundMuted) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);

      if (type === 'drop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260 + Math.min(extra * 8, 300), now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now); osc.stop(now + 0.08);
      } else if (type === 'perfect') {
        const pitchMultiplier = Math.min(2.5, 1 + extra * 0.15);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25 * pitchMultiplier, now);
        osc.frequency.exponentialRampToValueAtTime(1046.50 * pitchMultiplier, now + 0.18);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
      }
    } catch (e) {}
  }

  function loadBest() {
    try { return parseInt(localStorage.getItem('stack_tower_best')) || 0; } catch(e) { return 0; }
  }
  function saveBest(val) {
    try { localStorage.setItem('stack_tower_best', String(Math.floor(val))); } catch(e) {}
  }

  bestScore = loadBest();

  function resetGame() {
    score = 0;
    combo = 0;
    cameraY = 0;
    targetCameraY = 0;
    shake = 0;
    flash = 0;
    hueBase = 190;
    moveSpeed = 3.8;
    direction = 1;

    stack = [];
    fallingSlices = [];
    particles = [];
    floatingTexts = [];

    const baseW = INITIAL_BLOCK_WIDTH;
    const baseX = (CANVAS_WIDTH - baseW) / 2;
    const baseY = CANVAS_HEIGHT - 80;

    stack.push({
      x: baseX, y: baseY, w: baseW, h: BLOCK_HEIGHT,
      colorHue: hueBase, glow: 0
    });

    spawnNextBlock();
    updateUI();
  }

  function spawnNextBlock() {
    const prev = stack[stack.length - 1];
    const newHue = (hueBase + stack.length * 9) % 360;
    const startX = direction > 0 ? 0 : CANVAS_WIDTH - prev.w;

    currentBlock = {
      x: startX,
      y: prev.y - BLOCK_HEIGHT,
      w: prev.w,
      h: BLOCK_HEIGHT,
      colorHue: newHue,
      glow: 0
    };

    moveSpeed = 3.8 + Math.min(10, stack.length * 0.18);
  }

  function updateUI() {
    scoreDisplay.textContent = score;
    bestDisplay.textContent = 'BEST ' + bestScore;
    soundBtn.textContent = soundMuted ? '🔇' : '🔊';
    pauseBtn.textContent = gameState === 'PAUSED' ? '▶️' : '⏸️';
  }

  function createBurst(px, py, count, hue) {
    for (let i = 0; i < count; i++) {
      if (particles.length >= 60) particles.shift();
      const angle = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 6;
      particles.push({
        x: px, y: py,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 1.5,
        size: 3 + Math.random() * 4,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.03,
        hue: hue
      });
    }
  }

  function addFloatingText(text, x, y, color) {
    floatingTexts.push({
      text: text, x: x, y: y,
      alpha: 1.0, vy: -1.5,
      color: color || '#00f0ff'
    });
  }

  function handleTap(e) {
    if (e && e.target && (e.target.tagName === 'BUTTON' || e.target.closest('button'))) return;
    initAudio();

    if (gameState === 'START') { resetGame(); gameState = 'PLAYING'; return; }
    if (gameState === 'PAUSED') return;
    if (gameState === 'GAMEOVER') { resetGame(); gameState = 'PLAYING'; return; }
    if (gameState === 'PLAYING') dropBlock();
  }

  function dropBlock() {
    if (!currentBlock) return;

    const prev = stack[stack.length - 1];
    const diff = currentBlock.x - prev.x;
    const absDiff = Math.abs(diff);

    if (absDiff < 4) {
      currentBlock.x = prev.x;
      combo++;
      const bonus = combo * 2;
      score += 2 + bonus;
      currentBlock.glow = 1.0;

      shake = 6;
      flash = 0.3;

      createBurst(currentBlock.x + currentBlock.w / 2, currentBlock.y + BLOCK_HEIGHT / 2, 20, currentBlock.colorHue);
      const comboText = combo > 1 ? ('PERFECT ×' + combo + '!') : 'PERFECT!';
      addFloatingText(comboText, currentBlock.x + currentBlock.w / 2, currentBlock.y - 10, '#00f0ff');
      playSound('perfect', combo);
    } else {
      combo = 0;
      const overlapW = currentBlock.w - absDiff;

      if (overlapW <= 0) {
        gameState = 'GAMEOVER';
        shake = 12;
        flash = 0.6;

        fallingSlices.push({
          x: currentBlock.x, y: currentBlock.y,
          w: currentBlock.w, h: BLOCK_HEIGHT,
          vx: diff > 0 ? 3 : -3, vy: 2,
          rot: 0, vrot: (Math.random() - 0.5) * 0.2,
          colorHue: currentBlock.colorHue, alpha: 1.0
        });
        currentBlock = null;

        if (score > bestScore) { bestScore = score; saveBest(bestScore); }
        updateUI();
        playSound('gameover');
        return;
      }

      let sliceX, sliceW;
      if (diff > 0) {
        sliceX = prev.x + currentBlock.w;
        sliceW = diff;
        currentBlock.w = overlapW;
      } else {
        sliceX = currentBlock.x;
        sliceW = absDiff;
        currentBlock.x = prev.x;
        currentBlock.w = overlapW;
      }

      fallingSlices.push({
        x: sliceX, y: currentBlock.y,
        w: sliceW, h: BLOCK_HEIGHT,
        vx: diff > 0 ? 3 : -3, vy: 1,
        rot: 0, vrot: (Math.random() - 0.5) * 0.25,
        colorHue: currentBlock.colorHue, alpha: 1.0
      });

      score += 1;
      playSound('drop', stack.length);
    }

    stack.push(currentBlock);
    if (score > bestScore) { bestScore = score; saveBest(bestScore); }
    updateUI();

    if (currentBlock.y < CANVAS_HEIGHT * 0.55) {
      targetCameraY = CANVAS_HEIGHT * 0.55 - currentBlock.y;
    }

    direction *= -1;
    spawnNextBlock();
  }

  soundBtn.addEventListener('click', e => { e.stopPropagation(); soundMuted = !soundMuted; updateUI(); });
  pauseBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (gameState === 'PLAYING') gameState = 'PAUSED';
    else if (gameState === 'PAUSED') gameState = 'PLAYING';
    updateUI();
  });

  canvas.addEventListener('touchstart', e => { e.preventDefault(); handleTap(); }, { passive: false });
  canvas.addEventListener('mousedown', e => { e.preventDefault(); handleTap(); });

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') { e.preventDefault(); handleTap(); }
  });

  function drawBlock(b, rot, alpha) {
    if (typeof rot === 'undefined') rot = 0;
    if (typeof alpha === 'undefined') alpha = 1.0;

    ctx.save();
    ctx.globalAlpha = alpha;
    if (rot !== 0) {
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      ctx.translate(cx, cy); ctx.rotate(rot); ctx.translate(-cx, -cy);
    }

    const mainColor = 'hsl(' + b.colorHue + ', 85%, 55%)';
    const topColor = 'hsl(' + b.colorHue + ', 90%, 75%)';
    const sideColor = 'hsl(' + b.colorHue + ', 80%, 35%)';

    if (b.glow && b.glow > 0) {
      ctx.shadowColor = mainColor;
      ctx.shadowBlur = 15 * b.glow;
    } else {
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 8;
    }

    const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
    grad.addColorStop(0, mainColor);
    grad.addColorStop(1, sideColor);
    ctx.fillStyle = grad;
    ctx.fillRect(b.x, b.y, b.w, b.h);

    ctx.fillStyle = topColor;
    ctx.fillRect(b.x, b.y, b.w, 3);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(b.x, b.y, b.w, b.h);

    ctx.restore();
  }

  function drawBackground() {
    const currentHue = (hueBase + cameraY * 0.05) % 360;
    const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    bgGrad.addColorStop(0, 'hsl(' + currentHue + ', 35%, 6%)');
    bgGrad.addColorStop(1, 'hsl(' + ((currentHue + 40) % 360) + ', 40%, 10%)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridStep = 30;
    const offsetY = (cameraY * 0.5) % gridStep;
    for (let x = 0; x <= CANVAS_WIDTH; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke();
    }
    for (let y = offsetY; y <= CANVAS_HEIGHT; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke();
    }
  }

  function drawOverlays() {
    if (gameState === 'START') {
      ctx.fillStyle = 'rgba(10, 12, 22, 0.85)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.textAlign = 'center';

      ctx.shadowColor = '#00f0ff'; ctx.shadowBlur = 20;
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 30px "Segoe UI", Arial';
      ctx.fillText('STACK TOWER', CANVAS_WIDTH / 2, 180);

      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '13px "Segoe UI", Arial';
      ctx.fillText('ابنِ البرج بأعلى ما يمكن!', CANVAS_WIDTH / 2, 215);

      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      const bw = 180, bh = 45;
      const bx = (CANVAS_WIDTH - bw) / 2, by = 270;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 12); else ctx.rect(bx, by, bw, bh);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#00f0ff';
      ctx.font = '700 15px "Segoe UI", Arial';
      ctx.fillText('اضغط للبدء', CANVAS_WIDTH / 2, by + 29);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px "Segoe UI", Arial';
      ctx.fillText('أعلى نتيجة: ' + bestScore, CANVAS_WIDTH / 2, 350);
    } else if (gameState === 'PAUSED') {
      ctx.fillStyle = 'rgba(10, 12, 22, 0.85)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.textAlign = 'center';
      ctx.shadowColor = '#00f0ff'; ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 26px "Segoe UI", Arial';
      ctx.fillText('⏸️ إيقاف', CANVAS_WIDTH / 2, 220);
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '13px "Segoe UI", Arial';
      ctx.fillText('اضغط للمتابعة', CANVAS_WIDTH / 2, 260);
    } else if (gameState === 'GAMEOVER') {
      ctx.fillStyle = 'rgba(10, 12, 22, 0.85)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.textAlign = 'center';

      ctx.shadowColor = '#ff0055'; ctx.shadowBlur = 20;
      ctx.fillStyle = '#ff2a6d';
      ctx.font = '900 30px "Segoe UI", Arial';
      ctx.fillText('انتهت اللعبة!', CANVAS_WIDTH / 2, 170);

      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '13px "Segoe UI", Arial';
      ctx.fillText('النقاط', CANVAS_WIDTH / 2, 210);

      ctx.fillStyle = '#00f0ff';
      ctx.font = '800 38px "Segoe UI", Arial';
      ctx.fillText(score, CANVAS_WIDTH / 2, 255);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '13px "Segoe UI", Arial';
      ctx.fillText('أعلى: ' + bestScore, CANVAS_WIDTH / 2, 290);

      const bw = 160, bh = 42;
      const bx = (CANVAS_WIDTH - bw) / 2, by = 330;
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff'; ctx.shadowBlur = 12;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 12); else ctx.rect(bx, by, bw, bh);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0a0c16';
      ctx.font = '800 14px "Segoe UI", Arial';
      ctx.fillText('🔄 إعادة', CANVAS_WIDTH / 2, by + 27);
    }
  }

  function loop(timestamp) {
    if (!isLoopRunning) return;
    if (!lastTime) lastTime = timestamp;
    const dt = Math.min((timestamp - lastTime) / 16.67, 2.0);
    lastTime = timestamp;

    if (gameState === 'PLAYING') {
      cameraY += (targetCameraY - cameraY) * 0.1 * dt;

      if (currentBlock) {
        currentBlock.x += direction * moveSpeed * dt;
        if (currentBlock.x <= 0) { currentBlock.x = 0; direction = 1; }
        else if (currentBlock.x + currentBlock.w >= CANVAS_WIDTH) {
          currentBlock.x = CANVAS_WIDTH - currentBlock.w;
          direction = -1;
        }
      }

      stack.forEach(b => { if (b.glow > 0) b.glow = Math.max(0, b.glow - 0.04 * dt); });

      fallingSlices.forEach(s => {
        s.x += s.vx * dt; s.y += s.vy * dt;
        s.vy += 0.4 * dt; s.rot += s.vrot * dt;
        s.alpha -= 0.015 * dt;
      });
      fallingSlices = fallingSlices.filter(s => s.alpha > 0 && (s.y + cameraY) < CANVAS_HEIGHT + 100);

      particles.forEach(p => {
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.life -= p.decay * dt;
      });
      particles = particles.filter(p => p.life > 0);

      floatingTexts.forEach(ft => {
        ft.y += ft.vy * dt;
        ft.alpha -= 0.02 * dt;
      });
      floatingTexts = floatingTexts.filter(ft => ft.alpha > 0);
    }

    if (shake > 0) shake = Math.max(0, shake - 0.5 * dt);
    if (flash > 0) flash = Math.max(0, flash - 0.04 * dt);

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.save();
    if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

    drawBackground();
    ctx.save();
    ctx.translate(0, cameraY);

    stack.forEach(b => drawBlock(b));
    if (currentBlock && gameState === 'PLAYING') drawBlock(currentBlock);
    fallingSlices.forEach(s => drawBlock(s, s.rot, s.alpha));

    particles.forEach(p => {
      ctx.fillStyle = 'hsla(' + p.hue + ', 90%, 65%, ' + Math.max(0, p.life) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    floatingTexts.forEach(ft => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.shadowColor = ft.color; ctx.shadowBlur = 10;
      ctx.fillStyle = ft.color;
      ctx.font = '800 16px "Segoe UI", Arial';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });

    ctx.restore();

    if (flash > 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (flash * 0.4) + ')';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    ctx.restore();
    drawOverlays();

    animId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (!isLoopRunning) {
      isLoopRunning = true;
      lastTime = 0;
      animId = requestAnimationFrame(loop);
    }
  }

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      isLoopRunning = false;
      if (animId) cancelAnimationFrame(animId);
      if (audioCtx && audioCtx.state === 'running') audioCtx.suspend().catch(() => {});
    } else {
      startLoop();
    }
  });

  resetGame();
  startLoop();
})();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'stack-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'stack-tower-isagi',
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
              { messageType: 2, messageText: '🏗️ Stack Tower - ابنِ البرج!' }
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

handler.command = ['ستاك', 'stack', 'stackgame', 'ستاكتاور'];
handler.category = 'games';
handler.help = ['ستاك', 'stack'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;