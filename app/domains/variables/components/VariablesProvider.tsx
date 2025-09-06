import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import type { Variable } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';

interface VariablesContextType {
  variables: Variable[];
  addVariable: (v: Omit<Variable, 'id'>) => void;
  updateVariable: (id: number, updated: Partial<Omit<Variable, 'id'>>) => void;
  deleteVariable: (id: number) => void;
}

const VariablesContext = createContext<VariablesContextType | undefined>(undefined);

export const VariablesProvider = ({ children }: { children: ReactNode }) => {
  const { username } = useAuth();
  const [variables, setVariables] = useState<Variable[]>([]);
  const storageKey = username ? `${username}:variables` : 'User:variables';

  const saveToStorage = useCallback(
    (vars: Variable[]) => {
      setVariables(vars);
      localStorage.setItem(storageKey, JSON.stringify(vars));
    },
    [storageKey],
  );

  const addVariable = useCallback(
    (v: Omit<Variable, 'id'>) => {
      const newVar: Variable = { ...v, id: Date.now() };
      saveToStorage([...variables, newVar]);
    },
    [variables, saveToStorage],
  );

  const updateVariable = useCallback(
    (id: number, updated: Partial<Omit<Variable, 'id'>>) => {
      const updatedVars = variables.map((v) => (v.id === id ? { ...v, ...updated } : v));
      saveToStorage(updatedVars);
    },
    [variables, saveToStorage],
  );

  const deleteVariable = useCallback(
    (id: number) => {
      saveToStorage(variables.filter((v) => v.id !== id));
    },
    [variables, saveToStorage],
  );

  useEffect(() => {
    try {
      const json = localStorage.getItem(storageKey);
      setVariables(json ? JSON.parse(json) : []);
    } catch {
      setVariables([]);
    }
  }, [storageKey]);

  return (
    <VariablesContext.Provider value={{ variables, addVariable, updateVariable, deleteVariable }}>
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariablesContext = () => {
  const ctx = useContext(VariablesContext);
  if (!ctx) throw new Error('useVariablesContext must be used within VariablesProvider');
  return ctx;
};
