/** biome-ignore-all lint/style/useNamingConvention: test mocks use kebab-case */
/** biome-ignore-all lint/style/noMagicNumbers: test constants */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';
import { HeaderNavigationButtons } from '../HeaderNavigationButtons';

vi.mock('@/app/domains/auth/ui/nav-items/NavButtons', () => ({
  NavButtons: ({ items }: { items: NavConfigItem[] }) => (
    <div data-testid="nav-buttons">
      {items.map((item) => (
        <button key={item.id} type="button" data-testid={`nav-button-${item.id}`}>
          {item.title}
        </button>
      ))}
    </div>
  ),
}));

describe('HeaderNavigationButtons', () => {
  it('should render navigation element', () => {
    render(
      <TestProviders>
        <HeaderNavigationButtons />
      </TestProviders>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should render NavButtons component', () => {
    render(
      <TestProviders>
        <HeaderNavigationButtons />
      </TestProviders>,
    );

    expect(screen.getByTestId('nav-buttons')).toBeInTheDocument();
  });

  it('should render header navigation items', () => {
    render(
      <TestProviders>
        <HeaderNavigationButtons />
      </TestProviders>,
    );

    expect(screen.getByTestId('nav-button-restClient')).toBeInTheDocument();
    expect(screen.getByTestId('nav-button-historyAndAnalytics')).toBeInTheDocument();
    expect(screen.getByTestId('nav-button-variables')).toBeInTheDocument();
  });

  it('should render correct number of header navigation items', () => {
    render(
      <TestProviders>
        <HeaderNavigationButtons />
      </TestProviders>,
    );

    const EXPECTED_HEADER_ITEMS_COUNT = 3;
    const buttons = screen.getAllByTestId(/nav-button-/);
    expect(buttons).toHaveLength(EXPECTED_HEADER_ITEMS_COUNT);
  });

  it('should render navigation items with correct titles', () => {
    render(
      <TestProviders>
        <HeaderNavigationButtons />
      </TestProviders>,
    );

    expect(screen.getByText('restClient')).toBeInTheDocument();
    expect(screen.getByText('historyAndAnalytics')).toBeInTheDocument();
    expect(screen.getByText('variables')).toBeInTheDocument();
  });
});
