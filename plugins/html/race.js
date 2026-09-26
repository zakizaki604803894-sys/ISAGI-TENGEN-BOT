/* ═══════════════════════════════════════════════════════════
   🏎️ 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — سباق السيارات (HTML تفاعلية)
   📁 /home/container/plugins/games/race.js
   ✅ أزرار بالترتيب الصحيح | موسيقى حماسية | جودة عالية
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
<title>🏎️ سباق السيارات</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { background: #12181f; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; overflow: hidden; padding: 6px; }
  
  .game-card { 
    width: 100%; 
    max-width: 340px; 
    background: #1a222d; 
    border-radius: 12px; 
    padding: 10px; 
    border: 1px solid #2a3545; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.5); 
    text-align: center; 
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .header h2 { font-size: 16px; color: #ffcc00; margin: 0; }
  .header p { font-size: 10px; color: #7f8c8d; font-weight: bold; margin: 2px 0 0; }

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
    background: rgba(0,0,0,0.4);
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
    color: #ffd700;
    flex: 1;
    text-align: center;
  }

  /* ✅ أزرار بالترتيب الصحيح */
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
    background: linear-gradient(145deg, #ff6b6b, #d32f2f);
    box-shadow: 0 4px 12px rgba(255,107,107,0.4);
  }

  .btn-reset {
    background: linear-gradient(145deg, #d32f2f, #b71c1c);
    font-size: 12px;
    max-width: 95px;
    padding: 9px;
  }
  
  .btn-sound {
    background: linear-gradient(145deg, #ffd700, #ffa502);
    font-size: 12px;
    max-width: 95px;
    padding: 9px;
    color: #333;
  }
  
  .footer-info { font-size: 9px; color: #64748b; line-height: 1.4; }
  .footer-info a { color: #00ffcc; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🏎️ سباق السيارات</h2>
    <p>تجنب السيارات واجمع النقاط!</p>
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
      <button class="btn btn-sound" id="soundBtn">🔊 صوت</button>
      <button class="btn btn-reset" id="resetBtn">🔄 إعادة</button>
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
    const soundBtn = document.getElementById('soundBtn');
    
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
    const CAR_WIDTH = 40;
    const CAR_HEIGHT = 60;
    
    let player = {
      x: canvas.width / 2 - CAR_WIDTH / 2,
      y: canvas.height - CAR_HEIGHT - 20,
      w: CAR_WIDTH,
      h: CAR_HEIGHT
    };
    
    let obstacles = [];
    let score = 0;
    let speed = 3;
    let maxSpeed = 10;
    let gameOver = false;
    let animationId = null;
    let frames = 0;
    let keys = { left: false, right: false };
    
    let audioCtx = null;
    let masterGain = null;
    let soundEnabled = true;
    let musicInterval = null;
    let musicBeat = 0;
    
    function initAudio() {
      if (!audioCtx) {
        try {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          masterGain = audioCtx.createGain();
          masterGain.gain.value = 0.3;
          masterGain.connect(audioCtx.destination);
        } catch (e) {}
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }
    
    function playTone(freq, duration, type, volume) {
      if (!audioCtx || !soundEnabled) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume || 0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch(e) {}
    }
    
    function startMusic() {
      stopMusic();
      if (!audioCtx || !soundEnabled) return;
      
      musicBeat = 0;
      musicInterval = setInterval(() => {
        if (gameOver) { stopMusic(); return; }
        
        playTone(100, 0.15, 'sine', 0.3);
        playTone(80, 0.1, 'square', 0.15);
        
        if (musicBeat % 2 === 0) {
          playTone(6000, 0.03, 'square', 0.05);
        }
        
        if (musicBeat % 4 === 0) {
          const melodyNotes = [440, 554, 659, 880];
          const note = melodyNotes[Math.floor(musicBeat / 4) % melodyNotes.length];
          playTone(note, 0.2, 'triangle', 0.15);
        }
        
        if (musicBeat % 4 === 2) {
          playTone(2000, 0.05, 'square', 0.1);
        }
        
        musicBeat++;
      }, 150);
    }
    
    function stopMusic() {
      if (musicInterval) {
        clearInterval(musicInterval);
        musicInterval = null;
      }
    }
    
    function playScoreSound() {
      playTone(800, 0.1, 'sine', 0.2);
      setTimeout(() => playTone(1200, 0.1, 'sine', 0.2), 50);
    }
    
    function playCrashSound() {
      playTone(200, 0.3, 'sawtooth', 0.3);
      playTone(150, 0.4, 'square', 0.2);
      playTone(100, 0.5, 'sawtooth', 0.25);
    }
    
    function toggleSound() {
      soundEnabled = !soundEnabled;
      soundBtn.textContent = soundEnabled ? '🔊 صوت' : '🔇 صامت';
      
      if (soundEnabled) {
        initAudio();
        if (!gameOver) startMusic();
      } else {
        stopMusic();
      }
    }
    
    const carColors = ['#ff1744', '#2979ff', '#ffd700', '#00e676', '#ff9100', '#d500f9', '#00e5ff', '#ff6d00'];
    
    function createObstacle() {
      const roadLeft = ROAD_X + 10;
      const roadRight = ROAD_X + ROAD_WIDTH - CAR_WIDTH - 10;
      const x = roadLeft + Math.random() * (roadRight - roadLeft);
      
      return {
        x: x,
        y: -CAR_HEIGHT,
        w: CAR_WIDTH,
        h: CAR_HEIGHT,
        color: carColors[Math.floor(Math.random() * carColors.length)],
        speed: speed + Math.random() * 2
      };
    }
    
    function drawRoad() {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#333';
      ctx.fillRect(ROAD_X, 0, ROAD_WIDTH, canvas.height);
      
      ctx.fillStyle = '#fff';
      ctx.fillRect(ROAD_X - 5, 0, 5, canvas.height);
      ctx.fillRect(ROAD_X + ROAD_WIDTH, 0, 5, canvas.height);
      
      ctx.fillStyle = '#ffd700';
      const lineHeight = 30;
      const lineGap = 20;
      const offset = (frames * speed) % (lineHeight + lineGap);
      
      for (let i = -1; i < canvas.height / (lineHeight + lineGap) + 1; i++) {
        const y = i * (lineHeight + lineGap) + offset;
        ctx.fillRect(canvas.width / 2 - 2, y, 4, lineHeight);
      }
    }
    
    function drawPlayerCar() {
      const x = player.x;
      const y = player.y;
      
      ctx.fillStyle = '#00e676';
      ctx.shadowColor = '#00e676';
      ctx.shadowBlur = 15;
      ctx.fillRect(x, y, player.w, player.h);
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = '#81d4fa';
      ctx.fillRect(x + 8, y + 10, player.w - 16, 15);
      
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x + 5, y + player.h - 5, 10, 5);
      ctx.fillRect(x + player.w - 15, y + player.h - 5, 10, 5);
      
      ctx.fillStyle = '#000';
      ctx.fillRect(x - 3, y + 5, 5, 15);
      ctx.fillRect(x + player.w - 2, y + 5, 5, 15);
      ctx.fillRect(x - 3, y + player.h - 20, 5, 15);
      ctx.fillRect(x + player.w - 2, y + player.h - 20, 5, 15);
    }
    
    function drawObstacleCar(car) {
      ctx.fillStyle = car.color;
      ctx.fillRect(car.x, car.y, car.w, car.h);
      
      ctx.fillStyle = '#333';
      ctx.fillRect(car.x + 8, car.y + 10, car.w - 16, 15);
      
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(car.x + 5, car.y, 10, 5);
      ctx.fillRect(car.x + car.w - 15, car.y, 10, 5);
      
      ctx.fillStyle = '#000';
      ctx.fillRect(car.x - 3, car.y + 5, 5, 15);
      ctx.fillRect(car.x + car.w - 2, car.y + 5, 5, 15);
      ctx.fillRect(car.x - 3, car.y + car.h - 20, 5, 15);
      ctx.fillRect(car.x + car.w - 2, car.y + car.h - 20, 5, 15);
    }
    
    function updateGame() {
      if (gameOver) return;
      
      frames++;
      
      const moveSpeed = 5;
      if (keys.left && player.x > ROAD_X + 5) {
        player.x -= moveSpeed;
      }
      if (keys.right && player.x + player.w < ROAD_X + ROAD_WIDTH - 5) {
        player.x += moveSpeed;
      }
      
      if (frames % Math.max(30, 80 - speed * 5) === 0) {
        obstacles.push(createObstacle());
      }
      
      obstacles = obstacles.filter(car => {
        car.y += car.speed;
        
        if (player.x < car.x + car.w && player.x + player.w > car.x &&
            player.y < car.y + car.h && player.y + player.h > car.y) {
          gameOver = true;
          playCrashSound();
          stopMusic();
          return false;
        }
        
        if (car.y > canvas.height) {
          score += 10;
          scoreDisplay.textContent = '🏆 ' + score;
          playScoreSound();
          return false;
        }
        
        return true;
      });
      
      if (frames % 300 === 0 && speed < maxSpeed) {
        speed += 0.5;
      }
      
      speedDisplay.textContent = '⚡ ' + Math.floor(speed * 20) + ' كم/س';
    }
    
    function draw() {
      drawRoad();
      
      obstacles.forEach(drawObstacleCar);
      drawPlayerCar();
      
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff1744';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('💥 حادث!', canvas.width/2, canvas.height/2 - 30);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('🏆 ' + score, canvas.width/2, canvas.height/2 + 25);
        ctx.fillStyle = '#81d4fa';
        ctx.font = '14px Arial';
        ctx.fillText('اضغط إعادة للعب', canvas.width/2, canvas.height/2 + 75);
      }
    }
    
    function resetGame() {
      player.x = canvas.width / 2 - CAR_WIDTH / 2;
      player.y = canvas.height - CAR_HEIGHT - 20;
      obstacles = [];
      score = 0;
      speed = 3;
      gameOver = false;
      frames = 0;
      keys = { left: false, right: false };
      scoreDisplay.textContent = '🏆 0';
      speedDisplay.textContent = '⚡ 0';
      
      if (animationId) cancelAnimationFrame(animationId);
      
      initAudio();
      startMusic();
      loop();
    }
    
    function loop() {
      updateGame();
      draw();
      animationId = requestAnimationFrame(loop);
    }
    
    function moveLeft() { if (!gameOver) keys.left = true; }
    function stopLeft() { keys.left = false; }
    function moveRight() { if (!gameOver) keys.right = true; }
    function stopRight() { keys.right = false; }
    
    /* ✅ الأزرار بالترتيب الصحيح */
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
    
    document.getElementById('resetBtn').addEventListener('touchstart', e => { e.preventDefault(); resetGame(); }, { passive: false });
    document.getElementById('resetBtn').addEventListener('mousedown', e => { e.preventDefault(); resetGame(); });
    
    document.getElementById('soundBtn').addEventListener('touchstart', e => { e.preventDefault(); toggleSound(); }, { passive: false });
    document.getElementById('soundBtn').addEventListener('mousedown', e => { e.preventDefault(); toggleSound(); });
    
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    });
    
    document.addEventListener('keyup', e => {
      if (e.key === 'ArrowLeft') stopLeft();
      if (e.key === 'ArrowRight') stopRight();
    });
    
    initAudio();
    loop();
  })();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'race-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'car-race-isagi',
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
              { messageType: 2, messageText: '🏎️ سباق السيارات - جاهز!' }
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

handler.command = ['سباق', 'race', 'سيارات', 'لعبة_سباق'];
handler.category = 'games';
handler.help = ['سباق', 'race'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;