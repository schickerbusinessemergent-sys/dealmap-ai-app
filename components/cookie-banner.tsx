'use client';

import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('dealmap-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('dealmap-cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('dealmap-cookie-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-slate-900 text-slate-50 shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="max-w-3xl text-sm text-slate-200">
          We use cookies for app sessions, analytics, and essential functionality. Continue to use DealMap to accept this notice.
        </div>
        <div className="flex gap-3">
          <button onClick={reject} className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-slate-300">
            Reject
          </button>
          <button onClick={accept} className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400">
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
