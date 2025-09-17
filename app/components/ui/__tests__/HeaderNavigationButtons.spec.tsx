/** biome-ignore-all lint/style/useNamingConvention: test mocks use kebab-case */
/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: test file structure */
/** biome-ignore-all lint/style/noMagicNumbers: test file structure */
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';
import { HeaderNavigationButtons } from '../HeaderNavigationButtons';

vi.mock('@/app/domains/auth/ui/nav-items/NavButtons', () => ({
  NavButtons: ({
    items,
    variant,
    size,
    px,
  }: {
    items: NavConfigItem[];
    variant?: string;
    size?: string;
    px?: string;
  }) => (
    <div data-testid="nav-buttons" data-variant={variant} data-size={size} data-px={px}>
      {items.map((item) => (
        <button type="button" key={item.id} data-testid={`nav-item-${item.id}`}>
          {item.title}
        </button>
      ))}
    </div>
  ),
}));

describe('HeaderNavigationButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render as a nav element', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render NavButtons component with correct props', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const navButtons = screen.getByTestId('nav-buttons');
      expect(navButtons).toBeInTheDocument();
      expect(navButtons).toHaveAttribute('data-variant', 'ghost');
      expect(navButtons).toHaveAttribute('data-size', 'sm');
      expect(navButtons).toHaveAttribute('data-px', '2');
    });
  });

  describe('navigation items', () => {
    it('should render all header menu navigation items', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-item-mainToMain')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-signIn')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-signUp')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-restClient')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-historyAndAnalytics')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-variables')).toBeInTheDocument();
    });

    it('should pass correct items to NavButtons component', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const navButtons = screen.getByTestId('nav-buttons');
      expect(navButtons).toBeInTheDocument();

      const expectedItems = [
        'mainToMain',
        'signIn',
        'signUp',
        'restClient',
        'historyAndAnalytics',
        'variables',
      ];

      expectedItems.forEach((itemId) => {
        expect(screen.getByTestId(`nav-item-${itemId}`)).toBeInTheDocument();
      });
    });

    it('should include main page link in header navigation', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-item-mainToMain')).toBeInTheDocument();
    });
  });

  describe('styling and layout', () => {
    it('should apply compact styling appropriate for header', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const navButtons = screen.getByTestId('nav-buttons');

      expect(navButtons).toHaveAttribute('data-variant', 'ghost');

      expect(navButtons).toHaveAttribute('data-size', 'sm');

      expect(navButtons).toHaveAttribute('data-px', '2');
    });
  });

  describe('accessibility', () => {
    it('should render as semantic nav element', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render navigation items as buttons for accessibility', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(6);
    });

    it('should have proper test ids for all navigation items', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const expectedTestIds = [
        'nav-item-mainToMain',
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

  describe('component integration', () => {
    it('should properly integrate NavButtons within navigation element', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const nav = screen.getByRole('navigation');
      const navButtons = screen.getByTestId('nav-buttons');

      expect(nav).toContainElement(navButtons);
    });

    it('should maintain consistent structure across renders', () => {
      const { rerender } = render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      const initialItemsCount = screen.getAllByRole('button').length;

      rerender(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-buttons')).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(initialItemsCount);
    });
  });
});
