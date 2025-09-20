import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { LanguageSelect } from '../LanguageSelect';

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl');
  return {
    ...actual,
    useLocale: vi.fn(() => 'en'),
    useTranslations: vi.fn(() => (key: string) => {
      const translations: Record<string, string> = {
        'language.en': 'English',
        'language.jp': 'Japanese',
        'language.ru': 'Russian',
      };
      return translations[key] || key;
    }),
  };
});

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'jp', 'ru'],
  },
  usePathname: vi.fn(() => '/test'),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('@/app/components/ui/FlagIcon', () => ({
  FlagIcon: ({ country, title }: { country: string; title: string }) => (
    <span data-testid={`flag-${country}`} title={title}>
      🏳️
    </span>
  ),
}));

describe('LanguageSelect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render language select trigger', () => {
    render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('should show current locale flag in trigger', () => {
    render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    expect(screen.getAllByTestId('flag-en').length).toBeGreaterThan(0);
  });

  it('should open dropdown when trigger is clicked', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    expect(screen.getAllByText('English')).toHaveLength(2);
    expect(screen.getAllByText('日本語')).toHaveLength(2);
    expect(screen.getAllByText('Русский')).toHaveLength(2);
  });

  it('should call router push when language is changed', async () => {
    const mockPush = vi.fn();
    const { useRouter } = await import('@/i18n/routing');
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    });

    const { container } = render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    expect(container).toBeInTheDocument();
    expect(vi.mocked(useRouter)).toHaveBeenCalled();
  });

  it('should render without portal when disablePortal is true', () => {
    const { container } = render(
      <TestProviders>
        <LanguageSelect disablePortal />
      </TestProviders>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should display all available locales', () => {
    const { container } = render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    const hiddenSelect = container.querySelector('select[aria-hidden="true"]');
    expect(hiddenSelect).toBeInTheDocument();

    const options = hiddenSelect?.querySelectorAll('option');
    const EXPECTED_OPTIONS_COUNT = 3;
    expect(options?.length).toBe(EXPECTED_OPTIONS_COUNT);
  });
});
