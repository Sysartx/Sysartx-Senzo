// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // In a real app, you would check for a valid session/token
  const isAuthenticated = request.cookies.has("auth-token"); // Simplified
  
  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};