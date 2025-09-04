'use client';

import { useConvexAuth } from 'convex/react';
import { useEffect } from 'react';
import { useRoutingActions } from '@/app/hooks/use-routing-actions';

export function useAuth() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return {
    isLoading,
    isAuthenticated,
    isUnauthenticated: !(isLoading || isAuthenticated),
  };
}

export function useRequireAuth(redirectTo = '/sign-in') {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { navigateToPath } = useRoutingActions();

  useEffect(() => {
    if (!(isLoading || isAuthenticated)) {
      navigateToPath(redirectTo, { replace: true });
    }
  }, [isLoading, isAuthenticated, redirectTo, navigateToPath]);

  return { isLoading, isAuthenticated };
}

export function useRedirectIfAuthenticated(redirectTo = '/') {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { navigateToPath } = useRoutingActions();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigateToPath(redirectTo, { replace: true });
    }
  }, [isLoading, isAuthenticated, redirectTo, navigateToPath]);

  return { isLoading, isAuthenticated };
}
