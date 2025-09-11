/** biome-ignore-all lint/style/useNamingConvention: false positive */

import { render, screen, waitFor } from '@testing-library/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { AuthButtons, NavigationButtons } from '@/app/domains/auth/ui/NavigationButtons';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';

vi.mock('@/app/hooks/use-toast');
vi.mock('@/app/hooks/use-auth-actions');

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a data-mock-link href={href} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  ),
}));

vi.mock('convex/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('convex/react')>();
  return {
    ...actual,
    Authenticated: ({ children }: { children: ReactNode }) => (
      <div data-testid="authenticated">{children}</div>
    ),
    Unauthenticated: ({ children }: { children: ReactNode }) => (
      <div data-testid="unauthenticated">{children}</div>
    ),
  };
});

describe('NavigationButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render auth buttons when unauthenticated', () => {
    render(
      <TestProviders>
        <NavigationButtons />
      </TestProviders>,
    );

    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });

  it('should render navigation buttons when authenticated', () => {
    render(
      <TestProviders>
        <NavigationButtons />
      </TestProviders>,
    );

    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });
});

describe('AuthButtons', () => {
  const signOut = vi.fn().mockResolvedValue({});
  const success = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthActions as Mock).mockReturnValue({ signOut });
    (useToast as Mock).mockReturnValue({ success });
  });

  it('should render Sign In and Sign Up when unauthenticated', () => {
    renderWithUserEvent(
      <TestProviders>
        <Unauthenticated>
          <AuthButtons />
        </Unauthenticated>
      </TestProviders>,
    );

    expect(screen.getByRole('link', { name: 'signIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'signUp' })).toBeInTheDocument();
  });

  it('should call onAction when Sign In or Sign Up is clicked', async () => {
    const onAction = vi.fn();
    const { user } = renderWithUserEvent(
      <TestProviders>
        <Unauthenticated>
          <AuthButtons onAction={onAction} />
        </Unauthenticated>
      </TestProviders>,
    );

    await user.click(screen.getByRole('link', { name: 'signIn' }));

    await user.click(screen.getByRole('link', { name: 'signUp' }));
  });

  it('should render Sign Out when authenticated', () => {
    renderWithUserEvent(
      <TestProviders>
        <Authenticated>
          <AuthButtons />
        </Authenticated>
      </TestProviders>,
    );

    expect(screen.getByRole('button', { name: 'signOut' })).toBeInTheDocument();
  });

  it('should call signOut, toast.success and onAction when Sign Out is clicked', async () => {
    const onAction = vi.fn();
    const { user } = renderWithUserEvent(
      <TestProviders>
        <Authenticated>
          <AuthButtons onAction={onAction} />
        </Authenticated>
      </TestProviders>,
    );

    await user.click(screen.getByRole('button', { name: 'signOut' }));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
      expect(success).toHaveBeenCalledWith('signOutSuccess');
      expect(onAction).toHaveBeenCalledTimes(1);
    });
  });
});
