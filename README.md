# DealMap AI creator — integration build

This branch adds Supabase Auth SSR sessions, PostgreSQL/RLS migrations, Stripe test-mode subscription checkout/webhooks, server-side AI credit reservation, New Zealand lawyer-review draft pages, and staging QA runbooks.

## Local setup
1. Install Node.js 20+ and run `npm ci` (or `npm install` if no lockfile exists).
2. Copy `.env.example` to `.env.local`; configure Supabase URL and anon key. Keep the Supabase service-role key and Stripe secrets server-only.
3. Enable Supabase email confirmation, configure `/auth/callback` redirect, and run migrations in filename order.
4. Configure Stripe test mode, create a NZD $20 recurring Price, set `STRIPE_MONTHLY_PRICE_ID`, and configure webhook `/api/stripe/webhook` events documented in `QA-STAGING.md`.
5. Optionally set a server-side AI provider key. Prompts are sent to the configured provider and stored with generation history; do not submit sensitive information.
6. Keep age verification and deployment charges disabled until provider, exact fee/data terms and legal review are complete.
7. Run `npm run dev` at `http://localhost:3000`.

## Checks
`npm run lint` · `npm run typecheck` · `npm test` · `npm run test:e2e` · `npm run build`

## Limitations and security notes
- Supabase Auth handles passwords. Never store passwords or service credentials in browser storage or `NEXT_PUBLIC_` variables.
- RLS is defense in depth; review policies and migration behavior in an isolated project before use. Service-role credentials bypass RLS and must be restricted to server code.
- Subscription checkout is an explicit monthly purchase. The three-hour trial does not silently convert to paid billing. Verify all pricing, tax, consent and cancellation details before launch.
- Stripe webhook delivery is the entitlement source of truth. Implement event reconciliation and review ordering/retry semantics before production.
- No age verification provider is integrated; no proposed $2 fee is collected. No 5% deployment charge is enabled.
- Legal pages are drafts with placeholders, not legal advice or a compliance guarantee. Have New Zealand counsel review the final business model and actual documents.
- No Supabase/Stripe credentials, counsel review, test run, or staging deployment is performed by this repository commit. See `QA-STAGING-EXECUTION.md`.
