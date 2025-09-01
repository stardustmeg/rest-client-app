import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { SignUpForm } from '@/app/feature/sign-up-form/SignUpForm';
import { useToast } from '@/app/hooks/useToast';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

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
  // biome-ignore lint/style/useNamingConvention: <sasdsddsasdadadadasadsad>
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

const mockUseForm = useForm as Mock;
const mockUseTranslations = useTranslations as Mock;
const mockUseToast = useToast as Mock;
const mockSuccess = mockUseToast().success;

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: <wfherkgql>
describe('SignUpForm', () => {
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
        signUpTitle: 'Sign Up',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
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
        <SignUpForm />
      </TestWrapper>,
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should render form fields with correct register props', () => {
    render(
      <TestWrapper>
        <SignUpForm />
      </TestWrapper>,
    );

    expect(mockRegister).toHaveBeenCalledWith('email');
    expect(mockRegister).toHaveBeenCalledWith('password');
    expect(mockRegister).toHaveBeenCalledWith('confirmPassword');
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
        <SignUpForm />
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
        <SignUpForm />
      </TestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid and not submitting', () => {
    render(
      <TestWrapper>
        <SignUpForm />
      </TestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should call toaster on form submission', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <SignUpForm />
      </TestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockSuccess).toHaveBeenCalledWith('Form submitted');
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
        <SignUpForm />
      </TestWrapper>,
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('should wrap form in Enabled component with correct feature flag', () => {
    const { container } = render(
      <TestWrapper>
        <SignUpForm />
      </TestWrapper>,
    );

    expect(container.querySelector('form')).toBeInTheDocument();
  });
});
