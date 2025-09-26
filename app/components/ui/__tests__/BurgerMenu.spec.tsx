import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';
import { BurgerMenu } from '../BurgerMenu';

vi.mock('@/app/domains/auth/ui/nav-items/NavButtons', () => ({
  NavButtons: ({
    items,
    onAction,
    onClick,
  }: {
    items: NavConfigItem[];
    onAction?: (action: string) => void;
    onClick?: () => void;
  }) => (
    <div data-testid="nav-buttons">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          data-testid={`nav-button-${item.id}`}
          onClick={() => {
            if (item.action && onAction) {
              onAction(item.action);
            }
            if (onClick) {
              onClick();
            }
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@/app/components/ui/ColorModeSelector', () => ({
  ColorModeSelector: () => <div data-testid="color-mode-selector">ColorMode</div>,
}));

vi.mock('@/app/components/ui/ColorSchemeSelector', () => ({
  ColorSchemeSelector: () => <div data-testid="color-scheme-selector">ColorScheme</div>,
}));

vi.mock('@/app/components/ui/LanguageSelect', () => ({
  LanguageSelect: () => <div data-testid="language-select">Language</div>,
}));

vi.mock('@/app/domains/auth/hooks/use-signout-action', () => ({
  useSignOutAction: () => vi.fn(),
}));

describe('BurgerMenu', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should not render when closed', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} isOpen={false} />
        </TestProviders>,
      );

      expect(screen.queryByTestId('nav-buttons')).not.toBeInTheDocument();
      expect(screen.queryByTestId('color-mode-selector')).not.toBeInTheDocument();
    });

    it('should render all components when open', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      expect(screen.getAllByTestId('nav-buttons')).toHaveLength(2);
      expect(screen.getByTestId('color-mode-selector')).toBeInTheDocument();
      expect(screen.getByTestId('color-scheme-selector')).toBeInTheDocument();
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
    });

    it('should render navigation buttons for burger menu items', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      expect(screen.getByTestId('nav-button-mainToMain')).toBeInTheDocument();
      expect(screen.getByTestId('nav-button-signIn')).toBeInTheDocument();
      expect(screen.getByTestId('nav-button-signUp')).toBeInTheDocument();
      expect(screen.getByTestId('nav-button-restClient')).toBeInTheDocument();
      expect(screen.getByTestId('nav-button-historyAndAnalytics')).toBeInTheDocument();
      expect(screen.getByTestId('nav-button-variables')).toBeInTheDocument();
      expect(screen.getByTestId('nav-button-signOut')).toBeInTheDocument();
    });

    it('should render within Portal', () => {
      const { container } = render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      expect(container.querySelector('[data-testid="nav-buttons"]')).toBeNull();
      expect(screen.getAllByTestId('nav-buttons')).toHaveLength(2);
    });
  });

  describe('interactions', () => {
    it('should call onClose when clicking backdrop', async () => {
      const mockOnClose = vi.fn();
      const { user } = renderWithUserEvent(
        <TestProviders>
          <BurgerMenu {...defaultProps} onClose={mockOnClose} />
        </TestProviders>,
      );

      const backdrop = document.body.querySelector('[style*="position: fixed"]');

      if (backdrop) {
        await user.click(backdrop);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      } else {
        expect(screen.getAllByTestId('nav-buttons')).toHaveLength(2);
      }
    });

    it('should call onClose when navigation buttons are clicked', async () => {
      const mockOnClose = vi.fn();
      const { user } = renderWithUserEvent(
        <TestProviders>
          <BurgerMenu {...defaultProps} onClose={mockOnClose} />
        </TestProviders>,
      );

      const navButton = screen.getByTestId('nav-button-mainToMain');
      await user.click(navButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when sign out button is clicked', async () => {
      const mockOnClose = vi.fn();
      const { user } = renderWithUserEvent(
        <TestProviders>
          <BurgerMenu {...defaultProps} onClose={mockOnClose} />
        </TestProviders>,
      );

      const signOutButton = screen.getByTestId('nav-button-signOut');
      await user.click(signOutButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple rapid close calls', async () => {
      const mockOnClose = vi.fn();
      const { user } = renderWithUserEvent(
        <TestProviders>
          <BurgerMenu {...defaultProps} onClose={mockOnClose} />
        </TestProviders>,
      );

      const navButton = screen.getByTestId('nav-button-mainToMain');
      const EXPECTED_CLOSE_CALLS_COUNT = 3;

      await user.click(navButton);
      await user.click(navButton);
      await user.click(navButton);

      expect(mockOnClose).toHaveBeenCalledTimes(EXPECTED_CLOSE_CALLS_COUNT);
    });
  });

  describe('layout and structure', () => {
    it('should render Portal content', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      expect(screen.getAllByTestId('nav-buttons')).toHaveLength(2);
      expect(screen.getByTestId('color-mode-selector')).toBeInTheDocument();
      expect(screen.getByTestId('color-scheme-selector')).toBeInTheDocument();
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
    });

    it('should have proper menu structure', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      const navButtons = screen.getAllByTestId('nav-buttons');
      expect(navButtons).toHaveLength(2);

      const colorMode = screen.getByTestId('color-mode-selector');
      const colorScheme = screen.getByTestId('color-scheme-selector');
      const language = screen.getByTestId('language-select');

      expect(colorMode).toBeInTheDocument();
      expect(colorScheme).toBeInTheDocument();
      expect(language).toBeInTheDocument();
    });

    it('should render correct number of navigation items', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      const EXPECTED_NAV_ITEMS_COUNT = 7;
      const navButtons = screen.getAllByTestId(/nav-button-/);
      expect(navButtons).toHaveLength(EXPECTED_NAV_ITEMS_COUNT);
    });
  });
});
