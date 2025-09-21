import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { useVariablesActions } from '@/app/domains/variables/store/variables-store';
import type { Variable } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';
import { useLocalStorage } from '@/app/hooks/use-local-storage';

vi.mock('@/app/hooks/use-auth');
vi.mock('@/app/hooks/use-local-storage');

describe('useVariablesActions', () => {
  const mockUserId = 'user-1';
  const mockSetVariables = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as Mock).mockReturnValue({ userId: mockUserId });
    (useLocalStorage as Mock).mockReturnValue([[], mockSetVariables]);
  });

  it('should add a variable', () => {
    const { addVariable } = useVariablesActions();
    const variable: Variable = { name: 'Var1', value: '123' };

    addVariable(variable);

    const callback = mockSetVariables.mock.calls[0][0] as (prev: Variable[]) => Variable[];
    const result = callback([]);
    expect(result).toEqual([variable]);
  });

  it('should update a variable', () => {
    const { updateVariable } = useVariablesActions();
    const prev: Variable[] = [
      { name: 'Var1', value: '123' },
      { name: 'Var2', value: '456' },
    ];

    updateVariable(1, { value: '789' });

    const callback = mockSetVariables.mock.calls[0][0] as (prev: Variable[]) => Variable[];
    const result = callback(prev);
    expect(result).toEqual([
      { name: 'Var1', value: '123' },
      { name: 'Var2', value: '789' },
    ]);
  });

  it('should delete a variable', () => {
    const { deleteVariable } = useVariablesActions();
    const prev: Variable[] = [
      { name: 'Var1', value: '123' },
      { name: 'Var2', value: '456' },
    ];

    deleteVariable(0);

    const callback = mockSetVariables.mock.calls[0][0] as (prev: Variable[]) => Variable[];
    const result = callback(prev);
    expect(result).toEqual([{ name: 'Var2', value: '456' }]);
  });

  it('should delete all variables', () => {
    const { deleteAllVariables } = useVariablesActions();

    deleteAllVariables();

    expect(mockSetVariables).toHaveBeenCalledWith([]);
  });
});
