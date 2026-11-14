import '@/app/globals.css';
import Link from 'next/link';
import { DealMapPanel } from '@/components/deal-map';

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              Viral business ideas · map format
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 lg:text-6xl">
              Launch deals, ideas, and viral business apps from one map.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              DealMap lets customers discover local flash offers, generate business and game app concepts with AI, post deal pins, invite friends, and manage subscriptions in one app ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-glow hover:bg-brand-700">
                Start free
              </Link>
              <Link href="/ai" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-brand-500 hover:text-brand-700">
                Try AI creator
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-black text-slate-900">1.2k</div>
                <div className="text-sm text-slate-600">Deals posted</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-black text-slate-900">23%</div>
                <div className="text-sm text-slate-600">Referral growth</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-black text-slate-900">200</div>
                <div className="text-sm text-slate-600">Starter credits</div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-slate-100 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand-700">Map dashboard</div>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Hot local offers</h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Trending</span>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                ['Downtown Burger', 'Food', '8 min away'],
                ['Studio Sprint', 'Service', '25 min away'],
                ['Game Dev Weekender', 'Education', '2 hr away'],
              ].map(([title, tag, distance]) => (
                <div key={title} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <div>
                    <div className="font-semibold text-slate-900">{title}</div>
                    <div className="text-sm text-slate-500">{tag}</div>
                  </div>
                  <div className="text-sm font-medium text-brand-700">{distance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Why it works</div>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">The viral loop for creators and businesses</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Create', 'Post offers, app concepts, or deal ideas on a map and let local communities discover them.'],
            ['Share', 'Invite friends and reward clicks, referrals, and top-voted ideas with leaderboards.'],
            ['Monetize', 'Offer a 3-hour trial, NZD $20 monthly access, and optional creator subscriptions.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-brand-700">{title}</div>
              <p className="text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <DealMapPanel />
      </section>
    </main>
  );
}
