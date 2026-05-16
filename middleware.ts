import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Create a lightweight NextAuth instance using only the edge-safe config.
// This avoids pulling in Prisma (and Node.js built-ins) into the Edge Runtime.
const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  // Array of regex patterns of paths we want to protect
  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user\/(.*)/,
    /\/order\/(.*)/,
    /\/admin/,
  ]

  // Get pathname from the req URL object
  const {pathname} = request.nextUrl;

  // Get the session
  const session = await auth();

  // Check if user is not authenticated and accessing a protected path
  if (!session && protectedPaths.some((path) => path.test(pathname))) return false

  // Check for session cart cookie
  if (!request.cookies.get("sessionCartId")) {
    // Generate new session cart id cookie
    const sessionCartId = crypto.randomUUID();

    // Clone the req header
    const newRequestHeaders = new Headers(request.headers);

    // Create new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });

    // Set newly generated sessionCartId in the response cookies
    response.cookies.set("sessionCartId", sessionCartId);

    return response;
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and Next internals
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
