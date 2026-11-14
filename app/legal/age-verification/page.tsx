export default function AgeVerificationPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Age verification</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Age and credit rules</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
          <p>Users may need to complete age verification before receiving their 200 free credits. Credit grants should be tied to a successful verification result and recorded with an auditable status.</p>
          <p>The proposed NZD $2 age verification charge should be shown before collection, clearly itemized, and subject to the exact refund and failure policy in place. It should only be charged when the verification provider, fee basis, and legal review are complete.</p>
          <p>The platform should not store unnecessary identity information. Verification should use the minimum data necessary and keep it separate from normal application usage and AI content where practical.</p>
          <p>Any age rule, fee amount, or verification method must be checked by New Zealand legal counsel before launch.</p>
        </div>
      </div>
    </main>
  );
}
