import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import type { Variable } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';

interface VariablesContextType {
  variables: Variable[];
  addVariable: (v: Omit<Variable, 'id'>) => void;
  //TODO (zagorky): maybe implement later in VariablesContent component
  updateVariable: (id: number, updated: Partial<Omit<Variable, 'id'>>) => void;
  deleteVariable: (id: number) => void;
  deleteAllVariables: VoidFunction;
}

type Action =
  | { type: 'ADD'; payload: Omit<Variable, 'id'> }
  | { type: 'UPDATE'; payload: { id: number; updated: Partial<Omit<Variable, 'id'>> } }
  | { type: 'DELETE'; payload: number }
  | { type: 'SET'; payload: Variable[] }
  | { type: 'DELETE_ALL' };

const reducer = (state: Variable[], action: Action): Variable[] => {
  switch (action.type) {
    case 'ADD': {
      const maxId = state.length > 0 ? Math.max(...state.map((v) => v.id)) : 0;
      const newId = maxId + 1;
      return [...state, { ...action.payload, id: newId }];
    }
    case 'UPDATE':
      return state.map((variable) =>
        variable.id === action.payload.id ? { ...variable, ...action.payload.updated } : variable,
      );
    case 'DELETE':
      return state.filter((variable) => variable.id !== action.payload);
    case 'SET':
      return action.payload;
    case 'DELETE_ALL':
      return [];
    default:
      return state;
  }
};

const VariablesContext = createContext<VariablesContextType | undefined>(undefined);

export const VariablesProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth();
  const [variables, dispatch] = useReducer(reducer, []);
  const storageKey = userId ? `${userId}:variables` : 'User:variables';

  const saveToStorage = useCallback(
    (vars: Variable[]) => {
      dispatch({ type: 'SET', payload: vars });
      localStorage.setItem(storageKey, JSON.stringify(vars));
    },
    [storageKey],
  );

  const addVariable = useCallback(
    (v: Omit<Variable, 'id'>) => {
      const newVars = reducer(variables, { type: 'ADD', payload: v });
      saveToStorage(newVars);
    },
    [variables, saveToStorage],
  );

  const updateVariable = useCallback(
    (id: number, updated: Partial<Omit<Variable, 'id'>>) => {
      const updatedVars = reducer(variables, { type: 'UPDATE', payload: { id, updated } });
      saveToStorage(updatedVars);
    },
    [variables, saveToStorage],
  );

  const deleteVariable = useCallback(
    (id: number) => {
      const updatedVars = reducer(variables, { type: 'DELETE', payload: id });
      saveToStorage(updatedVars);
    },
    [variables, saveToStorage],
  );

  const deleteAllVariables = useCallback(() => {
    const updatedVars = reducer(variables, { type: 'DELETE_ALL' });
    saveToStorage(updatedVars);
  }, [variables, saveToStorage]);

  useEffect(() => {
    try {
      const json = localStorage.getItem(storageKey);
      const loadedVars = json ? JSON.parse(json) : [];
      dispatch({ type: 'SET', payload: loadedVars });
    } catch {
      dispatch({ type: 'SET', payload: [] });
    }
  }, [storageKey]);

  return (
    <VariablesContext.Provider
      value={{ variables, addVariable, updateVariable, deleteVariable, deleteAllVariables }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariablesContext = () => {
  const ctx = useContext(VariablesContext);
  if (!ctx) throw new Error('useVariablesContext must be used within VariablesProvider');
  return ctx;
};
