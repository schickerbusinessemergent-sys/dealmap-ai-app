'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(200);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('dealmap-user');
    const storedCredits = localStorage.getItem('dealmap-credits');
    const storedVerified = localStorage.getItem('dealmap-age-verified');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCredits) {
      setCredits(Number(storedCredits));
    }
    if (storedVerified === 'true') {
      setVerified(true);
    }
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Dashboard</div>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
        </div>
        <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
          {verified ? 'Age verified' : 'Verification required'}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">AI Credits</div>
          <div className="mt-3 text-4xl font-black text-slate-900">{credits}</div>
          <div className="mt-2 text-sm text-slate-600">Available after age verification</div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Plan</div>
          <div className="mt-3 text-4xl font-black text-slate-900">Trial</div>
          <div className="mt-2 text-sm text-slate-600">3-hour access period</div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Monthly</div>
          <div className="mt-3 text-4xl font-black text-slate-900">NZD $20</div>
          <div className="mt-2 text-sm text-slate-600">Managed during the subscription cycle</div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">AI creator activity</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Business app concept</span>
              <span className="font-semibold text-slate-900">Draft saved</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Game app concept</span>
              <span className="font-semibold text-slate-900">Ready to publish</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Referral invite accepted</span>
              <span className="font-semibold text-slate-900">+15 points</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Account actions</h2>
          <div className="mt-5 space-y-3">
            <button className="block w-full rounded-full border border-slate-300 px-4 py-3 text-left text-sm font-medium text-slate-800 hover:border-brand-600 hover:text-brand-700">
              Verify age to unlock 200 free credits
            </button>
            <button className="block w-full rounded-full border border-slate-300 px-4 py-3 text-left text-sm font-medium text-slate-800 hover:border-brand-600 hover:text-brand-700">
              Start monthly subscription (NZD $20)
            </button>
            <button className="block w-full rounded-full border border-slate-300 px-4 py-3 text-left text-sm font-medium text-slate-800 hover:border-brand-600 hover:text-brand-700">
              View legal documents and privacy policy
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
