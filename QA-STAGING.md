# Staging QA runbook

Run against a non-production environment with synthetic accounts and Stripe test mode only. Never put passwords, identity documents, card data, or secret keys in test evidence.

## Setup
- Configure Supabase Auth email confirmation, callback URLs (`/auth/callback`), password policy, and SQL migration.
- Set Stripe test secret, monthly NZD 20 recurring Price ID, and webhook endpoint `/api/stripe/webhook` for checkout completion, subscription updates/deletion, and invoice payment failure. Copy the signing secret to staging.
- Configure `NEXT_PUBLIC_APP_URL`; configure an AI provider key only if AI testing is intended.
- Keep `AGE_VERIFICATION_ENABLED=false` and `DEPLOYMENT_FEE_ENABLED=false` unless provider, fee terms, legal approval, and end-to-end implementation are complete.
- Create test accounts: verified, unverified, active subscriber, cancelled subscriber. Use Stripe test cards and no real customer data.

## Route-by-route checklist
- [ ] `/` loads; header/footer navigation works on desktop and mobile.
- [ ] `/signup`: valid signup triggers email confirmation; password is never persisted in localStorage/sessionStorage.
- [ ] `/login`: correct/incorrect credentials behave safely; unverified user cannot proceed.
- [ ] `/verify-email`: resend is rate-limited/configured and has non-enumerating feedback.
- [ ] `/forgot-password`: reset email flow and callback work.
- [ ] `/auth/callback`: valid code establishes session; invalid/expired code fails closed.
- [ ] `/dashboard`: unauthenticated redirects to login; profile/credits/subscription are server-read.
- [ ] `/ai`: verified authenticated user can generate with sufficient credits; unauthorized/insufficient balance and provider failure are handled.
- [ ] `/pricing`: subscription and tax terms visible; explicit checkbox required; checkout redirects to Stripe test checkout.
- [ ] `/billing/success`: does not independently grant access; webhook is source of truth.
- [ ] `/deals`: demo data is visibly identified as demo until backed by real storage.
- [ ] `/legal/privacy`, `/legal/terms`, `/legal/subscription`, `/legal/age-verification`: placeholders completed, lawyer reviewed, versioned.
- [ ] `/api/health`: reports service status without exposing secrets.
- [ ] `/api/billing/checkout`: rejects no session, unverified user, missing consent, missing Price ID.
- [ ] `/api/stripe/webhook`: rejects invalid signature; handles repeated events idempotently.
- [ ] `/api/ai/generate`: rejects anonymous/unverified/invalid prompts; charges credits atomically; refunds reservation on provider failure.
- [ ] `/api/credits`: requires user session and returns only caller's balance.

## Billing test matrix
- [ ] successful checkout + webhook activates account
- [ ] browser success redirect alone does not activate account
- [ ] invalid signature rejected
- [ ] duplicate event does not duplicate side effects
- [ ] subscription updated/deleted changes entitlement
- [ ] invoice payment failure reflects past_due
- [ ] checkout cancellation creates no subscription entitlement
- [ ] no test payment reaches live Stripe mode

## Cookie/session checks
- [ ] Supabase session is managed using SSR cookies; no password or access token copied to app localStorage.
- [ ] Sign-out removes server session and protected routes redirect.
- [ ] Cookie banner consent behavior accurately reflects actual cookies; do not claim analytics are blocked unless verified.
- [ ] Test session refresh, expired session, and callback on supported browsers.

## Release gate
Record commit, environment, test account identifiers (non-PII aliases), results, and sanitized request IDs. Block release on any auth bypass, cross-user access, payment entitlement before verified webhook, negative/duplicated credits, leaked secrets, or unresolved legal placeholders. This checklist is not a legal compliance certification.
