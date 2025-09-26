import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('convex/react', () => ({
  useConvexAuth: vi.fn(),
  useQuery: vi.fn(),
}));

import { useConvexAuth, useQuery } from 'convex/react';
import { useAuth } from '../use-auth';

describe('useAuth', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns loading state', () => {
    (useConvexAuth as Mock).mockReturnValue({ isLoading: true, isAuthenticated: false });
    (useQuery as Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.username).toBeUndefined();
    expect(result.current.userId).toBeUndefined();

    act(() => {
      expect(result.current.isUnauthenticated).toBe(true);
    });
  });

  it('returns unauthenticated state', () => {
    (useConvexAuth as Mock).mockReturnValue({ isLoading: false, isAuthenticated: false });
    (useQuery as Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isUnauthenticated).toBe(true);
    expect(result.current.username).toBeUndefined();
    expect(result.current.userId).toBeUndefined();
  });
});
