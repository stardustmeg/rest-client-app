/** biome-ignore-all lint/style/useNamingConvention: false positive */
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { type Mock, vi } from 'vitest';
import { useToast } from '@/app/hooks/useToast';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('@/app/hooks/useToast', () => ({
  useToast: vi.fn().mockReturnValue({
    success: vi.fn(),
  }),
}));

vi.mock('@/app/components/ui/Enabled', () => ({
  Enabled: ({ children, feature }: { children: React.ReactNode; feature: string }) => {
    const FeatureFlags = {
      languageSelect: true,
      notEnabledComponent: false,
      signUpForm: true,
      signInForm: true,
    } as const;

    const isEnabled = FeatureFlags[feature as keyof typeof FeatureFlags];
    return isEnabled ? children : null;
  },
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(),
}));

export const mockUseForm = useForm as Mock;
export const mockUseTranslations = useTranslations as Mock;
export const mockUseToast = useToast as Mock;
export const mockSuccess = mockUseToast().success;

export const setupFormMocks = () => {
  const mockRegister = vi.fn();
  const mockHandleSubmit = vi.fn(
    (callback: (data: Record<string, unknown>) => void) => (e?: Event) => {
      e?.preventDefault?.();
      callback({});
      return callback;
    },
  );
  const mockTrigger = vi.fn();

  const mockFormState = {
    errors: {},
    isValid: true,
    isSubmitting: false,
  };

  mockUseForm.mockReturnValue({
    register: mockRegister.mockImplementation((field: string) => ({
      name: field,
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    })),
    handleSubmit: mockHandleSubmit,
    formState: mockFormState,
    trigger: mockTrigger,
  });

  return {
    mockRegister,
    mockHandleSubmit,
    mockFormState,
    mockTrigger,
  };
};

export const setupTranslationMocks = (translations: Record<string, string>) => {
  mockUseTranslations.mockReturnValue((key: string) => translations[key] || key);
};

export const createMockFormState = (overrides = {}) => ({
  errors: {},
  isValid: true,
  isSubmitting: false,
  ...overrides,
});

export const createMockErrorState = (
  errors: Record<string, { message: string; type: string }>,
) => ({
  errors,
  isValid: false,
  isSubmitting: false,
});
