import { createClient } from '@/lib/supabase-server';
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
}