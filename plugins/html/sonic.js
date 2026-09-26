/* ═══════════════════════════════════════════════════════════
   🦔 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — سونيك: الجري اللامتناهي
   📁 /home/container/plugins/games/sonic.js
   ✅ قفزة مزدوجة | حلقات ذهبية | عقبات متنوعة
   ✅ أزرار بالترتيب الصحيح | جودة عالية
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
<title>🦔 سونيك</title>
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
    border-bottom: 10px solid #1a5a9a; 
    border-radius: 5px; 
    overflow: hidden; 
    background: #5c94fc;
    touch-action: none;
    width: 100%;
  }
  
  canvas { 
    background: #5c94fc; 
    display: block; 
    width: 100%;
    height: auto;
    touch-action: none;
  }

  /* ✅ أزرار LTR */
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    direction: ltr;
  }
  
  .btn {
    flex: 1;
    background: linear-gradient(145deg, #2a3a5a, #1a2a4a);
    border: none;
    border-radius: 20px;
    padding: 10px 6px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.1s ease;
    text-align: center;
  }
  
  .btn:active { transform: scale(0.92); }
  
  .btn-jump {
    flex: 2;
    background: linear-gradient(145deg, #2979ff, #0d47a1);
    box-shadow: 0 4px 12px rgba(41,121,255,0.4);
    font-size: 14px;
  }
  
  .btn-reset {
    background: linear-gradient(145deg, #d32f2f, #b71c1c);
    box-shadow: 0 4px 12px rgba(211,47,47,0.3);
  }

  .score-display {
    background: rgba(0,0,0,0.4);
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    color: #ffd700;
    min-width: 55px;
    text-align: center;
  }
  
  .footer-info { font-size: 9px; color: #64748b; line-height: 1.4; }
  .footer-info a { color: #00ffcc; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🦔 سونيك</h2>
    <p>اقفز لتتجاوز العقبات! قفزة مزدوجة متاحة</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="320" height="400"></canvas>
  </div>

  <div class="controls" dir="ltr">
    <div class="score-display" id="scoreDisplay">🏆 0</div>
    <button class="btn btn-jump" id="jumpBtn">⬆ قفز</button>
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

    const GRAVITY = 0.6;
    const JUMP_POWER = -11;
    const DOUBLE_JUMP_POWER = -9;
    const OBSTACLE_SPEED = 4;
    const GROUND_Y = 350;
    const PLAYER_X = 60;

    let score = 0;
    let frames = 0;
    let gameOver = false;
    let animationId = null;
    let obstacles = [];
    let rings = [];
    let speed = OBSTACLE_SPEED;
    let obstacleTimer = 0;

    const player = {
      x: PLAYER_X,
      y: GROUND_Y - 40,
      w: 30,
      h: 40,
      vy: 0,
      onGround: true,
      jumps: 0,
      maxJumps: 2,
      
      draw() {
        ctx.save();
        
        /* جسم سونيك */
        ctx.fillStyle = '#1a5adf';
        ctx.beginPath();
        ctx.ellipse(this.x + 15, this.y + 15, 16, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        
        /* الرأس */
        ctx.beginPath();
        ctx.arc(this.x + 15, this.y + 8, 12, 0, Math.PI * 2);
        ctx.fill();
        
        /* العين */
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(this.x + 20, this.y + 6, 6, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.arc(this.x + 22, this.y + 6, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x + 23, this.y + 4, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        /* الأنف */
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(this.x + 27, this.y + 9, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        /* الابتسامة */
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(this.x + 22, this.y + 12, 5, 0.1, Math.PI - 0.1);
        ctx.stroke();
        
        /* الساقين */
        if (!this.onGround) {
          ctx.fillStyle = '#1a5adf';
          ctx.fillRect(this.x + 4, this.y + 28, 6, 12);
          ctx.fillRect(this.x + 20, this.y + 28, 6, 12);
          ctx.fillStyle = '#d32f2f';
          ctx.fillRect(this.x + 2, this.y + 38, 10, 4);
          ctx.fillRect(this.x + 18, this.y + 38, 10, 4);
        } else {
          const legOffset = Math.floor(frames / 6) % 4;
          ctx.fillStyle = '#1a5adf';
          if (legOffset < 2) {
            ctx.fillRect(this.x + 2, this.y + 28, 6, 12);
            ctx.fillRect(this.x + 22, this.y + 28, 6, 10);
          } else {
            ctx.fillRect(this.x + 6, this.y + 28, 6, 10);
            ctx.fillRect(this.x + 18, this.y + 28, 6, 12);
          }
          ctx.fillStyle = '#d32f2f';
          ctx.fillRect(this.x, this.y + 38, 10, 4);
          ctx.fillRect(this.x + 20, this.y + 38, 10, 4);
        }
        
        /* الأيدي */
        ctx.fillStyle = '#1a5adf';
        ctx.fillRect(this.x - 2, this.y + 14, 4, 6);
        ctx.fillRect(this.x + 28, this.y + 14, 4, 6);
        
        /* القفازات */
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x - 3, this.y + 18, 6, 4);
        ctx.fillRect(this.x + 27, this.y + 18, 6, 4);
        
        /* زر السونيك */
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(this.x + 18, this.y + 20, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      },
      
      update() {
        this.vy += GRAVITY;
        this.y += this.vy;
        
        if (this.y >= GROUND_Y - this.h) {
          this.y = GROUND_Y - this.h;
          this.vy = 0;
          this.onGround = true;
          this.jumps = 0;
        } else {
          this.onGround = false;
        }
        
        if (this.y < -20) {
          this.y = -20;
          this.vy = 0;
        }
      },
      
      jump() {
        if (this.jumps < this.maxJumps) {
          this.vy = this.jumps === 0 ? JUMP_POWER : DOUBLE_JUMP_POWER;
          this.jumps++;
          this.onGround = false;
          return true;
        }
        return false;
      },
      
      reset() {
        this.y = GROUND_Y - this.h;
        this.vy = 0;
        this.onGround = true;
        this.jumps = 0;
      }
    };

    function createObstacle() {
      const types = ['cactus', 'cactus', 'bird'];
      const type = types[Math.floor(Math.random() * types.length)];
      const height = type === 'bird' ? 25 : 30 + Math.random() * 20;
      
      return {
        x: canvas.width + 20,
        y: type === 'bird' ? GROUND_Y - 80 - Math.random() * 40 : GROUND_Y - height,
        w: type === 'bird' ? 30 : 20,
        h: height,
        type: type,
        passed: false
      };
    }

    function createRing() {
      return {
        x: canvas.width + Math.random() * 200,
        y: GROUND_Y - 50 - Math.random() * 60,
        r: 8,
        collected: false
      };
    }

    function drawObstacle(obs) {
      if (obs.type === 'cactus') {
        ctx.fillStyle = '#2e7d32';
        ctx.fillRect(obs.x + 5, obs.y + 10, 10, obs.h - 10);
        ctx.fillRect(obs.x, obs.y + 15, 5, 8);
        ctx.fillRect(obs.x + 15, obs.y + 20, 5, 10);
        ctx.fillRect(obs.x, obs.y + 30, 5, 6);
        ctx.fillStyle = '#1b5e20';
        ctx.fillRect(obs.x + 3, obs.y + obs.h - 2, 14, 3);
      } else {
        ctx.fillStyle = '#f44336';
        ctx.beginPath();
        ctx.ellipse(obs.x + 15, obs.y + 12, 15, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffccbc';
        ctx.beginPath();
        ctx.arc(obs.x + 20, obs.y + 6, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#222';
        ctx.fillRect(obs.x + 14, obs.y + 2, 12, 2);
        ctx.fillRect(obs.x + 13, obs.y + 1, 4, 4);
        ctx.fillRect(obs.x + 23, obs.y + 1, 4, 4);
        ctx.fillStyle = '#b71c1c';
        const wingAngle = Math.sin(frames / 20) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.ellipse(obs.x - 2, obs.y + 8, 12 * wingAngle, 6, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(obs.x + 32, obs.y + 8, 12 * wingAngle, 6, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawRing(ring) {
      ctx.save();
      ctx.translate(ring.x, ring.y);
      const scaleX = Math.abs(Math.cos(frames / 30 + ring.x / 50));
      ctx.scale(scaleX, 1);
      
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f9a825';
      ctx.beginPath();
      ctx.arc(0, 0, ring.r - 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(0, 0, ring.r - 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#4fc3f7');
      gradient.addColorStop(0.6, '#81d4fa');
      gradient.addColorStop(1, '#b3e5fc');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(46,125,50,0.2)';
      ctx.beginPath();
      ctx.ellipse(80 + frames * 0.1 % 300, GROUND_Y + 10, 120, 50, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(250 + frames * 0.15 % 400, GROUND_Y + 5, 100, 45, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
      ctx.fillStyle = '#388e3c';
      ctx.fillRect(0, GROUND_Y, canvas.width, 4);
      
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const x = (i * 70 + frames * 2 * speed / OBSTACLE_SPEED) % (canvas.width + 50) - 25;
        ctx.beginPath();
        ctx.moveTo(x, GROUND_Y + 10 + i * 8);
        ctx.lineTo(x + 20, GROUND_Y + 10 + i * 8);
        ctx.stroke();
      }
    }

    function handleJump(e) {
      if (e) e.preventDefault();
      if (gameOver) { resetGame(); return; }
      player.jump();
    }

    function resetGame() {
      player.reset();
      obstacles = [];
      rings = [];
      score = 0;
      frames = 0;
      gameOver = false;
      speed = OBSTACLE_SPEED;
      obstacleTimer = 0;
      scoreDisplay.textContent = '🏆 0';
      if (animationId) cancelAnimationFrame(animationId);
      loop();
    }

    document.getElementById('jumpBtn').addEventListener('touchstart', e => { e.preventDefault(); handleJump(e); }, { passive: false });
    document.getElementById('jumpBtn').addEventListener('mousedown', e => { e.preventDefault(); handleJump(e); });
    
    document.getElementById('resetBtn').addEventListener('touchstart', e => { e.preventDefault(); resetGame(); }, { passive: false });
    document.getElementById('resetBtn').addEventListener('mousedown', e => { e.preventDefault(); resetGame(); });

    canvas.addEventListener('touchstart', e => { e.preventDefault(); handleJump(e); }, { passive: false });
    canvas.addEventListener('mousedown', e => { e.preventDefault(); handleJump(e); });
    
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); handleJump(); }
    });

    function loop() {
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff1744';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('💀 خسرت!', canvas.width/2, canvas.height/2 - 30);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 22px Arial';
        ctx.fillText('🏆 ' + score, canvas.width/2, canvas.height/2 + 20);
        ctx.fillStyle = '#81d4fa';
        ctx.font = '13px Arial';
        ctx.fillText('اضغط قفز للبدء', canvas.width/2, canvas.height/2 + 60);
        return;
      }
      
      frames++;
      
      if (frames % 300 === 0 && speed < 8) {
        speed += 0.2;
      }
      
      obstacleTimer++;
      const spawnInterval = Math.max(60, 150 - speed * 5);
      if (obstacleTimer >= spawnInterval) {
        obstacleTimer = 0;
        obstacles.push(createObstacle());
        if (Math.random() < 0.2) {
          rings.push(createRing());
        }
      }
      
      player.update();
      
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= speed;
        
        if (player.x < obs.x + obs.w && player.x + player.w > obs.x &&
            player.y < obs.y + obs.h && player.y + player.h > obs.y) {
          gameOver = true;
          break;
        }
        
        if (obs.x + obs.w < 0) obstacles.splice(i, 1);
      }
      
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.x -= speed;
        
        if (!ring.collected) {
          const dx = (player.x + player.w/2) - ring.x;
          const dy = (player.y + player.h/2) - ring.y;
          if (Math.sqrt(dx*dx + dy*dy) < ring.r + 20) {
            ring.collected = true;
            score += 10;
            scoreDisplay.textContent = '🏆 ' + score;
          }
        }
        
        if (ring.x + ring.r < 0) rings.splice(i, 1);
      }
      
      drawBackground();
      
      rings.forEach(ring => { if (!ring.collected) drawRing(ring); });
      obstacles.forEach(obs => drawObstacle(obs));
      player.draw();
      
      /* HUD داخلي */
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(10, 8, 110, 26);
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('🦔 ' + score, 20, 26);
      
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(canvas.width - 75, 8, 65, 20);
      ctx.fillStyle = '#81d4fa';
      ctx.font = '11px Arial';
      ctx.textAlign = 'right';
      ctx.fillText('⚡ x' + (speed / OBSTACLE_SPEED).toFixed(1), canvas.width - 12, 23);
      
      if (!gameOver) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('قفزات: ' + (player.maxJumps - player.jumps), 20, 40);
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

  const uniqueId = 'sonic-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'sonic-runner-isagi',
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
              { messageType: 2, messageText: '🦔 سونيك - جاهز للجري!' }
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

handler.command = ['سونيك', 'sonic', 'لعبة_سونيك'];
handler.category = 'games';
handler.help = ['سونيك', 'sonic'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;