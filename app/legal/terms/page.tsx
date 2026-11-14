export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Terms</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Terms of service</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
          <p>By using DealMap, you agree to create and maintain a secure account, provide truthful information, and follow all applicable user rules, pricing, AI usage, and reporting policies.</p>
          <p>Accounts must be created with a valid email address and password, and email verification is required before certain features are unlocked. We may suspend or terminate access where users violate our terms, misuse the service, or present a risk to the platform.</p>
          <p>AI-generated ideas and outputs may require human review for quality, legal compliance, originality, privacy, security, and deployment suitability before being used. DealMap does not guarantee that generated content is legally cleared, secure, or market-ready.</p>
          <p>Currency, fees, subscriptions, and deployment-charge logic must be reviewed by a New Zealand lawyer before launch and the final terms should reflect the exact business model in force.</p>
        </div>
      </div>
    </main>
  );
}
