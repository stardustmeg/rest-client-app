import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';
import { MainNavigationButtons } from '../MainNavigationButtons';

vi.mock('@/app/domains/auth/ui/nav-items/NavButtons', () => ({
  NavButtons: ({ items }: { items: NavConfigItem[] }) => (
    <div data-testid="nav-buttons">
      {items.map((item) => (
        <button type="button" key={item.id} data-testid={`nav-item-${item.id}`}>
          {item.title}
        </button>
      ))}
    </div>
  ),
}));

const mockUseAuth = vi.fn();
vi.mock('@/app/hooks/use-auth', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('MainNavigationButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loading state', () => {
    it('should show navigation buttons when auth is not loading', () => {
      mockUseAuth.mockReturnValue({ isLoading: false });

      render(
        <TestProviders>
          <MainNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-buttons')).toBeInTheDocument();
    });

    it('should handle loading state properly', () => {
      mockUseAuth.mockReturnValue({ isLoading: true });

      render(
        <TestProviders>
          <MainNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-buttons')).toBeInTheDocument();
    });
  });

  describe('navigation items', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isLoading: false });
    });

    it('should render all main menu navigation items', () => {
      render(
        <TestProviders>
          <MainNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-item-signIn')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-signUp')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-restClient')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-historyAndAnalytics')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-variables')).toBeInTheDocument();
    });

    it('should pass correct items to NavButtons component', () => {
      render(
        <TestProviders>
          <MainNavigationButtons />
        </TestProviders>,
      );

      const navButtons = screen.getByTestId('nav-buttons');
      expect(navButtons).toBeInTheDocument();

      const expectedItems = ['signIn', 'signUp', 'restClient', 'historyAndAnalytics', 'variables'];
      expectedItems.forEach((itemId) => {
        expect(screen.getByTestId(`nav-item-${itemId}`)).toBeInTheDocument();
      });
    });
  });

  describe('component structure', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isLoading: false });
    });

    it('should render navigation buttons within proper layout', () => {
      render(
        <TestProviders>
          <MainNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-buttons')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isLoading: false });
    });

    it('should render navigation items as buttons for accessibility', () => {
      render(
        <TestProviders>
          <MainNavigationButtons />
        </TestProviders>,
      );

      const buttons = screen.getAllByRole('button');
      const EXPECTED_BUTTONS_COUNT = 5;
      expect(buttons).toHaveLength(EXPECTED_BUTTONS_COUNT);
    });

    it('should have proper test ids for all navigation items', () => {
      render(
        <TestProviders>
          <MainNavigationButtons />
        </TestProviders>,
      );

      const expectedTestIds = [
        'nav-item-signIn',
        'nav-item-signUp',
        'nav-item-restClient',
        'nav-item-historyAndAnalytics',
        'nav-item-variables',
      ];

      expectedTestIds.forEach((testId) => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });
});
