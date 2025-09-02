/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: false positive */
/** biome-ignore-all lint/style/useNamingConvention: false positive */
import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { setupUserEvent, TestWrapper } from '@/app/__tests__/utils';
import { SignInForm } from '@/app/feature/sign-in-form/SignInForm';
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
      signUpForm: false,
      signInForm: true,
    } as const;

    const isEnabled = FeatureFlags[feature as keyof typeof FeatureFlags];
    return isEnabled ? children : null;
  },
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(),
}));

const mockUseForm = useForm as Mock;
const mockUseTranslations = useTranslations as Mock;
const mockUseToast = useToast as Mock;
const mockSuccess = mockUseToast().success;

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

  it('should render the form with all fields', () => {
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

  it('should render form fields with correct register props', () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    expect(mockRegister).toHaveBeenCalledWith('email');
    expect(mockRegister).toHaveBeenCalledWith('password');
  });

  it('should disable submit button form is invalid', () => {
    mockUseForm.mockReturnValueOnce({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        ...mockFormState,
        isValid: false,
      },
      trigger: mockTrigger,
    });

    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when form is submitting', () => {
    mockUseForm.mockReturnValueOnce({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        ...mockFormState,
        isSubmitting: true,
      },
      trigger: mockTrigger,
    });

    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
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

  it('should call toaster on form submission', async () => {
    const { user } = setupUserEvent(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockSuccess).toHaveBeenCalledWith('signInSuccess');
  });

  it('should handle form validation errors', () => {
    mockUseForm.mockReturnValueOnce({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        ...mockFormState,
        errors: {
          email: { message: 'Email is required', type: 'required' },
          password: { message: 'Password is required', type: 'required' },
          confirmPassword: { message: 'Passwords do not match', type: 'validate' },
        },
      },
      trigger: mockTrigger,
    });

    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>,
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
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
