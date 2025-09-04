import { convexAuthNextjsMiddleware, createRouteMatcher } from '@convex-dev/auth/nextjs/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { type RoutingLocales, routing } from '@/i18n/routing';

const DAYS = 30;
const MAX_COOKIE_LIFESPAN = 60 * 60 * 24 * DAYS;

const isProtectedRoute = createRouteMatcher([
  '/:locale/rest-client(.*)',
  '/:locale/history-and-analytics(.*)',
  '/:locale/variables(.*)',
]);

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split('/');
  const possibleLocale = segments[1];
  return routing.locales.includes(possibleLocale as RoutingLocales) ? possibleLocale : null;
}

const handleI18nRouting = createMiddleware(routing);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();

    if (isProtectedRoute(request) && !isAuthenticated) {
      const locale = getLocaleFromPath(request.nextUrl.pathname) || routing.defaultLocale;
      const redirectUrl = new URL(`/${locale}/sign-in`, request.nextUrl.origin);
      redirectUrl.searchParams.set('returnTo', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return handleI18nRouting(request);
  },
  {
    verbose: true,
    cookieConfig: { maxAge: MAX_COOKIE_LIFESPAN },
  },
);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
