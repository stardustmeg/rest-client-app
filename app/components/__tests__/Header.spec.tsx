/** biome-ignore-all lint/style/useNamingConvention: test mocks use kebab-case */
/** biome-ignore-all lint/style/noMagicNumbers: test constants */
/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: test file structure */
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { Header } from '../Header';

vi.mock('@/app/components/ui/BurgerButton', () => ({
  BurgerButton: ({ onClick }: { onClick: () => void }) => (
    <button type="button" data-testid="burger-button" onClick={onClick}>
      Burger
    </button>
  ),
}));

vi.mock('@/app/components/ui/BurgerMenu', () => ({
  BurgerMenu: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="burger-menu">
        <button type="button" data-testid="close-burger" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

vi.mock('@/app/components/ui/HeaderNavigationButtons', () => ({
  HeaderNavigationButtons: () => <nav data-testid="navigation">Navigation</nav>,
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

vi.mock('@/app/domains/auth/ui/nav-items/NavButtons', () => ({
  NavButtons: ({ items, onAction }: { items: any[]; onAction: (action: string) => void }) => (
    <div data-testid="auth-buttons">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          data-testid={`auth-button-${item.id}`}
          onClick={() => item.action && onAction(item.action)}
        >
          {item.title}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@/app/domains/auth/hooks/use-signout-action', () => ({
  useSignOutAction: () => vi.fn(),
}));

vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual,
    useBreakpointValue: vi.fn(() => false),
  };
});

Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: mockScrollTo,
});

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
  });

  describe('desktop layout', () => {
    beforeEach(async () => {
      const { useBreakpointValue } = await import('@chakra-ui/react');
      vi.mocked(useBreakpointValue).mockReturnValue(false);
    });

    it('should render desktop navigation and controls', () => {
      render(
        <TestProviders>
          <Header />
        </TestProviders>,
      );

      expect(screen.getByTestId('navigation')).toBeInTheDocument();
      expect(screen.getByTestId('color-mode-selector')).toBeInTheDocument();
      expect(screen.getByTestId('color-scheme-selector')).toBeInTheDocument();
      expect(screen.getByTestId('language-select')).toBeInTheDocument();
      expect(screen.getByTestId('auth-buttons')).toBeInTheDocument();
      expect(screen.queryByTestId('burger-button')).not.toBeInTheDocument();
    });

    it('should not show burger menu on desktop', () => {
      render(
        <TestProviders>
          <Header />
        </TestProviders>,
      );

      expect(screen.queryByTestId('burger-menu')).not.toBeInTheDocument();
    });
  });

  describe('mobile layout', () => {
    beforeEach(async () => {
      const { useBreakpointValue } = await import('@chakra-ui/react');
      vi.mocked(useBreakpointValue).mockReturnValue(true);
    });

    it('should render burger button on mobile', () => {
      render(
        <TestProviders>
          <Header />
        </TestProviders>,
      );

      expect(screen.getByTestId('burger-button')).toBeInTheDocument();
      expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
      expect(screen.queryByTestId('color-mode-selector')).not.toBeInTheDocument();
    });

    it('should open burger menu when button clicked', async () => {
      const { user } = renderWithUserEvent(
        <TestProviders>
          <Header />
        </TestProviders>,
      );

      const burgerButton = screen.getByTestId('burger-button');
      await user.click(burgerButton);

      expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
    });

    it('should close burger menu when close button clicked', async () => {
      const { user } = renderWithUserEvent(
        <TestProviders>
          <Header />
        </TestProviders>,
      );

      const burgerButton = screen.getByTestId('burger-button');
      await user.click(burgerButton);

      const closeButton = screen.getByTestId('close-burger');
      await user.click(closeButton);

      expect(screen.queryByTestId('burger-menu')).not.toBeInTheDocument();
    });
  });

  describe('scroll behavior', () => {
    beforeEach(async () => {
      const { useBreakpointValue } = await import('@chakra-ui/react');
      vi.mocked(useBreakpointValue).mockReturnValue(false);
    });

    it('should render header element', () => {
      render(
        <TestProviders>
          <Header />
        </TestProviders>,
      );

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header.tagName).toBe('HEADER');
    });

    it('should have sticky positioning classes', () => {
      render(
        <TestProviders>
          <Header />
        </TestProviders>,
      );

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky', 'top-0', 'z-50');
    });
  });
});
