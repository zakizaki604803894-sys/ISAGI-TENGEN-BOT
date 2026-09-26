/* ═══════════════════════════════════════════════════════════
   🍁 clean-before.js — تنظيف database.json قبل البوت
   📁 /home/container/clean-before.js
   🎯 الحل الجذري لـ ZodError
   ✅ يعمل قبل meowsab — يحذف extraOwners تماماً
   ═══════════════════════════════════════════════════════════ */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'system', 'database.json');
const DB_BACKUP = DB_PATH + '.bak';
const GS_PATH = path.join(__dirname, 'system', 'settings.json');

console.log('');
console.log('🍁 [clean-before] ═══════════════════════════════════');
console.log('🍁 [clean-before] بدء التنظيف الجذري...');
console.log('');

try {
    /* ═══════════════════════════════════════════
       1) التأكد من وجود الملف
       ═══════════════════════════════════════════ */
    if (!fs.existsSync(DB_PATH)) {
        const dir = path.dirname(DB_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(DB_PATH, '{"groups":{},"users":{},"extraOwners":[],"data":{"extraOwners":[]}}', 'utf-8');
        console.log('🍁 [clean-before] ✅ تم إنشاء database.json جديد');
        console.log('🍁 [clean-before] ═══════════════════════════════════');
        console.log('');
        process.exit(0);
    }

    /* ═══════════════════════════════════════════
       2) قراءة + نسخة احتياطية
       ═══════════════════════════════════════════ */
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    
    if (!fs.existsSync(DB_BACKUP)) {
        fs.writeFileSync(DB_BACKUP, raw, 'utf-8');
        console.log('🍁 [clean-before] ✅ نسخة احتياطية: database.json.bak');
    }

    /* ═══════════════════════════════════════════
       3) تحليل JSON
       ═══════════════════════════════════════════ */
    let data;
    try {
        data = JSON.parse(raw);
    } catch (e) {
        console.error('🍁 [clean-before] ❌ JSON تالف:', e.message);
        console.log('🍁 [clean-before] 🔄 محاولة استعادة...');
        
        if (fs.existsSync(DB_BACKUP)) {
            try {
                const backup = fs.readFileSync(DB_BACKUP, 'utf-8');
                data = JSON.parse(backup);
                console.log('🍁 [clean-before] ✅ تم الاستعادة');
            } catch (e2) {
                fs.writeFileSync(DB_PATH, '{"groups":{},"users":{},"extraOwners":[],"data":{"extraOwners":[]}}', 'utf-8');
                console.log('🍁 [clean-before] ✅ تم إنشاء ملف جديد');
                process.exit(0);
            }
        } else {
            fs.writeFileSync(DB_PATH, '{"groups":{},"users":{},"extraOwners":[],"data":{"extraOwners":[]}}', 'utf-8');
            console.log('🍁 [clean-before] ✅ تم إنشاء ملف جديد');
            process.exit(0);
        }
    }

    /* ═══════════════════════════════════════════
       4) حذف extraOwners تماماً — في كل المستويات
       ═══════════════════════════════════════════ */
    let totalRemoved = 0;

    // المستوى الأعلى
    if (Array.isArray(data.extraOwners)) {
        totalRemoved += data.extraOwners.length;
        data.extraOwners = [];
        console.log('🍁 [clean-before] ✅ extraOwners (top) → []');
    } else {
        data.extraOwners = [];
    }

    // مستوى data
    if (!data.data || typeof data.data !== 'object') {
        data.data = {};
    }
    
    if (Array.isArray(data.data.extraOwners)) {
        totalRemoved += data.data.extraOwners.length;
        data.data.extraOwners = [];
        console.log('🍁 [clean-before] ✅ data.extraOwners → []');
    } else {
        data.data.extraOwners = [];
    }

    // مستوى data.data (احتياطي)
    if (data.data.data && typeof data.data.data === 'object') {
        if (Array.isArray(data.data.data.extraOwners)) {
            totalRemoved += data.data.data.extraOwners.length;
            data.data.data.extraOwners = [];
            console.log('🍁 [clean-before] ✅ data.data.extraOwners → []');
        }
    }

    /* ═══════════════════════════════════════════
       5) حذف أي قائمة owners داخل data (لأنها قد تُدمج)
       ═══════════════════════════════════════════ */
    if (data.data && data.data.owners) {
        const before = Array.isArray(data.data.owners) ? data.data.owners.length : 0;
        delete data.data.owners;
        console.log(`🍁 [clean-before] ✅ حذف data.owners (${before} عنصر)`);
    }

    if (data.owners && typeof data.owners === 'object') {
        // نحتفظ بـ owners الأصلية — لا نحذفها
        // لأنها قائمة المطورين الأساسية
    }

    /* ═══════════════════════════════════════════
       6) حذف المفاتيح الداخلية
       ═══════════════════════════════════════════ */
    const internalKeys = ['__ownersHooked', '__preCleaned', '_cachedAt', '_lastClean'];
    for (const key of internalKeys) {
        if (data[key] !== undefined) {
            delete data[key];
            console.log(`🍁 [clean-before] ✅ حذف ${key}`);
        }
    }

    /* ═══════════════════════════════════════════
       7) حفظ الملف
       ═══════════════════════════════════════════ */
    const finalRaw = JSON.stringify(data, null, 2);
    fs.writeFileSync(DB_PATH, finalRaw, 'utf-8');

    /* ═══════════════════════════════════════════
       8) التحقق النهائي
       ═══════════════════════════════════════════ */
    const secCount = (finalRaw.match(/"secondary"/g) || []).length;
    const addCount = (finalRaw.match(/"addedAt"/g) || []).length;
    const extraOwnerCount = (finalRaw.match(/"extraOwners"/g) || []).length;

    console.log('');
    console.log('🍁 [clean-before] 📊 التحقق النهائي:');
    console.log(`🍁 [clean-before]    secondary: ${secCount}`);
    console.log(`🍁 [clean-before]    addedAt: ${addCount}`);
    console.log(`🍁 [clean-before]    extraOwners references: ${extraOwnerCount}`);
    console.log(`🍁 [clean-before]    عناصر محذوفة: ${totalRemoved}`);

    if (secCount === 0 && addCount === 0) {
        console.log('🍁 [clean-before] 🎉 database.json نظيف تماماً');
    } else {
        console.log('🍁 [clean-before] ⚠️ لا تزال حقول زائدة!');
    }

    /* ═══════════════════════════════════════════
       9) التأكد من settings.json
       ═══════════════════════════════════════════ */
    if (!fs.existsSync(GS_PATH)) {
        fs.writeFileSync(GS_PATH, '{}', 'utf-8');
        console.log('🍁 [clean-before] ✅ تم إنشاء settings.json');
    }

    console.log('🍁 [clean-before] ═══════════════════════════════════');
    console.log('');
    process.exit(0);
} catch (e) {
    console.error('🍁 [clean-before] ❌ خطأ غير متوقع:', e.message);
    console.error('🍁 [clean-before] ⚠️ سيستمر البوت على أي حال');
    process.exit(0);
}