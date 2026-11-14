'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage('Please complete all fields.');
      return;
    }

    const fromLocal = { name, email, password };
    localStorage.setItem('dealmap-user', JSON.stringify(fromLocal));
    localStorage.setItem('dealmap-auth', 'true');
    localStorage.setItem('dealmap-credits', '200');
    localStorage.setItem('dealmap-age-verified', 'false');
    setMessage('Account created. Email verification is required before paid features unlock.');
    window.location.href = '/dashboard';
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-brand-700">Create account</div>
        <h1 className="text-3xl font-bold text-slate-900">Start building your viral app</h1>
        <p className="mt-2 text-slate-600">Create an account, verify your email, and unlock AI builder access.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" placeholder="Your full name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" placeholder="Create a secure password" />
          </div>

          <button type="submit" className="w-full rounded-full bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
            Create account
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}

        <div className="mt-6 text-sm text-slate-600">
          Already have an account? <Link href="/login" className="font-semibold text-brand-700">Log in</Link>
        </div>
      </div>
    </main>
  );
}
