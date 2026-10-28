   const fs = require('fs');
   const path = require('path');

   // สร้างโฟลเดอร์หลักให้ชัวร์
   const folders = ['lib', 'components', 'app/about', 'app/works', 'app/contact', 'app/admin/login', 'app/admin'];
   folders.forEach(dir => {
     const p = path.join(process.cwd(), dir);
     if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
   });

   // เช็คไฟล์สำคัญ ถ้าไม่มีให้สร้างไฟล์ชั่วคราวกันพัง
   const checkFiles = [
     'lib/supabase-client.ts',
     'lib/supabase-server.ts',
     'components/RevealOnScroll.tsx'
   ];

   checkFiles.forEach(file => {
     const fp = path.join(process.cwd(), file);
     if (!fs.existsSync(fp)) {
       fs.writeFileSync(fp, `export function ${file.includes('Reveal') ? 'RevealOnScroll' : 'createClient'}() {}`);
       console.log('Created placeholder:', file);
     }
   });

   console.log('✅ จัดการโครงสร้างโฟลเดอร์เสร็จสมบูรณ์');