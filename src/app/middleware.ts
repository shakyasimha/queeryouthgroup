import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'np'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // Handle root redirect
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  // Check if path has valid locale prefix
  const pathLocale = pathname.split('/')[1];
  
  // Redirect to default locale if no locale prefix
  if (!locales.includes(pathLocale)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  // Ensure trailing slash for locale root
  if (pathname === `/${pathLocale}`) {
    return NextResponse.redirect(new URL(`/${pathLocale}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};