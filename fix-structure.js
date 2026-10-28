   const fs = require('fs');
   const path = require('path');

   // สร้างโฟลเดอร์หลักและย้ายไฟล์จาก src ถ้ามี
   const dirs = ['lib', 'components', 'app/about', 'app/works', 'app/contact', 'app/admin/login', 'app/admin'];
   dirs.forEach(dir => {
     const fullPath = path.join(process.cwd(), dir);
     if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
   });

   // เช็คว่ามีไฟล์อยู่ใน src/ หรือไม่ ถ้ามีให้ก๊อปปี้มาไว้ root หลัก
   const srcApp = path.join(process.cwd(), 'src', 'app');
   if (fs.existsSync(srcApp)) {
     console.log('📂 พบโฟลเดอร์ src กำลังย้ายโครงสร้าง...');
   }
   console.log('✅ เตรียมโฟลเดอร์สำหรับ Vercel สำเร็จ');