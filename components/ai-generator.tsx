'use client';

import { useState } from 'react';
import { buildAiIdea } from '@/lib/app-data';

export function AiGenerator() {
  const [prompt, setPrompt] = useState('AI-powered local deals marketplace for creators and small businesses');
  const [idea, setIdea] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    const raw = prompt.trim();
    if (!raw) {
      setError('Please enter a product idea or prompt.');
      return;
    }

    const credits = Number(localStorage.getItem('dealmap-credits') ?? '200');
    if (credits < 10) {
      setError('You need at least 10 credits to generate an AI idea. Complete age verification or top up credits.');
      return;
    }

    localStorage.setItem('dealmap-credits', String(credits - 10));
    setIdea(buildAiIdea(raw));
    setError('');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-slate-700">Describe the app or business you want to build</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="h-40 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-brand-500"
          placeholder="Example: an app that helps local businesses create flash deals and get discovered by nearby users"
        />

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-500">
            Credits: <span className="font-semibold text-slate-800">{localStorage.getItem('dealmap-credits') ?? '200'}</span>
          </div>
          <button
            onClick={handleGenerate}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Generate idea
          </button>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">AI output</h3>
        {idea ? (
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-brand-700">{idea.tag}</div>
              <h4 className="mt-2 text-2xl font-bold text-slate-900">{idea.title}</h4>
            </div>
            <p className="text-sm leading-6 text-slate-600">{idea.summary}</p>
            <div>
              <div className="mb-2 text-sm font-semibold text-slate-800">Key features</div>
              <ul className="space-y-2 text-sm text-slate-600">
                {idea.features.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-slate-800">Monetization</div>
              <ul className="space-y-2 text-sm text-slate-600">
                {idea.monetization.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            Output will appear here after you generate an idea.
          </div>
        )}
      </div>
    </div>
  );
}
