import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Pricing</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Simple plans for creators and businesses</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Trial</div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Free</h2>
          <div className="mt-2 text-sm text-slate-500">3-hour full access trial</div>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>• Full app trial</li>
            <li>• Email verification required</li>
            <li>• AI creator access</li>
            <li>• 200 free credits after age verification</li>
          </ul>
          <Link href="/signup" className="mt-8 block rounded-full border border-slate-300 px-4 py-3 text-center font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700">
            Start trial
          </Link>
        </div>

        <div className="rounded-[2rem] border border-brand-400 bg-brand-50 p-8 shadow-glow">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Monthly</div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">NZD $20</h2>
          <div className="mt-2 text-sm text-slate-500">Per month · billed by Stripe</div>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li>• Full app access</li>
            <li>• Unlimited map posting</li>
            <li>• AI builder with credit top-up available</li>
            <li>• Referral rewards and marketplace dashboards</li>
          </ul>
          <Link href="/signup" className="mt-8 block rounded-full bg-brand-600 px-4 py-3 text-center font-semibold text-white hover:bg-brand-700">
            Buy now
          </Link>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Investor / seller</div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Custom</h2>
          <div className="mt-2 text-sm text-slate-500">Approved pricing and deployment terms</div>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>• Seller subscriptions</li>
            <li>• Premium listing upgrades</li>
            <li>• App deployment fees and legal review required</li>
            <li>• Platform commission or deployment charge after counsel review</li>
          </ul>
          <Link href="/signup" className="mt-8 block rounded-full border border-slate-300 px-4 py-3 text-center font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700">
            Talk to sales
          </Link>
        </div>
      </div>
    </main>
  );
}
