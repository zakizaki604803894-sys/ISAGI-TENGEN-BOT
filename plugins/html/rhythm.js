/* ═══════════════════════════════════════════════════════════
   🎵 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة الإيقاع (نسخة احترافية)
   📁 /home/container/plugins/games/rhythm.js
   ✅ منطق سليم | صوتيات حماسية | خط هدف مرئي
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
<title>🎵 لعبة الإيقاع</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { 
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    color: #fff; 
    font-family: 'Segoe UI', Tahoma, sans-serif; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    min-height: 100vh; 
    overflow: hidden;
    touch-action: none;
    padding: 6px;
    gap: 6px;
  }
  
  .game-card { 
    width: 100%; 
    max-width: 380px; 
    background: rgba(0, 0, 0, 0.6);
    border-radius: 16px; 
    padding: 10px; 
    border: 2px solid #ff6b6b; 
    box-shadow: 0 8px 32px rgba(0,0,0,0.7); 
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .header h2 { 
    font-size: 20px; 
    color: #ffd700; 
    margin: 0;
    text-shadow: 0 0 15px #ffd700;
  }
  
  .header p { 
    font-size: 11px; 
    color: #ccc; 
    margin: 2px 0 0 0;
  }

  .canvas-container { 
    border-radius: 10px; 
    overflow: hidden; 
    background: #000;
    border: 2px solid #ff6b6b;
    touch-action: none;
    position: relative;
    width: 100%;
  }
  
  canvas { 
    display: block; 
    width: 100%;
    height: auto;
    touch-action: none;
  }

  /* 🎯 مؤشر الإيقاع */
  .beat-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: rgba(0,0,0,0.6);
    border: 2px solid #ffd700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    z-index: 5;
    transition: all 0.1s;
  }
  
  .beat-indicator.pulse {
    background: #ffd700;
    transform: scale(1.3);
    box-shadow: 0 0 20px #ffd700;
  }

  .hud {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }
  
  .hud-item {
    background: rgba(255,255,255,0.1);
    padding: 6px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: bold;
    border: 1px solid rgba(255,255,255,0.2);
    flex: 1;
    text-align: center;
    transition: all 0.15s;
  }
  
  .hud-item.pulse {
    background: rgba(255,215,0,0.3);
    transform: scale(1.08);
  }

  .score-value { font-size: 18px; color: #ffd700; margin-top: 2px; }
  .combo-value { font-size: 18px; color: #ff6b6b; margin-top: 2px; }
  .accuracy-value { font-size: 18px; color: #4ecdc4; margin-top: 2px; }

  .controls { display: flex; gap: 6px; }
  
  .btn {
    flex: 1;
    background: linear-gradient(145deg, #ff6b6b, #ee5a24);
    border: none;
    border-radius: 12px;
    padding: 10px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    text-align: center;
    box-shadow: 0 3px 10px rgba(255,107,107,0.4);
    transition: all 0.1s;
  }
  
  .btn:active { transform: scale(0.9); box-shadow: 0 0 25px rgba(255,215,0,0.8); }
  .btn-hit { background: linear-gradient(145deg, #ffd700, #ffa502); color: #333; font-size: 18px; }
  .btn-pause { background: linear-gradient(145deg, #4ecdc4, #45b7d1); }
  .btn-reset { background: linear-gradient(145deg, #a29bfe, #6c5ce7); }
  
  .footer-info { font-size: 9px; color: #888; line-height: 1.3; }
  .footer-info a { color: #ffd700; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🎵 لعبة الإيقاع</h2>
    <p>اضغط عند وصول المربع للخط الذهبي!</p>
  </div>

  <div class="canvas-container" id="canvasContainer">
    <div class="beat-indicator" id="beatIndicator">🥁</div>
    <canvas id="gameCanvas" width="380" height="420"></canvas>
  </div>

  <div class="hud">
    <div class="hud-item" id="scoreHud">
      <div>النقاط</div>
      <div class="score-value" id="scoreDisplay">0</div>
    </div>
    <div class="hud-item" id="comboHud">
      <div>السلسلة</div>
      <div class="combo-value" id="comboDisplay">0</div>
    </div>
    <div class="hud-item" id="accuracyHud">
      <div>الدقة</div>
      <div class="accuracy-value" id="accuracyDisplay">100%</div>
    </div>
  </div>

  <div class="controls">
    <button class="btn btn-hit" id="hitBtn">🎯 اضغط!</button>
    <button class="btn btn-pause" id="pauseBtn">⏸️</button>
    <button class="btn btn-reset" id="resetBtn">🔄</button>
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
  const comboDisplay = document.getElementById('comboDisplay');
  const accuracyDisplay = document.getElementById('accuracyDisplay');
  const scoreHud = document.getElementById('scoreHud');
  const comboHud = document.getElementById('comboHud');
  const accuracyHud = document.getElementById('accuracyHud');
  const beatIndicator = document.getElementById('beatIndicator');
  
  /* ═══ 🎯 ثوابت اللعبة ═══ */
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const HIT_LINE_Y = HEIGHT - 80;      /* ✅ خط هدف مرئي */
  const REMOVE_Y = HEIGHT + 50;        /* ✅ إزالة بعد الشاشة */
  const SQUARE_SIZE = 50;
  
  let score = 0;
  let combo = 0;
  let maxCombo = 0;
  let totalHits = 0;
  let accurateHits = 0;
  let gameActive = true;
  let isPaused = false;
  let animationId = null;
  let squares = [];
  let particles = [];
  let lastTime = Date.now();
  let beatCounter = 0;
  const BPM = 110;                     /* 🎵 سرعة الإيقاع */
  const BEAT_INTERVAL = 60000 / BPM;
  let nextBeatTime = Date.now() + 1500;
  let songProgress = 0;
  const SONG_DURATION = 60000;
  
  /* 🔊 الصوت */
  let audioContext = null;
  let masterGain = null;
  let audioInitialized = false;
  
  function initAudio() {
    if (audioInitialized) return;
    audioInitialized = true;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.25;
      masterGain.connect(audioContext.destination);
    } catch (e) {}
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }
  
  /* 🎵 نغمة */
  function playTone(freq, duration, type = 'sine', volume = 0.2) {
    if (!audioContext || !masterGain) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = volume;
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {}
  }
  
  /* 🥁 صوت الطبل — إيقاع حماسي */
  function playBeatSound() {
    playTone(80, 0.15, 'sine', 0.3);
    setTimeout(() => playTone(150, 0.08, 'square', 0.15), 20);
  }
  
  /* 🎼 لحن حماسي حسب التقدم */
  function playMelodyNote() {
    const progression = [
      /* 0-15s: بداية هادئة */
      [262, 330, 392, 330],
      /* 15-30s: تصاعد */
      [349, 440, 523, 440],
      /* 30-45s: حماس */
      [392, 494, 587, 494],
      /* 45-60s: ذروة */
      [523, 659, 784, 659]
    ];
    
    const phase = Math.min(Math.floor(songProgress / 15000), 3);
    const notes = progression[phase];
    const idx = beatCounter % notes.length;
    
    playTone(notes[idx], 0.2, 'triangle', 0.15);
  }
  
  /* 🎯 نبضة الإيقاع */
  function pulseBeatIndicator() {
    beatIndicator.classList.add('pulse');
    setTimeout(() => beatIndicator.classList.remove('pulse'), 100);
  }
  
  function pulseHud(el) {
    el.classList.add('pulse');
    setTimeout(() => el.classList.remove('pulse'), 150);
  }
  
  /* 🎯 إنشاء مربع */
  function createSquare() {
    const colors = ['#ff6b6b', '#ffd700', '#4ecdc4', '#ff9ff3', '#54a0ff'];
    return {
      x: (WIDTH - SQUARE_SIZE) / 2,
      y: -SQUARE_SIZE,
      size: SQUARE_SIZE,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 3.5,
      hit: false
    };
  }
  
  /* ✨ جزيئات */
  function createParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const speed = 3 + Math.random() * 5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        color,
        size: 3 + Math.random() * 3
      });
    }
  }
  
  /* 🎨 رسم المربع */
  function drawSquare(sq) {
    ctx.save();
    ctx.translate(sq.x + sq.size/2, sq.y + sq.size/2);
    
    ctx.shadowColor = sq.color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = sq.color;
    ctx.fillRect(-sq.size/2, -sq.size/2, sq.size, sq.size);
    
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(-sq.size/2, -sq.size/2, sq.size, sq.size);
    
    /* خطوط داخلية */
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-sq.size/2, 0); ctx.lineTo(sq.size/2, 0);
    ctx.moveTo(0, -sq.size/2); ctx.lineTo(0, sq.size/2);
    ctx.stroke();
    
    ctx.restore();
  }
  
  function drawParticles() {
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.globalAlpha = 1;
    });
  }
  
  /* ═══ 🎯 معالجة الضغط ═══ */
  function handleHit() {
    if (!gameActive || isPaused) return;
    
    initAudio();
    totalHits++;
    
    /* البحث عن أقرب مربع لخط الهدف */
    let closest = null;
    let closestDist = Infinity;
    
    for (let sq of squares) {
      if (sq.hit) continue;
      const centerY = sq.y + sq.size/2;
      const dist = Math.abs(centerY - HIT_LINE_Y);
      if (dist < closestDist) {
        closestDist = dist;
        closest = sq;
      }
    }
    
    /* 🎯 لا مربع → لا خسارة */
    if (!closest) {
      totalHits--;
      playTone(150, 0.1, 'sawtooth', 0.08);
      return;
    }
    
    /* 🎯 تقييم الدقة */
    let accuracy = 'miss';
    if (closestDist < 30) accuracy = 'perfect';
    else if (closestDist < 55) accuracy = 'great';
    else if (closestDist < 90) accuracy = 'good';
    
    if (accuracy !== 'miss') {
      const points = accuracy === 'perfect' ? 100 
                   : accuracy === 'great' ? 70 
                   : 50;
      
      score += points * (1 + combo * 0.1);
      combo++;
      accurateHits++;
      if (combo > maxCombo) maxCombo = combo;
      
      closest.hit = true;
      createParticles(closest.x + closest.size/2, HIT_LINE_Y, closest.color);
      
      /* 🎵 صوت النجاح — حماسي */
      if (accuracy === 'perfect') {
        playTone(880, 0.15, 'sine', 0.3);
        setTimeout(() => playTone(1100, 0.15, 'sine', 0.25), 50);
      } else if (accuracy === 'great') {
        playTone(700, 0.15, 'sine', 0.25);
      } else {
        playTone(550, 0.15, 'sine', 0.2);
      }
      
      /* 🎉 صوت السلسلة */
      if (combo % 10 === 0) {
        setTimeout(() => playTone(1200, 0.2, 'triangle', 0.3), 100);
      }
      
      squares = squares.filter(s => s !== closest);
      pulseHud(scoreHud);
      if (combo > 1) pulseHud(comboHud);
      
    } else {
      combo = 0;
      playTone(200, 0.2, 'sawtooth', 0.15);
    }
    
    updateHUD();
  }
  
  function updateHUD() {
    scoreDisplay.textContent = Math.floor(score);
    comboDisplay.textContent = combo;
    const acc = totalHits > 0 ? Math.floor((accurateHits / totalHits) * 100) : 100;
    accuracyDisplay.textContent = acc + '%';
    pulseHud(accuracyHud);
  }
  
  function togglePause() {
    if (!gameActive) return;
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? '▶️' : '⏸️';
    if (!isPaused) {
      lastTime = Date.now();
      nextBeatTime = Date.now() + BEAT_INTERVAL;
    }
  }
  
  function resetGame() {
    score = 0;
    combo = 0;
    maxCombo = 0;
    totalHits = 0;
    accurateHits = 0;
    gameActive = true;
    isPaused = false;
    squares = [];
    particles = [];
    songProgress = 0;
    beatCounter = 0;
    
    scoreDisplay.textContent = '0';
    comboDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    document.getElementById('pauseBtn').textContent = '⏸️';
    
    if (animationId) cancelAnimationFrame(animationId);
    lastTime = Date.now();
    nextBeatTime = Date.now() + 1500;
    loop();
  }
  
  /* ═══ 🔁 دورة اللعبة ═══ */
  function loop() {
    if (!gameActive) {
      ctx.fillStyle = 'rgba(0,0,0,0.9)';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 30px Arial';
      ctx.fillText('🎵 انتهت!', WIDTH/2, HEIGHT/2 - 50);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('النقاط: ' + Math.floor(score), WIDTH/2, HEIGHT/2);
      ctx.fillStyle = '#4ecdc4';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('أفضل سلسلة: ' + maxCombo, WIDTH/2, HEIGHT/2 + 35);
      
      const acc = totalHits > 0 ? Math.floor((accurateHits / totalHits) * 100) : 0;
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('الدقة: ' + acc + '%', WIDTH/2, HEIGHT/2 + 65);
      
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText('اضغط إعادة', WIDTH/2, HEIGHT/2 + 100);
      return;
    }
    
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    if (!isPaused) {
      songProgress += deltaTime;
      
      /* 🎯 إنشاء مربع على الإيقاع */
      if (currentTime >= nextBeatTime) {
        beatCounter++;
        squares.push(createSquare());
        
        /* 🥁 صوت الطبل */
        playBeatSound();
        pulseBeatIndicator();
        
        /* 🎼 اللحن كل نبضتين */
        if (beatCounter % 2 === 0) {
          playMelodyNote();
        }
        
        nextBeatTime = currentTime + BEAT_INTERVAL;
      }
      
      /* تحديث المربعات */
      squares = squares.filter(sq => {
        sq.y += sq.speed;
        
        /* ❌ خسارة إذا تجاوز الخط بكثير */
        if (sq.y > HIT_LINE_Y + 80 && !sq.hit) {
          combo = 0;
          playTone(150, 0.2, 'sawtooth', 0.1);
          updateHUD();
          return false;
        }
        
        /* إزالة بعد الشاشة */
        if (sq.y > REMOVE_Y) return false;
        
        return true;
      });
      
      /* جزيئات */
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life--;
        return p.life > 0;
      });
      
      /* نهاية الأغنية */
      if (songProgress >= SONG_DURATION) {
        gameActive = false;
      }
    }
    
    /* ═══ 🎨 الرسم ═══ */
    /* خلفية متدرجة */
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.5, '#1a0a2a');
    gradient.addColorStop(1, '#0a0a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    /* خطوط إرشادية */
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const y = HIT_LINE_Y - i * 40;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }
    
    /* 🎯 منطقة الهدف */
    ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
    ctx.fillRect(0, HIT_LINE_Y - 40, WIDTH, 80);
    
    /* خط الهدف الذهبي */
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    ctx.moveTo(0, HIT_LINE_Y);
    ctx.lineTo(WIDTH, HIT_LINE_Y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    /* رسم المربعات */
    squares.forEach(drawSquare);
    drawParticles();
    
    /* شريط التقدم */
    const progress = (songProgress / SONG_DURATION) * WIDTH;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(0, HEIGHT - 8, WIDTH, 8);
    const progGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
    progGrad.addColorStop(0, '#ff6b6b');
    progGrad.addColorStop(1, '#ffd700');
    ctx.fillStyle = progGrad;
    ctx.fillRect(0, HEIGHT - 8, progress, 8);
    
    /* إيقاف */
    if (isPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('⏸️ إيقاف', WIDTH/2, HEIGHT/2);
    }
    
    animationId = requestAnimationFrame(loop);
  }
  
  /* ═══ 🎮 الأحداث ═══ */
  document.getElementById('hitBtn').addEventListener('click', handleHit);
  document.getElementById('hitBtn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    handleHit();
  }, { passive: false });
  
  canvas.addEventListener('click', handleHit);
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    handleHit();
  }, { passive: false });
  
  document.getElementById('pauseBtn').addEventListener('click', togglePause);
  document.getElementById('pauseBtn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    togglePause();
  }, { passive: false });
  
  document.getElementById('resetBtn').addEventListener('click', resetGame);
  document.getElementById('resetBtn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    resetGame();
  }, { passive: false });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleHit();
    }
    if (e.key === 'p' || e.key === 'P') togglePause();
  });
  
  resetGame();
})();
</script>
</body>
</html>`;

const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'rhythm-game-pro',
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
          botResponseId: 'rhythm-game-pro-response',
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
              { messageType: 2, messageText: '🎵 لعبة الإيقاع - اضغط مع الموسيقى!' }
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

handler.command = ['ايقاع', 'rhythm', 'موسيقى', 'لعبة_ايقاع'];
handler.category = 'games';
handler.help = ['ايقاع', 'rhythm'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;