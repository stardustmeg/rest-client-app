import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { VariablesContent } from '@/app/domains/variables/components/VariablesContent';
import { useVariablesContext } from '@/app/domains/variables/components/VariablesProvider';
import { useAuth } from '@/app/hooks/use-auth';

const deleteVariable = vi.fn();
const deleteAllVariables = vi.fn();

describe('VariablesContent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useAuth as Mock).mockReturnValue({ isLoading: false });
  });

  it('should render "noVariables" when list is empty', () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [],
      deleteVariable,
      deleteAllVariables,
    });

    renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    expect(screen.getByText('noVariables 🥲')).toBeInTheDocument();
  });

  it('should render a table with variables', () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [
        { id: 1, name: 'var1', value: '123' },
        { id: 2, name: 'var2', value: '456' },
      ],
      deleteVariable,
      deleteAllVariables,
    });

    renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    expect(screen.getByText('var1')).toBeInTheDocument();
    expect(screen.getByText('var2')).toBeInTheDocument();
    expect(screen.getAllByLabelText('delete')).toHaveLength(2);
    expect(screen.getByLabelText('deleteAll')).toBeInTheDocument();
  });

  it('should call deleteVariable when single delete button is clicked', async () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [{ id: 1, name: 'var1', value: '123' }],
      deleteVariable,
      deleteAllVariables,
    });
    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    await user.click(screen.getByLabelText('delete'));
    expect(deleteVariable).toHaveBeenCalledWith(1);
  });

  it('should call deleteAllVariables when delete all button is clicked', async () => {
    (useVariablesContext as Mock).mockReturnValue({
      variables: [
        { id: 1, name: 'var1', value: '123' },
        { id: 2, name: 'var2', value: '456' },
      ],
      deleteVariable,
      deleteAllVariables,
    });

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    await user.click(screen.getByLabelText('deleteAll'));
    expect(deleteAllVariables).toHaveBeenCalled();
  });

  it('should show skeleton when isLoading is true', () => {
    (useAuth as Mock).mockReturnValue({ isLoading: true });
    (useVariablesContext as Mock).mockReturnValue({
      variables: [{ id: 1, name: 'var1', value: '123' }],
      deleteVariable,
      deleteAllVariables,
    });

    renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    expect(screen.getByText('var1')).toBeInTheDocument();
  });
});
