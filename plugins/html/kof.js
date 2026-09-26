/* ═══════════════════════════════════════════════════════════
   🥊 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة KOF 2000 (HTML تفاعلية)
   📁 /home/container/plugins/games/kof.js
   ✅ صفحة HTML كاملة تعمل داخل واتساب
   ✅ أزرار تحكم + رسم Canvas
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
   🎮 صفحة HTML — KOF 2000
   ═══════════════════════════════════════════ */
const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🥊 KOF 2000 - ملك القتال</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { background: #0a0a0a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; overflow: hidden; }
  
  .game-card { 
    width: 100%; 
    max-width: 350px; 
    background: linear-gradient(145deg, #1a0000, #2a0000);
    border-radius: 12px; 
    padding: 15px; 
    border: 2px solid #ff0000; 
    box-shadow: 0 0 30px rgba(255,0,0,0.5); 
    margin-top: 10px; 
    text-align: center; 
  }
  
  .header h2 { 
    font-size: 22px; 
    color: #ff0000; 
    margin-bottom: 5px;
    text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
    animation: titleGlow 1s infinite;
  }
  
  @keyframes titleGlow {
    0%, 100% { text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000; }
    50% { text-shadow: 0 0 30px #ff0000, 0 0 60px #ff0000, 0 0 80px #ff0000; }
  }
  
  .header p { font-size: 11px; color: #ff6666; font-weight: bold; margin-bottom: 10px; }

  .canvas-container { 
    border-radius: 5px; 
    overflow: hidden; 
    background: #1a1a1a;
    touch-action: none;
    border: 2px solid #ff0000;
  }
  
  canvas { 
    background: #1a1a1a; 
    display: block; 
    width: 100%;
    height: auto;
    touch-action: none;
  }

  .hud {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    gap: 8px;
  }

  .health-container {
    flex: 1;
    background: rgba(0,0,0,0.5);
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #ff0000;
  }

  .health-label {
    font-size: 10px;
    margin-bottom: 3px;
    text-align: right;
  }

  .health-bar {
    width: 100%;
    height: 12px;
    background: #333;
    border-radius: 6px;
    overflow: hidden;
  }

  .health-fill {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 6px;
  }

  .health-player { background: linear-gradient(90deg, #00ff00, #00cc00); }
  .health-enemy { background: linear-gradient(90deg, #ff0000, #cc0000); }

  .timer-display {
    background: rgba(0,0,0,0.5);
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #ffd700;
    border: 1px solid #ffd700;
  }

  .controls { display: flex; flex-direction: column; align-items: center; margin-top: 10px; gap: 5px; }
  .controls-row { display: flex; gap: 8px; width: 100%; justify-content: center; }
  
  .btn {
    flex: 1;
    max-width: 80px;
    background: linear-gradient(145deg, #2a0000, #1a0000);
    border: 1px solid #ff0000;
    border-radius: 15px;
    padding: 12px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;
    box-shadow: 0 4px 15px rgba(255,0,0,0.3);
    transition: all 0.1s ease;
    text-align: center;
  }
  
  .btn:active { transform: scale(0.9); box-shadow: 0 0 25px rgba(255,0,0,0.6); }
  .btn-punch { background: linear-gradient(145deg, #ff4500, #cc0000); font-size: 20px; }
  .btn-kick { background: linear-gradient(145deg, #ff6600, #cc3300); font-size: 20px; }
  .btn-special { background: linear-gradient(145deg, #ff0000, #990000); font-size: 20px; box-shadow: 0 0 20px rgba(255,0,0,0.6); }
  .btn-reset { background: linear-gradient(145deg, #333, #111); font-size: 13px; max-width: 100px; padding: 10px; border-color: #666; }
  
  .footer-info { margin-top: 15px; font-size: 10px; color: #666; line-height: 1.6; }
  .footer-info a { color: #ff0000; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🥊 KOF 2000</h2>
    <p>ملك القتال - هزم خصمك!</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="320" height="350"></canvas>
  </div>

  <div class="hud">
    <div class="health-container">
      <div class="health-label" style="color: #00ff00;">أنت</div>
      <div class="health-bar">
        <div class="health-fill health-player" id="playerHealth" style="width: 100%"></div>
      </div>
    </div>
    <div class="timer-display" id="timerDisplay">60</div>
    <div class="health-container">
      <div class="health-label" style="color: #ff0000;">الخصم</div>
      <div class="health-bar">
        <div class="health-fill health-enemy" id="enemyHealth" style="width: 100%"></div>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="controls-row">
      <button class="btn" id="leftBtn">⬅️</button>
      <button class="btn btn-punch" id="punchBtn">👊</button>
      <button class="btn btn-kick" id="kickBtn">🦶</button>
      <button class="btn" id="rightBtn">➡️</button>
    </div>
    <div class="controls-row">
      <button class="btn btn-special" id="specialBtn">💥</button>
      <button class="btn btn-reset" id="resetBtn">🔄</button>
    </div>
  </div>

  <div class="footer-info">
    👑 ISAGI TENGEN BOT<br>
    قناتي: <a href="${BRAND.channelLink}" target="_blank">انضم الآن</a>
  </div>
</div>

<script>
  (function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const playerHealthEl = document.getElementById('playerHealth');
    const enemyHealthEl = document.getElementById('enemyHealth');
    const timerDisplay = document.getElementById('timerDisplay');
    
    function resizeCanvas() {
      const container = canvas.parentElement;
      const containerWidth = container.clientWidth;
      if (containerWidth > 0) {
        const aspectRatio = 350 / 320;
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = (containerWidth * aspectRatio) + 'px';
      }
    }
    
    setTimeout(resizeCanvas, 50);
    window.addEventListener('resize', resizeCanvas);

    const GROUND_Y = 300;
    const FIGHTER_WIDTH = 40;
    const FIGHTER_HEIGHT = 60;
    
    let player = {
      x: 50, y: GROUND_Y - FIGHTER_HEIGHT,
      w: FIGHTER_WIDTH, h: FIGHTER_HEIGHT,
      health: 100, vy: 0, onGround: true,
      attacking: false, attackType: '', attackTimer: 0,
      direction: 1, color: '#00aaff'
    };
    
    let enemy = {
      x: 230, y: GROUND_Y - FIGHTER_HEIGHT,
      w: FIGHTER_WIDTH, h: FIGHTER_HEIGHT,
      health: 100, vy: 0, onGround: true,
      attacking: false, attackType: '', attackTimer: 0,
      direction: -1, color: '#ff4444'
    };
    
    let particles = [];
    let gameOver = false;
    let animationId = null;
    let timer = 60;
    let lastTime = 0;
    let keys = { left: false, right: false };
    
    function createParticles(x, y, color) {
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 * i) / 15;
        const speed = 2 + Math.random() * 4;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 20, color,
          size: 3 + Math.random() * 3
        });
      }
    }
    
    function drawFighter(fighter, isPlayer) {
      ctx.save();
      ctx.translate(fighter.x + fighter.w/2, fighter.y + fighter.h/2);
      ctx.scale(fighter.direction, 1);
      ctx.translate(-(fighter.x + fighter.w/2), -(fighter.y + fighter.h/2));
      
      ctx.fillStyle = fighter.color;
      ctx.shadowColor = fighter.color;
      ctx.shadowBlur = 10;
      
      ctx.fillRect(fighter.x + 10, fighter.y, 20, 20);
      ctx.fillRect(fighter.x + 5, fighter.y + 20, 30, 25);
      
      if (!fighter.onGround) {
        ctx.fillRect(fighter.x + 8, fighter.y + 45, 10, 15);
        ctx.fillRect(fighter.x + 22, fighter.y + 45, 10, 10);
      } else {
        ctx.fillRect(fighter.x + 8, fighter.y + 45, 10, 15);
        ctx.fillRect(fighter.x + 22, fighter.y + 45, 10, 15);
      }
      
      if (fighter.attacking) {
        ctx.fillRect(fighter.x + 30, fighter.y + 22, 20, 8);
      } else {
        ctx.fillRect(fighter.x + 30, fighter.y + 22, 10, 8);
      }
      
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.fillRect(fighter.x + 22, fighter.y + 5, 5, 5);
      ctx.fillStyle = '#000';
      ctx.fillRect(fighter.x + 23, fighter.y + 6, 3, 3);
      
      ctx.restore();
    }
    
    function drawParticles() {
      particles.forEach(p => {
        const alpha = p.life / 20;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;
      });
    }
    
    function performAttack(attacker, defender, type) {
      if (attacker.attacking || gameOver) return;
      
      attacker.attacking = true;
      attacker.attackType = type;
      attacker.attackTimer = 10;
      
      const distance = Math.abs(attacker.x - defender.x);
      const range = type === 'special' ? 100 : 50;
      
      if (distance < range) {
        let damage = 5;
        if (type === 'kick') damage = 8;
        if (type === 'special') damage = 15;
        
        defender.health -= damage;
        createParticles(defender.x + defender.w/2, defender.y + defender.h/2, '#ffd700');
        
        if (defender === player) {
          playerHealthEl.style.width = Math.max(0, player.health) + '%';
        } else {
          enemyHealthEl.style.width = Math.max(0, enemy.health) + '%';
        }
        
        if (defender.health <= 0) gameOver = true;
      }
    }
    
    function updateGame() {
      if (gameOver) return;
      
      const moveSpeed = 4;
      if (keys.left && player.x > 0) { player.x -= moveSpeed; player.direction = -1; }
      if (keys.right && player.x + player.w < canvas.width) { player.x += moveSpeed; player.direction = 1; }
      
      if (player.attacking) {
        player.attackTimer--;
        if (player.attackTimer <= 0) player.attacking = false;
      }
      
      if (!enemy.attacking && !gameOver) {
        const distance = enemy.x - player.x;
        
        if (distance > 50) { enemy.x -= 2; enemy.direction = -1; }
        else if (distance < -50) { enemy.x += 2; enemy.direction = 1; }
        else {
          const attackType = Math.random() < 0.3 ? 'special' : (Math.random() < 0.5 ? 'punch' : 'kick');
          performAttack(enemy, player, attackType);
        }
      }
      
      if (enemy.attacking) {
        enemy.attackTimer--;
        if (enemy.attackTimer <= 0) enemy.attacking = false;
      }
      
      particles = particles.filter(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life--;
        return p.life > 0;
      });
      
      if (Math.floor(Date.now() / 1000) !== lastTime) {
        lastTime = Math.floor(Date.now() / 1000);
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) gameOver = true;
      }
    }
    
    function draw() {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#2a1a1a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#333';
      ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
      ctx.fillStyle = '#444';
      ctx.fillRect(0, GROUND_Y, canvas.width, 3);
      
      drawParticles();
      drawFighter(player, true);
      drawFighter(enemy, false);
      
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        
        let message = '⏰ انتهى الوقت!';
        let color = '#ffd700';
        
        if (player.health <= 0) { message = '💀 خسرت!'; color = '#ff0000'; }
        else if (enemy.health <= 0) { message = '🏆 فزت!'; color = '#00ff00'; }
        
        ctx.fillStyle = color;
        ctx.font = 'bold 35px Arial';
        ctx.fillText(message, canvas.width/2, canvas.height/2);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText('اضغط "إعادة" للعب', canvas.width/2, canvas.height/2 + 40);
        ctx.shadowBlur = 0;
      }
    }
    
    function resetGame() {
      player.x = 50;
      player.y = GROUND_Y - FIGHTER_HEIGHT;
      player.health = 100;
      player.attacking = false;
      player.direction = 1;
      
      enemy.x = 230;
      enemy.y = GROUND_Y - FIGHTER_HEIGHT;
      enemy.health = 100;
      enemy.attacking = false;
      enemy.direction = -1;
      
      particles = [];
      gameOver = false;
      timer = 60;
      lastTime = Math.floor(Date.now() / 1000);
      timerDisplay.textContent = '60';
      playerHealthEl.style.width = '100%';
      enemyHealthEl.style.width = '100%';
      
      if (animationId) cancelAnimationFrame(animationId);
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
    
    document.getElementById('leftBtn').addEventListener('touchstart', e => { e.preventDefault(); moveLeft(); });
    document.getElementById('leftBtn').addEventListener('touchend', e => { e.preventDefault(); stopLeft(); });
    document.getElementById('leftBtn').addEventListener('mousedown', e => { e.preventDefault(); moveLeft(); });
    document.getElementById('leftBtn').addEventListener('mouseup', e => { e.preventDefault(); stopLeft(); });
    
    document.getElementById('rightBtn').addEventListener('touchstart', e => { e.preventDefault(); moveRight(); });
    document.getElementById('rightBtn').addEventListener('touchend', e => { e.preventDefault(); stopRight(); });
    document.getElementById('rightBtn').addEventListener('mousedown', e => { e.preventDefault(); moveRight(); });
    document.getElementById('rightBtn').addEventListener('mouseup', e => { e.preventDefault(); stopRight(); });
    
    document.getElementById('punchBtn').addEventListener('touchstart', e => { e.preventDefault(); performAttack(player, enemy, 'punch'); });
    document.getElementById('punchBtn').addEventListener('mousedown', e => { e.preventDefault(); performAttack(player, enemy, 'punch'); });
    
    document.getElementById('kickBtn').addEventListener('touchstart', e => { e.preventDefault(); performAttack(player, enemy, 'kick'); });
    document.getElementById('kickBtn').addEventListener('mousedown', e => { e.preventDefault(); performAttack(player, enemy, 'kick'); });
    
    document.getElementById('specialBtn').addEventListener('touchstart', e => { e.preventDefault(); performAttack(player, enemy, 'special'); });
    document.getElementById('specialBtn').addEventListener('mousedown', e => { e.preventDefault(); performAttack(player, enemy, 'special'); });
    
    document.getElementById('resetBtn').addEventListener('touchstart', e => { e.preventDefault(); resetGame(); });
    document.getElementById('resetBtn').addEventListener('mousedown', e => { e.preventDefault(); resetGame(); });
    
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
      if (e.key === 'a' || e.key === 'A') performAttack(player, enemy, 'punch');
      if (e.key === 's' || e.key === 'S') performAttack(player, enemy, 'kick');
      if (e.key === 'd' || e.key === 'D') performAttack(player, enemy, 'special');
    });
    
    document.addEventListener('keyup', e => {
      if (e.key === 'ArrowLeft') stopLeft();
      if (e.key === 'ArrowRight') stopRight();
    });
    
    lastTime = Math.floor(Date.now() / 1000);
    loop();
  })();
</script>
</body>
</html>`;

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'kof2000-fighting-game',
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
          botResponseId: 'kof2000-response',
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
                messageText: '🥊 KOF 2000 - ملك القتال!'
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
handler.command = ['kof', 'قتال', 'kof2000', 'لعبة_قتال'];
handler.category = 'games';
handler.help = ['kof', 'قتال', 'kof2000'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;