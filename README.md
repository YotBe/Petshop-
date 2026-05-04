# Petshop — Premium Dog Gear (MVP)

High-converting Next.js 14 storefront for a curated dog product dropshipping business.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Shadcn-style primitives
- Lucide React icons
- Zustand (cart state, persisted to localStorage)
- Stripe (skeleton checkout route)
- Supabase / Vercel Postgres ready (mock DB included)

## Quickstart
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Routes
- `/` — Homepage (hero, category grid, featured products)
- `/products` — Full catalog
- `/products/[id]` — Product details + Frequently Bought Together
- `/checkout` — Order summary + Stripe Elements skeleton
- `/admin` — Order list with AliExpress fulfillment links (set `ADMIN_PASSWORD`)

## Environment Variables
See `.env.example`. At minimum for the storefront to run you only need:
- `NEXT_PUBLIC_APP_URL`

For Stripe checkout:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

For Supabase persistence (optional — mocks work out of the box):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

For admin gate:
- `ADMIN_PASSWORD`
