# Website Review (May 4, 2026)

This review covers UX, trust/safety, and technical readiness based on the current codebase.

## What is strong

- Clear RTL and Hebrew-first localization (`lang="he"`, `dir="rtl"`) and consistent font setup for Hebrew content.
- Solid storefront structure: hero, categories, sale section, featured products, product explorer, cart, checkout.
- Server-side cart price validation in checkout API (prevents direct client-side price tampering).
- Stripe integration is structured with safe fallback behavior when secret key is missing.

## High-priority issues

1. **Order data API is publicly exposed**
   - `GET /api/orders` currently returns all mock orders with customer data and has no auth checks.
   - Risk: customer PII exposure if real data is wired similarly.

2. **Admin area is linked in the main navigation for all users**
   - `/admin` link is visible in desktop and mobile menus.
   - Even with cookie protection, exposing admin entry point in public nav is not ideal.

3. **Admin protection mechanism is weak and operationally awkward**
   - Access relies on a manually-set cookie (`admin_pw`) matching `ADMIN_PASSWORD`.
   - No login flow, no expiration/rotation policy, no role model.

## Medium-priority issues

1. **Checkout accepts and echoes unconstrained customer object in mock mode**
   - API types `customer` as `Record<string, string>` and returns it directly in mock response.
   - Add validation/sanitization even in non-production paths.

2. **Linting is not fully configured in the repo yet**
   - `next lint` prompts for ESLint setup interactively, which blocks CI-ready lint runs.

## Recommendations

1. Protect `/api/orders` behind authentication/authorization and never expose full customer records by default.
2. Remove `/admin` from public nav; provide a private admin entry path or authenticated menu visibility.
3. Replace cookie-equals-env auth with proper auth (session-based login or middleware-protected route).
4. Add request schema validation (e.g., Zod) for checkout payloads and strict field allowlists.
5. Commit ESLint config so `npm run lint` runs non-interactively in local and CI.

