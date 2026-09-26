/* ═══════════════════════════════════════════════════════════
   🎨 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — محرر الصور (HTML View)
   📁 /home/container/plugins/tools/image_editor.js
   ✅ حفظ الصورة → تُرسل في المحادثة مباشرة
   ✅ جودة عالية (imageSmoothingQuality = 'high')
   ═══════════════════════════════════════════════════════════ */

import { Buffer } from 'buffer';

const BRAND = {
  botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
  shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
  developer:   'ISAGI 🍁',
  channelLink: 'https://whatsapp.com/channel/0029VbBeu0o002T9NQnURQ2V',
  emoji:       '🍁'
};

const handler = async (m, { conn }) => {
  /* 🖼️ التحقق من صورة */
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  let imageBase64 = '';
  if (/image/.test(mime)) {
    try {
      let imgBuffer = await q.download();
      imageBase64 = `data:${mime};base64,${imgBuffer.toString('base64')}`;
    } catch (e) {
      console.log('🍁 [editor] image error:', e.message);
    }
  }

  const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-tap-highlight-color: transparent; }
  body { background: #12181f; color: #fff; padding: 6px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; min-height: 100vh; }
  
  .editor-card { width: 100%; max-width: 330px; background: #1a222d; border-radius: 12px; padding: 10px; border: 1px solid #2a3545; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
  
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .header .title { font-size: 13px; font-weight: bold; color: #3b82f6; }
  .header .dev { font-size: 9px; color: #7f8c8d; }

  .preview-container { width: 100%; height: 200px; background: #0f141c; border-radius: 10px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative; border: 1px solid #253142; }
  .preview-container canvas { max-width: 100%; max-height: 100%; object-fit: contain; }
  .upload-btn { position: absolute; background: rgba(37, 99, 235, 0.85); color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 11px; cursor: pointer; font-weight: bold; }

  .filter-presets { display: flex; gap: 5px; margin: 8px 0; }
  .preset-btn { flex: 1; background: #232f3f; border: 1px solid #374151; color: #d1d5db; border-radius: 6px; padding: 4px 6px; font-size: 10px; cursor: pointer; text-align: center; }
  .preset-btn:active { background: #374151; }

  .sliders-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 8px; margin-bottom: 8px; }
  .control-group { display: flex; flex-direction: column; gap: 2px; }
  .control-group label { font-size: 9px; color: #9ca3af; }
  .control-group input[type="range"] { width: 100%; height: 4px; border-radius: 2px; background: #374151; accent-color: #3b82f6; }

  .transform-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-bottom: 6px; }
  .action-btn { background: #232f3f; border: 1px solid #374151; color: #e5e7eb; border-radius: 6px; padding: 5px; font-size: 10px; cursor: pointer; text-align: center; font-weight: 500; }
  .action-btn:active { background: #3b82f6; }
  .reset-btn { background: #7f1d1d; border-color: #991b1b; color: #fca5a5; }

  .text-section { border-top: 1px solid #2a3545; padding-top: 8px; margin-top: 6px; }
  .text-input-group { display: flex; gap: 5px; align-items: center; margin-bottom: 6px; }
  .text-input-group input[type="text"] { flex: 1; background: #0f141c; border: 1px solid #374151; color: #fff; border-radius: 6px; padding: 5px; font-size: 10px; }
  .text-input-group input[type="color"] { width: 24px; height: 24px; border: none; border-radius: 4px; background: transparent; cursor: pointer; }
  
  .text-controls { display: flex; gap: 5px; align-items: center; }
  .text-controls input[type="range"] { flex: 1; height: 4px; accent-color: #3b82f6; }
  .add-text-btn { background: #4f46e5; border: none; color: #fff; padding: 4px 8px; border-radius: 5px; font-size: 10px; font-weight: bold; cursor: pointer; }
  .delete-text-btn { background: #991b1b; border: none; color: #fff; padding: 4px 8px; border-radius: 5px; font-size: 10px; font-weight: bold; cursor: pointer; }

  .save-btn { width: 100%; background: #6366f1; border: none; color: #fff; padding: 10px; border-radius: 8px; font-size: 12px; font-weight: bold; cursor: pointer; margin-top: 8px; box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4); text-align: center; }
  .save-btn:active { background: #4f46e5; }
  .save-btn:disabled { opacity: 0.5; }

  .footer-info { margin-top: 6px; font-size: 9px; color: #64748b; text-align: center; }
  .footer-info span { color: #3b82f6; font-weight: bold; }
</style>
</head>
<body>

<div class="editor-card">
  <div class="header">
    <div class="title">🎨 ISAGI Editor</div>
    <div class="dev">بواسطة: ISAGI</div>
  </div>

  <div class="preview-container">
    <canvas id="canvas"></canvas>
    <label class="upload-btn" id="upload-label">📁 اختر صورة
      <input type="file" id="imageInput" accept="image/*" style="display:none;">
    </label>
  </div>

  <div class="filter-presets">
    <button class="preset-btn" onclick="applyPreset('original')">الأصل</button>
    <button class="preset-btn" onclick="applyPreset('bw')">أبيض/أسود</button>
    <button class="preset-btn" onclick="applyPreset('vintage')">عتيق</button>
  </div>

  <div class="sliders-grid">
    <div class="control-group">
      <label>السطوع</label>
      <input type="range" id="brightness" min="0" max="200" value="100" oninput="renderCanvas()">
    </div>
    <div class="control-group">
      <label>التباين</label>
      <input type="range" id="contrast" min="0" max="200" value="100" oninput="renderCanvas()">
    </div>
    <div class="control-group">
      <label>التشبع</label>
      <input type="range" id="saturation" min="0" max="200" value="100" oninput="renderCanvas()">
    </div>
    <div class="control-group">
      <label>رمادي</label>
      <input type="range" id="grayscale" min="0" max="100" value="0" oninput="renderCanvas()">
    </div>
    <div class="control-group">
      <label>سيبيا</label>
      <input type="range" id="sepia" min="0" max="100" value="0" oninput="renderCanvas()">
    </div>
    <div class="control-group">
      <label>ضبابية</label>
      <input type="range" id="blur" min="0" max="10" value="0" oninput="renderCanvas()">
    </div>
    <div class="control-group">
      <label>تدوير اللون</label>
      <input type="range" id="hue" min="0" max="360" value="0" oninput="renderCanvas()">
    </div>
    <div class="control-group">
      <label>عكس</label>
      <input type="range" id="invert" min="0" max="100" value="0" oninput="renderCanvas()">
    </div>
  </div>

  <div class="transform-btns">
    <button class="action-btn" onclick="rotateImage()">↻ تدوير 90°</button>
    <button class="action-btn" onclick="flipH()">↔ عكس أفقي</button>
    <button class="action-btn" onclick="flipV()">↕ عكس عمودي</button>
    <button class="action-btn reset-btn" onclick="resetAll()">↺ إعادة</button>
  </div>

  <div class="text-section">
    <div class="text-input-group">
      <input type="text" id="textInput" placeholder="...اكتب هنا">
      <input type="color" id="textColor" value="#ffffff">
    </div>
    <div class="text-controls">
      <input type="range" id="fontSize" min="12" max="60" value="24">
      <button class="add-text-btn" onclick="addText()">+ إضافة</button>
      <button class="delete-text-btn" onclick="clearText()">🗑️ حذف</button>
    </div>
  </div>

  <button class="save-btn" id="saveBtn" onclick="saveImage()">↓ حفظ وإرسال للبوت</button>
</div>

<div class="footer-info">
  المطور: <span>ISAGI</span> | البوت: <span>ISAGI TENGEN BOT</span>
</div>

<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/* ✅ جودة عالية */
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

let img = new Image();
let imgLoaded = false;
let rotation = 0;
let scaleH = 1;
let scaleV = 1;
let textOverlay = { text: '', color: '#ffffff', size: 24 };

const initialSrc = "${imageBase64}";

if (initialSrc) {
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    imgLoaded = true;
    document.getElementById('upload-label').style.display = 'none';
    renderCanvas();
  }
  img.src = initialSrc;
}

document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        imgLoaded = true;
        document.getElementById('upload-label').style.display = 'none';
        renderCanvas();
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(file);
  }
});

function getFilters() {
  const b = document.getElementById('brightness').value;
  const c = document.getElementById('contrast').value;
  const s = document.getElementById('saturation').value;
  const g = document.getElementById('grayscale').value;
  const sep = document.getElementById('sepia').value;
  const bl = document.getElementById('blur').value;
  const h = document.getElementById('hue').value;
  const inv = document.getElementById('invert').value;
  return 'brightness(' + b + '%) contrast(' + c + '%) saturate(' + s + '%) grayscale(' + g + '%) sepia(' + sep + '%) blur(' + bl + 'px) hue-rotate(' + h + 'deg) invert(' + inv + '%)';
}

function renderCanvas() {
  if (!imgLoaded) return;
  
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = getFilters();
  
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(scaleH, scaleV);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();

  if (textOverlay.text) {
    ctx.font = 'bold ' + (textOverlay.size * (canvas.width / 300)) + 'px sans-serif';
    ctx.fillStyle = textOverlay.color;
    ctx.textAlign = 'center';
    ctx.fillText(textOverlay.text, canvas.width / 2, canvas.height / 2);
  }
}

function applyPreset(preset) {
  resetSliders();
  if (preset === 'bw') {
    document.getElementById('grayscale').value = 100;
  } else if (preset === 'vintage') {
    document.getElementById('sepia').value = 70;
    document.getElementById('contrast').value = 120;
    document.getElementById('brightness').value = 90;
  }
  renderCanvas();
}

function rotateImage() { rotation = (rotation + 90) % 360; renderCanvas(); }
function flipH() { scaleH *= -1; renderCanvas(); }
function flipV() { scaleV *= -1; renderCanvas(); }

function resetSliders() {
  ['brightness','contrast','saturation'].forEach(id => document.getElementById(id).value = 100);
  ['grayscale','sepia','blur','hue','invert'].forEach(id => document.getElementById(id).value = 0);
}

function resetAll() {
  resetSliders();
  rotation = 0; scaleH = 1; scaleV = 1;
  textOverlay.text = '';
  renderCanvas();
}

function addText() {
  const txt = document.getElementById('textInput').value;
  const col = document.getElementById('textColor').value;
  const sz = document.getElementById('fontSize').value;
  if (txt) {
    textOverlay = { text: txt, color: col, size: parseInt(sz) };
    renderCanvas();
  }
}

function clearText() {
  textOverlay.text = '';
  document.getElementById('textInput').value = '';
  renderCanvas();
}

/* ✅ حفظ الصورة وإرسالها للبوت */
function saveImage() {
  if (!imgLoaded) {
    alert('⚠️ يرجى اختيار صورة أو الرد على صورة!');
    return;
  }
  
  const btn = document.getElementById('saveBtn');
  btn.textContent = '⏳ جاري الحفظ...';
  btn.disabled = true;
  
  /* 🎯 جودة عالية PNG */
  const dataURL = canvas.toDataURL('image/png', 1.0);
  
  /* 🎯 إرسال للبوت عبر postMessage */
  try {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'save_image',
        data: dataURL
      }));
    } else if (window.parent) {
      window.parent.postMessage({
        type: 'save_image',
        data: dataURL
      }, '*');
    } else {
      /* 📥 تحميل محلي */
      const link = document.createElement('a');
      link.download = 'isagi_edit.png';
      link.href = dataURL;
      link.click();
    }
    
    btn.textContent = '✅ تم الحفظ!';
    setTimeout(() => {
      btn.textContent = '↓ حفظ وإرسال للبوت';
      btn.disabled = false;
    }, 2000);
  } catch (e) {
    console.log('Save error:', e);
    btn.textContent = '❌ خطأ';
    btn.disabled = false;
  }
}
</script>
</body>
</html>`;

  const data = Buffer.from(JSON.stringify({
    response_id: 'isagi-image-editor',
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
          botResponseId: 'isagi-image-editor',
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
              { messageType: 2, messageText: '🎨 محرر الصور - ISAGI BOT' }
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

handler.command = ['تعديل', 'editor', 'edit'];
handler.category = 'tools';
handler.help = ['تعديل', 'editor'];
handler.tags = ['أدوات'];
handler.usePrefix = true;

export default handler;