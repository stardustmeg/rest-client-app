'use client';

import { useAuthActions as useConvexAuthActions } from '@convex-dev/auth/react';
import { useSearchParams } from 'next/navigation';
import { useRoutingActions } from '@/app/hooks/use-routing-actions';

import type { SignInFormType, SignUpFormType } from '@/app/types/form-schemas';

export function useAuthActions() {
  const { signIn: convexSignIn, signOut: convexSignOut } = useConvexAuthActions();
  const { navigateTo } = useRoutingActions();
  const searchParams = useSearchParams();

  const getSearchParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const signIn = async (data: SignInFormType) => {
    const result = await convexSignIn('password', { ...data, flow: 'signIn' });

    const returnTo = getSearchParam('returnTo');
    if (returnTo) {
      window.location.href = returnTo;
    } else {
      navigateTo('main', { replace: true });
    }

    return result;
  };

  const signUp = async (data: SignUpFormType) => {
    const result = await convexSignIn('password', { ...data, flow: 'signUp' });

    navigateTo('main', { replace: true });

    return result;
  };

  const signOut = async () => {
    const result = await convexSignOut();

    navigateTo('signIn', { replace: true });

    return result;
  };

  return {
    signIn,
    signUp,
    signOut,
  };
}
