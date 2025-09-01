import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { SignInForm } from '@/app/feature/sign-in-form/SignInForm';
import { TestWrapper } from '@/app/utils/test-utilities';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('@/app/components/ui/Toaster', () => ({
  toaster: {
    create: vi.fn(),
  },
}));

vi.mock('@/app/components/ui/Enabled', () => ({
  // biome-ignore lint/style/useNamingConvention: <suka nah>
  Enabled: ({ children, feature }: { children: React.ReactNode; feature: string }) => {
    const FeatureFlags = {
      languageSelect: true,
      notEnabledComponent: false,
      signUpForm: false,
      signInForm: true,
    } as const;

    const isEnabled = FeatureFlags[feature as keyof typeof FeatureFlags];

    if (isEnabled) {
      return <>{children}</>;
    }
    return null;
  },
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(),
}));

const mockUseForm = useForm as Mock;
const mockUseTranslations = useTranslations as Mock;

describe('SignInForm', () => {
  const mockRegister = vi.fn();
  const mockHandleSubmit = vi.fn((callback) => (e: MouseEvent) => {
    e?.preventDefault?.();
    return callback();
  });
  const mockTrigger = vi.fn();

  const mockFormState = {
    errors: {},
    isValid: true,
    isSubmitting: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseTranslations.mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        signInTitle: 'Sign In',
        email: 'Email',
        password: 'Password',
        submit: 'Submit',
      };
      return translations[key] || key;
    });

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
  });

  it('should renders the form with all fields', () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should renders form fields with correct register props', () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByRole('textbox', { name: 'Password' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(passwordInput).toHaveAttribute('name', 'password');
  });

  it('should enables submit button when form is valid and not submitting', () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should wraps form in Enabled component with correct feature flag', () => {
    const { container } = render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    expect(container.querySelector('form')).toBeInTheDocument();
  });
});
