// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // In a real app, you would check for a valid session/token
  const isAuthenticated = request.cookies.has("auth-token"); // Simplified
  const { pathname } = request.nextUrl;


  // Redirect to login if not authenticated and trying to access protected routes
  if (!isAuthenticated && (pathname.startsWith("/dashboard") || pathname === "/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};