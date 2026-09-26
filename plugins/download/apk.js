/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — تحميل تطبيقات APK
   📁 /home/container/plugins/downloader/تطبيق.js
   ✅ 10 نتائج | تحميل على السيرفر | بدون مسافات فارغة
   ═══════════════════════════════════════════════════════════ */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import baileys from '@whiskeysockets/baileys';

const { proto, generateWAMessageFromContent } = baileys;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ═══════════════════════════════════════════
   🏆 الهوية الموحّدة
   ═══════════════════════════════════════════ */
const BRAND = {
    botName:     '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
    shortName:   '𝑰𝑺𝑨𝑮𝑰 𝑩𝑶𝑻',
    developer:   'ISAGI 🍁',
    channelId:   '120363428650036031@newsletter',
    channelName: '𝑰𝑺𝑨𝑮𝑰 ⊰🍁⊱𝑻𝑬𝑵𝑮𝑬𝑵 𝑩𝑶𝑻',
    channelLink: 'https://whatsapp.com/channel/0029VbD2LYO3mFY2L9H5lB3u',
    emoji:       '🍁'
};

/* 🕌 الآيات */
const VERSES = [
    { text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', ref: 'الشرح: 6' },
    { text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', ref: 'الرعد: 28' },
    { text: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', ref: 'الطلاق: 3' },
    { text: 'وَاصْبِرْ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', ref: 'البقرة: 153' },
    { text: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', ref: 'طه: 114' },
    { text: 'فَاذْكُرُونِي أَذْكُرْكُمْ', ref: 'البقرة: 152' },
    { text: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', ref: 'البقرة: 20' },
    { text: 'وَاللَّهُ خَيْرُ الرَّازِقِينَ', ref: 'الجمعة: 11' },
    { text: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', ref: 'الحديد: 4' },
    { text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ', ref: 'هود: 88' }
];

const verse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

/* 🖼️ الصور — ISAGI TENGEN فقط */
const IMAGES = [
    'https://i.postimg.cc/DZcTw8Dq/lllybyb.jpg',
    'https://i.postimg.cc/Ls393WJK/mntnmanlanlamlt.jpg',
    'https://i.postimg.cc/cLd4h99Q/1ec6d4d9d187860bebecd5655c2130a7.jpg',
    'https://i.postimg.cc/L5m0w1r1/6539a3ddd4b8e9804e2235afa2928e4a.jpg',
    'https://i.postimg.cc/BQHBH6yw/49361b48a01156b70d4e94f5a954aa3f.jpg',
    'https://i.postimg.cc/J7JkdFqB/fe5a547f50ff075c6697d8802c96f31f.jpg',
    'https://i.postimg.cc/T1CG4GHh/c4bac4df1cf0be95920442ceae42fa8e.jpg',
    'https://i.postimg.cc/tTBM0TpC/c8c75a230d652e70a57f364f2c3c20b9.jpg',
    'https://i.postimg.cc/L8FvbfL5/bb5f15bce9d3efdb69edae96cd559cb9.jpg',
    'https://i.postimg.cc/nhnSLBrZ/41187c79fcad726d466fa80e90a51207.jpg',
    'https://i.postimg.cc/0jZSLQVg/9fe6315eaa424b8bf3815e9afb0fe0a.jpg',
    'https://i.postimg.cc/JnTyPJ74/telechargement-(4).jpg',
    'https://i.postimg.cc/XJx2L2ys/anime-7-63864269925437.jpg'
];

const getRandomImage = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

/* ⚡ مجلد التحميل المؤقت */
const TEMP_DIR = path.join(__dirname, '..', '..', 'temp', 'apk');
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

/* ⚡ حد أقصى 200MB */
const MAX_FILE_SIZE = 200 * 1024 * 1024;

/* ⚡ rate limit */
const cooldown = new Map();
const COOLDOWN_TIME = 30_000;

const isCooldown = (sender) => {
    const last = cooldown.get(sender);
    if (last && Date.now() - last < COOLDOWN_TIME) {
        return Math.ceil((COOLDOWN_TIME - (Date.now() - last)) / 1000);
    }
    cooldown.set(sender, Date.now());
    return false;
};

/* ⚡ رياكت سريع */
const sendReact = (conn, m, emoji) => {
    conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } }).catch(() => {});
};

/* ⚡ إرسال آمن */
const safeSend = async (conn, chat, content, options = {}) => {
    try {
        return await conn.sendMessage(chat, content, options);
    } catch (e) {
        if (e?.message?.includes('rate-overlimit')) {
            await new Promise(r => setTimeout(r, 3000));
            try {
                return await conn.sendMessage(chat, content, options);
            } catch { return null; }
        }
        return null;
    }
};

/* ⬇️ تحميل الملف على السيرفر */
async function downloadToServer(url, fileName, maxSize = MAX_FILE_SIZE) {
    const filePath = path.join(TEMP_DIR, fileName);
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`فشل التحميل: ${res.status}`);
    
    const totalSize = parseInt(res.headers.get('content-length') || '0');
    
    if (totalSize > maxSize) {
        throw new Error(`الملف كبير جداً (${(totalSize / 1024 / 1024).toFixed(1)}MB) — الحد ${maxSize / 1024 / 1024}MB`);
    }
    
    const fileStream = fs.createWriteStream(filePath);
    let downloaded = 0;
    
    return new Promise((resolve, reject) => {
        res.body.on('data', (chunk) => {
            downloaded += chunk.length;
            if (downloaded > maxSize) {
                fileStream.destroy();
                fs.unlink(filePath, () => {});
                reject(new Error('الملف تجاوز الحد'));
            }
        });
        
        res.body.pipe(fileStream);
        
        fileStream.on('finish', () => {
            fileStream.close();
            resolve({ filePath, size: downloaded });
        });
        
        fileStream.on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
        
        res.body.on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
}

/* 🗑️ حذف آمن */
const safeDelete = (filePath) => {
    try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {}
};

/* ═══════════════════════════════════════════
   📤 إرسال القائمة التفاعلية — 10 نتائج
   ═══════════════════════════════════════════ */
async function sendApkList(conn, jid, apps, quoted) {
    const v = verse();
    
    const sections = [{
        title: `📦 نتائج البحث (${apps.length})`,
        rows: apps.map(app => ({
            title: app.name,
            description: `📦 ${app.package}`,
            id: `.app ${app.package}`
        }))
    }];

    /* ✅ تصميم مضغوط */
    const bodyText = `${BRAND.emoji} *نتائج البحث*
📊 *عدد النتائج:* ${apps.length}
━━━━━
📌 *اختر التطبيق من الزر* 👇
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

    try {
        /* ⚡ إرسال Interactive Message */
        const interactiveMessage = proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({ 
                text: bodyText
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({ 
                text: `${BRAND.emoji} ${BRAND.botName}` 
            }),
            header: proto.Message.InteractiveMessage.Header.create({ 
                title: "📲 تحميل تطبيقات APK" 
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: "📋 اختر تطبيقاً",
                            sections
                        })
                    },
                    {
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: "📢 قناة البوت",
                            url: BRAND.channelLink
                        })
                    }
                ]
            })
        });

        const msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: { interactiveMessage }
            }
        }, { quoted });

        return await conn.relayMessage(jid, msg.message, { messageId: msg.key.id });

    } catch (e) {
        /* 🅱️ Fallback: sendButtonNormal */
        try {
            return await conn.sendButtonNormal(jid, {
                media: { url: getRandomImage() },
                mediaType: 'image',
                caption: bodyText,
                buttons: [
                    {
                        name: 'single_select',
                        params: {
                            title: '📱 اختر التطبيق',
                            sections: sections
                        }
                    },
                    {
                        name: 'cta_url',
                        params: { display_text: `📢 قناة البوت`, url: BRAND.channelLink }
                    }
                ],
                mentions: [quoted?.sender || jid],
                newsletter: { name: BRAND.channelName, jid: BRAND.channelId }
            }, quoted);
        } catch (e2) {
            /* 🅱️ Fallback نصي */
            let text = `${BRAND.emoji} *نتائج البحث:*\n`;
            apps.forEach((app, i) => {
                text += `${i + 1}. ${app.name}\n   📦 ${app.package}\n`;
            });
            text += `━━━━━\n﴿ ${v.text} ﴾\n📖 ${v.ref}\n━━━━━\n📌 استخدم: .app <package>`;
            return await safeSend(conn, jid, { text }, { quoted });
        }
    }
}

/* ═══════════════════════════════════════════
   🎯 المعالج الرئيسي
   ═══════════════════════════════════════════ */
let handler = async (m, { conn, args, text, command }) => {
    const v = verse();

    /* ⚡ rate limit */
    const waitTime = isCooldown(m.sender);
    if (waitTime) {
        return safeSend(conn, m.chat, {
            text: `${BRAND.emoji} *⏱️ استنى ${waitTime} ثانية*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`
        }, { quoted: m });
    }

    /* 📌 المساعدة */
    if (!text) {
        sendReact(conn, m, '❌');
        
        /* ✅ تصميم مضغوط */
        const helpText = `${BRAND.emoji} *تحميل تطبيقات APK*
📌 *الاستخدام:* ${command} <اسم التطبيق>
━━━━━
📝 *أمثلة:*
▸ ${command} facebook
▸ ${command} free fire
▸ ${command} whatsapp
━━━━━
⚠️ *الحد:* ${MAX_FILE_SIZE / 1024 / 1024}MB
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

        return safeSend(conn, m.chat, {
            image: { url: getRandomImage() },
            caption: helpText
        }, { quoted: m });
    }

    /* 📥 تنزيل تطبيق محدد (اسم الحزمة) */
    if (/^com\./i.test(text.trim())) {
        sendReact(conn, m, '⏳');
        
        const loadingText = `${BRAND.emoji} ⏳ *جاري التحميل...*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`;
        
        await safeSend(conn, m.chat, { text: loadingText }, { quoted: m });
        
        let apkPath = null;
        let obbPath = null;
        
        try {
            const info = await getAppInfo(text.trim());
            const download = await getDownloadLink(text.trim());

            /* ⬇️ تحميل APK على السيرفر */
            const apkFileName = `${Date.now()}_${info.package}.apk`;
            const apkResult = await downloadToServer(download.url, apkFileName);
            apkPath = apkResult.filePath;
            const sizeMB = (apkResult.size / 1024 / 1024).toFixed(2);

            /* ⚡ تأخير بسيط */
            await new Promise(r => setTimeout(r, 500));

            /* ✅ تصميم مضغوط */
            const caption = `${BRAND.emoji} *${info.name}*
📦 *الحزمة:* ${info.package}
💾 *الحجم:* ${sizeMB} MB
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}
━━━━━
✅ *تم التحميل*
━━━━━
${BRAND.emoji} *${BRAND.shortName}*`;

            /* 📤 إرسال APK من السيرفر */
            const apkBuffer = fs.readFileSync(apkPath);

            await safeSend(conn, m.chat, {
                document: apkBuffer,
                mimetype: download.mimetype || 'application/vnd.android.package-archive',
                fileName: `${info.name}.apk`,
                caption: caption,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: BRAND.channelId,
                        newsletterName: BRAND.channelName,
                        serverMessageId: -1
                    }
                }
            }, { quoted: m });

            /* 🗑️ حذف APK من السيرفر */
            safeDelete(apkPath);
            apkPath = null;

            /* ✅ OBB */
            if (info.obb && info.obbLink) {
                await new Promise(r => setTimeout(r, 2000));
                
                const obbText = `${BRAND.emoji} 📦 *جاري تحميل OBB...*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`;
                
                await safeSend(conn, m.chat, { text: obbText }, { quoted: m });
                
                try {
                    const obbFileName = `${Date.now()}_obb_${info.package}.zip`;
                    const obbResult = await downloadToServer(info.obbLink, obbFileName);
                    obbPath = obbResult.filePath;
                    
                    await new Promise(r => setTimeout(r, 500));
                    
                    const obbBuffer = fs.readFileSync(obbPath);
                    
                    await safeSend(conn, m.chat, {
                        document: obbBuffer,
                        mimetype: 'application/octet-stream',
                        fileName: `obb_${info.package}.zip`,
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: BRAND.channelId,
                                newsletterName: BRAND.channelName,
                                serverMessageId: -1
                            }
                        }
                    }, { quoted: m });
                    
                    safeDelete(obbPath);
                    obbPath = null;
                } catch {
                    safeDelete(obbPath);
                    obbPath = null;
                }
            }

            sendReact(conn, m, '✅');

        } catch (err) {
            safeDelete(apkPath);
            safeDelete(obbPath);
            sendReact(conn, m, '❌');
            
            const errorMsg = err.message?.includes('rate-overlimit')
                ? '⏱️ السيرفر مشغول — جرب بعد 30 ثانية'
                : err.message?.slice(0, 100) || 'خطأ غير معروف';
            
            await safeSend(conn, m.chat, {
                text: `${BRAND.emoji} ❌ *فشل التحميل:*
📌 ${errorMsg}
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`
            }, { quoted: m });
        }
        return;
    }

    /* 🔍 البحث — 10 نتائج */
    sendReact(conn, m, '🔍');
    
    await safeSend(conn, m.chat, {
        text: `${BRAND.emoji} 🔍 *جاري البحث...*
━━━━━
﴿ ${v.text} ﴾
📖 ${v.ref}`
    }, { quoted: m });

    try {
        const apps = await searchAptoide(text);
        
        if (!apps.length) {
            sendReact(conn, m, '❌');
            return safeSend(conn, m.chat, {
                text: `${BRAND.emoji} ❌ *لم يتم العثور على تطبيقات لـ:* ${text}`
            }, { quoted: m });
        }

        await sendApkList(conn, m.chat, apps, m);
        sendReact(conn, m, '📱');
        
    } catch (err) {
        sendReact(conn, m, '❌');
        await safeSend(conn, m.chat, {
            text: `${BRAND.emoji} ❌ *حدث خطأ أثناء البحث.*`
        }, { quoted: m });
    }
};

handler.command = /^(تطبيق|apk)$/i;
handler.help = ['تطبيق <اسم>', 'app <name>'];
handler.tags = ['downloader'];
handler.premium = false;
handler.register = false;

export default handler;

/* ═══════════════════════════════════════════
   🛠️ الدوال المساعدة
   ═══════════════════════════════════════════ */

/* ✅ البحث */
async function searchAptoide(query) {
    try {
        const url = `http://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(query)}&limit=10`;
        const res = await fetch(url);
        const json = await res.json();
        if (!json.datalist?.list) return [];
        return json.datalist.list.map(app => ({
            name: app.name,
            package: app.package,
            downloadUrl: app.file?.path,
            size: app.size || app.file?.filesize,
            icon: app.icon
        }));
    } catch {
        return [];
    }
}

/* ✅ معلومات التطبيق */
async function getAppInfo(packageName) {
    const url = `http://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(packageName)}&limit=1`;
    const res = await fetch(url);
    const json = await res.json();
    const app = json.datalist?.list?.[0];
    
    if (!app) throw new Error('التطبيق غير موجود');

    let obbLink = null;
    let hasObb = false;
    try {
        if (app.obb?.main?.path) {
            obbLink = app.obb.main.path;
            hasObb = true;
        }
    } catch {}

    return {
        name: app.name,
        package: app.package,
        icon: app.icon || getRandomImage(),
        downloadUrl: app.file?.path,
        size: app.size || app.file?.filesize || 0,
        obb: hasObb,
        obbLink
    };
}

/* ✅ رابط التحميل */
async function getDownloadLink(packageName) {
    const url = `http://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(packageName)}&limit=1`;
    const res = await fetch(url);
    const json = await res.json();
    const app = json.datalist?.list?.[0];
    
    if (!app) throw new Error('التطبيق غير موجود');

    const downloadUrl = app.file?.path;
    if (!downloadUrl) throw new Error('رابط التحميل غير متوفر');

    return {
        url: downloadUrl,
        size: app.size || app.file?.filesize || 0,
        mimetype: 'application/vnd.android.package-archive'
    };
}

/* 🧹 تنظيف دوري */
setInterval(() => {
    try {
        if (!fs.existsSync(TEMP_DIR)) return;
        const now = Date.now();
        const files = fs.readdirSync(TEMP_DIR);
        for (const file of files) {
            const filePath = path.join(TEMP_DIR, file);
            try {
                const stats = fs.statSync(filePath);
                if (now - stats.mtimeMs > 900_000) fs.unlinkSync(filePath);
            } catch {}
        }
    } catch {}
}, 300_000);