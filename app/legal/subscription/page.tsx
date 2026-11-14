export default function SubscriptionPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Subscription terms</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Trial and subscription rules</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
          <p>DealMap allows a 3-hour full app trial after successful email verification. The trial duration must be visible and clearly disclosed before activation.</p>
          <p>After the trial, a NZD $20 monthly subscription may apply. The paid subscription should be presented clearly before acceptance, shown in NZD, and managed through Stripe billing in a production environment.</p>
          <p>Customers should be able to cancel and manage their subscription in their account dashboard. Access timing after cancellation must match the final disclosed policy.</p>
          <p>All pricing, subscription, and tax disclosures should be reviewed by a New Zealand lawyer and must match the actual billing configuration and refund policy before launch.</p>
        </div>
      </div>
    </main>
  );
}
