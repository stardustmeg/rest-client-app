import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// Most likely PROTECTED_ROUTES and isProtectedRoute will not be needed and can be deleted.
const PROTECTED_ROUTES = ['/rest-client', '/history-and-analytics', '/variables'];

function isProtectedRoute(request: NextRequest) {
  return PROTECTED_ROUTES.some((route) => request.nextUrl.pathname.includes(route));
}

const handleI18nRouting = createMiddleware(routing);

const TEST_USER_LOGGED_IN = false;

export default function middleware(request: NextRequest) {
  if (isProtectedRoute(request) && !TEST_USER_LOGGED_IN) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
