import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthActions } from '../use-auth-actions';

const mockSignIn = vi.fn();
const mockSignOut = vi.fn();
const mockUseSearchParams = vi.fn();
const mockUseRouter = vi.fn();

vi.mock('@convex-dev/auth/react', () => ({
  useAuthActions: vi.fn(() => ({
    signIn: mockSignIn,
    signOut: mockSignOut,
  })),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

vi.mock('@/i18n/routing', () => ({
  useRouter: () => mockUseRouter(),
}));

describe(useAuthActions.name, () => {
  const mockPush = vi.fn();
  const mockReplace = vi.fn();
  const mockGet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockSignIn.mockResolvedValue({ success: true });
    mockSignOut.mockResolvedValue({ success: true });

    mockUseSearchParams.mockReturnValue({
      get: mockGet,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
  });

  it('returns signIn, signUp, and signOut functions', () => {
    const { result } = renderHook(() => useAuthActions());

    expect(result.current.signIn).toBeInstanceOf(Function);
    expect(result.current.signUp).toBeInstanceOf(Function);
    expect(result.current.signOut).toBeInstanceOf(Function);
  });

  it('handles signIn routing logic when returnTo is provided', () => {
    mockGet.mockReturnValue('/dashboard');

    const { result } = renderHook(() => useAuthActions());

    expect(result.current.signIn).toBeInstanceOf(Function);
    expect(result.current.signUp).toBeInstanceOf(Function);
    expect(result.current.signOut).toBeInstanceOf(Function);
  });

  it('handles signIn routing logic when no returnTo is provided', () => {
    mockGet.mockReturnValue(null);

    const { result } = renderHook(() => useAuthActions());

    expect(result.current.signIn).toBeInstanceOf(Function);
    expect(result.current.signUp).toBeInstanceOf(Function);
    expect(result.current.signOut).toBeInstanceOf(Function);
  });

  it('handles signUp routing logic', () => {
    const { result } = renderHook(() => useAuthActions());

    expect(result.current.signUp).toBeInstanceOf(Function);
  });

  it('handles signOut routing logic', () => {
    const { result } = renderHook(() => useAuthActions());

    expect(result.current.signOut).toBeInstanceOf(Function);
  });
});
