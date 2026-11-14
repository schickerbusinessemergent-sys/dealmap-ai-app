# Staging setup and QA checklist

Run against a non-production environment with synthetic accounts and Stripe test mode only. Never put passwords, identity documents, card data, or secret keys in test evidence.

## Configure staging
- Configure Supabase Auth email confirmation, callback URLs (`/auth/callback`), password policy, and SQL migrations in filename order.
- Set Stripe test secret, NZD $20 monthly recurring Price ID, and test webhook endpoint `/api/stripe/webhook` for checkout completion, subscription updates/deletion, and invoice payment failure. Keep the signing secret in the hosting secret store.
- Configure `NEXT_PUBLIC_APP_URL`; configure an AI provider key only if AI testing is intended.
- Keep age verification and deployment charges disabled unless provider, fee terms, legal approval, and end-to-end implementation are complete.
- Create synthetic verified, unverified, active, and cancelled users. Use Stripe test cards and no real customer data.

## Route checklist
- [ ] `/` loads; header/footer navigation works desktop/mobile.
- [ ] `/signup`: confirmation email is required; password is never persisted in browser storage.
- [ ] `/login`: credentials behave safely; unverified user cannot proceed.
- [ ] `/verify-email`: resend works with provider rate limits and non-enumerating feedback.
- [ ] `/forgot-password`: reset email and callback work.
- [ ] `/auth/callback`: valid code establishes session; invalid/expired code fails closed.
- [ ] `/dashboard`: unauthenticated redirects; data is read for current user only.
- [ ] `/ai`: generation requires authenticated verified user; insufficient balance and provider failure handled.
- [ ] `/pricing`: terms and GST disclosure finalized; acceptance required; Stripe test checkout redirects.
- [ ] `/billing/success`: does not independently grant paid access.
- [ ] `/deals`: demo data is visibly identified until backed by real storage.
- [ ] All legal pages are completed, versioned and lawyer-reviewed before publication.
- [ ] `/api/billing/checkout` rejects anonymous, unverified, missing-consent, or unconfigured requests.
- [ ] `/api/stripe/webhook` rejects invalid signatures and handles duplicate events.
- [ ] `/api/ai/generate` validates input, reserves credits atomically, and refunds failures.
- [ ] `/api/credits` requires a session and returns only caller balance.

## Billing test matrix
- [ ] successful test checkout + webhook activates correct user
- [ ] redirect without webhook does not activate access
- [ ] invalid webhook signature rejected
- [ ] duplicate event has no duplicate side effects
- [ ] subscription update/deletion and failed invoice update entitlement
- [ ] checkout cancellation creates no entitlement
- [ ] verify dashboard has no live-mode key/configuration

## Cookies and session
- [ ] Supabase SSR session uses cookies; no password/token in app localStorage.
- [ ] Sign-out removes server session; protected routes redirect.
- [ ] Cookie banner accurately reflects actual cookies; do not claim optional cookies are blocked unless verified.
- [ ] Session refresh, expiry, callback and browser back behavior checked.

## Release gate
Record commit, environment, synthetic account aliases, results and sanitized request IDs. Block release on auth bypass, cross-user access, premature payment entitlement, incorrect/duplicate credits, secret leakage or unresolved legal placeholders. This checklist is not a legal compliance certification.
