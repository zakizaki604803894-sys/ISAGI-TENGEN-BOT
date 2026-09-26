/* ═══════════════════════════════════════════════════════════
   🎈 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة الفقاعات
   📁 /home/container/plugins/games/bubbles.js
   ✅ فقاعات ملونة + جزيئات + مستويات + وقت
   ✅ أزرار بالترتيب الصحيح | تصميم مصغّر
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
<title>🎈 لعبة الفقاعات</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    color: #fff; 
    font-family: 'Segoe UI', Tahoma, sans-serif; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    min-height: 100vh; 
    overflow: hidden;
    touch-action: none;
    padding: 6px;
  }
  
  .game-card { 
    width: 100%; 
    max-width: 340px; 
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px; 
    padding: 10px; 
    border: 2px solid rgba(255, 255, 255, 0.3); 
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .header h2 { 
    font-size: 18px; 
    color: #ffd700; 
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  .header p { 
    font-size: 10px; 
    color: #e0e0e0; 
    margin: 2px 0 0;
  }

  .canvas-container { 
    border-radius: 12px; 
    overflow: hidden; 
    background: linear-gradient(180deg, #87ceeb 0%, #b0e0e6 50%, #f0f8ff 100%);
    border: 2px solid rgba(255, 255, 255, 0.5);
    touch-action: none;
    width: 100%;
  }
  
  canvas { 
    display: block; 
    width: 100%;
    height: auto;
    touch-action: none;
  }

  .hud {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  
  .hud-item {
    background: rgba(255,255,255,0.15);
    padding: 6px;
    border-radius: 10px;
    font-size: 9px;
    font-weight: bold;
    border: 1px solid rgba(255,255,255,0.3);
    flex: 1;
    text-align: center;
  }

  .score-value { font-size: 16px; color: #ffd700; margin-top: 2px; }
  .level-value { font-size: 16px; color: #4ecdc4; margin-top: 2px; }
  .time-value { font-size: 16px; color: #ff6b6b; margin-top: 2px; }

  .controls {
    display: flex;
    gap: 6px;
    direction: ltr;
  }
  
  .btn {
    flex: 1;
    background: linear-gradient(145deg, #667eea, #764ba2);
    border: none;
    border-radius: 16px;
    padding: 10px;
    color: white;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.1s;
    text-align: center;
  }
  
  .btn:active { transform: scale(0.95); }

  .btn-pause {
    background: linear-gradient(145deg, #f093fb, #f5576c);
  }

  .btn-reset {
    background: linear-gradient(145deg, #4facfe, #00f2fe);
  }
  
  .footer-info { font-size: 9px; color: rgba(255,255,255,0.8); line-height: 1.4; }
  .footer-info a { color: #ffd700; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🎈 لعبة الفقاعات</h2>
    <p>انقر على الفقاعات لتفرقعها!</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="400" height="500"></canvas>
  </div>

  <div class="hud">
    <div class="hud-item">
      <div>النقاط</div>
      <div class="score-value" id="scoreDisplay">0</div>
    </div>
    <div class="hud-item">
      <div>المستوى</div>
      <div class="level-value" id="levelDisplay">1</div>
    </div>
    <div class="hud-item">
      <div>الوقت</div>
      <div class="time-value" id="timeDisplay">60</div>
    </div>
  </div>

  <div class="controls" dir="ltr">
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
    const scoreDisplay = document.getElementById('scoreDisplay');
    const levelDisplay = document.getElementById('levelDisplay');
    const timeDisplay = document.getElementById('timeDisplay');
    
    function resizeCanvas() {
      const container = canvas.parentElement;
      const containerWidth = container.clientWidth;
      if (containerWidth > 0) {
        const aspectRatio = 500 / 400;
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = (containerWidth * aspectRatio) + 'px';
      }
    }
    
    setTimeout(resizeCanvas, 50);
    window.addEventListener('resize', resizeCanvas);

    let score = 0;
    let level = 1;
    let timeLeft = 60;
    let gameActive = true;
    let isPaused = false;
    let animationId = null;
    let bubbles = [];
    let particles = [];
    let lastTime = Date.now();
    let bubbleSpawnTimer = 0;
    let bubbleSpeed = 1;
    
    const bubbleColors = [
      '#ff6b6b', '#4ecdc4', '#ffd700', '#ff9ff3', 
      '#54a0ff', '#5f27cd', '#ff9f43', '#00d2d3'
    ];
    
    function createBubble() {
      const radius = 20 + Math.random() * 25;
      return {
        x: Math.random() * (canvas.width - radius * 2) + radius,
        y: canvas.height + radius,
        radius: radius,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        speed: (1 + Math.random() * 2) * bubbleSpeed,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmount: 10 + Math.random() * 20
      };
    }
    
    function createParticles(x, y, color) {
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 * i) / 15;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30 + Math.random() * 20,
          color,
          radius: 2 + Math.random() * 3
        });
      }
    }
    
    function drawBubble(bubble) {
      ctx.save();
      
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      
      ctx.fillStyle = bubble.color;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      const gradient = ctx.createRadialGradient(
        bubble.x - bubble.radius * 0.3,
        bubble.y - bubble.radius * 0.3,
        bubble.radius * 0.1,
        bubble.x, bubble.y, bubble.radius
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.ellipse(
        bubble.x - bubble.radius * 0.3,
        bubble.y - bubble.radius * 0.3,
        bubble.radius * 0.2,
        bubble.radius * 0.15,
        -0.5, 0, Math.PI * 2
      );
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    }
    
    function drawParticles() {
      particles.forEach(p => {
        const alpha = p.life / 50;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }
    
    function updateBubbles() {
      bubbleSpawnTimer++;
      const spawnInterval = Math.max(20, 60 - level * 5);
      
      if (bubbleSpawnTimer >= spawnInterval && bubbles.length < 20) {
        bubbleSpawnTimer = 0;
        bubbles.push(createBubble());
      }
      
      bubbles = bubbles.filter(bubble => {
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * bubble.wobbleAmount * 0.02;
        return bubble.y > -bubble.radius * 2;
      });
      
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;
        return p.life > 0;
      });
    }
    
    function handleClick(x, y) {
      if (!gameActive || isPaused) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const canvasX = (x - rect.left) * scaleX;
      const canvasY = (y - rect.top) * scaleY;
      
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        const dx = canvasX - bubble.x;
        const dy = canvasY - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= bubble.radius) {
          createParticles(bubble.x, bubble.y, bubble.color);
          bubbles.splice(i, 1);
          
          const points = Math.floor(100 / bubble.radius * 10);
          score += points;
          scoreDisplay.textContent = score;
          
          if (score >= level * 500) {
            level++;
            levelDisplay.textContent = level;
            bubbleSpeed += 0.2;
            timeLeft = Math.min(60, timeLeft + 10);
            timeDisplay.textContent = timeLeft;
          }
          break;
        }
      }
    }
    
    function togglePause() {
      if (!gameActive) return;
      isPaused = !isPaused;
      const pauseBtn = document.getElementById('pauseBtn');
      pauseBtn.textContent = isPaused ? '▶️ استئناف' : '⏸️ إيقاف';
    }
    
    function resetGame() {
      score = 0;
      level = 1;
      timeLeft = 60;
      gameActive = true;
      isPaused = false;
      bubbles = [];
      particles = [];
      bubbleSpeed = 1;
      bubbleSpawnTimer = 0;
      
      scoreDisplay.textContent = '0';
      levelDisplay.textContent = '1';
      timeDisplay.textContent = '60';
      document.getElementById('pauseBtn').textContent = '⏸️ إيقاف';
      
      if (animationId) cancelAnimationFrame(animationId);
      lastTime = Date.now();
      loop();
    }
    
    canvas.addEventListener('click', function(e) {
      handleClick(e.clientX, e.clientY);
    });
    
    canvas.addEventListener('touchstart', function(e) {
      e.preventDefault();
      const touch = e.touches[0];
      handleClick(touch.clientX, touch.clientY);
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
    
    function loop() {
      if (!gameActive) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff1744';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('⏰ انتهى الوقت!', canvas.width/2, canvas.height/2 - 30);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('النقاط: ' + score, canvas.width/2, canvas.height/2 + 15);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText('اضغط إعادة', canvas.width/2, canvas.height/2 + 55);
        return;
      }
      
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      if (!isPaused) {
        if (deltaTime >= 1) {
          timeLeft--;
          timeDisplay.textContent = timeLeft;
          if (timeLeft <= 0) gameActive = false;
        }
        updateBubbles();
      }
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(0.5, '#b0e0e6');
      gradient.addColorStop(1, '#f0f8ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(drawBubble);
      drawParticles();
      
      if (isPaused) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⏸️ إيقاف مؤقت', canvas.width/2, canvas.height/2);
      }
      
      animationId = requestAnimationFrame(loop);
    }
    
    resetGame();
  })();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'bubbles-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'bubble-pop-isagi',
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
              { messageType: 2, messageText: '🎈 لعبة الفقاعات - جاهزة!' }
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

handler.command = ['فقاعات', 'bubble', 'bubbles', 'لعبة_فقاعات'];
handler.category = 'games';
handler.help = ['فقاعات', 'bubble'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;