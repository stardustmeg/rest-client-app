import type { Variable } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';
import { useLocalStorage } from '@/app/hooks/use-local-storage';

export const useVariablesActions = () => {
  const { userId } = useAuth();
  const [_, setVariables] = useLocalStorage<Variable[]>(`variables_${userId}`, []);

  const addVariable = (value: Variable) => {
    setVariables((prev) => {
      return [...prev, value];
    });
  };

  const updateVariable = (idx: number, updated: Partial<Variable>) => {
    setVariables((prev) =>
      prev.map((variable, i) => (i === idx ? { ...variable, ...updated } : variable)),
    );
  };

  const deleteVariable = (idx: number) => {
    setVariables((prev) => prev.filter((_v, i) => i !== idx));
  };

  const deleteAllVariables = () => {
    setVariables([]);
  };

  return { addVariable, updateVariable, deleteVariable, deleteAllVariables };
};
