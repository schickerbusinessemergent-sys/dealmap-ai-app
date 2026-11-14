import { AiGenerator } from '@/components/ai-generator';

export default function AiPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">AI creator</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Generate business and game app ideas</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Use AI to design viral app concepts, product funnels, pricing ideas, micro-offers, and game prototypes for your next digital business.
        </p>
      </div>

      <AiGenerator />
    </main>
  );
}
