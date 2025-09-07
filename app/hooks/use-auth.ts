'use client';

import { useConvexAuth, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function useAuth() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const currentUser = useQuery(api.users.currentUser, {});

  return {
    isLoading,
    isAuthenticated,
    isUnauthenticated: !(isLoading || isAuthenticated),

    username: currentUser?.username ?? null,
    userId: currentUser?._id ?? null,
  };
}
