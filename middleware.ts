import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Read the token from HttpOnly cookie
  const token = request.cookies.get("auth_token")?.value;

  const pathname = request.nextUrl.pathname;

  // Protect only /dashboard routes
  const isDashboard = pathname.startsWith("/dashboard");

  // If visiting a protected route without a token → redirect
  if (isDashboard && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise allow request
  return NextResponse.next();
}

// Tell Next.js which routes activate this middleware
export const config = {
  matcher: ["/dashboard/:path*"], // Protects /dashboard and all sub-routes
};
