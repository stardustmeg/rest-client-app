import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { MainHeading } from '@/app/components/ui/MainHeading';
import { useAuth } from '@/app/hooks/use-auth';

vi.mock('@/app/hooks/use-auth', () => ({
  useAuth: vi.fn(),
}));

describe('MainHeading', () => {
  const mockT = vi.fn();
  const mockUseTranslations = useTranslations as Mock;
  mockUseTranslations.mockImplementation(() => mockT);

  const mockUseAuth = useAuth as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockT.mockImplementation((key: string, options?: { username?: string }) => {
      if (key === 'title') return 'Welcome Title';
      if (key === 'authenticatedTitle') return `Welcome ${options?.username || 'User'}`;
      return key;
    });
  });

  it('renders unauthenticated title when not authenticated and not loading', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      username: null,
    });

    render(
      <TestProviders>
        <MainHeading />
      </TestProviders>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome Title');
    expect(mockT).toHaveBeenCalledWith('title');
  });

  it('renders authenticated title with username when authenticated and not loading', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      username: 'testuser',
    });

    render(
      <TestProviders>
        <MainHeading />
      </TestProviders>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome testuser');
    expect(mockT).toHaveBeenCalledWith('authenticatedTitle', { username: 'testuser' });
  });

  it('renders authenticated title with default "User" when username is null but authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      username: null,
    });

    render(
      <TestProviders>
        <MainHeading />
      </TestProviders>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome User');
    expect(mockT).toHaveBeenCalledWith('authenticatedTitle', { username: 'User' });
  });
});
