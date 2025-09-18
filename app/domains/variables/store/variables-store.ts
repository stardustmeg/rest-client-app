import { atom, useSetAtom } from 'jotai';
import type { Variable } from '@/app/domains/variables/types/variables-schema';

export const variablesAtom = atom<Variable[]>([]);

export const useVariablesActions = () => {
  const setVariables = useSetAtom(variablesAtom);

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
