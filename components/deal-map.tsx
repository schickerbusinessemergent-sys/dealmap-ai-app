'use client';

import { sampleDeals } from '@/lib/app-data';

export function DealMapPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-brand-700">Map view</div>
            <h3 className="mt-1 text-xl font-bold text-slate-900">Trending deals</h3>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Live</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {sampleDeals.map((deal) => (
            <div key={deal.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-900">{deal.title}</div>
                <div className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-700">
                  {deal.category}
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-600">{deal.location}</div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-slate-900">${deal.price}</div>
                  <div className="text-xs text-slate-500 line-through">${deal.originalPrice}</div>
                </div>
                <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">-{deal.discount}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 to-slate-100 p-6">
        <div className="text-sm font-medium uppercase tracking-[0.22em] text-brand-700">Insights</div>
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Trending</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">54</div>
            <div className="text-sm text-slate-600">Local deals posted in last 24h</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg. sale</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">NZD $143</div>
            <div className="text-sm text-slate-600">Average deal take rate</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Invites</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">2.4k</div>
            <div className="text-sm text-slate-600">Referral-driven signups this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
