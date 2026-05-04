import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

/**
 * Auth.js v5 (next-auth@5) configuration.
 *
 * Required env (see .env.example):
 *   AUTH_SECRET           — 32-byte random; sign session JWTs
 *   AUTH_GOOGLE_ID        — Google OAuth client id
 *   AUTH_GOOGLE_SECRET    — Google OAuth client secret
 *
 * Google OAuth callback URL:
 *   ${NEXT_PUBLIC_APP_URL}/api/auth/callback/google
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    // We use a modal/menu sign-in trigger, not a dedicated page.
    // Errors land back on the homepage with ?error=...
    error: '/'
  },
  session: { strategy: 'jwt' }
});
