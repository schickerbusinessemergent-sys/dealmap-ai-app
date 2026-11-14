# DealMap terminal and web development environment

The repository includes a GitHub Codespaces / VS Code Dev Containers environment. It gives you a Linux terminal with Node.js 20, npm, Git, GitHub CLI, and a forwarded port for the Next.js app.

## Open a cloud terminal with GitHub Codespaces
1. Open the repository: https://github.com/schickerbusinessemergent-sys/dealmap-ai-app
2. Select the `feature/production-integrations` branch.
3. Choose **Code → Codespaces → Create codespace on feature/production-integrations**.
4. Wait for the container setup to finish. Open **Terminal → New Terminal**.
5. Start the website:

```bash
npm run dev
```

Codespaces forwards port 3000 and provides a browser link. This is a development URL, not a production or guaranteed persistent staging address.

## Local terminal
Install Node.js 20+, then from the repository root run:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. You can run checks in the same terminal:

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## Configure integrations safely
- Supabase public URL and anon key go in `.env.local` for local development.
- Stripe secret and webhook signing secret, Supabase service-role key, and AI provider key are secrets. Store them only in local ignored `.env.local` or the Codespaces/host secret manager; never commit them or add a `NEXT_PUBLIC_` prefix.
- Stripe must be in test mode for development.
- Age verification and deployment charges remain disabled until a provider and reviewed terms are ready.
- The `.env.example` values are placeholders. The app will not provide real authentication, payments, or AI until valid services are configured.

## Codespaces secrets
In GitHub, configure repository/user Codespaces secrets under **Settings → Secrets and variables → Codespaces**. Rebuild the Codespace after changing secrets if needed. Avoid sharing secret values in issues, logs, screenshots, chat, or commits.

## Important
The Codespaces browser URL is temporary and access-controlled. To create a shareable staging website, deploy the app to a hosting provider and configure its environment variables, Supabase URLs, Stripe test webhook, and domain. No staging deployment is created by this development-container setup.
