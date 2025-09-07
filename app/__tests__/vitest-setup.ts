/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: false positive */
/** biome-ignore-all lint/style/useNamingConvention: <because> */
import '@testing-library/jest-dom';

import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from './server/index.js';

vi.mock('@/app/domains/variables/components/VariablesProvider', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/app/domains/variables/components/VariablesProvider')>();
  return {
    ...actual,
    useVariablesContext: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(() => null),
    has: vi.fn(() => false),
    toString: vi.fn(() => ''),
  })),
  usePathname: vi.fn(() => '/'),
  useParams: vi.fn(() => ({})),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  routing: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'jp'],
  },
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  redirect: vi.fn(),
  Link: 'a',
}));

vi.mock('next-intl', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl')>();
  return {
    ...actual,
    useTranslations: vi.fn(() => (key: string) => key),
    useLocale: vi.fn(() => 'en'),
  };
});

vi.mock('@/app/hooks/use-routing-actions', () => ({
  useRoutingActions: vi.fn(() => ({
    navigateTo: vi.fn(),
    navigateToPath: vi.fn(),
    goBack: vi.fn(),
    goForward: vi.fn(),
    refresh: vi.fn(),
    redirectTo: vi.fn(),
    redirectToPath: vi.fn(),
    router: {
      push: vi.fn(),
      replace: vi.fn(),
    },
    nextRouter: {
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    },
    routes: {},
  })),
}));

vi.mock('@/app/hooks/use-auth', () => ({
  useAuth: vi.fn(() => ({
    isLoading: false,
    isAuthenticated: false,
    isUnauthenticated: true,
  })),
  useRequireAuth: vi.fn(() => ({
    isLoading: false,
    isAuthenticated: false,
  })),
  useRedirectIfAuthenticated: vi.fn(() => ({
    isLoading: false,
    isAuthenticated: false,
  })),
}));

vi.mock('@/app/hooks/use-auth-actions', () => ({
  useAuthActions: vi.fn(() => ({
    signIn: vi.fn().mockResolvedValue({}),
    signUp: vi.fn().mockResolvedValue({}),
    signOut: vi.fn().mockResolvedValue({}),
  })),
}));

vi.mock('convex/react', () => ({
  useConvexAuth: vi.fn(() => ({
    isLoading: false,
    isAuthenticated: false,
  })),
}));

vi.mock('@convex-dev/auth/react', () => ({
  useAuthActions: vi.fn(() => ({
    signIn: vi.fn().mockResolvedValue({}),
    signOut: vi.fn().mockResolvedValue({}),
  })),
}));

vi.mock('next-intl/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl/server')>();
  return {
    ...actual,
    getTranslations: vi.fn(async () => (key: string) => key),
  };
});

vi.mock('@/app/domains/auth/get-validation-error', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/app/domains/auth/get-validation-error')>();
  return {
    ...actual,
    getValidationError: vi.fn((tValidation, message) => (message ? tValidation(message) : '')),
  };
});

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
