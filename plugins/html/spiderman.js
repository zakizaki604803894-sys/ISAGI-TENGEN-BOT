/* ═══════════════════════════════════════════════════════════
   🕷️ 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — سبايدر مان: تأرجح الويب
   📁 /home/container/plugins/games/spiderman.js
   ✅ أزرار LTR | موسيقى | تجنب قنابل + جمع عناكب
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
<title>🕷️ سبايدر مان</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { background: #0a0a1a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; overflow: hidden; padding: 6px; }
  
  .game-card { 
    width: 100%; 
    max-width: 340px; 
    background: linear-gradient(145deg, #1a1a2e, #16213e); 
    border-radius: 12px; 
    padding: 10px; 
    border: 1px solid #e62429; 
    box-shadow: 0 0 20px rgba(230,36,41,0.3); 
    text-align: center; 
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .header h2 { font-size: 16px; color: #e62429; margin: 0; text-shadow: 0 0 10px #e62429; }
  .header p { font-size: 10px; color: #b0b0b0; font-weight: bold; margin: 2px 0 0; }

  .canvas-container { 
    border-radius: 5px; 
    overflow: hidden; 
    background: #000;
    touch-action: none;
    width: 100%;
  }
  
  canvas { 
    background: #000; 
    display: block; 
    width: 100%;
    height: auto;
    touch-action: none;
  }

  .hud {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }

  .score-display, .speed-display {
    background: rgba(0,0,0,0.5);
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
    color: #e62429;
    flex: 1;
    text-align: center;
    border: 1px solid #e62429;
  }

  /* ✅ أزرار LTR */
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    direction: ltr;
  }

  .controls-row {
    display: flex;
    gap: 6px;
    width: 100%;
    justify-content: center;
  }
  
  .btn {
    flex: 1;
    max-width: 115px;
    background: linear-gradient(145deg, #2a3a5a, #1a2a4a);
    border: none;
    border-radius: 12px;
    padding: 12px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.1s ease;
    text-align: center;
  }
  
  .btn:active { transform: scale(0.9); }

  .btn-left {
    background: linear-gradient(145deg, #2979ff, #0d47a1);
    box-shadow: 0 4px 12px rgba(41,121,255,0.4);
  }

  .btn-right {
    background: linear-gradient(145deg, #e62429, #b71c1c);
    box-shadow: 0 4px 12px rgba(230,36,41,0.4);
  }

  .btn-reset {
    background: linear-gradient(145deg, #d32f2f, #b71c1c);
    font-size: 12px;
    max-width: 95px;
    padding: 9px;
  }

  .btn-music {
    background: linear-gradient(145deg, #6a1b9a, #4a148c);
    font-size: 12px;
    max-width: 95px;
    padding: 9px;
  }
  
  .footer-info { font-size: 9px; color: #64748b; line-height: 1.4; }
  .footer-info a { color: #00ffcc; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🕷️ سبايدر مان</h2>
    <p>تجنب القنابل واجمع العناكب!</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="320" height="400"></canvas>
  </div>

  <div class="hud">
    <div class="score-display" id="scoreDisplay">🏆 0</div>
    <div class="speed-display" id="speedDisplay">⚡ 0</div>
  </div>

  <div class="controls" dir="ltr">
    <div class="controls-row">
      <button class="btn btn-left" id="leftBtn">⬅️</button>
      <button class="btn btn-right" id="rightBtn">➡️</button>
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
    const scoreDisplay = document.getElementById('scoreDisplay');
    const speedDisplay = document.getElementById('speedDisplay');
    const musicBtn = document.getElementById('musicBtn');
    
    function resizeCanvas() {
      const container = canvas.parentElement;
      const containerWidth = container.clientWidth;
      if (containerWidth > 0) {
        const aspectRatio = 400 / 320;
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = (containerWidth * aspectRatio) + 'px';
      }
    }
    
    setTimeout(resizeCanvas, 50);
    window.addEventListener('resize', resizeCanvas);

    const ROAD_WIDTH = 240;
    const ROAD_X = (canvas.width - ROAD_WIDTH) / 2;
    const PLAYER_WIDTH = 40;
    const PLAYER_HEIGHT = 50;
    
    let player = {
      x: canvas.width / 2 - PLAYER_WIDTH / 2,
      y: canvas.height - PLAYER_HEIGHT - 20,
      w: PLAYER_WIDTH,
      h: PLAYER_HEIGHT
    };
    
    let obstacles = [];
    let webs = [];
    let score = 0;
    let speed = 3;
    let maxSpeed = 10;
    let gameOver = false;
    let animationId = null;
    let frames = 0;
    let keys = { left: false, right: false };
    
    let audioCtx = null;
    let musicGain = null;
    let musicInterval = null;
    let musicEnabled = true;
    let musicStarted = false;
    let firstInteractionHandled = false;
    let currentStep = 0;
    
    const obstacleColors = ['#e62429', '#ff6b6b', '#d32f2f', '#ff9100', '#ff1744', '#b71c1c'];
    
    function createObstacle() {
      const w = 30;
      const h = 30;
      const roadLeft = ROAD_X + 10;
      const roadRight = ROAD_X + ROAD_WIDTH - w - 10;
      const x = roadLeft + Math.random() * (roadRight - roadLeft);
      
      return {
        x, y: -h, w, h,
        type: Math.random() < 0.7 ? 'bomb' : 'drone',
        color: obstacleColors[Math.floor(Math.random() * obstacleColors.length)],
        speed: speed + Math.random() * 2
      };
    }
    
    function createWeb() {
      const size = 20;
      const roadLeft = ROAD_X + 20;
      const roadRight = ROAD_X + ROAD_WIDTH - size - 20;
      const x = roadLeft + Math.random() * (roadRight - roadLeft);
      return {
        x, y: -size, w: size, h: size,
        speed: speed + Math.random() * 1.5,
        collected: false
      };
    }
    
    function drawBackground() {
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      /* مباني */
      ctx.fillStyle = '#1a1a2e';
      for (let i = 0; i < 5; i++) {
        const buildingX = i * 70;
        const buildingHeight = 100 + Math.sin(i * 3) * 30;
        ctx.fillRect(buildingX, canvas.height - buildingHeight, 60, buildingHeight);
        ctx.fillStyle = '#2a2a4a';
        for (let j = 0; j < 4; j++) {
          for (let k = 0; k < 2; k++) {
            ctx.fillRect(buildingX + 5 + j * 15, canvas.height - buildingHeight + 10 + k * 20, 5, 8);
          }
        }
        ctx.fillStyle = '#1a1a2e';
      }
      
      /* الطريق */
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(ROAD_X, 0, ROAD_WIDTH, canvas.height);
      
      /* خطوط جانبية */
      ctx.strokeStyle = '#e62429';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(ROAD_X - 5, 0);
      ctx.lineTo(ROAD_X - 5, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ROAD_X + ROAD_WIDTH + 5, 0);
      ctx.lineTo(ROAD_X + ROAD_WIDTH + 5, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);
      
      /* شبكة عنكبوت خلفية */
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(ROAD_X, i * 40);
        ctx.lineTo(ROAD_X + ROAD_WIDTH, i * 40);
        ctx.stroke();
      }
    }
    
    function drawPlayer() {
      const x = player.x;
      const y = player.y;
      
      ctx.fillStyle = '#e62429';
      ctx.fillRect(x, y + 10, player.w, player.h - 10);
      
      ctx.fillStyle = '#e62429';
      ctx.beginPath();
      ctx.arc(x + player.w/2, y + 8, 12, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(x + player.w/2 - 5, y + 6, 4, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + player.w/2 + 5, y + 6, 4, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(x + player.w/2, y + 8);
        ctx.lineTo(x + player.w/2 + i * 8, y);
        ctx.stroke();
      }
      
      ctx.strokeStyle = '#e62429';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 5, y + player.h - 5);
      ctx.lineTo(x, y + player.h + 5);
      ctx.moveTo(x + player.w - 5, y + player.h - 5);
      ctx.lineTo(x + player.w, y + player.h + 5);
      ctx.stroke();
    }
    
    function drawObstacle(obstacle) {
      const x = obstacle.x;
      const y = obstacle.y;
      
      if (obstacle.type === 'bomb') {
        ctx.fillStyle = obstacle.color;
        ctx.beginPath();
        ctx.arc(x + obstacle.w/2, y + obstacle.h/2, obstacle.w/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.fillRect(x + obstacle.w/2 - 2, y - 5, 4, 8);
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(x + obstacle.w/2, y - 8, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#444';
        ctx.fillRect(x, y, obstacle.w, obstacle.h/2);
        ctx.fillStyle = '#e62429';
        ctx.beginPath();
        ctx.arc(x + obstacle.w/2, y + obstacle.h/2, obstacle.w/3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(x + 5, y + 5, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + obstacle.w - 5, y + 5, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function drawWeb(web) {
      const x = web.x;
      const y = web.y;
      
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x + web.w/2, y + web.h/2, web.w/2, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(x + web.w/2, y + web.h/2);
        ctx.lineTo(x + web.w/2 + Math.cos(angle) * web.w/2, y + web.h/2 + Math.sin(angle) * web.h/2);
        ctx.stroke();
      }
      
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(x + web.w/2, y + web.h/2, web.w/3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    function updateGame() {
      if (gameOver) return;
      
      frames++;
      
      const moveSpeed = 5;
      if (keys.left && player.x > ROAD_X + 5) player.x -= moveSpeed;
      if (keys.right && player.x + player.w < ROAD_X + ROAD_WIDTH - 5) player.x += moveSpeed;
      
      if (frames % Math.max(30, 80 - speed * 5) === 0) {
        obstacles.push(createObstacle());
      }
      
      if (frames % 60 === 0 && Math.random() < 0.5) {
        webs.push(createWeb());
      }
      
      obstacles = obstacles.filter(obstacle => {
        obstacle.y += obstacle.speed;
        
        if (player.x < obstacle.x + obstacle.w && player.x + player.w > obstacle.x &&
            player.y < obstacle.y + obstacle.h && player.y + player.h > obstacle.y) {
          gameOver = true;
          return false;
        }
        
        if (obstacle.y > canvas.height) {
          score += 5;
          scoreDisplay.textContent = '🏆 ' + score;
          return false;
        }
        
        return true;
      });
      
      webs = webs.filter(web => {
        web.y += web.speed;
        
        if (!web.collected && player.x < web.x + web.w && player.x + player.w > web.x &&
            player.y < web.y + web.h && player.y + player.h > web.y) {
          web.collected = true;
          score += 15;
          scoreDisplay.textContent = '🏆 ' + score;
          return false;
        }
        
        if (web.y > canvas.height) return false;
        return true;
      });
      
      if (frames % 300 === 0 && speed < maxSpeed) {
        speed += 0.5;
      }
      
      speedDisplay.textContent = '⚡ ' + Math.floor(speed * 20) + ' كم/س';
    }
    
    function draw() {
      drawBackground();
      
      webs.forEach(drawWeb);
      obstacles.forEach(drawObstacle);
      drawPlayer();
      
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#e62429';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('💥 اصطدام!', canvas.width/2, canvas.height/2 - 30);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 22px Arial';
        ctx.fillText('🏆 ' + score, canvas.width/2, canvas.height/2 + 20);
        ctx.fillStyle = '#81d4fa';
        ctx.font = '13px Arial';
        ctx.fillText('اضغط إعادة', canvas.width/2, canvas.height/2 + 65);
      }
    }
    
    function resetGame() {
      player.x = canvas.width / 2 - PLAYER_WIDTH / 2;
      player.y = canvas.height - PLAYER_HEIGHT - 20;
      obstacles = [];
      webs = [];
      score = 0;
      speed = 3;
      gameOver = false;
      frames = 0;
      keys = { left: false, right: false };
      scoreDisplay.textContent = '🏆 0';
      speedDisplay.textContent = '⚡ 0';
      
      if (animationId) cancelAnimationFrame(animationId);
      loop();
    }
    
    function loop() {
      updateGame();
      draw();
      animationId = requestAnimationFrame(loop);
    }
    
    /* 🎵 الصوت */
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
      } catch(e) {}
    }
    
    function playDrum(time) {
      if (!audioCtx || !musicGain) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(50, time + 0.1);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        osc.connect(gain);
        gain.connect(musicGain);
        osc.start(time);
        osc.stop(time + 0.1);
      } catch(e) {}
    }
    
    function scheduleMusic() {
      if (!audioCtx || !musicGain || !musicEnabled) return;
      
      const stepDuration = 0.25;
      const stepsPerBar = 8;
      const now = audioCtx.currentTime;
      
      const melodyNotes = [
        392, 440, 494, 587,
        392, 440, 494, 587,
        440, 494, 587, 659,
        392, 494, 587, 784
      ];
      
      for (let i = 0; i < stepsPerBar; i++) {
        const time = now + i * stepDuration;
        const step = (currentStep + i) % 16;
        const bar = Math.floor(step / 4);
        const positionInBar = step % 4;
        
        playNote(bar % 2 === 0 ? 98 : 110, time, stepDuration * 0.8, 'triangle', 0.25);
        playNote(melodyNotes[step % 16], time + stepDuration * 0.2, stepDuration * 0.6, 'sawtooth', 0.08);
        
        if (positionInBar % 2 === 0) playDrum(time);
      }
      
      currentStep = (currentStep + stepsPerBar) % 16;
    }
    
    function startMusic() {
      if (!audioCtx || !musicEnabled || musicStarted) return;
      musicStarted = true;
      scheduleMusic();
      musicInterval = setInterval(scheduleMusic, 2000);
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
      if (firstInteractionHandled) return;
      firstInteractionHandled = true;
      initAudio();
      if (musicEnabled) startMusic();
    }
    
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('mousedown', handleFirstInteraction, { once: true });
    
    musicBtn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      handleFirstInteraction();
      toggleMusic();
    }, { passive: false });
    musicBtn.addEventListener('mousedown', function(e) {
      e.preventDefault();
      handleFirstInteraction();
      toggleMusic();
    });
    
    function moveLeft() { if (!gameOver) keys.left = true; }
    function stopLeft() { keys.left = false; }
    function moveRight() { if (!gameOver) keys.right = true; }
    function stopRight() { keys.right = false; }
    
    function bindHold(id, onPress, onRelease) {
      const el = document.getElementById(id);
      el.addEventListener('touchstart', e => { e.preventDefault(); onPress(); }, { passive: false });
      el.addEventListener('touchend', e => { e.preventDefault(); onRelease(); });
      el.addEventListener('touchcancel', e => { e.preventDefault(); onRelease(); });
      el.addEventListener('mousedown', e => { e.preventDefault(); onPress(); });
      el.addEventListener('mouseup', e => { e.preventDefault(); onRelease(); });
      el.addEventListener('mouseleave', () => onRelease());
    }
    
    bindHold('leftBtn', moveLeft, stopLeft);
    bindHold('rightBtn', moveRight, stopRight);
    
    document.getElementById('resetBtn').addEventListener('touchstart', e => { e.preventDefault(); handleFirstInteraction(); resetGame(); }, { passive: false });
    document.getElementById('resetBtn').addEventListener('mousedown', e => { e.preventDefault(); handleFirstInteraction(); resetGame(); });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    });
    
    document.addEventListener('keyup', function(e) {
      if (e.key === 'ArrowLeft') stopLeft();
      if (e.key === 'ArrowRight') stopRight();
    });
    
    loop();
  })();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'spiderman-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'spiderman-game-isagi',
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
              { messageType: 2, messageText: '🕷️ سبايدر مان - جاهز!' }
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

handler.command = ['سبايدر', 'spiderman', 'ويب', 'لعبة_سبايدر'];
handler.category = 'games';
handler.help = ['سبايدر', 'spiderman'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;