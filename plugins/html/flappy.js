/* ═══════════════════════════════════════════════════════════
   🐦 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — الطائر المحطم (Flappy Breaker)
   📁 /home/container/plugins/games/flappy.js
   ✅ أنابيب + كتل ذهبية + جزيئات
   ✅ حفظ أعلى نتيجة | أزرار بالترتيب الصحيح
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
<title>🐦 الطائر المحطم</title>
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
    background: #87ceeb;
    touch-action: none;
    width: 100%;
  }
  
  canvas { 
    background: #87ceeb; 
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

  .score-display, .best-display {
    background: rgba(0,0,0,0.4);
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
    color: #ffd700;
    flex: 1;
    text-align: center;
  }

  .controls {
    display: flex;
    gap: 6px;
    direction: ltr;
  }
  
  .btn {
    flex: 1;
    background: linear-gradient(145deg, #2a3a5a, #1a2a4a);
    border: none;
    border-radius: 20px;
    padding: 12px 8px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.1s ease;
    text-align: center;
  }
  
  .btn:active { transform: scale(0.9); }

  .btn-fly {
    flex: 2;
    background: linear-gradient(145deg, #2979ff, #0d47a1);
    box-shadow: 0 4px 12px rgba(41,121,255,0.4);
    font-size: 14px;
  }

  .btn-reset {
    background: linear-gradient(145deg, #d32f2f, #b71c1c);
    box-shadow: 0 4px 12px rgba(211,47,47,0.3);
    max-width: 70px;
  }
  
  .footer-info { font-size: 9px; color: #64748b; line-height: 1.4; }
  .footer-info a { color: #00ffcc; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🐦 الطائر المحطم</h2>
    <p>اضغط للطيران وحطم العوائق!</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="320" height="400"></canvas>
  </div>

  <div class="hud">
    <div class="score-display" id="scoreDisplay">🏆 0</div>
    <div class="best-display" id="bestDisplay">👑 0</div>
  </div>

  <div class="controls" dir="ltr">
    <button class="btn btn-fly" id="flyBtn">🐦 اضغط للطيران</button>
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
    const bestDisplay = document.getElementById('bestDisplay');
    
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

    const GRAVITY = 0.4;
    const FLAP_POWER = -7;
    const PIPE_WIDTH = 60;
    const PIPE_GAP = 130;
    const PIPE_SPEED = 3;
    
    let bird = {
      x: 80,
      y: canvas.height / 2,
      w: 30,
      h: 25,
      vy: 0
    };
    
    let pipes = [];
    let blocks = [];
    let particles = [];
    let score = 0;
    let bestScore = 0;
    let gameOver = false;
    let gameStarted = false;
    let animationId = null;
    let frames = 0;
    let pipeTimer = 0;
    
    try {
      bestScore = parseInt(localStorage.getItem('flappyBestScore')) || 0;
      bestDisplay.textContent = '👑 ' + bestScore;
    } catch(e) {}
    
    function createPipe() {
      const gapY = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
      
      pipes.push({
        x: canvas.width + 20,
        gapY: gapY,
        w: PIPE_WIDTH,
        gap: PIPE_GAP,
        passed: false
      });
    }
    
    function createBlock() {
      const x = Math.random() * (canvas.width - 100) + 50;
      const y = Math.random() * (canvas.height - 200) + 50;
      
      blocks.push({
        x: x, y: y, w: 40, h: 40,
        hp: 2,
        color: '#ffd700'
      });
    }
    
    function createParticles(x, y, color) {
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = 3 + Math.random() * 5;
        particles.push({
          x: x, y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30,
          color: color,
          size: 3 + Math.random() * 4
        });
      }
    }
    
    function drawBird() {
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(Math.min(Math.max(bird.vy * 0.05, -0.5), 0.5));
      
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(0, 0, bird.w / 2, bird.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffa502';
      ctx.beginPath();
      ctx.ellipse(-5, 0, 10, 8, -0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(8, -3, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(9, -3, 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(22, 2);
      ctx.lineTo(15, 4);
      ctx.fill();
      
      ctx.restore();
    }
    
    function drawPipes() {
      pipes.forEach(pipe => {
        ctx.fillStyle = '#2e7d32';
        ctx.fillRect(pipe.x, 0, pipe.w, pipe.gapY);
        ctx.fillStyle = '#1b5e20';
        ctx.fillRect(pipe.x - 3, pipe.gapY - 15, pipe.w + 6, 15);
        
        ctx.fillStyle = '#2e7d32';
        ctx.fillRect(pipe.x, pipe.gapY + pipe.gap, pipe.w, canvas.height - pipe.gapY - pipe.gap);
        ctx.fillStyle = '#1b5e20';
        ctx.fillRect(pipe.x - 3, pipe.gapY + pipe.gap, pipe.w + 6, 15);
      });
    }
    
    function drawBlocks() {
      blocks.forEach(block => {
        ctx.fillStyle = block.color;
        ctx.shadowColor = block.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(block.x, block.y, block.w, block.h);
        ctx.shadowBlur = 0;
        
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(block.x, block.y, block.w, block.h);
        
        ctx.fillStyle = '#fff';
        for (let i = 0; i < block.hp; i++) {
          ctx.fillRect(block.x + 5 + i * 15, block.y + 5, 8, 8);
        }
      });
    }
    
    function drawParticles() {
      particles.forEach(p => {
        const alpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;
      });
    }
    
    function updateGame() {
      if (!gameStarted || gameOver) return;
      
      frames++;
      bird.vy += GRAVITY;
      bird.y += bird.vy;
      
      if (bird.y < 0) { bird.y = 0; bird.vy = 0; }
      if (bird.y + bird.h > canvas.height) {
        gameOver = true;
        saveBestScore();
      }
      
      pipeTimer++;
      if (pipeTimer >= 100) {
        pipeTimer = 0;
        createPipe();
      }
      
      if (frames % 200 === 0 && blocks.length < 3) {
        createBlock();
      }
      
      pipes = pipes.filter(pipe => {
        pipe.x -= PIPE_SPEED;
        
        if (bird.x < pipe.x + pipe.w && bird.x + bird.w > pipe.x) {
          if (bird.y < pipe.gapY || bird.y + bird.h > pipe.gapY + pipe.gap) {
            gameOver = true;
            saveBestScore();
            return false;
          }
        }
        
        if (!pipe.passed && pipe.x + pipe.w < bird.x) {
          pipe.passed = true;
          score += 10;
          scoreDisplay.textContent = '🏆 ' + score;
        }
        
        return pipe.x > -pipe.w;
      });
      
      blocks = blocks.filter(block => {
        if (bird.x < block.x + block.w && bird.x + bird.w > block.x &&
            bird.y < block.y + block.h && bird.y + bird.h > block.y) {
          block.hp--;
          createParticles(block.x + block.w/2, block.y + block.h/2, block.color);
          
          if (block.hp <= 0) {
            score += 20;
            scoreDisplay.textContent = '🏆 ' + score;
            return false;
          }
        }
        return true;
      });
      
      particles = particles.filter(p => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.2; p.life--;
        return p.life > 0;
      });
    }
    
    function saveBestScore() {
      if (score > bestScore) {
        bestScore = score;
        bestDisplay.textContent = '👑 ' + bestScore;
        try { localStorage.setItem('flappyBestScore', bestScore); } catch(e) {}
      }
    }
    
    function draw() {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(0.7, '#b0e0e6');
      gradient.addColorStop(1, '#f0f8ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath();
      ctx.arc(50 + frames * 0.5 % canvas.width, 50, 20, 0, Math.PI * 2);
      ctx.arc(70 + frames * 0.5 % canvas.width, 45, 25, 0, Math.PI * 2);
      ctx.arc(90 + frames * 0.5 % canvas.width, 50, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(200 + frames * 0.3 % canvas.width, 80, 15, 0, Math.PI * 2);
      ctx.arc(215 + frames * 0.3 % canvas.width, 75, 20, 0, Math.PI * 2);
      ctx.arc(230 + frames * 0.3 % canvas.width, 80, 15, 0, Math.PI * 2);
      ctx.fill();
      
      drawPipes();
      drawBlocks();
      drawParticles();
      drawBird();
      
      if (!gameStarted && !gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🐦 اضغط للبدء!', canvas.width/2, canvas.height/2 - 20);
        ctx.font = '13px Arial';
        ctx.fillText('حطم الكتل الذهبية!', canvas.width/2, canvas.height/2 + 15);
      }
      
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff1744';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('💥 خسرت!', canvas.width/2, canvas.height/2 - 40);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 22px Arial';
        ctx.fillText('🏆 ' + score, canvas.width/2, canvas.height/2 + 5);
        ctx.fillStyle = '#81d4fa';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('👑 ' + bestScore, canvas.width/2, canvas.height/2 + 40);
        ctx.fillStyle = '#fff';
        ctx.font = '13px Arial';
        ctx.fillText('اضغط طيران', canvas.width/2, canvas.height/2 + 75);
      }
    }
    
    function flap() {
      if (gameOver) { resetGame(); return; }
      if (!gameStarted) gameStarted = true;
      bird.vy = FLAP_POWER;
    }
    
    function resetGame() {
      bird.y = canvas.height / 2;
      bird.vy = 0;
      pipes = [];
      blocks = [];
      particles = [];
      score = 0;
      gameOver = false;
      gameStarted = true;
      frames = 0;
      pipeTimer = 0;
      scoreDisplay.textContent = '🏆 0';
      
      if (animationId) cancelAnimationFrame(animationId);
      loop();
    }
    
    function loop() {
      updateGame();
      draw();
      animationId = requestAnimationFrame(loop);
    }
    
    document.getElementById('flyBtn').addEventListener('touchstart', e => { e.preventDefault(); flap(); }, { passive: false });
    document.getElementById('flyBtn').addEventListener('mousedown', e => { e.preventDefault(); flap(); });
    
    document.getElementById('resetBtn').addEventListener('touchstart', e => { e.preventDefault(); resetGame(); }, { passive: false });
    document.getElementById('resetBtn').addEventListener('mousedown', e => { e.preventDefault(); resetGame(); });
    
    canvas.addEventListener('touchstart', e => { e.preventDefault(); flap(); }, { passive: false });
    canvas.addEventListener('mousedown', e => { e.preventDefault(); flap(); });
    
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); flap(); }
    });
    
    loop();
  })();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'flappy-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'flappy-bird-isagi',
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
              { messageType: 2, messageText: '🐦 الطائر المحطم - جاهز!' }
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

handler.command = ['طائر', 'flappy', 'طيران', 'لعبة_طائر'];
handler.category = 'games';
handler.help = ['طائر', 'flappy'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;