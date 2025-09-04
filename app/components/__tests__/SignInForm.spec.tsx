/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: false positive */

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  mockSuccess,
  mockUseForm,
  setupFormMocks,
  setupTranslationMocks,
} from '@/app/__tests__/__mocks__/mock-setup';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { SignInForm } from '@/app/components/SignInForm';

describe('SignInForm', () => {
  let mockRegister: ReturnType<typeof vi.fn>;
  let mockHandleSubmit: ReturnType<typeof vi.fn>;
  let mockTrigger: ReturnType<typeof vi.fn>;
  let mockFormState: {
    errors: Record<string, { message?: string }>;
    isValid: boolean;
    isSubmitting: boolean;
  };

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
      <TestProviders>
        <SignInForm />
      </TestProviders>,
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should render form fields with correct register props', () => {
    render(
      <TestProviders>
        <SignInForm />
      </TestProviders>,
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
      <TestProviders>
        <SignInForm />
      </TestProviders>,
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
      <TestProviders>
        <SignInForm />
      </TestProviders>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enables submit button when form is valid and not submitting', () => {
    render(
      <TestProviders>
        <SignInForm />
      </TestProviders>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should call toaster on form submission', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <SignInForm />
      </TestProviders>,
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
          email: { message: 'emailRequired' },
          password: { message: 'passwordMinLength' },
          confirmPassword: { message: 'passwordsDontMatch' },
        },
      },
      trigger: mockTrigger,
    });

    render(
      <TestProviders>
        <SignInForm />
      </TestProviders>,
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
