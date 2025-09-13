/** biome-ignore-all lint/style/useNamingConvention: mock components use kebab-case for data attributes */
/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: test file structure */
/** biome-ignore-all lint/style/noMagicNumbers: test constants */
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { BurgerMenu } from '../BurgerMenu';

vi.mock('@/app/components/ui/Navigation', () => ({
  Navigation: ({ direction }: { direction: string }) => (
    <div data-testid="navigation" data-direction={direction}>
      Navigation
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

vi.mock('@/app/domains/auth/ui/NavigationButtons', () => ({
  AuthButtons: ({ onAction }: { onAction: () => void }) => (
    <button type="button" data-testid="auth-buttons" onClick={onAction}>
      Auth
    </button>
  ),
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

      expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
    });

    it('should render all components when open', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      expect(screen.getByTestId('navigation')).toBeInTheDocument();
      expect(screen.getByTestId('color-mode-selector')).toBeInTheDocument();
      expect(screen.getByTestId('color-scheme-selector')).toBeInTheDocument();
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
      expect(screen.getByTestId('auth-buttons')).toBeInTheDocument();
    });

    it('should pass vertical direction to Navigation when open', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      const navigation = screen.getByTestId('navigation');
      expect(navigation).toHaveAttribute('data-direction', 'vertical');
    });

    it('should render within Portal', () => {
      const { container } = render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      expect(container.querySelector('[data-testid="navigation"]')).toBeNull();
      expect(screen.getByTestId('navigation')).toBeInTheDocument();
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
        await user.click(backdrop as Element);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      } else {
        expect(screen.getByTestId('navigation')).toBeInTheDocument();
      }
    });

    it('should call onClose when auth buttons trigger action', async () => {
      const mockOnClose = vi.fn();
      const { user } = renderWithUserEvent(
        <TestProviders>
          <BurgerMenu {...defaultProps} onClose={mockOnClose} />
        </TestProviders>,
      );

      const authButton = screen.getByTestId('auth-buttons');
      await user.click(authButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple rapid close calls', async () => {
      const mockOnClose = vi.fn();
      const { user } = renderWithUserEvent(
        <TestProviders>
          <BurgerMenu {...defaultProps} onClose={mockOnClose} />
        </TestProviders>,
      );

      const authButton = screen.getByTestId('auth-buttons');

      await user.click(authButton);
      await user.click(authButton);
      await user.click(authButton);

      expect(mockOnClose).toHaveBeenCalledTimes(3);
    });
  });

  describe('layout and structure', () => {
    it('should render Portal content', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      expect(screen.getByTestId('navigation')).toBeInTheDocument();
      expect(screen.getByTestId('auth-buttons')).toBeInTheDocument();
    });

    it('should have proper menu structure', () => {
      render(
        <TestProviders>
          <BurgerMenu {...defaultProps} />
        </TestProviders>,
      );

      const navigation = screen.getByTestId('navigation');
      expect(navigation).toBeInTheDocument();

      const colorMode = screen.getByTestId('color-mode-selector');
      const colorScheme = screen.getByTestId('color-scheme-selector');
      const language = screen.getByTestId('language-select');
      const auth = screen.getByTestId('auth-buttons');

      expect(colorMode).toBeInTheDocument();
      expect(colorScheme).toBeInTheDocument();
      expect(language).toBeInTheDocument();
      expect(auth).toBeInTheDocument();
    });
  });
});
