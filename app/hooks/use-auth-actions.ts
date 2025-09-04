'use client';

import { useAuthActions as useConvexAuthActions } from '@convex-dev/auth/react';
import type { SignInFormType, SignUpFormType } from '@/app/types/form-schemas';

export function useAuthActions() {
  const { signIn: convexSignIn, signOut: convexSignOut } = useConvexAuthActions();

  const signIn = (data: SignInFormType) => {
    return convexSignIn('password', { ...data, flow: 'signIn' });
  };

  const signUp = (data: SignUpFormType) => {
    return convexSignIn('password', { ...data, flow: 'signUp' });
  };

  const signOut = () => {
    return convexSignOut();
  };

  return {
    signIn,
    signUp,
    signOut,
  };
}
