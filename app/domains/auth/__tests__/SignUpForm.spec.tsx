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
import { SignUpForm } from '@/app/domains/auth/ui/SignUpForm';

describe('SignUpForm', () => {
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
      signUpTitle: 'Sign Up',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Submit',
    });
  });

  it('should render the form with all fields', () => {
    render(
      <TestProviders>
        <SignUpForm />
      </TestProviders>,
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should render form fields with correct register props', () => {
    render(
      <TestProviders>
        <SignUpForm />
      </TestProviders>,
    );
    expect(mockRegister).toHaveBeenCalledWith('username');
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
      <TestProviders>
        <SignUpForm />
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
        <SignUpForm />
      </TestProviders>,
    );

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid and not submitting', () => {
    render(
      <TestProviders>
        <SignUpForm />
      </TestProviders>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should call toaster on form submission', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <SignUpForm />
      </TestProviders>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockSuccess).toHaveBeenCalledWith('signUpSuccess');
  });

  it('should handle form validation errors', () => {
    mockUseForm.mockReturnValueOnce({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        ...mockFormState,
        errors: {
          username: { message: 'usernameRequired' },
          email: { message: 'emailRequired' },
          password: { message: 'passwordMinLength' },
          confirmPassword: { message: 'passwordsDontMatch' },
        },
      },
      trigger: mockTrigger,
    });

    render(
      <TestProviders>
        <SignUpForm />
      </TestProviders>,
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
