import { sampleDeals } from '@/lib/app-data';

export default function DealsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Map and list</div>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Discover the hottest deals</h1>
        </div>
        <button className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          Post a deal
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 font-semibold text-slate-800">Map area</div>
          <div className="h-[420px] rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-6">
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_25%_25%,rgba(82,119,241,0.12),transparent_30%),radial-gradient(circle_at_55%_40%,rgba(15,118,110,0.12),transparent_22%),linear-gradient(135deg,#e2e8f0,#f8fafc)]">
              {sampleDeals.map((deal, index) => (
                <div
                  key={deal.id}
                  className="absolute rounded-full bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white shadow-lg"
                  style={{
                    left: `${20 + (index * 18) % 70}%`,
                    top: `${18 + (index * 22) % 62}%`,
                  }}
                >
                  {deal.title.split(' ')[0]}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sampleDeals.map((deal) => (
            <div key={deal.id} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.15em] text-brand-700">{deal.category}</div>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">{deal.title}</h3>
                </div>
                <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">-{deal.discount}%</div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{deal.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-slate-900">${deal.price}</div>
                  <div className="text-xs text-slate-500 line-through">${deal.originalPrice}</div>
                </div>
                <div className="text-sm text-slate-600">{deal.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
