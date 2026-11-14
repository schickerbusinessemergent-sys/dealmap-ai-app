import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { CookieBanner } from '@/components/cookie-banner';

export const metadata: Metadata = {
  title: 'DealMap',
  description: 'Viral business and game app creation with local deals, payments, referrals, and AI-powered concept generation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <SiteHeader />
        {children}
        <CookieBanner />
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between sm:px-6 lg:px-8">
            <div>© 2026 DealMap</div>
            <div className="flex gap-4">
              <Link href="/legal/privacy">Privacy</Link>
              <Link href="/legal/terms">Terms</Link>
              <Link href="/legal/subscription">Subscriptions</Link>
              <Link href="/legal/age-verification">Age verification</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
