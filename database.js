// ملف قاعدة البيانات الخارجي
window.database = (function() {
    // اسم المفتاح في localStorage
    const DB_KEY = 'app_database';
    
    // تهيئة قاعدة البيانات
    function initDB() {
        if (!localStorage.getItem(DB_KEY)) {
            localStorage.setItem(DB_KEY, JSON.stringify([]));
        }
    }
    
    // الحصول على جميع السجلات
    function getAllRecords() {
        return JSON.parse(localStorage.getItem(DB_KEY)) || [];
    }
    
    // إضافة سجل جديد
    function addRecord(record) {
        const records = getAllRecords();
        const newRecord = {
            id: Date.now(), // استخدام الطوابع الزمنية كمعرفات فريدة
            ...record,
            createdAt: new Date().toISOString()
        };
        records.push(newRecord);
        localStorage.setItem(DB_KEY, JSON.stringify(records));
        return newRecord;
    }
    
    // البحث في السجلات
    function searchRecords(query) {
        const records = getAllRecords();
        if (!query) return records;
        
        return records.filter(record =>
            record.name.includes(query) ||
            record.email.includes(query) ||
            record.phone.includes(query)
        );
    }
    
    // حذف سجل
    function deleteRecord(id) {
        let records = getAllRecords();
        records = records.filter(record => record.id !== id);
        localStorage.setItem(DB_KEY, JSON.stringify(records));
    }
    
    // تحديث سجل
    function updateRecord(id, updatedData) {
        let records = getAllRecords();
        records = records.map(record => {
            if (record.id === id) {
                return { ...record, ...updatedData, updatedAt: new Date().toISOString() };
            }
            return record;
        });
        localStorage.setItem(DB_KEY, JSON.stringify(records));
    }
    
    // تصدير الدوال للاستخدام الخارجي
    return {
        initDB,
        addRecord,
        getAllRecords,
        searchRecords,
        deleteRecord,
        updateRecord
    };
})();
