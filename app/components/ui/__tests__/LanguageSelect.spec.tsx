import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { LanguageSelect } from '../LanguageSelect';

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
  useTranslations: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'ru', 'jp'],
  },
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

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
      <TestWrapper>
        <LanguageSelect />
      </TestWrapper>,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should display flag icon for current locale', () => {
    render(
      <TestWrapper>
        <LanguageSelect />
      </TestWrapper>,
    );

    const flagElement = document.querySelector('svg');
    expect(flagElement).toBeInTheDocument();
  });

  it('should render with flag icon for current locale', () => {
    render(
      <TestWrapper>
        <LanguageSelect />
      </TestWrapper>,
    );

    const flagElement = document.querySelector('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <LanguageSelect />
      </TestWrapper>,
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('should contain hidden select with proper options', () => {
    render(
      <TestWrapper>
        <LanguageSelect />
      </TestWrapper>,
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
