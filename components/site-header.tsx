'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dealmap-user');
    setIsLoggedIn(Boolean(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dealmap-user');
    localStorage.removeItem('dealmap-auth');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand-700">
          DealMap
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/">Home</Link>
          <Link href="/deals">Deals</Link>
          <Link href="/ai">AI Creator</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:border-brand-600 hover:text-brand-700">
                Log in
              </Link>
              <Link href="/signup" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-700">
                Start free
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:border-red-300 hover:text-red-600"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
