/* ═══════════════════════════════════════════════════════════
   🍁 𝐈𝐒𝐀𝐆𝐈 𝐓𝐄𝐍𝐆𝐄𝐍 𝐁𝐎𝐓 — نظام قاعدة البيانات (محسّن)
   📁 /home/container/system/UltraDB.js
   ⚡ استجابة فورية | حفظ ذكي | بدون استهلاك زائد
   🛡️ تنظيف تلقائي لـ extraOwners (يمنع ZodError)
   ═══════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EMOJI = '🍁';

/* 🛡️ دالة تنظيف extraOwners — تُزيل أي حقول غير معروفة */
const sanitizeExtraOwners = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr
        .filter(o => o && typeof o === 'object')
        .map(o => ({
            name: o?.name || '',
            jid:  o?.jid  || '',
            lid:  o?.lid  || ''
        }))
        .filter(o => o.jid || o.lid); // إزالة العناصر الفارغة
};

class UltraDB {
    #path;
    #gsPath;
    #saveTimer = null;
    #gsSaveTimer = null;
    #dirty = false;
    #gsDirty = false;

    constructor() {
        this.#path   = path.join(__dirname, 'database.json');
        this.#gsPath = path.join(__dirname, 'settings.json');

        /* ✅ إنشاء المجلد إذا لم يكن موجوداً */
        const dir = path.dirname(this.#path);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

        /* ✅ تحميل البيانات */
        this.data = this.#load();

        /* ✅ تحميل global._gs من الملف */
        global._gs = this.#loadGs();

        /* ⚡ حفظ تلقائي ذكي — فقط عند التغييرات */
        setInterval(() => {
            if (this.#dirty) this.#saveNow();
            if (this.#gsDirty) this.#saveGsNow();
        }, 30_000);

        /* ⚡ حفظ عند الخروج */
        const saveAll = () => {
            this.#saveNow();
            this.#saveGsNow();
        };
        
        process.on('exit', saveAll);
        process.on('SIGINT', () => {
            saveAll();
            process.exit(0);
        });
        process.on('SIGTERM', saveAll);

        return this.#createProxy();
    }

    /* ═══════════════════════════════════════════
       🍁 تحميل البيانات — مع تنظيف تلقائي
       ═══════════════════════════════════════════ */
    #load() {
        try {
            if (existsSync(this.#path)) {
                const raw = readFileSync(this.#path, 'utf-8').trim();
                if (raw && raw.startsWith('{')) {
                    const parsed = JSON.parse(raw);
                    if (!parsed.groups) parsed.groups = {};
                    if (!parsed.users)  parsed.users  = {};

                    /* 🛡️ تنظيف extraOwners في المستوى الأعلى */
                    parsed.extraOwners = sanitizeExtraOwners(parsed.extraOwners);

                    /* 🛡️ تنظيف extraOwners في المستوى القديم (data.data.extraOwners) */
                    if (parsed.data && typeof parsed.data === 'object') {
                        if (parsed.data.extraOwners) {
                            parsed.data.extraOwners = sanitizeExtraOwners(parsed.data.extraOwners);
                        }
                    }

                    return parsed;
                }
            }
        } catch (e) {
            console.error(`${EMOJI} [UltraDB] خطأ في قراءة JSON:`, e.message);
            try { writeFileSync(this.#path, '{"groups":{},"users":{},"extraOwners":[]}'); } catch {}
        }
        return { groups: {}, users: {}, extraOwners: [] };
    }

    #loadGs() {
        try {
            if (existsSync(this.#gsPath)) {
                const raw = readFileSync(this.#gsPath, 'utf-8').trim();
                if (raw && raw.startsWith('{')) return JSON.parse(raw);
            }
        } catch (e) {
            console.error(`${EMOJI} [UltraDB] خطأ في قراءة الإعدادات:`, e.message);
            try { writeFileSync(this.#gsPath, '{}'); } catch {}
        }
        return {};
    }

    /* ═══════════════════════════════════════════
       ⚡ حفظ مؤجل (50ms) — للاستخدام السريع
       ═══════════════════════════════════════════ */
    #save() {
        this.#dirty = true;
        if (this.#saveTimer) return;
        this.#saveTimer = setTimeout(() => {
            this.#saveNow();
        }, 50);
    }

    /* ⚡ حفظ فوري — بدون تأخير */
    #saveNow() {
        if (this.#saveTimer) {
            clearTimeout(this.#saveTimer);
            this.#saveTimer = null;
        }
        if (!this.#dirty) return;
        try {
            writeFileSync(this.#path, JSON.stringify(this.data));
            this.#dirty = false;
        } catch (e) {
            /* صامت */
        }
    }

    #saveGs() {
        this.#gsDirty = true;
        if (this.#gsSaveTimer) return;
        this.#gsSaveTimer = setTimeout(() => {
            this.#saveGsNow();
        }, 50);
    }

    #saveGsNow() {
        if (this.#gsSaveTimer) {
            clearTimeout(this.#gsSaveTimer);
            this.#gsSaveTimer = null;
        }
        if (!this.#gsDirty) return;
        try {
            if (global._gs) {
                writeFileSync(this.#gsPath, JSON.stringify(global._gs));
                this.#gsDirty = false;
            }
        } catch (e) {
            /* صامت */
        }
    }

    /* ⚡ حفظ فوري (عام) */
    saveGsSync() {
        this.#saveGsNow();
    }

    saveSync() {
        this.#saveNow();
    }

    /* ═══════════════════════════════════════════
       🍁 التحقق من صحة الـ ID
       ═══════════════════════════════════════════ */
    #isValidId(id) {
        return id && 
               typeof id === 'string' &&
               !id.includes('@newsletter') && 
               id.includes('@') && 
               id !== 'undefined';
    }

    /* ═══════════════════════════════════════════
       🍁 إنشاء Proxy — محسّن
       ═══════════════════════════════════════════ */
    #createProxy() {
        const self = this;

        /* ⚡ Proxy للـ group الواحد */
        const createGroupProxy = (groupId) => {
            const target = self.data.groups[groupId] || (self.data.groups[groupId] = {});
            return new Proxy(target, {
                set(obj, key, val) {
                    if (val === false || val === null || val === undefined) {
                        delete obj[key];
                    } else {
                        obj[key] = val;
                    }
                    self.#save();
                    return true;
                },
                get(obj, key) { return obj[key]; },
                deleteProperty(obj, key) { 
                    delete obj[key]; 
                    self.#save(); 
                    return true; 
                }
            });
        };

        /* ⚡ Proxy للـ user الواحد */
        const createUserProxy = (userId) => {
            const target = self.data.users[userId] || (self.data.users[userId] = {});
            return new Proxy(target, {
                set(obj, key, val) {
                    if (val === false || val === null || val === undefined) {
                        delete obj[key];
                    } else {
                        obj[key] = val;
                    }
                    self.#save();
                    return true;
                },
                get(obj, key) { return obj[key]; },
                deleteProperty(obj, key) { 
                    delete obj[key]; 
                    self.#save(); 
                    return true; 
                }
            });
        };

        /* ⚡ كاش Proxy للمجموعات والمستخدمين */
        const groupProxies = new Map();
        const userProxies = new Map();

        return new Proxy(this.data, {
            get(target, prop) {
                /* ✅ groups */
                if (prop === 'groups') {
                    return new Proxy(target.groups, {
                        get(groupTarget, groupId) {
                            if (!self.#isValidId(groupId)) return undefined;
                            
                            /* ⚡ كاش Proxy */
                            if (groupProxies.has(groupId)) {
                                return groupProxies.get(groupId);
                            }
                            
                            const proxy = createGroupProxy(groupId);
                            groupProxies.set(groupId, proxy);
                            return proxy;
                        },
                        set(groupTarget, groupId, val) {
                            if (self.#isValidId(groupId)) {
                                groupTarget[groupId] = val || {};
                                groupProxies.delete(groupId);
                            }
                            self.#save();
                            return true;
                        }
                    });
                }

                /* ✅ users */
                if (prop === 'users') {
                    return new Proxy(target.users, {
                        get(usersTarget, userId) {
                            if (!userId || userId === 'undefined') return undefined;
                            
                            /* ⚡ كاش Proxy */
                            if (userProxies.has(userId)) {
                                return userProxies.get(userId);
                            }
                            
                            const proxy = createUserProxy(userId);
                            userProxies.set(userId, proxy);
                            return proxy;
                        },
                        set(usersTarget, userId, val) {
                            if (userId && userId !== 'undefined') {
                                usersTarget[userId] = val || {};
                                userProxies.delete(userId);
                            }
                            self.#save();
                            return true;
                        }
                    });
                }

                /* ✅ extraOwners — نظيف دائماً */
                if (prop === 'extraOwners') {
                    if (!Array.isArray(target.extraOwners)) {
                        target.extraOwners = [];
                    }
                    return target.extraOwners;
                }

                /* ✅ _gs */
                if (prop === '_gs') {
                    return global._gs;
                }

                return target[prop];
            },

            set(target, prop, val) {
                if (prop === '_gs') {
                    global._gs = val;
                    self.#saveGs();
                    return true;
                }

                /* 🛡️ تنظيف extraOwners عند التعيين */
                if (prop === 'extraOwners') {
                    target.extraOwners = sanitizeExtraOwners(val);
                    self.#save();
                    return true;
                }

                if (val === false || val === null || val === undefined) {
                    delete target[prop];
                } else {
                    target[prop] = val;
                }
                self.#save();
                return true;
            },

            deleteProperty(target, prop) {
                if (prop === '_gs') {
                    global._gs = {};
                    self.#saveGs();
                    return true;
                }
                delete target[prop];
                self.#save();
                return true;
            }
        });
    }

    /* ═══════════════════════════════════════════
       🍁 دوال المطورين الإضافيين — مع تنظيف
       ═══════════════════════════════════════════ */
    addExtraOwner(owner) {
        if (!owner?.jid && !owner?.lid) return false;

        /* 🛡️ تنظيف العنصر قبل الإضافة */
        const cleanOwner = {
            name: owner.name || '',
            jid:  owner.jid  || '',
            lid:  owner.lid  || ''
        };
        
        /* ⚡ بحث سريع */
        const exists = this.data.extraOwners.some(o => 
            (cleanOwner.jid && o.jid === cleanOwner.jid) || 
            (cleanOwner.lid && o.lid === cleanOwner.lid)
        );
        if (exists) return false;
        
        this.data.extraOwners.push(cleanOwner);
        this.#saveNow();
        return true;
    }

    removeExtraOwner(jid) {
        const initialLength = this.data.extraOwners.length;
        this.data.extraOwners = this.data.extraOwners.filter(o => 
            o.jid !== jid && o.lid !== jid
        );
        
        if (this.data.extraOwners.length < initialLength) {
            this.#saveNow();
            return true;
        }
        return false;
    }

    getExtraOwners() {
        return this.data.extraOwners || [];
    }

    /* ⚡ دوال إضافية */
    getStats() {
        return {
            groups: Object.keys(this.data.groups || {}).length,
            users: Object.keys(this.data.users || {}).length,
            extraOwners: (this.data.extraOwners || []).length,
            dirty: this.#dirty,
            gsDirty: this.#gsDirty
        };
    }

    forceSave() {
        this.#saveNow();
        this.#saveGsNow();
    }
}

export default UltraDB;