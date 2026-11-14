'use client';
import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name }, emailRedirectTo: `${location.origin}/auth/callback?next=/dashboard` } });
      if (error) throw error;
      setMessage('Check your email for a verification link. You must verify your address before accessing protected features.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Sign-up failed.'); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto max-w-xl px-4 py-16"><div className="rounded-3xl border bg-white p-8 shadow-sm"><h1 className="text-3xl font-bold">Create your account</h1><p className="mt-2 text-slate-600">We will email you a verification link. Your password is handled by Supabase Auth and is never stored by this app.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm">Name<input required autoComplete="name" value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full rounded-xl border p-3" /></label><label className="block text-sm">Email<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border p-3" /></label><label className="block text-sm">Password<input required minLength={10} type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border p-3" /><span className="text-xs text-slate-500">Use at least 10 characters and follow your Supabase password policy.</span></label><button disabled={busy} className="w-full rounded-full bg-brand-600 px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?'Creating…':'Create account'}</button></form>{message&&<p role="status" className="mt-4 text-sm">{message}</p>}<p className="mt-6 text-sm">Already registered? <Link href="/login" className="text-brand-700">Sign in</Link></p></div></main>;
}
