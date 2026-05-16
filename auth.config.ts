import type { NextAuthConfig } from "next-auth";

// This config contains ONLY edge-compatible settings.
// No providers, no Prisma, no Node.js-only imports — safe for the Edge Runtime.
// The middleware uses this to verify JWT session existence without touching the DB.
export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Empty providers array — the real CredentialProvider lives in auth.ts
  // (Node.js runtime only). Middleware only needs JWT verification.
  providers: [],
} satisfies NextAuthConfig;
