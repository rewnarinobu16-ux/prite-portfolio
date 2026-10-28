import { createClient } from '@/lib/supabase-server';
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
}