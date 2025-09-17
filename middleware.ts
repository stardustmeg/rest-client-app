import { convexAuthNextjsMiddleware, createRouteMatcher } from '@convex-dev/auth/nextjs/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routes } from '@/app/[locale]/routes';
import { routing } from '@/i18n/routing';

const DAYS = 30;
const MAX_COOKIE_LIFESPAN = 60 * 60 * 24 * DAYS;
const AUTH_ROUTES = ['/sign-in(.*)', '/sign-up(.*)'];
const PROTECTED_ROUTES = ['/rest-client(.*)', '/history-and-analytics(.*)', '/variables(.*)'];

const isAuthRoute = createRouteMatcher(AUTH_ROUTES);

const isProtectedRoute = createRouteMatcher(PROTECTED_ROUTES);

function createRedirectUrl(request: Request, path: string, returnTo?: string): URL {
  const redirectUrl = new URL(path, request.url);

  if (returnTo) {
    redirectUrl.searchParams.set('returnTo', returnTo);
  }

  return redirectUrl;
}

const handleI18nRouting = createMiddleware(routing);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();

    if (isAuthRoute(request) && isAuthenticated) {
      const redirectUrl = createRedirectUrl(request, routes.main.path);
      return NextResponse.redirect(redirectUrl);
    }

    if (isProtectedRoute(request) && !isAuthenticated) {
      const redirectUrl = createRedirectUrl(request, routes.signIn.path, request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return handleI18nRouting(request);
  },
  {
    cookieConfig: { maxAge: MAX_COOKIE_LIFESPAN },
  },
);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
