   const fs = require('fs');
   const path = require('path');

   // สร้างโฟลเดอร์หลักที่ขาดหายไป
   ['lib', 'components', 'app/about', 'app/works', 'app/contact', 'app/admin/login', 'app/admin'].forEach(dir => {
     const fullPath = path.join(process.cwd(), dir);
     if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
   });

   console.log('📂 ตรวจสอบและสร้างโฟลเดอร์เรียบร้อย');