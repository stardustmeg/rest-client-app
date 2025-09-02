import { render, screen } from '@testing-library/react';
import { useLocale, useTranslations } from 'next-intl';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { usePathname, useRouter } from '@/i18n/routing';
import { LanguageSelect } from '../LanguageSelect';

// vi.mock('next-intl', () => ({
//   useLocale: vi.fn(),
//   useTranslations: vi.fn(),
// }));

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'ru', 'jp'],
  },
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe(LanguageSelect.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useLocale as Mock).mockReturnValue('en');
    (useTranslations as Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        'language.en': 'English',
        'language.ru': 'Русский',
        'language.jp': '日本語',
      };
      return translations[key] || key;
    });
    (usePathname as Mock).mockReturnValue('/test-path');
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
    });
  });

  it('should render language select with current locale', () => {
    render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should display flag icon for current locale', () => {
    render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    const flagElement = document.querySelector('svg');
    expect(flagElement).toBeInTheDocument();
  });

  it('should render with flag icon for current locale', () => {
    render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    const flagElement = document.querySelector('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('should contain hidden select with proper options', () => {
    render(
      <TestProviders>
        <LanguageSelect />
      </TestProviders>,
    );

    const hiddenSelect = document.querySelector('select[aria-hidden="true"]');
    expect(hiddenSelect).toBeInTheDocument();

    const expectedOptionsLength = 3;
    const options = hiddenSelect?.querySelectorAll('option');
    expect(options).toHaveLength(expectedOptionsLength);

    const optionValues = Array.from(options || []).map((option) => option.getAttribute('value'));
    expect(optionValues).toEqual(['en', 'ru', 'jp']);
  });
});
