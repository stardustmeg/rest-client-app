import { render, screen } from '@testing-library/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { FormField } from '@/app/components/ui/FormField';
import { setupUserEvent, TestWrapper } from '@/app/utils/test-utilities';

const mockRegister: UseFormRegisterReturn = {
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
  name: 'testField',
};

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: <blyat' 👺>
describe('FormField', () => {
  it('should renders label correctly', () => {
    render(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should renders input with register props', () => {
    render(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'testField');
  });

  it('should does not show error message when there is no error', () => {
    render(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    expect(screen.queryByTestId('error-field')).not.toBeInTheDocument();
  });

  it('should shows error message when there is an error', () => {
    const mockError: FieldError = {
      type: 'required',
      message: 'This field is required',
    };

    render(
      <TestWrapper>
        <FormField error={mockError} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const errorMessage = screen.getByText('This field is required');
    expect(screen.getByTestId('error-field')).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it('should marks field as invalid when there is an error', () => {
    const mockError: FieldError = {
      type: 'required',
      message: 'This field is required',
    };

    render(
      <TestWrapper>
        <FormField error={mockError} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const fieldRoot = screen.getByRole('group');
    expect(fieldRoot).toHaveAttribute('data-invalid', '');
  });

  it('should marks field as valid when there is no error', () => {
    render(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const fieldRoot = screen.getByRole('group');
    expect(fieldRoot).not.toHaveAttribute('data-invalid');
  });

  it('should handles user input correctly', async () => {
    const { user } = setupUserEvent(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');

    expect(mockRegister.onChange).toHaveBeenCalled();
  });

  it('should handles blur event correctly', async () => {
    const { user } = setupUserEvent(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.tab();

    expect(mockRegister.onBlur).toHaveBeenCalled();
  });

  it('should applies correct accessibility attributes when invalid', () => {
    const mockError: FieldError = {
      type: 'required',
      message: 'This field is required',
    };

    render(
      <TestWrapper>
        <FormField error={mockError} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should applies correct accessibility attributes when valid', () => {
    render(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('should passes ref correctly', () => {
    render(
      <TestWrapper>
        <FormField error={undefined} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    expect(mockRegister.ref).toHaveBeenCalled();
  });

  it('should renders with different error types', () => {
    const mockError: FieldError = {
      type: 'minLength',
      message: 'Minimum length is 5 characters',
    };

    render(
      <TestWrapper>
        <FormField error={mockError} register={mockRegister} label="Test Label" />
      </TestWrapper>,
    );

    expect(screen.getByText('Minimum length is 5 characters')).toBeInTheDocument();
  });

  it('should renders without optional props', () => {
    const { container } = render(
      <TestWrapper>
        <FormField register={mockRegister} label="Test Label" error={undefined} />
      </TestWrapper>,
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
});
