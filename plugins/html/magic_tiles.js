/* ═══════════════════════════════════════════════════════════
   🎹 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة Magic Tiles (صوت + تأثيرات)
   📁 /home/container/plugins/games/magic_tiles.js
   ✅ صوت + اهتزاز + تأثيرات بصرية
   ═══════════════════════════════════════════════════════════ */

import { Buffer } from 'buffer';

/* ═══════════════════════════════════════════
   🏆 الهوية
   ═══════════════════════════════════════════ */
const BRAND = {
  botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  developer:   'ISAGI 🍁',
  channelLink: 'https://whatsapp.com/channel/0029VbBeu0o002T9NQnURQ2V',
  emoji:       '🍁'
};

/* ═══════════════════════════════════════════
   🎮 HTML — Magic Tiles
   ═══════════════════════════════════════════ */
const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🎹 Magic Tiles</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { 
    background: linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%);
    color: #fff; 
    font-family: 'Segoe UI', Tahoma, sans-serif; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    min-height: 100vh;
    padding: 6px;
    gap: 6px;
  }
  
  .game-card { 
    width: 100%; 
    max-width: 400px; 
    background: rgba(0, 0, 0, 0.8);
    border-radius: 20px; 
    padding: 12px; 
    border: 2px solid #ffd700; 
    box-shadow: 0 8px 32px rgba(0,0,0,0.8); 
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .header h2 { 
    font-size: 24px; 
    color: #ffd700; 
    margin-bottom: 4px;
    text-shadow: 0 0 20px #ffd700, 0 0 40px #ffd700;
  }
  
  .header p { 
    font-size: 12px; 
    color: #e0e0e0; 
    margin: 0;
  }

  .canvas-container { 
    border-radius: 10px; 
    overflow: hidden; 
    background: #000;
    border: 3px solid #ffd700;
    touch-action: none;
    position: relative;
    width: 100%;
    transition: box-shadow 0.15s ease;
  }
  
  .canvas-container:active {
    box-shadow: 0 0 30px #ffd700, inset 0 0 30px rgba(255,215,0,0.3);
  }
  
  canvas { 
    display: block; 
    width: 100%;
    height: auto;
    touch-action: none;
    pointer-events: auto;
  }

  .hud {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  
  .hud-item {
    background: rgba(255, 215, 0, 0.1);
    padding: 8px 4px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
    border: 1px solid rgba(255, 215, 0, 0.3);
    flex: 1;
    text-align: center;
    transition: all 0.2s;
  }
  
  .hud-item.pulse {
    background: rgba(255, 215, 0, 0.3);
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255,215,0,0.5);
  }

  .score-value { font-size: 22px; color: #ffd700; margin-top: 2px; }
  .combo-value { font-size: 22px; color: #ff6b6b; margin-top: 2px; }
  .speed-value { font-size: 22px; color: #4ecdc4; margin-top: 2px; }

  .controls { display: flex; gap: 8px; }
  
  .btn {
    flex: 1;
    background: linear-gradient(145deg, #ffd700, #ffa502);
    border: none;
    border-radius: 16px;
    padding: 10px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
    text-align: center;
    transition: all 0.1s;
  }
  
  .btn:active { 
    transform: scale(0.9); 
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.8);
  }
  .btn-pause { background: linear-gradient(145deg, #4ecdc4, #45b7d1); color: #fff; }
  .btn-reset { background: linear-gradient(145deg, #ff6b6b, #ee5a24); color: #fff; }
  
  .footer-info { font-size: 10px; color: #999; line-height: 1.4; }
  .footer-info a { color: #ffd700; font-weight: bold; text-decoration: none; }
  
  .sound-toggle {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(0,0,0,0.7);
    border: 2px solid #ffd700;
    color: #ffd700;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    z-index: 10;
    touch-action: manipulation;
  }
  .sound-toggle.on { background: #ffd700; color: #000; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🎹 Magic Tiles</h2>
    <p>اضغط على البلاط الأسود!</p>
  </div>

  <div class="canvas-container" id="canvasContainer">
    <button class="sound-toggle" id="soundToggle">🔇</button>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
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
    <div class="hud-item" id="speedHud">
      <div>السرعة</div>
      <div class="speed-value" id="speedDisplay">1x</div>
    </div>
  </div>

  <div class="controls">
    <button class="btn btn-pause" id="pauseBtn">⏸️ إيقاف</button>
    <button class="btn btn-reset" id="resetBtn">🔄 إعادة</button>
  </div>

  <div class="footer-info">
    👑 ISAGI TENGEN BOT • <a href="${BRAND.channelLink}" target="_blank">القناة</a>
  </div>
</div>

<script>
(function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const canvasContainer = document.getElementById('canvasContainer');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const comboDisplay = document.getElementById('comboDisplay');
  const speedDisplay = document.getElementById('speedDisplay');
  const scoreHud = document.getElementById('scoreHud');
  const comboHud = document.getElementById('comboHud');
  const speedHud = document.getElementById('speedHud');
  const soundToggle = document.getElementById('soundToggle');
  
  const COLS = 4;
  const COL_WIDTH = canvas.width / COLS;
  const TILE_HEIGHT = 100;
  const HIT_Y = 300;
  const MISS_Y = 400;
  
  let score = 0;
  let combo = 0;
  let maxCombo = 0;
  let gameActive = false;
  let isPaused = false;
  let animationId = null;
  let tiles = [];
  let particles = [];
  let speed = 2.2;
  let speedMultiplier = 1;
  let countdown = 3;
  let countdownStart = 0;
  let gameOver = false;
  let soundEnabled = true;
  
  let audioContext = null;
  let masterGain = null;
  let soundReady = false;
  
  const BEEP_BASE64 = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
  
  let beepAudio = null;
  
  function initAudio() {
    if (!soundReady) {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioContext.createGain();
        masterGain.gain.value = 0.4;
        masterGain.connect(audioContext.destination);
        soundReady = true;
      } catch (e) {
        console.log('AudioContext failed');
      }
      
      try {
        beepAudio = new Audio(BEEP_BASE64);
        beepAudio.volume = 0.3;
      } catch (e) {}
    }
    
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }
  
  function playNote(freq) {
    if (!soundEnabled) return;
    
    if (soundReady && audioContext && masterGain) {
      try {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.value = 0.4;
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(audioContext.currentTime + 0.25);
        return;
      } catch (e) {}
    }
    
    if (beepAudio) {
      try {
        const clone = beepAudio.cloneNode();
        clone.volume = 0.2;
        clone.playbackRate = freq / 440;
        clone.play().catch(() => {});
      } catch (e) {}
    }
  }
  
  soundToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    soundToggle.classList.toggle('on', soundEnabled);
    
    if (soundEnabled) {
      initAudio();
      playNote(523);
    }
  });
  
  soundToggle.addEventListener('touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    soundToggle.classList.toggle('on', soundEnabled);
    
    if (soundEnabled) {
      initAudio();
      playNote(523);
    }
  }, { passive: false });
  
  const notes = [262, 294, 330, 349, 392, 440, 494, 523];
  
  function pulseHud(el) {
    el.classList.add('pulse');
    setTimeout(() => el.classList.remove('pulse'), 200);
  }
  
  function vibrate(ms) {
    if (navigator.vibrate) {
      try { navigator.vibrate(ms); } catch (e) {}
    }
  }
  
  function createInitialTiles() {
    tiles = [];
    for (let i = 0; i < 6; i++) {
      const blackCol = Math.floor(Math.random() * COLS);
      const y = -TILE_HEIGHT * 6 + i * TILE_HEIGHT;
      
      tiles.push({
        col: blackCol,
        x: blackCol * COL_WIDTH,
        y: y,
        w: COL_WIDTH,
        h: TILE_HEIGHT,
        hit: false,
        note: notes[Math.floor(Math.random() * notes.length)]
      });
    }
  }
  
  function addRow() {
    const blackCol = Math.floor(Math.random() * COLS);
    let minY = Infinity;
    tiles.forEach(t => { if (t.y < minY) minY = t.y; });
    
    tiles.push({
      col: blackCol,
      x: blackCol * COL_WIDTH,
      y: minY - TILE_HEIGHT,
      w: COL_WIDTH,
      h: TILE_HEIGHT,
      hit: false,
      note: notes[Math.floor(Math.random() * notes.length)]
    });
  }
  
  function draw() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    for (let i = 1; i < COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * COL_WIDTH, 0);
      ctx.lineTo(i * COL_WIDTH, canvas.height);
      ctx.stroke();
    }
    
    tiles.forEach(tile => {
      if (!tile.hit && tile.y + tile.h > 0 && tile.y < canvas.height) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(tile.x, tile.y, tile.w, tile.h);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(tile.x, tile.y, tile.w, tile.h);
      }
    });
    
    ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
    ctx.fillRect(0, HIT_Y - 50, canvas.width, 100);
    
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(0, HIT_Y);
    ctx.lineTo(canvas.width, HIT_Y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 20;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.globalAlpha = 1;
    });
  }
  
  function createParticles(x, y) {
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 20,
        color: '#ffd700',
        size: 3 + Math.random() * 3
      });
    }
  }
  
  function handleTap(clientX, clientY) {
    if (!gameActive || isPaused || gameOver) return;
    
    initAudio();
    
    const rect = canvas.getBoundingClientRect();
    const canvasX = (clientX - rect.left) * (canvas.width / rect.width);
    const canvasY = (clientY - rect.top) * (canvas.height / rect.height);
    
    if (canvasX < 0 || canvasX > canvas.width || canvasY < 0 || canvasY > canvas.height) return;
    
    const col = Math.floor(canvasX / COL_WIDTH);
    if (col < 0 || col >= COLS) return;
    
    let bestTile = null;
    let bestDist = Infinity;
    
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      if (tile.hit || tile.col !== col) continue;
      
      const tileCenter = tile.y + tile.h / 2;
      const dist = Math.abs(tileCenter - HIT_Y);
      
      if (dist < 100 && dist < bestDist) {
        bestDist = dist;
        bestTile = tile;
      }
    }
    
    if (bestTile) {
      bestTile.hit = true;
      playNote(bestTile.note);
      createParticles(bestTile.x + bestTile.w/2, HIT_Y);
      vibrate(20);
      
      combo++;
      if (combo > maxCombo) maxCombo = combo;
      
      if (bestDist < 30) score += 100;
      else if (bestDist < 60) score += 70;
      else score += 50;
      
      if (combo % 10 === 0) {
        speedMultiplier += 0.15;
        speed = 2.2 * speedMultiplier;
        speedDisplay.textContent = speedMultiplier.toFixed(1) + 'x';
        pulseHud(speedHud);
        vibrate(50);
      }
      
      scoreDisplay.textContent = score;
      comboDisplay.textContent = combo;
      pulseHud(scoreHud);
      if (combo > 1) pulseHud(comboHud);
    } else {
      combo = 0;
      comboDisplay.textContent = '0';
      vibrate(10);
    }
  }
  
  function togglePause() {
    if (!gameActive || gameOver) return;
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? '▶️' : '⏸️';
  }
  
  function resetGame() {
    score = 0;
    combo = 0;
    maxCombo = 0;
    gameActive = false;
    isPaused = false;
    gameOver = false;
    particles = [];
    speed = 2.2;
    speedMultiplier = 1;
    countdown = 3;
    
    scoreDisplay.textContent = '0';
    comboDisplay.textContent = '0';
    speedDisplay.textContent = '1x';
    document.getElementById('pauseBtn').textContent = '⏸️';
    
    createInitialTiles();
    countdownStart = Date.now();
    
    if (animationId) cancelAnimationFrame(animationId);
    gameLoop();
  }
  
  function gameLoop() {
    const now = Date.now();
    
    if (!gameActive && !gameOver) {
      const elapsed = (now - countdownStart) / 1000;
      countdown = Math.max(0, 3 - elapsed);
      if (countdown <= 0) gameActive = true;
    }
    
    if (gameActive && !isPaused && !gameOver) {
      tiles.forEach(tile => { tile.y += speed; });
      tiles = tiles.filter(tile => tile.y < canvas.height + TILE_HEIGHT);
      
      let missed = false;
      for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].hit && tiles[i].y > MISS_Y) {
          missed = true;
          break;
        }
      }
      
      if (missed) {
        gameActive = false;
        gameOver = true;
        vibrate(200);
      }
      
      let maxY = -Infinity;
      tiles.forEach(t => { if (t.y > maxY) maxY = t.y; });
      
      while (maxY < canvas.height + TILE_HEIGHT) {
        addRow();
        maxY += TILE_HEIGHT;
      }
      
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        return p.life > 0;
      });
    }
    
    draw();
    
    if (!gameActive && !gameOver && countdown > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 70px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(Math.ceil(countdown), canvas.width/2, canvas.height/2 + 20);
    }
    
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('💀 خسرت!', canvas.width/2, canvas.height/2 - 45);
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('النقاط: ' + score, canvas.width/2, canvas.height/2);
      ctx.fillStyle = '#4ecdc4';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('أفضل سلسلة: ' + maxCombo, canvas.width/2, canvas.height/2 + 35);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText('اضغط إعادة للعب', canvas.width/2, canvas.height/2 + 70);
    }
    
    if (isPaused && gameActive) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('⏸️ إيقاف', canvas.width/2, canvas.height/2);
    }
    
    animationId = requestAnimationFrame(gameLoop);
  }
  
  canvasContainer.addEventListener('click', function(e) {
    if (e.target === soundToggle || soundToggle.contains(e.target)) return;
    handleTap(e.clientX, e.clientY);
  });
  
  canvasContainer.addEventListener('touchstart', function(e) {
    if (e.target === soundToggle || soundToggle.contains(e.target)) return;
    e.preventDefault();
    const touch = e.touches[0];
    handleTap(touch.clientX, touch.clientY);
  }, { passive: false });
  
  document.getElementById('pauseBtn').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    togglePause();
  });
  document.getElementById('pauseBtn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    togglePause();
  }, { passive: false });
  
  document.getElementById('resetBtn').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    resetGame();
  });
  document.getElementById('resetBtn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    resetGame();
  }, { passive: false });
  
  resetGame();
})();
</script>
</body>
</html>`;

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'magic-tiles-game-v8',
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
          botResponseId: 'magic-tiles-v8-response',
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
              {
                messageType: 2,
                messageText: '🎹 Magic Tiles - اضغط على البلاط الأسود!'
              }
            ],
            unifiedResponse: { data },
            contextInfo: {
              forwardingScore: 1,
              isForwarded: true,
              forwardedAiBotMessageInfo: {
                botJid: '867051314767696@bot'
              },
              forwardOrigin: 4
            }
          }
        }
      }
    },
    {}
  );
};

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['magic_tiles', 'ماجيك', 'بيانو', 'لعبة_البلاط'];
handler.category = 'games';
handler.help = ['magic_tiles', 'ماجيك', 'بيانو'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;