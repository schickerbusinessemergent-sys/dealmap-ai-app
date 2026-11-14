# Execution record template — staging only

**Status: NOT RUN by this repository change.** This project has not been connected to external Supabase, Stripe, AI, email, legal counsel, or hosting accounts. Do not mark checks passed until executed against staging and record sanitized evidence here.

## Run order (requested sequence)
1. Supabase project setup: create a dedicated staging project; configure email confirmation, callback allowlist, password policy, RLS and backups. Record project reference only, never secrets.
2. Stripe test mode: create NZD 20/month recurring Price in test mode; configure webhook at `/api/stripe/webhook`; verify signing secret stored in deployment secrets.
3. Legal draft review: send `app/legal/*` drafts to New Zealand counsel; complete all placeholders only after reviewing actual data/billing behavior. Counsel engagement and sign-off cannot be performed by code.
4. Configure environment variables in a staging secret manager; do not commit `.env.local` or keys.
5. Apply Supabase migrations in order and verify RLS with separate test users.
6. Configure email templates and deliverability; test confirmation, resend, callback, and password reset.
7. Run static checks: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
8. Deploy to staging only; record URL, commit SHA, deployment ID, and rollback path.
9. Run route checklist and session/cookie tests in `QA-STAGING.md` using synthetic accounts.
10. Run Stripe test checkout, cancel, failed payment, signed webhook, invalid signature, duplicate/retry, and webhook-outage cases. Confirm no live-mode transactions.
11. Run AI happy path, provider failure, insufficient-credit, concurrent request, and refund tests with synthetic prompts.
12. Test age verification only if a provider and reviewed fee/data handling are configured; otherwise confirm it remains disabled and no payment can be created.
13. Run security/accessibility/mobile smoke checks; collect unresolved defects and counsel findings. Production deployment is out of scope.

## Evidence fields
- Date/time (UTC):
- Tester:
- Commit SHA:
- Staging URL:
- Supabase project ref (non-secret):
- Stripe mode: TEST
- Result per test ID (Pass/Fail/Blocked):
- Sanitized request/event IDs:
- Defect links:
- Reviewer sign-off:

Do not include passwords, full emails, payment data, identity documents, access tokens, or secret keys.
