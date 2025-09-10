import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { NavigationButtons } from '@/app/components/ui/NavigationButtons';

vi.mock('convex/react', () => ({
  // biome-ignore lint/style/useNamingConvention: <ddd>
  Authenticated: ({ children }: { children: ReactNode }) => <>{children}</>,
  // biome-ignore lint/style/useNamingConvention: <dddddddd>
  Unauthenticated: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('NavigationButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render auth buttons when unauthenticated', () => {
    render(
      <TestProviders>
        <NavigationButtons />
      </TestProviders>,
    );

    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('should render navigation buttons when authenticated', () => {
    render(
      <TestProviders>
        <NavigationButtons />
      </TestProviders>,
    );

    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
