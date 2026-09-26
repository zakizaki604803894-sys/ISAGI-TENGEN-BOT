/* ═══════════════════════════════════════════════════════════
   🌌 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — Particle Galaxy
   📁 /home/container/plugins/games/galaxy.js
   ✅ 5000+ جزيء | دوران حلزوني حقيقي | تفاعل باللمس
   ✅ 60 FPS | بدون مكتبات | ملف واحد
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
<title>🌌 Particle Galaxy</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
  body {
    background: #000;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    padding: 6px;
    gap: 6px;
  }

  .game-card {
    width: 100%;
    max-width: 360px;
    background: linear-gradient(145deg, #0a0a1a, #000);
    border-radius: 16px;
    padding: 10px;
    border: 2px solid rgba(100, 150, 255, 0.5);
    box-shadow: 0 0 40px rgba(100, 150, 255, 0.3),
                inset 0 0 40px rgba(50, 100, 200, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  .header h2 {
    font-size: 22px;
    color: #aaccff;
    text-align: center;
    margin: 0;
    text-shadow: 0 0 20px #5577ff, 0 0 40px #3355ff;
    letter-spacing: 2px;
    font-weight: 900;
  }
  .header p { font-size: 10px; color: #6688cc; text-align: center; margin: 2px 0 0; letter-spacing: 1px; }

  .canvas-container {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: #000;
    border: 1px solid rgba(100, 150, 255, 0.3);
    position: relative;
    box-shadow: inset 0 0 30px rgba(50, 100, 200, 0.2);
  }
  canvas { display: block; width: 100%; height: auto; touch-action: none; }

  .hud {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .hud-item {
    flex: 1;
    background: rgba(50, 100, 200, 0.15);
    border: 1px solid rgba(100, 150, 255, 0.3);
    border-radius: 8px;
    padding: 5px;
    text-align: center;
    font-size: 9px;
    font-weight: bold;
    color: #88aaff;
  }
  .hud-value { font-size: 14px; margin-top: 2px; color: #fff; font-weight: 900; }

  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    direction: ltr;
  }
  .btn {
    background: linear-gradient(145deg, #1a2a5a, #0a1a3a);
    border: 1px solid rgba(100, 150, 255, 0.4);
    border-radius: 10px;
    color: #aaccff;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    touch-action: manipulation;
    transition: all 0.15s;
    box-shadow: 0 2px 10px rgba(50, 100, 200, 0.3);
  }
  .btn:active {
    transform: scale(0.95);
    background: rgba(100, 150, 255, 0.3);
    box-shadow: 0 0 20px rgba(100, 150, 255, 0.6);
  }

  .footer-info { font-size: 8px; color: #4466aa; text-align: center; letter-spacing: 1px; }
  .footer-info a { color: #88aaff; text-decoration: none; font-weight: bold; }

  /* تأثير نبض */
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
</style>
</head>
<body>

<div class="game-card">
  <div class="header">
    <h2>🌌 PARTICLE GALAXY</h2>
    <p>المس الشاشة للتفاعل • اسحب للتدوير</p>
  </div>

  <div class="canvas-container">
    <canvas id="gameCanvas" width="340" height="400"></canvas>
  </div>

  <div class="hud">
    <div class="hud-item">الجزيئات<div class="hud-value" id="particlesCount">5000</div></div>
    <div class="hud-item">السرعة<div class="hud-value" id="speedValue">1.0x</div></div>
    <div class="hud-item">FPS<div class="hud-value" id="fpsValue">60</div></div>
  </div>

  <div class="controls">
    <button class="btn" id="slowerBtn">➖</button>
    <button class="btn" id="toggleBtn">⏸️</button>
    <button class="btn" id="fasterBtn">➕</button>
  </div>

  <div class="footer-info">
    👑 ISAGI TENGEN BOT • <a href="${BRAND.channelLink}" target="_blank">القناة</a>
  </div>
</div>

<script>
(function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const particlesCountEl = document.getElementById('particlesCount');
  const speedValueEl = document.getElementById('speedValue');
  const fpsValueEl = document.getElementById('fpsValue');

  const W = canvas.width;
  const H = canvas.height;

  /* ═══════════════════════════════════════
     🌌 نظام الجزيئات
     ═══════════════════════════════════════ */
  const PARTICLE_COUNT = 5000;
  const particles = [];

  /* 🎨 ألوان المجرة */
  const COLORS = [
    { h: 210, s: 100, l: 70 }, /* أزرق */
    { h: 270, s: 100, l: 65 }, /* بنفسجي */
    { h: 320, s: 100, l: 65 }, /* وردي */
    { h: 190, s: 100, l: 65 }, /* سماوي */
    { h: 240, s: 100, l: 70 }, /* أزرق داكن */
    { h: 280, s: 100, l: 60 }, /* أرجواني */
    { h: 160, s: 100, l: 60 }, /* أخضر */
    { h: 40,  s: 100, l: 65 }, /* ذهبي */
  ];

  /* 🎯 خصائص المجرة */
  const GALAXY = {
    arms: 4,              /* 4 أذرع حلزونية */
    radius: 180,          /* نصف القطر */
    thickness: 20,        /* سمك */
    rotation: 0           /* زاوية الدوران */
  };

  let speed = 1.0;
  let paused = false;
  let mouseX = W / 2;
  let mouseY = H / 2;
  let isDragging = false;
  let lastMouseX = 0;
  let autoRotation = 0;

  /* ═══════════════════════════════════════
     🎯 إنشاء جزيء
     ═══════════════════════════════════════ */
  function createParticle() {
    /* موقع في الذراع الحلزوني */
    const armIndex = Math.floor(Math.random() * GALAXY.arms);
    const armAngle = (armIndex / GALAXY.arms) * Math.PI * 2;

    /* مسافة من المركز (توزيع غير خطي) */
    const distFactor = Math.pow(Math.random(), 0.6);
    const dist = distFactor * GALAXY.radius;

    /* زاوية في الذراع */
    const angle = armAngle + distFactor * Math.PI * 2 * 1.8 + (Math.random() - 0.5) * 0.5;

    /* السماكة (z) */
    const z = (Math.random() - 0.5) * GALAXY.thickness * (1 + distFactor * 2);

    /* اللون */
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    return {
      /* إحداثيات 3D أصلية */
      baseDist: dist,
      baseAngle: angle,
      z: z,

      /* معدلات التغيير */
      angularSpeed: 0.0008 / (distFactor + 0.3) * (Math.random() > 0.5 ? 1 : 1),
      radialDrift: (Math.random() - 0.5) * 0.02,
      zDrift: (Math.random() - 0.5) * 0.1,

      /* حجم */
      size: 0.5 + Math.random() * 2.2,
      baseSize: 0.5 + Math.random() * 2.2,

      /* لون */
      hue: color.h + (Math.random() - 0.5) * 30,
      sat: color.s,
      light: color.l + (Math.random() - 0.5) * 15,

      /* توهج */
      glow: Math.random(),
      pulseSpeed: 0.02 + Math.random() * 0.05,
      pulsePhase: Math.random() * Math.PI * 2
    };
  }

  /* إنشاء كل الجزيئات */
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  /* ═══════════════════════════════════════
     🌟 نجوم الخلفية
     ═══════════════════════════════════════ */
  const stars = [];
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 0.3 + Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.6,
      twinkleSpeed: 0.02 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2
    });
  }

  /* ═══════════════════════════════════════
     🎨 نظام 3D Projection
     ═══════════════════════════════════════ */
  let projectionRotation = 0;
  let tilt = 0.3; /* ميل المجرة */

  function project3D(x, y, z) {
    /* تدوير حول المحور Y (رأسي) */
    const cosY = Math.cos(projectionRotation);
    const sinY = Math.sin(projectionRotation);

    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    /* إمالة حول المحور X */
    const cosX = Math.cos(tilt);
    const sinX = Math.sin(tilt);

    const y1 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    /* منظور */
    const perspective = 400;
    const scale = perspective / (perspective + z2);

    return {
      x: W / 2 + x1 * scale,
      y: H / 2 + y1 * scale,
      scale: scale,
      depth: z2
    };
  }

  /* ═══════════════════════════════════════
     🎨 الرسم
     ═══════════════════════════════════════ */
  function drawBackground() {
    /* تدرج أسود مع لمسة زرقاء */
    const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.8);
    grad.addColorStop(0, 'rgba(20, 10, 40, 1)');
    grad.addColorStop(0.5, 'rgba(10, 5, 25, 1)');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* نجوم الخلفية */
    const time = Date.now() * 0.001;
    stars.forEach(star => {
      const alpha = star.alpha * (0.6 + 0.4 * Math.sin(time * star.twinkleSpeed * 50 + star.phase));
      ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  /* ═══════════════════════════════════════
     🌌 رسم المجرة — الطبقات
     ═══════════════════════════════════════ */
  function drawGalaxy() {
    /* نبض المركز */
    const centerPulse = 1 + Math.sin(Date.now() * 0.002) * 0.3;

    /* 🎯 ترتيب الجزيئات حسب العمق (للرسم الصحيح) */
    const projected = particles.map(p => {
      const angle = p.baseAngle + p.angularSpeed * GALAXY.rotation;
      const x = Math.cos(angle) * p.baseDist;
      const y = Math.sin(angle) * p.baseDist;
      const z = p.z + Math.sin(Date.now() * 0.0005 + p.pulsePhase) * 3;

      const proj = project3D(x, y, z);

      return {
        proj: proj,
        particle: p,
        z: proj.depth
      };
    });

    projected.sort((a, b) => b.z - a.z);

    /* 🎨 رسم الجزيئات */
    projected.forEach(item => {
      const p = item.particle;
      const proj = item.proj;

      /* خارج الشاشة */
      if (proj.x < -20 || proj.x > W + 20 || proj.y < -20 || proj.y > H + 20) return;

      /* نبض الحجم */
      const pulse = 1 + Math.sin(Date.now() * 0.003 + p.pulsePhase) * 0.3;

      /* الحجم النهائي */
      const distFromCenter = Math.sqrt(proj.x * proj.x + proj.y * proj.y);
      const size = p.size * proj.scale * pulse;

      /* الشفافية حسب العمق */
      const alpha = Math.max(0.1, Math.min(1, proj.scale * 0.9));

      /* الشفافية حسب البعد من المركز */
      const radialFade = Math.max(0.3, 1 - distFromCenter / (W * 0.8));

      /* اللون النهائي */
      const hue = p.hue + (GALAXY.rotation * 0.02) % 360;
      const light = p.light + p.glow * 20;

      const color = 'hsla(' + hue + ', ' + p.sat + '%, ' + light + '%, ' + (alpha * radialFade) + ')';

      /* توهج للمركز */
      if (distFromCenter < 80) {
        ctx.shadowColor = 'hsl(' + hue + ', 100%, 70%)';
        ctx.shadowBlur = 10 * proj.scale;
      }

      /* رسم الجزيء */
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, Math.max(0.3, size), 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
    });

    /* 🌟 نواة المجرة — توهج مركزي */
    const coreGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 60);
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, ' + (0.8 * centerPulse) + ')');
    coreGrad.addColorStop(0.2, 'rgba(200, 220, 255, ' + (0.6 * centerPulse) + ')');
    coreGrad.addColorStop(0.5, 'rgba(100, 150, 255, ' + (0.3 * centerPulse) + ')');
    coreGrad.addColorStop(1, 'rgba(50, 100, 200, 0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(W/2, H/2, 60 * centerPulse, 0, Math.PI * 2);
    ctx.fill();

    /* 💫 انفجار ضوئي مركزي */
    const burstGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 30);
    burstGrad.addColorStop(0, 'rgba(255, 255, 255, ' + (0.6 * centerPulse) + ')');
    burstGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = burstGrad;
    ctx.beginPath();
    ctx.arc(W/2, H/2, 30 * centerPulse, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ═══════════════════════════════════════
     🎯 حلقة الرسم
     ═══════════════════════════════════════ */
  let lastTime = Date.now();
  let frameCount = 0;
  let fpsTimer = 0;
  let currentFps = 60;
  let animationId = null;

  function loop() {
    const now = Date.now();
    const dt = Math.min((now - lastTime) / 16.67, 2);
    lastTime = now;

    /* حساب FPS */
    frameCount++;
    fpsTimer += now - (lastTime - dt * 16.67);
    if (now - fpsTimer > 500) {
      currentFps = Math.round(frameCount * 1000 / (now - fpsTimer + 0.01));
      fpsValueEl.textContent = Math.min(60, currentFps);
      frameCount = 0;
      fpsTimer = now;
    }

    /* تحديث دوران المجرة */
    if (!paused) {
      GALAXY.rotation += 0.5 * speed * dt;

      /* دوران تلقائي بطيء */
      if (!isDragging) {
        projectionRotation += 0.001 * speed * dt;
      }

      /* تحديث الجزيئات */
      particles.forEach(p => {
        p.pulsePhase += p.pulseSpeed * dt;
      });
    }

    /* الرسم */
    drawBackground();
    drawGalaxy();

    animationId = requestAnimationFrame(loop);
  }

  /* ═══════════════════════════════════════
     🎮 التحكم
     ═══════════════════════════════════════ */

  /* سرعة */
  function changeSpeed(delta) {
    speed = Math.max(0.1, Math.min(5, speed + delta));
    speedValueEl.textContent = speed.toFixed(1) + 'x';
  }

  /* إيقاف/تشغيل */
  function togglePause() {
    paused = !paused;
    document.getElementById('toggleBtn').textContent = paused ? '▶️' : '⏸️';
  }

  /* أزرار */
  document.getElementById('slowerBtn').addEventListener('click', () => changeSpeed(-0.2));
  document.getElementById('slowerBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    changeSpeed(-0.2);
  }, { passive: false });

  document.getElementById('fasterBtn').addEventListener('click', () => changeSpeed(0.2));
  document.getElementById('fasterBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    changeSpeed(0.2);
  }, { passive: false });

  document.getElementById('toggleBtn').addEventListener('click', togglePause);
  document.getElementById('toggleBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    togglePause();
  }, { passive: false });

  /* ═══════════════════════════════════════
     👆 التفاعل باللمس
     ═══════════════════════════════════════ */
  let touchStartX = 0;

  canvas.addEventListener('touchstart', e => {
    isDragging = true;
    touchStartX = e.touches[0].clientX;
    lastMouseX = touchStartX;
  }, { passive: true });

  canvas.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const deltaX = (x - lastMouseX) * 0.005;
    projectionRotation += deltaX;
    lastMouseX = x;
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    isDragging = false;
  }, { passive: true });

  /* الماوس (للاختبار على الكمبيوتر) */
  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    lastMouseX = e.clientX;
  });

  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const deltaX = (e.clientX - lastMouseX) * 0.005;
    projectionRotation += deltaX;
    lastMouseX = e.clientX;
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  /* ═══════════════════════════════════════
     🚀 البدء
     ═══════════════════════════════════════ */
  particlesCountEl.textContent = PARTICLE_COUNT.toLocaleString();
  speedValueEl.textContent = '1.0x';

  /* رسم أولي */
  loop();
})();
</script>
</body>
</html>`;

const handler = async (m, { conn, sock }) => {
  const client = conn || sock;
  if (!client) return m.reply('❌ خطأ في الاتصال');

  const uniqueId = 'galaxy-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);

  const data = Buffer.from(JSON.stringify({
    response_id: 'particle-galaxy-isagi',
    sections: [{
      view_model: {
        primitive: {
          __typename: 'GenAIaeacdsnwHtmlPrimitive',
          payload: HTML_PAGE,
          trusted_sources: ['nixel.dev']
        },
        __typename: 'GenAISingleLayoutViewModel'
      }
    }]
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
            proofs: [{
              version: 1,
              useCase: 1,
              signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
              certificateChain: [
                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ=='
              ]
            }]
          }
        }
      },
      botForwardedMessage: {
        message: {
          richResponseMessage: {
            messageType: 1,
            submessages: [{
              messageType: 2,
              messageText: '🌌 Particle Galaxy - استعد للانبهار!'
            }],
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

handler.command = ['مجرة', 'galaxy', 'particles'];
handler.category = 'games';
handler.help = ['مجرة', 'galaxy'];
handler.tags = ['العاب'];
handler.usePrefix = true;

export default handler;