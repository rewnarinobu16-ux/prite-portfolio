'use client';
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
}