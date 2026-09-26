/* ═══════════════════════════════════════════════════════════
   🎹 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — بيانو متعدد الألحان (موسّع)
   📁 /home/container/plugins/games/piano.js
   ✅ 12 مفتاح أبيض + 8 سوداء | 6 أوضاع صوتية
   ✅ تسجيل + إيقاع تلقائي
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
   🎹 HTML — بيانو موسّع
   ═══════════════════════════════════════════ */
const HTML_PAGE = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{margin:0;padding:0;background:linear-gradient(135deg, #111827, #1f2937);font-family:Arial,sans-serif;overflow-x:hidden;color:white;}
body{padding:10px 0;}
.title{text-align:center;color:#f3f4f6;font-size:20px;font-weight:bold;letter-spacing:1px;}
.sub{text-align:center;color:#9ca3af;font-size:11px;margin:2px 0 10px;}

/* 🎵 أوضاع الصوت */
.preset-container{display:flex;justify-content:center;gap:4px;margin-bottom:10px;padding:0 6px;flex-wrap:wrap;}
.preset-btn{background:#374151;border:1px solid #4b5563;color:#e5e7eb;padding:5px 8px;border-radius:15px;font-size:10px;font-weight:bold;cursor:pointer;transition:all 0.2s;}
.preset-btn.active{background:#3b82f6;border-color:#60a5fa;color:white;box-shadow:0 0 10px rgba(59,130,246,0.5);}

/* 🎹 البيانو */
.piano-wrap{width:100%;padding:0 6px;}
.piano{position:relative;width:100%;height:48vw;max-height:240px;min-height:150px;display:flex;touch-action:none;}
.white{position:relative;flex:1 1 8.33%;height:100%;padding:0;margin:0;background:#fff;border:1px solid #222;border-radius:0 0 6px 6px;color:#222;font-size:9px;font-weight:bold;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:8px;box-shadow:0 4px 0 #aaa;z-index:1;}
.white .icon{font-size:14px;margin-bottom:2px;}
.white .label{font-size:8px;}
.white:first-child{border-radius:8px 0 0 8px;}
.white:last-child{border-radius:0 8px 8px 0;}
.white:active,.white.active{background:#e0e0e0;transform:translateY(4px);box-shadow:0 1px 0 #888;}
.black{position:absolute;top:0;width:5.8%;height:58%;padding:0;margin:0;background:linear-gradient(90deg,#111,#333,#050505);border:2px solid #000;border-radius:0 0 5px 5px;color:white;font-size:7px;font-weight:bold;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:6px;box-shadow:0 5px 4px rgba(0,0,0,.5);z-index:5;}
.black .icon{font-size:10px;margin-bottom:1px;}
.black .label{font-size:6px;}
.black:active,.black.active{background:#555;transform:translateY(3px);box-shadow:0 2px 2px rgba(0,0,0,.5);}

/* مواقع المفاتيح السوداء */
.b1{left:5.5%}.b2{left:13.5%}.b3{left:30.2%}.b4{left:38.2%}.b5{left:46.2%}.b6{left:62.8%}.b7{left:70.8%}.b8{left:78.8%}

/* 🎼 معلومات */
#note{text-align:center;color:#60a5fa;font-size:16px;font-weight:bold;margin:10px 15px 0;background:rgba(0,0,0,0.4);padding:6px;border-radius:8px;border:1px solid #374151;}

/* ⏺️ أدوات التسجيل */
.record-tools{display:flex;justify-content:center;gap:8px;margin-top:10px;padding:0 15px;}
.rec-btn{background:#1f2937;border:1px solid #374151;color:#e5e7eb;padding:6px 12px;border-radius:15px;font-size:11px;font-weight:bold;cursor:pointer;transition:all 0.2s;}
.rec-btn.recording{background:#dc2626;border-color:#ef4444;animation:pulse 1s infinite;}
.rec-btn.playing{background:#16a34a;border-color:#22c55e;}
.rec-btn:active{transform:scale(0.95);}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}

/* 🥁 إيقاع */
.rhythm-btn{background:#7c3aed;border-color:#8b5cf6;color:white;}
.rhythm-btn.active{background:#a855f7;box-shadow:0 0 10px rgba(168,85,247,0.6);}
</style>
</head>
<body>
<div class="title">🎹 PRO PIANO 🎶</div>
<div class="sub">اختر اللحن + التسجيل + الإيقاع</div>

<!-- 🎵 أوضاع الصوت -->
<div class="preset-container">
  <button class="preset-btn active" onclick="setMode('piano', this)">🎹 بيانو</button>
  <button class="preset-btn" onclick="setMode('synth', this)">🎸 جيتار</button>
  <button class="preset-btn" onclick="setMode('bells', this)">🔔 أجراس</button>
  <button class="preset-btn" onclick="setMode('arcade', this)">👾 آركيد</button>
  <button class="preset-btn" onclick="setMode('organ', this)">⛪ أرغن</button>
  <button class="preset-btn" onclick="setMode('flute', this)">🎺 ناي</button>
</div>

<!-- 🎹 البيانو -->
<div class="piano-wrap">
<div class="piano">
  <!-- 🎼 أوكتاف كامل: 12 مفتاح أبيض -->
  <button class="white" data-freq="261.63" data-name="Do4"><span class="icon">🔴</span><span class="label">Do</span></button>
  <button class="white" data-freq="293.66" data-name="Re4"><span class="icon">🟠</span><span class="label">Re</span></button>
  <button class="white" data-freq="329.63" data-name="Mi4"><span class="icon">🟡</span><span class="label">Mi</span></button>
  <button class="white" data-freq="349.23" data-name="Fa4"><span class="icon">🟢</span><span class="label">Fa</span></button>
  <button class="white" data-freq="392.00" data-name="Sol4"><span class="icon">🔵</span><span class="label">Sol</span></button>
  <button class="white" data-freq="440.00" data-name="La4"><span class="icon">🟣</span><span class="label">La</span></button>
  <button class="white" data-freq="493.88" data-name="Si4"><span class="icon">🟤</span><span class="label">Si</span></button>
  <button class="white" data-freq="523.25" data-name="Do5"><span class="icon">⚪</span><span class="label">Do</span></button>
  <button class="white" data-freq="587.33" data-name="Re5"><span class="icon">🔴</span><span class="label">Re</span></button>
  <button class="white" data-freq="659.25" data-name="Mi5"><span class="icon">🟠</span><span class="label">Mi</span></button>
  <button class="white" data-freq="698.46" data-name="Fa5"><span class="icon">🟡</span><span class="label">Fa</span></button>
  <button class="white" data-freq="783.99" data-name="Sol5"><span class="icon">🟢</span><span class="label">Sol</span></button>

  <!-- 🎼 8 مفاتيح سوداء -->
  <button class="black b1" data-freq="277.18" data-name="Do#4"><span class="icon">✨</span><span class="label">C#</span></button>
  <button class="black b2" data-freq="311.13" data-name="Re#4"><span class="icon">⚡</span><span class="label">D#</span></button>
  <button class="black b3" data-freq="369.99" data-name="Fa#4"><span class="icon">🌟</span><span class="label">F#</span></button>
  <button class="black b4" data-freq="415.30" data-name="Sol#4"><span class="icon">🔥</span><span class="label">G#</span></button>
  <button class="black b5" data-freq="466.16" data-name="La#4"><span class="icon">💎</span><span class="label">A#</span></button>
  <button class="black b6" data-freq="554.37" data-name="Do#5"><span class="icon">✨</span><span class="label">C#</span></button>
  <button class="black b7" data-freq="622.25" data-name="Re#5"><span class="icon">⚡</span><span class="label">D#</span></button>
  <button class="black b8" data-freq="739.99" data-name="Fa#5"><span class="icon">🌟</span><span class="label">F#</span></button>
</div>
</div>

<div id="note">🎼 اختر لحناً وازف</div>

<!-- ⏺️ أدوات -->
<div class="record-tools">
  <button class="rec-btn" id="recBtn">⏺️ تسجيل</button>
  <button class="rec-btn" id="playBtn">▶️ تشغيل</button>
  <button class="rec-btn rhythm-btn" id="rhythmBtn">🥁 إيقاع</button>
</div>

<script>
let audioContext = null;
let currentMode = 'piano';

// 🎵 إعدادات الأصوات
const soundModes = {
  piano: {
    whiteIcons: ['🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚪','🔴','🟠','🟡','🟢'],
    blackIcons: ['✨','⚡','🌟','🔥','💎','✨','⚡','🌟'],
    type: 'triangle',
    decay: 1.2,
    harmonics: [1, 2, 3]
  },
  synth: {
    whiteIcons: ['🎸','🎸','🎸','🎸','🎸','🎸','🎸','🎸','🎸','🎸','🎸','🎸'],
    blackIcons: ['⚡','⚡','⚡','⚡','⚡','⚡','⚡','⚡'],
    type: 'square',
    decay: 0.8,
    harmonics: [1, 2]
  },
  bells: {
    whiteIcons: ['🔔','🔔','🔔','🔔','🔔','🔔','🔔','🔔','🔔','🔔','🔔','🔔'],
    blackIcons: ['❄️','❄️','❄️','❄️','❄️','❄️','❄️','❄️'],
    type: 'sine',
    decay: 2.0,
    harmonics: [1, 2.76, 5.4]
  },
  arcade: {
    whiteIcons: ['👾','🕹️','👾','🕹️','👾','🕹️','👾','🕹️','👾','🕹️','👾','🕹️'],
    blackIcons: ['💥','💥','💥','💥','💥','💥','💥','💥'],
    type: 'sawtooth',
    decay: 0.5,
    harmonics: [1]
  },
  organ: {
    whiteIcons: ['⛪','⛪','⛪','⛪','⛪','⛪','⛪','⛪','⛪','⛪','⛪','⛪'],
    blackIcons: ['🕊️','🕊️','🕊️','🕊️','🕊️','🕊️','🕊️','🕊️'],
    type: 'sine',
    decay: 1.5,
    harmonics: [1, 2, 3, 4]
  },
  flute: {
    whiteIcons: ['🎺','🎺','🎺','🎺','🎺','🎺','🎺','🎺','🎺','🎺','🎺','🎺'],
    blackIcons: ['🎶','🎶','🎶','🎶','🎶','🎶','🎶','🎶'],
    type: 'sine',
    decay: 1.0,
    harmonics: [1, 1.5]
  }
};

function initAudio(){
  if(!audioContext){
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if(!AudioContext){ document.getElementById('note').textContent = 'الصوت غير مدعوم'; return null; }
    audioContext = new AudioContext();
  }
  if(audioContext.state === 'suspended'){ audioContext.resume(); }
  return audioContext;
}

// التبديل بين الأوضاع
function setMode(mode, btn) {
  currentMode = mode;
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const config = soundModes[mode];
  const whiteKeys = document.querySelectorAll('.white');
  const blackKeys = document.querySelectorAll('.black');
  
  whiteKeys.forEach((key, i) => {
    key.querySelector('.icon').textContent = config.whiteIcons[i] || '🎵';
  });
  
  blackKeys.forEach((key, i) => {
    key.querySelector('.icon').textContent = config.blackIcons[i] || '🎶';
  });
  
  document.getElementById('note').textContent = '🎼 وضع: ' + mode.toUpperCase();
}

// 🎵 تشغيل نغمة
function playPiano(freq){
  const ctx = initAudio(); if(!ctx) return;
  const config = soundModes[currentMode];
  const now = ctx.currentTime;
  
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.5, now + 0.015);
  master.gain.exponentialRampToValueAtTime(0.001, now + config.decay);
  master.connect(ctx.destination);
  
  config.harmonics.forEach((mult, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i === 0 ? config.type : 'sine';
    osc.frequency.value = freq * mult;
    gain.gain.value = 0.8 / (i + 1);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + config.decay + 0.1);
  });
}

// ⏺️ التسجيل
let isRecording = false;
let isPlaying = false;
let recordedNotes = [];
let recordStartTime = 0;

const recBtn = document.getElementById('recBtn');
const playBtn = document.getElementById('playBtn');
const rhythmBtn = document.getElementById('rhythmBtn');

recBtn.addEventListener('click', () => {
  if (isPlaying) return;
  isRecording = !isRecording;
  if (isRecording) {
    recordedNotes = [];
    recordStartTime = Date.now();
    recBtn.classList.add('recording');
    recBtn.textContent = '⏹️ إيقاف';
    document.getElementById('note').textContent = '⏺️ تسجيل...';
  } else {
    recBtn.classList.remove('recording');
    recBtn.textContent = '⏺️ تسجيل';
    document.getElementById('note').textContent = '✅ تم تسجيل ' + recordedNotes.length + ' نغمة';
  }
});

playBtn.addEventListener('click', async () => {
  if (isRecording || isPlaying || recordedNotes.length === 0) return;
  isPlaying = true;
  playBtn.classList.add('playing');
  playBtn.textContent = '⏹️ إيقاف';
  document.getElementById('note').textContent = '▶️ تشغيل...';
  
  const startTime = Date.now();
  for (const note of recordedNotes) {
    if (!isPlaying) break;
    const wait = note.time - (Date.now() - startTime);
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    playPiano(note.freq);
  }
  
  isPlaying = false;
  playBtn.classList.remove('playing');
  playBtn.textContent = '▶️ تشغيل';
  document.getElementById('note').textContent = '✅ انتهى التشغيل';
});

// 🥁 إيقاع تلقائي
let rhythmActive = false;
let rhythmInterval = null;
let rhythmBeat = 0;

rhythmBtn.addEventListener('click', () => {
  rhythmActive = !rhythmActive;
  if (rhythmActive) {
    rhythmBtn.classList.add('active');
    rhythmBtn.textContent = '⏹️ إيقاف';
    startRhythm();
  } else {
    rhythmBtn.classList.remove('active');
    rhythmBtn.textContent = '🥁 إيقاع';
    stopRhythm();
  }
});

function startRhythm() {
  rhythmBeat = 0;
  const ctx = initAudio();
  if (!ctx) return;
  
  rhythmInterval = setInterval(() => {
    const now = ctx.currentTime;
    
    // 🥁 طبل
    const kick = ctx.createOscillator();
    const kickGain = ctx.createGain();
    kick.frequency.setValueAtTime(150, now);
    kick.frequency.exponentialRampToValueAtTime(50, now + 0.1);
    kickGain.gain.setValueAtTime(0.4, now);
    kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    kick.connect(kickGain);
    kickGain.connect(ctx.destination);
    kick.start(now);
    kick.stop(now + 0.15);
    
    // 🎵 هاي هات كل نبضة ثانية
    if (rhythmBeat % 2 === 1) {
      const hat = ctx.createOscillator();
      const hatGain = ctx.createGain();
      hat.type = 'square';
      hat.frequency.value = 8000;
      hatGain.gain.setValueAtTime(0.1, now);
      hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      hat.connect(hatGain);
      hatGain.connect(ctx.destination);
      hat.start(now);
      hat.stop(now + 0.05);
    }
    
    rhythmBeat++;
  }, 500);
}

function stopRhythm() {
  if (rhythmInterval) {
    clearInterval(rhythmInterval);
    rhythmInterval = null;
  }
}

// 🎹 أحداث المفاتيح
document.querySelectorAll('.white,.black').forEach(function(key){
  function press(e){
    e.preventDefault();
    key.classList.add('active');
    document.getElementById('note').textContent = '🎶 ' + key.dataset.name + ' (' + currentMode.toUpperCase() + ')';
    
    if (isRecording) {
      recordedNotes.push({
        freq: parseFloat(key.dataset.freq),
        time: Date.now() - recordStartTime
      });
    }
    
    playPiano(parseFloat(key.dataset.freq));
  }
  function release(){ key.classList.remove('active'); }
  
  key.addEventListener('pointerdown', press);
  key.addEventListener('pointerup', release);
  key.addEventListener('pointercancel', release);
  key.addEventListener('pointerleave', release);
});

// ⌨️ دعم لوحة المفاتيح
const keyMap = {
  'a': 261.63, 'w': 277.18, 's': 293.66, 'e': 311.13,
  'd': 329.63, 'f': 349.23, 't': 369.99, 'g': 392.00,
  'y': 415.30, 'h': 440.00, 'u': 466.16, 'j': 493.88,
  'k': 523.25, 'o': 554.37, 'l': 587.33, 'p': 622.25,
  ';': 659.25, "'": 698.46
};

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (keyMap[key] && !e.repeat) {
    const freq = keyMap[key];
    playPiano(freq);
    if (isRecording) {
      recordedNotes.push({ freq, time: Date.now() - recordStartTime });
    }
  }
});
</script>
</body>
</html>`;

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
const handler = async (m, { conn }) => {
  const data = Buffer.from(JSON.stringify({
    response_id: 'pro-piano-game',
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
          botResponseId: 'pro-piano-response',
          verificationMetadata: {
            proofs: [
              {
                version: 1,
                useCase: 1,
                signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                certificateChain: [
                  'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
                  'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCggYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ=='
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
              { messageType: 2, messageText: '🎹 PRO PIANO - بيانو احترافي!' }
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

/* ═══════════════════════════════════════════
   🎯 الإعدادات
   ═══════════════════════════════════════════ */
handler.command = ['بيانو', 'piano', 'سانتي', 'pro_piano'];
handler.category = 'games';
handler.help = ['بيانو', 'piano'];
handler.tags = ['تسلية'];
handler.usePrefix = true;

export default handler;