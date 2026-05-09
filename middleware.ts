import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
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
