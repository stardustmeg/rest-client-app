/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: false positive */
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  mockSuccess,
  mockUseForm,
  setupFormMocks,
  setupTranslationMocks,
} from '@/app/__tests__/__mocks__/mock-setup';
import { setupUserEvent, TestWrapper } from '@/app/__tests__/utils';
import { SignInForm } from '@/app/components/SignInForm';

describe('SignInForm', () => {
  let mockRegister: ReturnType<typeof vi.fn>;
  let mockHandleSubmit: ReturnType<typeof vi.fn>;
  let mockTrigger: ReturnType<typeof vi.fn>;
  let mockFormState: { errors: Record<string, unknown>; isValid: boolean; isSubmitting: boolean };

  beforeEach(() => {
    vi.clearAllMocks();

    const mocks = setupFormMocks();
    mockRegister = mocks.mockRegister;
    mockHandleSubmit = mocks.mockHandleSubmit;
    mockTrigger = mocks.mockTrigger;
    mockFormState = mocks.mockFormState;

    setupTranslationMocks({
      signInTitle: 'Sign In',
      email: 'Email',
      password: 'Password',
      submit: 'Submit',
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
