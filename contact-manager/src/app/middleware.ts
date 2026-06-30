import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAndExtract } from "./lib/crypto";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;
  let isLoggedIn = false;

  if (session?.value) {
    try {
      const payload = await verifyAndExtract(session.value);
      if (payload) {
        const user = JSON.parse(payload);
        isLoggedIn = !!user?.id;
      }
    } catch {
      isLoggedIn = false;
    }
  }

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/contacts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contacts/:path*", "/login", "/register"],
};
