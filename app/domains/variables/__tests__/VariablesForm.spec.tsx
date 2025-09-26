import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { VariablesForm } from '@/app/domains/variables/components/VariablesForm';
import { useVariablesActions } from '@/app/domains/variables/store/variables-store';

const warningToast = vi.fn();

vi.mock('@/app/hooks/use-toast', () => ({
  useToast: () => ({ warningToast }),
}));

vi.mock('@/app/hooks/use-local-storage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('@/app/domains/variables/store/variables-store', () => ({
  useVariablesActions: vi.fn(),
}));

describe('VariablesForm', () => {
  const addVariable = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useVariablesActions as Mock).mockReturnValue({
      addVariable,
    });
  });

  it('should render form fields and submit button', async () => {
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    (useLocalStorage as Mock).mockReturnValue([[], vi.fn()]);

    renderWithUserEvent(
      <TestProviders>
        <VariablesForm />
      </TestProviders>,
    );

    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('value')).toBeInTheDocument();
    expect(screen.getByTestId('add-variable')).toBeInTheDocument();
  });

  it('should add variable when form is submitted with valid data', async () => {
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    (useLocalStorage as Mock).mockReturnValue([[], vi.fn()]);

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesForm />
      </TestProviders>,
    );

    await user.type(screen.getByPlaceholderText('name'), 'myVar');
    await user.type(screen.getByPlaceholderText('value'), '123');
    await user.click(screen.getByTestId('add-variable'));

    expect(addVariable).toHaveBeenCalledWith({ name: '{{myVar}}', value: '123' });
  });

  it('should show warning when variable name already exists', async () => {
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    (useLocalStorage as Mock).mockReturnValue([
      [{ id: 1, name: '{{myVar}}', value: '123' }],
      vi.fn(),
    ]);
    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesForm />
      </TestProviders>,
    );

    await user.type(screen.getByPlaceholderText('name'), 'myVar');
    await user.type(screen.getByPlaceholderText('value'), '456');
    await user.click(screen.getByTestId('add-variable'));

    expect(warningToast).toHaveBeenCalledWith('variableUniqueNameRequired');
    expect(addVariable).not.toHaveBeenCalled();
  });

  it('should disable submit button when form is invalid', async () => {
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    (useLocalStorage as Mock).mockReturnValue([[], vi.fn()]);

    renderWithUserEvent(
      <TestProviders>
        <VariablesForm />
      </TestProviders>,
    );

    const submitButton = screen.getByTestId('add-variable');
    expect(submitButton).toBeDisabled();
  });
});
