import { createClient } from '@/lib/supabase-server';
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
        <a href={`mailto:${contact?.email}`} className="bg-card border border-neon-purple/10 rounded-2xl p-5 flex items-center gap-4 hover:border-neon-purple transition">
          <span className="text-2xl">✉️</span><div><div className="font-semibold">Email</div><div className="text-sm text-gray-400">{contact?.email}</div></div>
        </a>
      </div>
    </div>
  );
}