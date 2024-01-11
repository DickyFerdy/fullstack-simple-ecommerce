import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const token = request.cookies.get("refreshToken");
  
  if (token) {
    const decodedToken = jwtDecode(token.value);
    const currentTime = Math.floor(Date.now() / 1000)

    if (decodedToken.exp > currentTime) {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/', '/profile/:path*']
}