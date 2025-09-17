import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSignOutAction } from '../use-signout-action';

const mockSignOut = vi.fn();
const mockSuccessToast = vi.fn();

vi.mock('@/app/hooks/use-auth-actions', () => ({
  useAuthActions: () => ({
    signOut: mockSignOut,
  }),
}));

vi.mock('@/app/hooks/use-toast', () => ({
  useToast: () => ({
    success: mockSuccessToast,
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => () => 'Sign out success!',
}));

describe('useSignOutAction', () => {
  const setup = () => renderHook(() => useSignOutAction());

  beforeEach(() => {
    vi.clearAllMocks();
    mockSignOut.mockResolvedValue(undefined);
  });

  it('should perform a signOut and shows a success-toast with the "signOut" action', async () => {
    const { result } = setup();

    await act(() => result.current('signOut'));

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockSuccessToast).toHaveBeenCalledWith('Sign out success!');
  });

  it('should do nothing with an action other than "signOut"', async () => {
    const { result } = setup();

    await act(() => result.current('otherAction'));

    expect(mockSignOut).not.toHaveBeenCalled();
    expect(mockSuccessToast).not.toHaveBeenCalled();
  });

  it('should work correctly for multiple calls.', async () => {
    const { result } = setup();

    await act(async () => {
      await Promise.all([result.current('signOut'), result.current('signOut')]);
    });

    expect(mockSignOut).toHaveBeenCalledTimes(2);
    expect(mockSuccessToast).toHaveBeenCalledTimes(2);
  });
});
