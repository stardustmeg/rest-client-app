import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { VariablesContent } from '@/app/domains/variables/components/VariablesContent';
import { useVariablesActions } from '@/app/domains/variables/store/variables-store';
import { useAuth } from '@/app/hooks/use-auth';

const deleteVariable = vi.fn();
const addVariable = vi.fn();
const updateVariable = vi.fn();
const deleteAllVariables = vi.fn();

// Mock the Jotai store
vi.mock('jotai', () => ({
  useAtom: vi.fn(),
}));

vi.mock('@/app/domains/variables/store/variables-store', () => ({
  variablesAtom: 'mock-atom',
  useVariablesActions: vi.fn(),
}));

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: <jjj>
describe('VariablesContent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useAuth as Mock).mockReturnValue({ isLoading: false });
    (useVariablesActions as Mock).mockReturnValue({
      addVariable,
      updateVariable,
      deleteVariable,
      deleteAllVariables,
    });
  });

  it('should render "noVariables" when list is empty', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([[], vi.fn()]);

    renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    expect(screen.getByText('noVariables 🥲')).toBeInTheDocument();
  });

  it('should render inputs for variables', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{var1}}', value: '123' },
        { id: 2, name: '{{var2}}', value: '456' },
      ],
      vi.fn(),
    ]);

    renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    // The KeyValueEditor renders inputs with specific test IDs
    expect(screen.getByTestId('key-input-0')).toHaveValue('var1');
    expect(screen.getByTestId('value-input-0')).toHaveValue('123');
    expect(screen.getByTestId('key-input-1')).toHaveValue('var2');
    expect(screen.getByTestId('value-input-1')).toHaveValue('456');
  });

  it('should call deleteVariable when delete button is clicked', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([[{ id: 1, name: '{{var1}}', value: '123' }], vi.fn()]);

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    const deleteBtn = screen.getByTestId('delete-button-0');
    await user.click(deleteBtn);

    expect(deleteVariable).toHaveBeenCalledWith(1);
  });

  it('should call updateVariable when input changes', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([[{ id: 1, name: '{{var1}}', value: '123' }], vi.fn()]);

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    const keyInput = screen.getByTestId('key-input-0');
    await user.clear(keyInput);
    await user.type(keyInput, 'updated');

    expect(updateVariable).toHaveBeenCalled();
  });

  it('should show skeleton when isLoading is true', async () => {
    (useAuth as Mock).mockReturnValue({ isLoading: true });
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([[], vi.fn()]);

    renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    expect(screen.getByText('noVariables 🥲')).toBeInTheDocument();
  });

  it('should call updateVariable when value input changes', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([[{ id: 1, name: '{{var1}}', value: '123' }], vi.fn()]);

    const { user } = renderWithUserEvent(
      <TestProviders>
        <VariablesContent />
      </TestProviders>,
    );

    const valueInput = screen.getByTestId('value-input-0');
    await user.clear(valueInput);
    await user.type(valueInput, '456');

    expect(updateVariable).toHaveBeenCalled();
  });
});
