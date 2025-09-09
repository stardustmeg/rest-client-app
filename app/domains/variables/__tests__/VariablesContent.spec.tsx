import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { VariablesContent } from '@/app/domains/variables/components/VariablesContent';
import {
  useVariablesContext,
  VariablesProvider,
} from '@/app/domains/variables/components/VariablesProvider';
import { useAuth } from '@/app/hooks/use-auth';

const deleteVariable = vi.fn();
const addVariable = vi.fn();
const updateVariable = vi.fn();

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: <jjj>
describe('VariablesContent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useAuth as Mock).mockReturnValue({ isLoading: false });
  });

  it('should render "noVariables" when list is empty', () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [],
      deleteVariable,
      addVariable,
      updateVariable,
    });

    renderWithUserEvent(
      <TestProviders>
        <VariablesProvider>
          <VariablesContent />
        </VariablesProvider>
      </TestProviders>,
    );

    expect(screen.getByText('noVariables 🥲')).toBeInTheDocument();
  });

  it('should render inputs for variables', () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [
        { id: 1, name: 'var1', value: '123' },
        { id: 2, name: 'var2', value: '456' },
      ],
      deleteVariable,
      addVariable,
      updateVariable,
    });

    renderWithUserEvent(
      <TestProviders>
        <VariablesProvider>
          <VariablesContent />
        </VariablesProvider>
      </TestProviders>,
    );

    expect(screen.getByDisplayValue('var1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('var2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('456')).toBeInTheDocument();
  });

  it('should call deleteVariable when delete button is clicked', async () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [{ id: 1, name: 'var1', value: '123' }],
      deleteVariable,
      addVariable,
      updateVariable,
    });

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesProvider>
          <VariablesContent />
        </VariablesProvider>
      </TestProviders>,
    );

    const deleteBtn = screen.getByTestId('delete-button-0');
    await user.click(deleteBtn);

    expect(deleteVariable).toHaveBeenCalledWith(1);
  });

  it('should call updateVariable when input changes', async () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [{ id: 1, name: 'var1', value: '123' }],
      deleteVariable,
      addVariable,
      updateVariable,
    });

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesProvider>
          <VariablesContent />
        </VariablesProvider>
      </TestProviders>,
    );

    const keyInput = screen.getByDisplayValue('var1');
    await user.clear(keyInput);
    await user.type(keyInput, 'updated');

    expect(updateVariable).toHaveBeenCalled();
  });

  it('should show skeleton when isLoading is true', () => {
    (useAuth as Mock).mockReturnValue({ isLoading: true });
    (useVariablesContext as Mock).mockReturnValue({
      variables: [{ id: 1, name: 'var1', value: '123' }],
      deleteVariable,
      addVariable,
      updateVariable,
    });

    renderWithUserEvent(
      <TestProviders>
        <VariablesProvider>
          <VariablesContent />
        </VariablesProvider>
      </TestProviders>,
    );

    expect(screen.getByDisplayValue('var1')).toBeInTheDocument();
  });

  it('should call updateVariable when value input changes', async () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [{ id: 1, name: 'var1', value: '123' }],
      deleteVariable,
      addVariable,
      updateVariable,
    });

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesProvider>
          <VariablesContent />
        </VariablesProvider>
      </TestProviders>,
    );

    const valueInput = screen.getByDisplayValue('123');
    await user.clear(valueInput);
    await user.type(valueInput, '456');

    expect(updateVariable).toHaveBeenCalled();
  });
});
