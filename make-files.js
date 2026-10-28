const fs = require('fs');
const path = require('path');

const files = {
  'tailwind.config.ts': `import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { black: '#0a0a0f', dark: '#12121a', card: '#1a1a25', neon: { purple: '#b24bf3', pink: '#ff3cac', blue: '#00d4ff', green: '#00ff9d', yellow: '#ffeb3b' } },
      fontFamily: { sans: ['Anuphan', 'K2D', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;`,

  'postcss.config.mjs': `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`,

  'next.config.mjs': `/** @type {import('next').NextConfig} */
const nextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }] } };
export default nextConfig;`,

  'middleware.ts': `import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name) { return request.cookies.get(name)?.value; },
      set(name, value, options) { request.cookies.set({ name, value, ...options }); response = NextResponse.next({ request: { headers: request.headers } }); response.cookies.set({ name, value, ...options }); },
      remove(name, options) { request.cookies.set({ name, value: '', ...options }); response = NextResponse.next({ request: { headers: request.headers } }); response.cookies.set({ name, value: '', ...options }); },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login' && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return response;
}
export const config = { matcher: ['/admin/:path*'] };`,

  'app/globals.css': `@import url('https://fonts.googleapis.com/css2?family=Anuphan:wght@300;400;600;700&family=K2D:wght@300;400;600;700&display=swap');
@tailwind base; @tailwind components; @tailwind utilities;
:root { --black: #0a0a0f; --dark: #12121a; --card: #1a1a25; }
body { background: var(--black); color: #f0f0f5; font-family: 'Anuphan', 'K2D', sans-serif; }
.gradient-text { @apply bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent; }
.btn-primary { @apply px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold transition hover:shadow-lg hover:shadow-neon-purple/30 hover:-translate-y-0.5; }
.btn-outline { @apply px-6 py-3 rounded-full border border-neon-purple text-white hover:bg-neon-purple/10 transition; }
.page-container { @apply min-h-screen pt-28 px-4 max-w-7xl mx-auto pb-20; }`,

  'lib/supabase-server.ts': `import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name) { return cookieStore.get(name)?.value; },
      set(name, value, options) { try { cookieStore.set({ name, value, ...options }); } catch {} },
      remove(name, options) { try { cookieStore.set({ name, value: '', ...options }); } catch {} },
    },
  });
}`,

  'lib/supabase-client.ts': `import { createBrowserClient } from '@supabase/ssr';
export function createClient() { return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!); }`,

  'app/layout.tsx': `import './globals.css';
export const metadata = { title: 'Paiya Namna | Portfolio', description: 'Portfolio of Paiya Namna' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="th"><body>{children}</body></html>);
}`,

  'app/page.tsx': `export default function Home() { return <div className="page-container"><h1 className="text-4xl font-bold gradient-text">Paiya Namna Portfolio</h1><p className="mt-4 text-gray-400">ระบบพร้อมใช้งานแล้ว!</p></div>; }`
};

Object.keys(files).forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, files[filePath]);
  console.log('Created:', filePath);
});
console.log('🚀 สร้างไฟล์ทั้งหมดเรียบร้อยแล้ว!');