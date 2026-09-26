/* ═══════════════════════════════════════════════════════════
   🎾 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة تنس ضد الذكاء الاصطناعي
   📁 /home/container/plugins/games/tennis.js
   ✅ تنس ضد AI | أزرار تحكم | لمس على الشاشة
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
   🎮 HTML — تنس
   ═══════════════════════════════════════════ */
const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🎾 تنس - ISAGI BOT</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { background: #0a0f16; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; min-height: 100vh; overflow: hidden; }
  
  .game-card { width: 100%; max-width: 380px; background: #141c26; border-radius: 16px; padding: 15px; border: 1px solid #2a3a4a; box-shadow: 0 8px 30px rgba(0,0,0,0.7); margin-top: 10px; }
  
  .header { text-align: center; margin-bottom: 12px; }
  .header h2 { font-size: 20px; color: #ffcc00; text-shadow: 0 0 20px rgba(255,204,0,0.2); letter-spacing: 1px; }
  .header p { font-size: 11px; color: #7f8c8d; margin-top: 4px; }

  .game-container { display: flex; justify-content: center; background: #0a0f16; border-radius: 10px; padding: 4px; border: 1px solid #1e2d3d; }
  canvas { background: #0d1420; border-radius: 6px; display: block; touch-action: none; }

  .controls { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; gap: 10px; }
  .ctrl-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 22px; font-weight: bold; cursor: pointer; touch-action: manipulation; }
  .btn-left { background: #1a2a3a; color: #00ffcc; border: 1px solid #00ffcc44; }
  .btn-left:active { background: #00ffcc22; transform: scale(0.95); }
  .btn-right { background: #1a2a3a; color: #ffcc00; border: 1px solid #ffcc0044; }
  .btn-right:active { background: #ffcc0022; transform: scale(0.95); }
  .btn-reset { background: #2a1a2a; color: #ff4466; border: 1px solid #ff446644; padding: 12px 20px; }
  .btn-reset:active { background: #ff446622; transform: scale(0.95); }

  .score-board { display: flex; justify-content: center; gap: 40px; margin-bottom: 8px; font-size: 18px; font-weight: bold; }
  .score-ai { color: #ff4466; }
  .score-player { color: #00ffcc; }

  .footer-info { margin-top: 12px; font-size: 10px; color: #4a5a6a; text-align: center; line-height: 1.6; }
  .footer-info a { color: #3b82f6; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🎾 تنس ضد الذكاء الاصطناعي</h2>
    <p>🍁 ISAGI TENGEN BOT - ملك اللعبة</p>
  </div>

  <div class="score-board">
    <span class="score-ai">🤖 <span id="aiScore">0</span></span>
    <span class="score-player">👤 <span id="playerScore">0</span></span>
  </div>

  <div class="game-container">
    <canvas id="gameCanvas" width="340" height="420"></canvas>
  </div>

  <div class="controls">
    <button class="ctrl-btn btn-left" id="leftBtn">◀</button>
    <button class="ctrl-btn btn-reset" id="resetBtn">🔄</button>
    <button class="ctrl-btn btn-right" id="rightBtn">▶</button>
  </div>

  <div class="footer-info">
    🍁 👑 ISAGI TENGEN BOT 👑 🍁<br>
    <a href="${BRAND.channelLink}" target="_blank">📢 قناة البوت</a>
  </div>
</div>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const aiScoreEl = document.getElementById('aiScore');
  const playerScoreEl = document.getElementById('playerScore');
  
  const width = canvas.width;
  const height = canvas.height;

  const PADDLE_WIDTH = 70;
  const PADDLE_HEIGHT = 12;
  const BALL_RADIUS = 7;
  const PADDLE_SPEED = 8;
  const BALL_SPEED_INITIAL = 4.5;
  const BALL_SPEED_MAX = 10;
  const AI_SPEED = 4.2;

  let player = {
    x: width/2 - PADDLE_WIDTH/2,
    y: height - 25,
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    score: 0,
    color: '#00ffcc',
    speed: PADDLE_SPEED
  };

  let ai = {
    x: width/2 - PADDLE_WIDTH/2,
    y: 12,
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    score: 0,
    color: '#ff4466'
  };

  let ball = {
    x: width/2,
    y: height/2,
    r: BALL_RADIUS,
    dx: BALL_SPEED_INITIAL * (Math.random() > 0.5 ? 1 : -1),
    dy: BALL_SPEED_INITIAL,
    speed: BALL_SPEED_INITIAL,
    color: '#ffffff'
  };

  let keys = { left: false, right: false };

  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillRect(x, y, w, h);
    ctx.shadowBlur = 0;
  }

  function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function drawCenterLine() {
    ctx.strokeStyle = '#2a3a4a';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function update() {
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > width) player.x = width - player.w;

    let aiCenter = ai.x + ai.w/2;
    let predictX = ball.x;
    if (ball.dy < 0) {
      let timeToReach = (ai.y - ball.y) / ball.dy;
      if (timeToReach > 0) {
        predictX = ball.x + ball.dx * timeToReach;
        let error = (Math.random() - 0.5) * 15;
        predictX += error;
      }
    }

    if (aiCenter < predictX - 8) ai.x += AI_SPEED;
    else if (aiCenter > predictX + 8) ai.x -= AI_SPEED;
    if (ai.x < 0) ai.x = 0;
    if (ai.x + ai.w > width) ai.x = width - ai.w;

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.r < 0 || ball.x + ball.r > width) {
      ball.dx = -ball.dx;
    }

    if (ball.dy > 0 &&
        ball.y + ball.r > player.y &&
        ball.y + ball.r < player.y + player.h + 10 &&
        ball.x > player.x - ball.r &&
        ball.x < player.x + player.w + ball.r) {
      
      let collideX = (ball.x - (player.x + player.w/2)) / (player.w/2);
      ball.dx = collideX * 6;
      ball.dy = -ball.dy;
      ball.speed = Math.min(ball.speed + 0.15, BALL_SPEED_MAX);
      let speed = Math.sqrt(ball.dx*ball.dx + ball.dy*ball.dy);
      if (speed > 0) {
        ball.dx = (ball.dx / speed) * ball.speed;
        ball.dy = (ball.dy / speed) * ball.speed;
      }
    }

    if (ball.dy < 0 &&
        ball.y - ball.r < ai.y + ai.h &&
        ball.y - ball.r > ai.y - 10 &&
        ball.x > ai.x - ball.r &&
        ball.x < ai.x + ai.w + ball.r) {
      
      let collideX = (ball.x - (ai.x + ai.w/2)) / (ai.w/2);
      ball.dx = collideX * 6;
      ball.dy = -ball.dy;
      ball.speed = Math.min(ball.speed + 0.1, BALL_SPEED_MAX);
      let speed = Math.sqrt(ball.dx*ball.dx + ball.dy*ball.dy);
      if (speed > 0) {
        ball.dx = (ball.dx / speed) * ball.speed;
        ball.dy = (ball.dy / speed) * ball.speed;
      }
    }

    if (ball.y - ball.r < 0) {
      player.score++;
      playerScoreEl.textContent = player.score;
      resetBall();
    }
    if (ball.y + ball.r > height) {
      ai.score++;
      aiScoreEl.textContent = ai.score;
      resetBall();
    }
  }

  function resetBall() {
    ball.x = width/2;
    ball.y = height/2;
    ball.speed = BALL_SPEED_INITIAL;
    let angle = (Math.random() - 0.5) * 0.8;
    let direction = Math.random() > 0.5 ? 1 : -1;
    ball.dx = Math.cos(angle) * ball.speed * direction;
    ball.dy = Math.sin(angle) * ball.speed;
    if (Math.abs(ball.dy) < 2) ball.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    let gradient = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, 300);
    gradient.addColorStop(0, '#1a2a3a');
    gradient.addColorStop(1, '#0a0f16');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    drawCenterLine();

    ctx.strokeStyle = '#2a3a4a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width/2, height/2, 50, 0, Math.PI * 2);
    ctx.stroke();

    drawRect(player.x, player.y, player.w, player.h, player.color);
    drawRect(ai.x, ai.y, ai.w, ai.h, ai.color);
    drawCircle(ball.x, ball.y, ball.r, ball.color);

    ctx.beginPath();
    ctx.arc(ball.x - 2, ball.y - 2, ball.r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  const leftBtn = document.getElementById('leftBtn');
  const rightBtn = document.getElementById('rightBtn');
  const resetBtn = document.getElementById('resetBtn');

  leftBtn.addEventListener('mousedown', () => { keys.left = true; });
  leftBtn.addEventListener('mouseup', () => { keys.left = false; });
  leftBtn.addEventListener('mouseleave', () => { keys.left = false; });
  leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); keys.left = true; });
  leftBtn.addEventListener('touchend', (e) => { e.preventDefault(); keys.left = false; });

  rightBtn.addEventListener('mousedown', () => { keys.right = true; });
  rightBtn.addEventListener('mouseup', () => { keys.right = false; });
  rightBtn.addEventListener('mouseleave', () => { keys.right = false; });
  rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); keys.right = true; });
  rightBtn.addEventListener('touchend', (e) => { e.preventDefault(); keys.right = false; });

  resetBtn.addEventListener('click', () => {
    player.score = 0;
    ai.score = 0;
    playerScoreEl.textContent = '0';
    aiScoreEl.textContent = '0';
    ball.speed = BALL_SPEED_INITIAL;
    resetBall();
  });

  canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let scaleX = canvas.width / rect.width;
    player.x = mouseX * scaleX - player.w/2;
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > width) player.x = width - player.w;
  });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let rect = canvas.getBoundingClientRect();
    let touch = e.touches[0];
    let touchX = touch.clientX - rect.left;
    let scaleX = canvas.width / rect.width;
    player.x = touchX * scaleX - player.w/2;
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > width) player.x = width - player.w;
  }, { passive: false });

  resetBall();
  gameLoop();
</script>
</body>
</html>`;

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'tennis-game-isagi',
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
          botResponseId: 'tennis-game-isagi',
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
                messageText: '🎾 لعبة تنس ضد الذكاء الاصطناعي'
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
handler.command = ['تنس', 'tennis', 'لعبة_تنس'];
handler.category = 'games';
handler.help = ['تنس', 'tennis'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;