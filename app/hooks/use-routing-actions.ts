'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import { type RouteKey, routes } from '@/app/[locale]/routes';
import { type RoutingLocales, redirect, useRouter } from '@/i18n/routing';

export function useRoutingActions() {
  const router = useRouter();
  const nextRouter = useNextRouter();

  const navigateTo = (routeKey: RouteKey, options?: { replace?: boolean }) => {
    const route = routes[routeKey];
    if (options?.replace) {
      router.replace(route.path);
    } else {
      router.push(route.path);
    }
  };

  const navigateToPath = (path: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };

  const goBack = () => {
    nextRouter.back();
  };

  const goForward = () => {
    nextRouter.forward();
  };

  const refresh = () => {
    nextRouter.refresh();
  };

  const redirectTo = (routeKey: RouteKey, locale?: RoutingLocales) => {
    const route = routes[routeKey];
    redirect({ href: route.path, locale: locale ?? 'en' });
  };

  const redirectToPath = (path: string, locale?: RoutingLocales) => {
    redirect({ href: path, locale: locale ?? 'en' });
  };

  return {
    navigateTo,
    navigateToPath,
    goBack,
    goForward,
    refresh,

    redirectTo,
    redirectToPath,

    router,
    nextRouter,

    routes,
  };
}
