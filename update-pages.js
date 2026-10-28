const fs = require('fs');
const path = require('path');

const files = {
  'app/about/page.tsx': `import { createClient } from '@/lib/supabase-server';
import { RevealOnScroll } from '@/components/RevealOnScroll';
export const revalidate = 60;
export default async function AboutPage() {
  const supabase = createClient();
  const { data: about } = await supabase.from('about').select('*');
  return (
    <div className="page-container">
      <RevealOnScroll><h1 className="text-4xl font-bold mb-4 gradient-text">เกี่ยวกับฉัน</h1><p className="text-gray-400 mb-8 max-w-2xl">รู้จักตัวตน ความชอบ และเป้าหมาย</p></RevealOnScroll>
      <div className="grid md:grid-cols-2 gap-6">
        {about?.map(item => (
          <RevealOnScroll key={item.id}>
            <div className="bg-card border border-neon-purple/10 rounded-2xl p-6 hover:border-neon-purple transition h-full">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-neon-purple mb-2">{item.title}</h3>
              <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}`,

  'app/works/page.tsx': `import { createClient } from '@/lib/supabase-server';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import Image from 'next/image';
export const revalidate = 60;
export default async function WorksPage() {
  const supabase = createClient();
  const { data: works } = await supabase.from('works').select('*').order('order');
  return (
    <div className="page-container">
      <RevealOnScroll><h1 className="text-4xl font-bold mb-4 gradient-text">ผลงาน</h1><p className="text-gray-400 mb-8">ผลงานที่ผ่านมาและการร่วมงานเฉพาะกิจ</p></RevealOnScroll>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works?.map(work => (
          <RevealOnScroll key={work.id}>
            <div className="bg-card border border-neon-purple/10 rounded-2xl p-5 hover:border-neon-purple transition h-full">
              <div className="h-48 rounded-xl bg-gradient-to-br from-neon-purple/25 to-neon-blue/25 flex items-center justify-center text-5xl mb-4 overflow-hidden">
                {work.image_url ? <Image src={work.image_url} alt={work.title} width={400} height={200} className="w-full h-full object-cover" /> : work.icon}
              </div>
              <span className="inline-block px-2 py-1 rounded-full bg-neon-purple/10 text-neon-purple text-xs mb-2 uppercase">{work.category}</span>
              <h3 className="text-lg font-semibold">{work.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{work.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}`,

  'app/contact/page.tsx': `import { createClient } from '@/lib/supabase-server';
import { RevealOnScroll } from '@/components/RevealOnScroll';
export const revalidate = 60;
export default async function ContactPage() {
  const supabase = createClient();
  const { data: contact } = await supabase.from('contact').select('*').single();
  return (
    <div className="page-container">
      <RevealOnScroll><h1 className="text-4xl font-bold mb-4 gradient-text">ติดต่อ</h1><p className="text-gray-400 mb-8">ช่องทางการติดต่อและโซเชียลมีเดีย</p></RevealOnScroll>
      <div className="grid md:grid-cols-3 gap-4">
        <a href={contact?.youtube_url} target="_blank" rel="noopener" className="bg-card border border-neon-purple/10 rounded-2xl p-5 flex items-center gap-4 hover:border-neon-purple transition">
          <span className="text-2xl">▶️</span><div><div className="font-semibold">YouTube</div><div className="text-sm text-gray-400">{contact?.youtube_name}</div></div>
        </a>
        <a href={contact?.tiktok_url} target="_blank" rel="noopener" className="bg-card border border-neon-purple/10 rounded-2xl p-5 flex items-center gap-4 hover:border-neon-purple transition">
          <span className="text-2xl">🎵</span><div><div className="font-semibold">TikTok</div><div className="text-sm text-gray-400">{contact?.tiktok_name}</div></div>
        </a>
        <a href={\`mailto:\${contact?.email}\`} className="bg-card border border-neon-purple/10 rounded-2xl p-5 flex items-center gap-4 hover:border-neon-purple transition">
          <span className="text-2xl">✉️</span><div><div className="font-semibold">Email</div><div className="text-sm text-gray-400">{contact?.email}</div></div>
        </a>
      </div>
    </div>
  );
}`,

  'app/admin/login/page.tsx': `'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push('/admin');
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl border border-neon-purple/20">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Admin Login</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div><label className="block text-sm text-neon-purple mb-1">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-dark border border-neon-purple/20 text-white" required /></div>
          <div><label className="block text-sm text-neon-purple mb-1">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-lg bg-dark border border-neon-purple/20 text-white" required /></div>
          <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</button>
        </form>
      </div>
    </div>
  );
}`,

  'app/admin/page.tsx': `import { createClient } from '@/lib/supabase-server';
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
}`,

  'components/RevealOnScroll.tsx': `'use client';
import { useEffect, useRef, ReactNode } from 'react';
export function RevealOnScroll({ children, className = '' }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={\`reveal \${className}\`}>{children}</div>;
}`
};

Object.keys(files).forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, files[filePath]);
  console.log('Updated:', filePath);
});
console.log('🚀 อัปเดตหน้าเพจหลักทั้งหมดเรียบร้อยแล้ว!');