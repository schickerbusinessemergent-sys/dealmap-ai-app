'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please enter a valid email and password.');
      return;
    }

    localStorage.setItem('dealmap-user', JSON.stringify({ email }));
    localStorage.setItem('dealmap-auth', 'true');
    setMessage('Signed in successfully. Redirecting...');
    window.location.href = '/dashboard';
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-brand-700">Sign in</div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-slate-600">Use your email and password to access your dashboard and AI tools.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full rounded-full bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
            Log in
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}

        <div className="mt-6 text-sm text-slate-600">
          No account yet? <Link href="/signup" className="font-semibold text-brand-700">Create one</Link>
        </div>
      </div>
    </main>
  );
}
