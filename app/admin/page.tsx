import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-4 gradient-text">หน้าจัดการระบบ (Admin)</h1>
      <p className="text-gray-400 mb-8">ยินดีต้อนรับเข้าสู่ระบบจัดการข้อมูลเว็บไซต์</p>
      <div className="bg-card p-6 rounded-2xl border border-neon-purple/10">
        <p className="text-neon-green">ล็อกอินสำเร็จ! คุณสามารถจัดการข้อมูลผ่าน Supabase Dashboard ได้โดยตรง หรือเพิ่มหน้าควบคุมฟอร์มที่นี่</p>
      </div>
    </div>
  );
}