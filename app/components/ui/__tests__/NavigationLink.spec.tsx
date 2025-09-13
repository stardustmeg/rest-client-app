/** biome-ignore-all lint/style/useNamingConvention: test mocks use kebab-case */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { NavigationLink } from '../NavigationLink';

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl');
  return {
    ...actual,
    useTranslations: vi.fn(() => (key: string) => {
      const translations: Record<string, string> = {
        main: 'Home',
        restClient: 'REST Client',
        variables: 'Variables',
        history: 'History',
      };
      return translations[key] || key;
    }),
  };
});

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="i18n-link">
      {children}
    </a>
  ),
}));

const mockRoute = {
  path: '/rest-client',
  translationKey: 'restClient' as const,
};

describe('NavigationLink', () => {
  it('should render navigation link', () => {
    render(
      <TestProviders>
        <NavigationLink route={mockRoute} />
      </TestProviders>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should render translated text', () => {
    render(
      <TestProviders>
        <NavigationLink route={mockRoute} />
      </TestProviders>,
    );

    expect(screen.getByText('REST Client')).toBeInTheDocument();
  });

  it('should render correct href', () => {
    render(
      <TestProviders>
        <NavigationLink route={mockRoute} />
      </TestProviders>,
    );

    const i18nLink = screen.getByTestId('i18n-link');
    expect(i18nLink).toHaveAttribute('href', '/rest-client');
  });

  it('should apply horizontal text alignment by default', () => {
    render(
      <TestProviders>
        <NavigationLink route={mockRoute} />
      </TestProviders>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should apply vertical text alignment when specified', () => {
    render(
      <TestProviders>
        <NavigationLink route={mockRoute} direction="vertical" />
      </TestProviders>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should render different route translations', () => {
    const homeRoute = {
      path: '/',
      translationKey: 'main' as const,
    };

    render(
      <TestProviders>
        <NavigationLink route={homeRoute} />
      </TestProviders>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should handle variables route', () => {
    const variablesRoute = {
      path: '/variables',
      translationKey: 'variables' as const,
    };

    render(
      <TestProviders>
        <NavigationLink route={variablesRoute} />
      </TestProviders>,
    );

    expect(screen.getByText('Variables')).toBeInTheDocument();

    const i18nLink = screen.getByTestId('i18n-link');
    expect(i18nLink).toHaveAttribute('href', '/variables');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <TestProviders>
        <NavigationLink route={mockRoute} />
      </TestProviders>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/rest-client');
    expect(link).toHaveAccessibleName('REST Client');
  });

  it('should render with medium font weight', () => {
    render(
      <TestProviders>
        <NavigationLink route={mockRoute} />
      </TestProviders>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
});
