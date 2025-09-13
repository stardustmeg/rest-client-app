/** biome-ignore-all lint/style/useNamingConvention: test mocks use kebab-case */
/** biome-ignore-all lint/suspicious/noExplicitAny: test mocks */
/** biome-ignore-all lint/style/noMagicNumbers: test constants */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { Navigation } from '../Navigation';

vi.mock('@/app/components/ui/NavigationLink', () => ({
  NavigationLink: ({ route, direction }: { route: any; direction: string }) => (
    <div data-testid={`nav-link-${route.translationKey}`} data-direction={direction}>
      {route.translationKey}
    </div>
  ),
}));

vi.mock('@/app/[locale]/routes', () => ({
  routes: {
    main: {
      path: '/',
      translationKey: 'main',
    },
    restClient: {
      path: '/rest-client',
      translationKey: 'rest-client',
    },
    variables: {
      path: '/variables',
      translationKey: 'variables',
    },
    history: {
      path: '/history-and-analytics',
      translationKey: 'history',
    },
    signIn: {
      path: '/sign-in',
      translationKey: 'signIn',
    },
    signUp: {
      path: '/sign-up',
      translationKey: 'signUp',
    },
    notFound: {
      path: '/404',
      translationKey: 'notFound',
    },
  },
}));

describe('Navigation', () => {
  it('should render navigation element', () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should render main navigation links', () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    expect(screen.getByTestId('nav-link-main')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-rest-client')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-variables')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-history')).toBeInTheDocument();
  });

  it('should not render auth or notFound links', () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    expect(screen.queryByTestId('nav-link-signIn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('nav-link-signUp')).not.toBeInTheDocument();
    expect(screen.queryByTestId('nav-link-notFound')).not.toBeInTheDocument();
  });

  it('should render horizontal layout by default', () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    const links = screen.getAllByTestId(/nav-link-/);
    links.forEach((link) => {
      expect(link).toHaveAttribute('data-direction', 'horizontal');
    });
  });

  it('should render vertical layout when specified', () => {
    render(
      <TestProviders>
        <Navigation direction="vertical" />
      </TestProviders>,
    );

    const links = screen.getAllByTestId(/nav-link-/);
    links.forEach((link) => {
      expect(link).toHaveAttribute('data-direction', 'vertical');
    });
  });

  it('should render correct number of main routes', () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    const EXPECTED_MAIN_ROUTES_COUNT = 4;
    const links = screen.getAllByTestId(/nav-link-/);
    expect(links).toHaveLength(EXPECTED_MAIN_ROUTES_COUNT);
  });

  it('should pass route objects to NavigationLink', () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    expect(screen.getByText('main')).toBeInTheDocument();
    expect(screen.getByText('rest-client')).toBeInTheDocument();
    expect(screen.getByText('variables')).toBeInTheDocument();
    expect(screen.getByText('history')).toBeInTheDocument();
  });
});
