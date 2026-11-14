export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Privacy policy</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Privacy notice</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
          <p>DealMap collects account information, email verification data, account activity, payment status, cookie preferences, AI prompts, usage logs, and support communications to provide the services we offer.</p>
          <p>We use this information to create accounts, verify age and identity where required, process subscriptions and payments, deliver AI content, support users, maintain security, and improve service experience.</p>
          <p>We will keep personal data only for the period necessary for those purposes. Data may be shared with service providers such as hosting, authentication, email, analytics, and payment processors.</p>
          <p>Users can request correction, deletion, or access to their personal data by contacting the product owner or support team listed in the legal documents. Important: this is a starter app and should be reviewed by a New Zealand lawyer before launch.</p>
        </div>
      </div>
    </main>
  );
}
