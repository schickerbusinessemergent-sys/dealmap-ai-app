# DealMap AI creator — integration build

This branch replaces the browser-only authentication and credit demo with Supabase Auth SSR sessions, a PostgreSQL/RLS migration, a Stripe test-mode subscription checkout/webhook path, server-side AI generation credit reservation, legal-review drafts, and staging QA materials.

## Setup
1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.example` to `.env.local`; configure Supabase project URL and anon key.
3. In Supabase, enable email confirmations, set Site URL and redirect allowlist to `http://localhost:3000/auth/callback`, and run `supabase/migrations/202611140001_initial_secure_schema.sql`.
4. Configure Stripe test mode. Create an NZD $20 recurring monthly Price, set `STRIPE_MONTHLY_PRICE_ID`, and configure a test webhook to `/api/stripe/webhook` for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, and `invoice.payment_failed`. Set the webhook signing secret.
5. Optionally configure a server-side OpenAI key and model. The AI route is unavailable without a key. Prompts are sent to the configured provider and stored in generation history; do not submit sensitive data.
6. Leave age verification disabled until a provider and legally reviewed fee/data terms are configured. The $2 verification fee and proposed 5% deployment charge are not implemented for collection.
7. Run `npm run dev` and open `http://localhost:3000`.

## Commands
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run test:e2e`
- `npm run build`

## Security boundaries and limitations
- Supabase Auth handles passwords; this app does not store passwords in browser storage.
- RLS protects profile, ledger, generation, and verification reads. Service-role key is required only by webhook server code and must never use a `NEXT_PUBLIC_` prefix.
- Stripe checkout is an explicit monthly purchase. The three-hour trial is app-side access and does not auto-charge or convert silently; the customer must separately consent and check out.
- Subscription state is updated by signed webhook events. Configure/review event ordering and recovery/reconciliation before production.
- Credit grants require a successful age-verification record, but no verification provider integration is included. Do not claim verified status or collect the proposed $2 fee until implemented and tested.
- AI output is generated server-side; credit reservation/refund is recorded in database functions. Review prompts, retention, provider terms, and abuse controls before launch.
- Legal pages are drafts with placeholders for counsel, not legal advice or a compliance guarantee. Complete all bracketed details and have New Zealand counsel review before publication.
- No staging URL is created by this code commit; deploy the branch and configure services to get one.
