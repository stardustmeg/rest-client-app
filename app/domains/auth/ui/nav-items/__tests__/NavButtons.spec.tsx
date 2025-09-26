import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ReactNode } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { NavButtons } from '../NavButtons';
import type { NavConfigItem, NavItemAction, NavItemTitle } from '../types';

vi.mock('convex/react', () => ({
  Authenticated: ({ children }: { children: ReactNode }) => (
    <div data-testid="authenticated">{children}</div>
  ),
  Unauthenticated: ({ children }: { children: ReactNode }) => (
    <div data-testid="unauthenticated">{children}</div>
  ),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href, ...props }: { children: ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('NavButtons', () => {
  const user = userEvent.setup();
  const mockOnAction = vi.fn();
  const mockOnClick = vi.fn();

  const publicItem: NavConfigItem = {
    id: 'home',
    title: 'home' as NavItemTitle,
    route: '/',
    policy: 'public',
  };

  const authenticatedItem: NavConfigItem = {
    id: 'dashboard',
    title: 'dashboard' as NavItemTitle,
    route: '/dashboard',
    policy: 'authenticated',
  };

  const unauthenticatedItem: NavConfigItem = {
    id: 'login',
    title: 'login' as NavItemTitle,
    route: '/login',
    policy: 'unauthenticated',
  };

  const actionItem: NavConfigItem = {
    id: 'logout',
    title: 'logout' as NavItemTitle,
    policy: 'authenticated',
    action: 'signOut' as NavItemAction,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering elements', () => {
    it('should render public items without authentication wrappers', () => {
      render(
        <TestProviders>
          <NavButtons items={[publicItem]} />
        </TestProviders>,
      );

      expect(screen.getByRole('link', { name: 'home' })).toBeInTheDocument();
      expect(screen.queryByTestId('authenticated')).not.toBeInTheDocument();
      expect(screen.queryByTestId('unauthenticated')).not.toBeInTheDocument();
    });

    it('should render authenticated items with Authenticated wrapper', () => {
      render(
        <TestProviders>
          <NavButtons items={[authenticatedItem]} />
        </TestProviders>,
      );

      expect(screen.getByTestId('authenticated')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'dashboard' })).toBeInTheDocument();
    });

    it('should render unauthenticated items with Unauthenticated wrapper', () => {
      render(
        <TestProviders>
          <NavButtons items={[unauthenticatedItem]} />
        </TestProviders>,
      );

      expect(screen.getByTestId('unauthenticated')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'login' })).toBeInTheDocument();
    });

    it('should handle empty items array correctly', () => {
      const { container } = render(
        <TestProviders>
          <NavButtons items={[]} />
        </TestProviders>,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('route-based items', () => {
    it('should render links with correct attributes', () => {
      render(
        <TestProviders>
          <NavButtons items={[publicItem]} />
        </TestProviders>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/');
      expect(link).toHaveTextContent('home');
    });

    it('should add data-testid for route items', () => {
      render(
        <TestProviders>
          <NavButtons items={[publicItem]} />
        </TestProviders>,
      );

      expect(screen.getByTestId('home')).toBeInTheDocument();
    });
  });

  describe('action-based items', () => {
    it('should render action buttons', () => {
      render(
        <TestProviders>
          <NavButtons items={[actionItem]} />
        </TestProviders>,
      );

      expect(screen.getByRole('button', { name: 'logout' })).toBeInTheDocument();
    });

    it('should call onAction when action button is clicked', async () => {
      render(
        <TestProviders>
          <NavButtons items={[actionItem]} onAction={mockOnAction} />
        </TestProviders>,
      );

      const button = screen.getByRole('button', { name: 'logout' });
      await user.click(button);

      expect(mockOnAction).toHaveBeenCalledWith('signOut');
      expect(mockOnAction).toHaveBeenCalledTimes(1);
    });

    it('should call both onAction and onClick when provided', async () => {
      render(
        <TestProviders>
          <NavButtons items={[actionItem]} onAction={mockOnAction} onClick={mockOnClick} />
        </TestProviders>,
      );

      const button = screen.getByRole('button', { name: 'logout' });
      await user.click(button);

      expect(mockOnAction).toHaveBeenCalledWith('signOut');
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
