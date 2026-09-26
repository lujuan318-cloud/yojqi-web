import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale
  const pathnameIsMissingLocale =
    !pathname.startsWith('/en') && !pathname.startsWith('/zh');

  if (pathnameIsMissingLocale) {
    // Default to English ('en') as the primary global storefront locale
    const url = new URL(`/en${pathname === '/' ? '' : pathname}`, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
