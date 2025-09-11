import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { VariablesForm } from '@/app/domains/variables/components/VariablesForm';
import { useVariablesContext } from '@/app/domains/variables/components/VariablesProvider';

const warning = vi.fn();

vi.mock('@/app/hooks/use-toast', () => ({
  useToast: () => ({ warning }),
}));

describe('VariablesForm', () => {
  const addVariable = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useVariablesContext as Mock).mockReturnValue({
      addVariable,
      variables: [],
    });
  });

  it('should render form fields and submit button', () => {
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
    (useVariablesContext as Mock).mockReturnValue({
      addVariable,
      variables: [{ id: '1', name: 'myVar', value: '123' }],
    });

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesForm />
      </TestProviders>,
    );

    await user.type(screen.getByPlaceholderText('name'), 'myVar');
    await user.type(screen.getByPlaceholderText('value'), '456');
    await user.click(screen.getByTestId('add-variable'));

    expect(warning).toHaveBeenCalledWith('variableUniqueNameRequired');
    expect(addVariable).not.toHaveBeenCalled();
  });

  it('should disable submit button when form is invalid', () => {
    renderWithUserEvent(
      <TestProviders>
        <VariablesForm />
      </TestProviders>,
    );

    const submitButton = screen.getByTestId('add-variable');
    expect(submitButton).toBeDisabled();
  });
});
