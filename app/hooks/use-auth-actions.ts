'use client';

import { useAuthActions as useConvexAuthActions } from '@convex-dev/auth/react';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { routes } from '@/app/[locale]/routes';
import type { SignInFormType, SignUpFormType } from '@/app/domains/auth/form-schemas';
import { useRouter } from '@/i18n/routing';

export function useAuthActions() {
  const { signIn: convexSignIn, signOut: convexSignOut } = useConvexAuthActions();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getSearchParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const signIn = useCallback(
    async (data: SignInFormType) => {
      const result = await convexSignIn('password', { ...data, flow: 'signIn' });

      const returnTo = getSearchParam('returnTo');
      if (returnTo) {
        window.location.href = returnTo;
      } else {
        router.replace(routes.main.path);
      }

      return result;
    },
    [convexSignIn, getSearchParam, router],
  );

  const signUp = useCallback(
    async (data: SignUpFormType) => {
      const result = await convexSignIn('password', { ...data, flow: 'signUp' });

      router.replace(routes.main.path);

      return result;
    },
    [convexSignIn, router],
  );

  const signOut = useCallback(async () => {
    const result = await convexSignOut();

    router.replace(routes.signIn.path);

    return result;
  }, [convexSignOut, router]);

  return {
    signIn,
    signUp,
    signOut,
  };
}
