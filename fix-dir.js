   const fs = require('fs');
   const path = require('path');

   // เช็คว่ามีโฟลเดอร์ src ซ้อนอยู่ไหม ถ้ามีให้ย้ายไฟล์ออกมาข้างนอก
   const srcDir = path.join(process.cwd(), 'src');
   const appDir = path.join(process.cwd(), 'app');

   if (fs.existsSync(srcDir) && fs.existsSync(path.join(srcDir, 'app'))) {
     console.log('🔄 กำลังย้ายโครงสร้างจาก src ออกมาที่ Root...');
     const srcAppFiles = fs.readdirSync(path.join(srcDir, 'app'));
     if (!fs.existsSync(appDir)) fs.mkdirSync(appDir);
     
     srcAppFiles.forEach(file => {
       const oldPath = path.join(srcDir, 'app', file);
       const newPath = path.join(appDir, file);
       if (!fs.existsSync(newPath)) {
         fs.renameSync(oldPath, newPath);
       }
     });
   }

   // สร้างโฟลเดอร์ lib และ components ให้แน่ใจว่าอยู่ Root จริงๆ
   ['lib', 'components'].forEach(dir => {
     const p = path.join(process.cwd(), dir);
     if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
   });

   console.log('✅ จัดระเบียบโครงสร้างเสร็จเรียบร้อย');