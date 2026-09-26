/* ═══════════════════════════════════════════════════════════
   🐍 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — ثعبان النيون (محسّن)
   📁 /home/container/plugins/games/snake.js
   ✅ 60 FPS | حركة سلسة | رسومات عالية الجودة
   ✅ أزرار بالترتيب الصحيح | موسيقى محسّنة
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
<title>🐍 ثعبان النيون</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { 
    background: #0a0a0f; 
    color: #fff; 
    font-family: 'Segoe UI', Tahoma, sans-serif; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    min-height: 100vh; 
    overflow: hidden;
    touch-action: manipulation;
    padding: 6px;
  }
  
  .game-card { 
    width: 100%; 
    max-width: 380px; 
    background: rgba(10,10,20,0.9); 
    border-radius: 15px; 
    padding: 10px; 
    border: 1px solid #00ffff; 
    box-shadow: 0 0 30px rgba(0,255,255,0.2); 
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .header h2 { 
    font-size: 18px; 
    color: #00ffff; 
    margin: 0;
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
  }
  .header p { font-size: 10px; color: #aaa; margin: 2px 0 0; }

  .canvas-container { 
    border-radius: 10px; 
    overflow: hidden; 
    background: #000; 
    touch-action: none;
    position: relative;
    width: 100%;
  }
  
  canvas { 
    display: block; 
    width: 100%; 
    height: auto; 
    touch-action: none;
    background: #000;
  }

  .hud {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }

  .score-display, .high-score-display {
    background: rgba(0,255,255,0.1);
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
    color: #00ffff;
    flex: 1;
    text-align: center;
    border: 1px solid #00ffff;
  }

  /* ✅ الأزرار — LTR */
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    direction: ltr;
  }

  .controls-row {
    display: flex;
    gap: 5px;
    width: 100%;
    justify-content: center;
  }
  
  .btn {
    flex: 1;
    max-width: 95px;
    background: rgba(0,255,255,0.1);
    border: 1px solid #00ffff;
    border-radius: 12px;
    padding: 12px;
    color: #00ffff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.08s ease;
    text-align: center;
  }
  
  .btn:active {
    transform: scale(0.88);
    background: rgba(0,255,255,0.3);
    box-shadow: 0 0 20px rgba(0,255,255,0.6);
  }

  .btn-reset {
    background: rgba(255,0,255,0.1);
    border-color: #ff00ff;
    color: #ff00ff;
    font-size: 12px;
    max-width: 105px;
    padding: 10px;
  }
  .btn-reset:active {
    background: rgba(255,0,255,0.3);
  }

  .btn-music {
    background: rgba(0,255,0,0.1);
    border-color: #00ff00;
    color: #00ff00;
    font-size: 12px;
    max-width: 105px;
    padding: 10px;
  }
  .btn-music:active {
    background: rgba(0,255,0,0.3);
  }
  
  .footer-info { 
    font-size: 9px; 
    color: #555; 
    line-height: 1.4; 
  }
  .footer-info a { color: #00ffff; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🐍 ثعبان النيون</h2>
    <p>كل الطعام المتوهج وانمو بسرعة!</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="400" height="400"></canvas>
  </div>

  <div class="hud">
    <div class="score-display" id="scoreDisplay">🏆 0</div>
    <div class="high-score-display" id="highScoreDisplay">👑 0</div>
  </div>

  <div class="controls" dir="ltr">
    <div class="controls-row">
      <button class="btn" id="upBtn">⬆️</button>
    </div>
    <div class="controls-row">
      <button class="btn" id="leftBtn">⬅️</button>
      <button class="btn" id="downBtn">⬇️</button>
      <button class="btn" id="rightBtn">➡️</button>
    </div>
    <div class="controls-row">
      <button class="btn btn-reset" id="resetBtn">🔄 إعادة</button>
      <button class="btn btn-music" id="musicBtn">🎵 موسيقى</button>
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
  /* ✅ جودة عالية */
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  const scoreDisplay = document.getElementById('scoreDisplay');
  const highScoreDisplay = document.getElementById('highScoreDisplay');
  const musicBtn = document.getElementById('musicBtn');
  
  function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    if (containerWidth > 0) {
      canvas.style.width = containerWidth + 'px';
      canvas.style.height = containerWidth + 'px';
    }
  }
  setTimeout(resizeCanvas, 50);
  window.addEventListener('resize', resizeCanvas);

  /* ═══ 🎯 إعدادات اللعبة ═══ */
  const GRID_SIZE = 20;
  const GRID_WIDTH = canvas.width / GRID_SIZE;
  const GRID_HEIGHT = canvas.height / GRID_SIZE;
  
  let snake = [];
  let food = {};
  let direction = 'right';
  let nextDirection = 'right';
  let score = 0;
  let highScore = 0;
  let gameRunning = false;
  let gameOver = false;
  let animationId = null;
  let lastUpdate = 0;
  let updateInterval = 140;
  let particles = [];
  
  /* 🎵 إعدادات الموسيقى */
  let audioCtx = null;
  let musicGain = null;
  let musicInterval = null;
  let musicEnabled = true;
  let musicStarted = false;
  let currentStep = 0;
  
  try {
    highScore = parseInt(localStorage.getItem('neonSnakeHighScore')) || 0;
    highScoreDisplay.textContent = '👑 ' + highScore;
  } catch(e) {}

  function initGame() {
    snake = [
      {x: 10, y: 10},
      {x: 9, y: 10},
      {x: 8, y: 10}
    ];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    scoreDisplay.textContent = '🏆 0';
    particles = [];
    spawnFood();
  }
  
  function spawnFood() {
    let newFood;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
      attempts++;
      if (attempts > 100) break;
    } while (snake.some(s => s.x === newFood.x && s.y === newFood.y));
    food = newFood;
  }
  
  function spawnParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      particles.push({
        x: x * GRID_SIZE + GRID_SIZE/2,
        y: y * GRID_SIZE + GRID_SIZE/2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: color
      });
    }
  }
  
  function updateParticles() {
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.04;
      p.vy += 0.05;
    });
  }
  
  function drawBackground() {
    /* تدرج خفيف */
    const grad = ctx.createRadialGradient(200, 200, 0, 200, 200, 300);
    grad.addColorStop(0, '#0a0a1a');
    grad.addColorStop(1, '#000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    /* شبكة نيون */
    ctx.strokeStyle = 'rgba(0,255,255,0.06)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= GRID_HEIGHT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE);
      ctx.lineTo(canvas.width, i * GRID_SIZE);
      ctx.stroke();
    }
  }
  
  function drawSnake() {
    /* ✅ رسم من الذيل للرأس (تحسين الطبقات) */
    for (let i = snake.length - 1; i >= 0; i--) {
      const segment = snake[i];
      const x = segment.x * GRID_SIZE;
      const y = segment.y * GRID_SIZE;
      const size = GRID_SIZE - 2;
      
      const ratio = i / snake.length;
      const isHead = i === 0;
      
      /* توهج */
      ctx.shadowColor = isHead ? '#00ffff' : 'rgba(0,255,200,' + (1 - ratio) + ')';
      ctx.shadowBlur = isHead ? 18 : 8;
      
      /* لون متدرج ناعم */
      const r = Math.floor(0 + ratio * 80);
      const g = Math.floor(255 - ratio * 80);
      const b = Math.floor(255 - ratio * 50);
      
      if (isHead) {
        const headGrad = ctx.createRadialGradient(
          x + size/2, y + size/2, 0,
          x + size/2, y + size/2, size
        );
        headGrad.addColorStop(0, '#7fffff');
        headGrad.addColorStop(1, '#00ffff');
        ctx.fillStyle = headGrad;
      } else {
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      }
      
      /* شكل دائري ناعم */
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x + 1, y + 1, size, size, isHead ? 6 : 4);
      } else {
        ctx.rect(x + 1, y + 1, size, size);
      }
      ctx.fill();
      
      /* عيون */
      if (isHead) {
        ctx.shadowBlur = 0;
        const eyeSize = 3;
        const offset = 4;
        
        /* موضع العيون حسب الاتجاه */
        let eye1, eye2;
        if (direction === 'right') {
          eye1 = {x: x + size - eyeSize - 2, y: y + offset};
          eye2 = {x: x + size - eyeSize - 2, y: y + size - eyeSize - offset};
        } else if (direction === 'left') {
          eye1 = {x: x + 2, y: y + offset};
          eye2 = {x: x + 2, y: y + size - eyeSize - offset};
        } else if (direction === 'up') {
          eye1 = {x: x + offset, y: y + 2};
          eye2 = {x: x + size - eyeSize - offset, y: y + 2};
        } else {
          eye1 = {x: x + offset, y: y + size - eyeSize - 2};
          eye2 = {x: x + size - eyeSize - offset, y: y + size - eyeSize - 2};
        }
        
        /* بياض العين */
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(eye1.x + eyeSize/2, eye1.y + eyeSize/2, eyeSize/2, 0, Math.PI*2);
        ctx.arc(eye2.x + eyeSize/2, eye2.y + eyeSize/2, eyeSize/2, 0, Math.PI*2);
        ctx.fill();
        
        /* سواد العين */
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(eye1.x + eyeSize/2, eye1.y + eyeSize/2, eyeSize/4, 0, Math.PI*2);
        ctx.arc(eye2.x + eyeSize/2, eye2.y + eyeSize/2, eyeSize/4, 0, Math.PI*2);
        ctx.fill();
      }
    }
    ctx.shadowBlur = 0;
  }
  
  function drawFood() {
    const pulse = Math.sin(Date.now() / 250) * 0.15 + 0.85;
    const x = food.x * GRID_SIZE + GRID_SIZE/2;
    const y = food.y * GRID_SIZE + GRID_SIZE/2;
    const radius = GRID_SIZE/2 * pulse;
    
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 25;
    
    /* توهج خارجي */
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.2);
    gradient.addColorStop(0, '#ff00ff');
    gradient.addColorStop(0.4, '#ff00aa');
    gradient.addColorStop(1, 'rgba(255,0,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
    ctx.fill();
    
    /* النواة */
    const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(1, '#ff00ff');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
  }
  
  function drawParticles() {
    particles.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
  
  function drawOverlay() {
    if (gameOver || !gameRunning) {
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = 'center';
      
      ctx.fillStyle = '#00ffff';
      ctx.font = 'bold 30px Arial';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20;
      
      if (gameOver) {
        ctx.fillText('💀 انتهت اللعبة!', canvas.width/2, canvas.height/2 - 40);
      } else {
        ctx.fillText('🐍 ثعبان النيون', canvas.width/2, canvas.height/2 - 40);
      }
      
      ctx.fillStyle = '#ff00ff';
      ctx.font = 'bold 22px Arial';
      ctx.fillText('النقاط: ' + score, canvas.width/2, canvas.height/2 + 5);
      
      if (gameOver && score >= highScore && score > 0) {
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('🏆 رقم قياسي جديد!', canvas.width/2, canvas.height/2 + 35);
      }
      
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.shadowBlur = 0;
      ctx.fillText('اضغط أي زر للبدء', canvas.width/2, canvas.height/2 + 65);
    }
  }
  
  function updateGame() {
    if (!gameRunning || gameOver) return;
    
    const now = performance.now();
    if (now - lastUpdate < updateInterval) return;
    lastUpdate = now;
    
    direction = nextDirection;
    
    const head = {...snake[0]};
    switch(direction) {
      case 'right': head.x++; break;
      case 'left': head.x--; break;
      case 'up': head.y--; break;
      case 'down': head.y++; break;
    }
    
    /* فحص الجدران */
    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
      endGame();
      return;
    }
    
    /* فحص الذات */
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      endGame();
      return;
    }
    
    snake.unshift(head);
    
    /* أكل */
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreDisplay.textContent = '🏆 ' + score;
      spawnParticles(food.x, food.y, '#ff00ff');
      spawnFood();
      playEatSound();
      
      /* تسريع */
      if (updateInterval > 60) {
        updateInterval -= 2;
      }
    } else {
      snake.pop();
    }
  }
  
  function endGame() {
    gameOver = true;
    gameRunning = false;
    playGameOverSound();
    
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = '👑 ' + highScore;
      try { localStorage.setItem('neonSnakeHighScore', highScore); } catch(e) {}
    }
  }
  
  function draw() {
    drawBackground();
    drawSnake();
    drawFood();
    drawParticles();
    drawOverlay();
  }
  
  function gameLoop() {
    updateGame();
    updateParticles();
    draw();
    animationId = requestAnimationFrame(gameLoop);
  }
  
  function resetGame() {
    initGame();
    gameOver = false;
    gameRunning = true;
    lastUpdate = performance.now();
    updateInterval = 140;
  }
  
  /* ═══ 🎵 الصوت ═══ */
  function initAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        musicGain = audioCtx.createGain();
        musicGain.gain.value = 0.15;
        musicGain.connect(audioCtx.destination);
      } catch (e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }
  
  function playNote(freq, time, duration, type, gainValue) {
    if (!audioCtx || !musicGain) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(gainValue, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(gain);
      gain.connect(musicGain);
      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {}
  }
  
  function playDrum(time) {
    if (!audioCtx || !musicGain) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, time);
      osc.frequency.exponentialRampToValueAtTime(50, time + 0.08);
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
      osc.connect(gain);
      gain.connect(musicGain);
      osc.start(time);
      osc.stop(time + 0.08);
    } catch (e) {}
  }
  
  function playEatSound() {
    if (!audioCtx) return;
    playNote(880, audioCtx.currentTime, 0.1, 'sine', 0.3);
    setTimeout(() => playNote(1100, audioCtx.currentTime, 0.1, 'sine', 0.25), 50);
  }
  
  function playGameOverSound() {
    if (!audioCtx) return;
    playNote(400, audioCtx.currentTime, 0.2, 'sawtooth', 0.2);
    setTimeout(() => playNote(300, audioCtx.currentTime, 0.2, 'sawtooth', 0.2), 150);
    setTimeout(() => playNote(200, audioCtx.currentTime, 0.4, 'sawtooth', 0.2), 300);
  }
  
  /* 🎵 لحن خلفي */
  function scheduleMusic() {
    if (!audioCtx || !musicGain || !musicEnabled) return;
    const stepDuration = 0.2;
    const now = audioCtx.currentTime;
    
    const bassPattern = [110, 110, 130.81, 110, 98, 98, 110, 110];
    const melodyPattern = [440, 554, 659, 880, 659, 554, 440, 554];
    
    for (let i = 0; i < 8; i++) {
      const time = now + i * stepDuration;
      playNote(bassPattern[i], time, stepDuration * 0.8, 'triangle', 0.2);
      playNote(melodyPattern[i], time + stepDuration * 0.2, stepDuration * 0.4, 'square', 0.06);
      if (i % 2 === 0) playDrum(time);
    }
    currentStep = (currentStep + 8) % 16;
  }
  
  function startMusic() {
    if (!audioCtx || !musicEnabled || musicStarted) return;
    musicStarted = true;
    scheduleMusic();
    musicInterval = setInterval(scheduleMusic, 1600);
    musicBtn.textContent = '🔊 موسيقى';
  }
  
  function stopMusic() {
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
    musicStarted = false;
    musicBtn.textContent = '🔇 موسيقى';
  }
  
  function toggleMusic() {
    initAudio();
    musicEnabled = !musicEnabled;
    if (musicEnabled) startMusic();
    else stopMusic();
  }
  
  function handleFirstInteraction() {
    initAudio();
    if (musicEnabled && !musicStarted) startMusic();
    if (!gameRunning && !gameOver) {
      resetGame();
    }
  }
  
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });
  document.addEventListener('mousedown', handleFirstInteraction, { once: true });
  
  /* 🎮 التحكم */
  function setDirection(newDir) {
    if (!gameRunning && !gameOver) {
      resetGame();
    }
    if (gameOver) {
      resetGame();
      return;
    }
    if (direction === 'right' && newDir === 'left') return;
    if (direction === 'left' && newDir === 'right') return;
    if (direction === 'up' && newDir === 'down') return;
    if (direction === 'down' && newDir === 'up') return;
    nextDirection = newDir;
  }
  
  function bindBtn(id, dir) {
    const el = document.getElementById(id);
    el.addEventListener('touchstart', e => { e.preventDefault(); setDirection(dir); }, { passive: false });
    el.addEventListener('mousedown', e => { e.preventDefault(); setDirection(dir); });
  }
  
  bindBtn('upBtn', 'up');
  bindBtn('downBtn', 'down');
  bindBtn('leftBtn', 'left');
  bindBtn('rightBtn', 'right');
  
  document.getElementById('resetBtn').addEventListener('touchstart', e => { e.preventDefault(); resetGame(); }, { passive: false });
  document.getElementById('resetBtn').addEventListener('mousedown', e => { e.preventDefault(); resetGame(); });
  
  musicBtn.addEventListener('touchstart', e => { e.preventDefault(); toggleMusic(); }, { passive: false });
  musicBtn.addEventListener('mousedown', e => { e.preventDefault(); toggleMusic(); });
  
  /* ⌨️ لوحة المفاتيح */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') { e.preventDefault(); setDirection('up'); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setDirection('down'); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setDirection('left'); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setDirection('right'); }
  });
  
  /* 👆 سحب على الشاشة */
  let touchStartX = 0, touchStartY = 0;
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    handleFirstInteraction();
  }, { passive: false });
  
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!touchStartX) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 25) {
      setDirection(dx > 0 ? 'right' : 'left');
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    } else if (Math.abs(dy) > 25) {
      setDirection(dy > 0 ? 'down' : 'up');
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: false });
  
  canvas.addEventListener('touchend', () => { touchStartX = 0; });
  
  initGame();
  gameRunning = false;
  gameOver = false;
  lastUpdate = performance.now();
  gameLoop();
})();
</script>
</body>
</html>`;

const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'neon-snake-pro',
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
          botResponseId: 'neon-snake-pro-response',
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
              { messageType: 2, messageText: '🐍 ثعبان النيون - محسّن!' }
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

handler.command = ['ثعبان', 'نيون', 'snake', 'لعبة_ثعبان'];
handler.category = 'games';
handler.help = ['ثعبان', 'snake'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;