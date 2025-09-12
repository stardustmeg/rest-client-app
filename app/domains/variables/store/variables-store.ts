import { atom, useSetAtom } from 'jotai';
import type { Variable } from '@/app/domains/variables/types/variables-schema';

export const variablesAtom = atom<Variable[]>([]);

export const useVariablesActions = () => {
  const setVariables = useSetAtom(variablesAtom);

  const addVariable = (value: Omit<Variable, 'id'>) => {
    setVariables((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map((v) => v.id)) : 0;
      const newId = maxId + 1;
      return [...prev, { ...value, id: newId }];
    });
  };

  const updateVariable = (id: number, updated: Partial<Omit<Variable, 'id'>>) => {
    setVariables((prev) =>
      prev.map((variable) => (variable.id === id ? { ...variable, ...updated } : variable)),
    );
  };

  const deleteVariable = (id: number) => {
    setVariables((prev) => prev.filter((variable) => variable.id !== id));
  };

  const deleteAllVariables = () => {
    setVariables([]);
  };

  return { addVariable, updateVariable, deleteVariable, deleteAllVariables };
};
