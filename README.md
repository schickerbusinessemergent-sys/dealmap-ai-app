# DealMap AI app creator

This repo contains a starter Next.js application for a DealMap-style experience: a viral local-deals and AI app-creator platform with trial and subscription concepts, AI idea generation, age verification and credit handling, and legal-document placeholders.

## Features included
- Email/password sign-up and sign-in UX
- Email verification state and protected-user flow
- 3-hour trial concept and starter subscription messaging
- NZD $20/month subscription plan page
- 200 free credits after age verification concept
- AI generator page for business or game app ideas
- Deal map/list mockup with trending local offers
- Cookie banner and privacy/terms/legal placeholders
- Responsive app shell and navigation

## Important legal note
This starter app is not legal advice and it is not a full market-ready compliance package. New Zealand privacy, consumer, payment, and age-verification requirements should be reviewed by a qualified lawyer before any real launch or money collection.

## Local setup

1. Clone this repo.
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open http://localhost:3000

## Environment files
Copy `.env.example` to `.env.local` and fill in your credentials as needed.

## Production notes
- Stripe test mode should be used for all billing tests.
- Supabase should be configured for real auth, row-level security, and real data storage.
- Mapbox and Stripe keys must be added in a real deployment environment.
- A lawyer should review all payment, trial, age-verification, AI, and privacy flows before public launch.

## Project structure
- `app/` – Next.js routes and pages
- `components/` – reusable UI components
- `lib/` – shared mock data and mobile-ready helper logic

## Current status
This is a working starter project for demo and development use. It includes demo logic and mock data, not a full SaaS backend or live payment integration.
