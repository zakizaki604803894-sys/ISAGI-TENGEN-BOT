/* ═══════════════════════════════════════════════════════════
   🍄 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — لعبة ماريو (HTML تفاعلية)
   📁 /home/container/plugins/games/mario.js
   ✅ قفزة عالية | تجاوز الأنابيب
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
   🎮 HTML — ماريو
   ═══════════════════════════════════════════ */
const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🍄 ماريو القفزة الكبيرة</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body { background: #12181f; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; overflow: hidden; }
  
  .game-card { width: 100%; max-width: 350px; background: #1a222d; border-radius: 12px; padding: 15px; border: 1px solid #2a3545; box-shadow: 0 4px 15px rgba(0,0,0,0.5); margin-top: 10px; text-align: center; }
  
  .header h2 { font-size: 18px; color: #ffcc00; margin-bottom: 5px; }
  .header p { font-size: 11px; color: #7f8c8d; font-weight: bold; margin-bottom: 10px; }

  .canvas-container { border-bottom: 15px solid #c84c0c; border-radius: 5px; overflow: hidden; }
  canvas { background: #5c94fc; display: block; }

  .footer-info { margin-top: 15px; font-size: 10px; color: #64748b; line-height: 1.6; }
  .footer-info a { color: #00ffcc; font-weight: bold; text-decoration: none; }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🍄 سوبر 𝐈𝐒𝐀𝐆𝐈 (قفزة عالية)</h2>
    <p>قفزة أكبر وأقوى لتجاوز الأنابيب براحة!</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="300" height="350"></canvas>
  </div>

  <div class="footer-info">
    👑 ISAGI TENGEN BOT<br>
    قناتي الرسمية: <a href="${BRAND.channelLink}" target="_blank">انضم الآن</a>
  </div>
</div>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  let frames = 0;
  let score = 0;
  let gameOver = false;

  const player = {
    x: 40, y: 150, w: 22, h: 32,
    dy: 0, gravity: 0.42, jumpPower: -11.5,
    draw() {
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(this.x, this.y, this.w, this.h / 2);
      ctx.fillStyle = '#0000ff';
      ctx.fillRect(this.x, this.y + (this.h / 2), this.w, this.h / 2);
    },
    update() {
      this.dy += this.gravity;
      this.y += this.dy;
      if(this.y + this.h >= canvas.height) {
        this.y = canvas.height - this.h;
        this.dy = 0;
      }
    },
    jump() {
      if (this.y + this.h >= canvas.height) {
        this.dy = this.jumpPower;
      }
    }
  };

  const pipes = {
    items: [],
    dx: 2.0, 
    draw() {
      for(let i=0; i<this.items.length; i++) {
        let p = this.items[i];
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.strokeRect(p.x, p.y, p.w, p.h);
        ctx.fillRect(p.x - 2, p.y, p.w + 4, 14);
        ctx.strokeRect(p.x - 2, p.y, p.w + 4, 14);
      }
    },
    update() {
      if(frames === 100 || (frames > 100 && (frames - 100) % 180 === 0)) {
        let h = 30; 
        this.items.push({ x: canvas.width, y: canvas.height - h, w: 32, h: h, passed: false });
      }
      
      for(let i=0; i<this.items.length; i++) {
        let p = this.items[i];
        p.x -= this.dx;
        
        if(player.x < p.x + p.w && player.x + player.w > p.x &&
           player.y < p.y + p.h && player.y + player.h > p.y) {
           gameOver = true;
        }
        
        if(p.x + p.w < player.x && !p.passed) {
           score++;
           p.passed = true;
        }
        
        if(p.x + p.w < 0) {
           this.items.shift();
           i--;
        }
      }
    }
  };

  const clouds = {
    items: [{x: 50, y: 40}, {x: 200, y: 70}, {x: 350, y: 30}],
    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for(let c of this.items) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 15, 0, Math.PI*2);
        ctx.arc(c.x+15, c.y-10, 20, 0, Math.PI*2);
        ctx.arc(c.x+30, c.y, 15, 0, Math.PI*2);
        ctx.fill();
        c.x -= 0.3;
        if(c.x + 50 < 0) c.x = canvas.width + 50;
      }
    }
  };

  function handleInput(e) {
    e.preventDefault();
    if(gameOver) resetGame();
    else player.jump();
  }

  window.addEventListener('touchstart', handleInput, {passive: false});
  window.addEventListener('mousedown', handleInput);

  function resetGame() {
    player.y = canvas.height - player.h;
    player.dy = 0;
    pipes.items = [];
    pipes.dx = 2.0;
    score = 0;
    frames = 0;
    gameOver = false;
    loop();
  }

  function loop() {
    if(gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('خسرت! النتيجة: ' + score, canvas.width/2, canvas.height/2);
      ctx.font = '14px Arial';
      ctx.fillText('اضغط للبدء من جديد', canvas.width/2, canvas.height/2 + 30);
      return;
    }
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    clouds.draw();
    player.update();
    player.draw();
    pipes.update();
    pipes.draw();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(score, 15, 35);

    frames++;
    requestAnimationFrame(loop);
  }
  
  resetGame();
</script>
</body>
</html>`;

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'mario-bot-high-jump',
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
          botResponseId: 'mario-v1-response',
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
                messageText: '🍄 لعبة ماريو (قفزة عالية)'
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
handler.command = ['ماريو', 'mario', 'لعبة_ماريو'];
handler.category = 'games';
handler.help = ['ماريو', 'mario'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;