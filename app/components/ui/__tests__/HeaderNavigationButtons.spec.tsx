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
  });
  describe('navigation items', () => {
    it('should render all header menu navigation items', () => {
      render(
        <TestProviders>
          <HeaderNavigationButtons />
        </TestProviders>,
      );

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

      const expectedItems = ['restClient', 'historyAndAnalytics', 'variables'];

      expectedItems.forEach((itemId) => {
        expect(screen.getByTestId(`nav-item-${itemId}`)).toBeInTheDocument();
      });
    });
  });
});
