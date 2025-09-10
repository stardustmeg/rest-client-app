'use client';

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import type { Variable } from '@/app/domains/variables/types/variables-schema';

interface VariablesContextType {
  variables: Variable[];
  addVariable: (v: Omit<Variable, 'id'>) => void;
  updateVariable: (id: number, updated: Partial<Omit<Variable, 'id'>>) => void;
  deleteVariable: (id: number) => void;
  deleteAllVariables: VoidFunction;
  dispatch: Dispatch<Action>;
}

type Action =
  | { type: 'ADD'; payload: Omit<Variable, 'id'> }
  | { type: 'UPDATE'; payload: { id: number; updated: Partial<Omit<Variable, 'id'>> } }
  | { type: 'DELETE'; payload: number }
  | { type: 'SET'; payload: Variable[] }
  | { type: 'DELETE_ALL' };

export const reducer = (state: Variable[], action: Action): Variable[] => {
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
  const [variables, dispatch] = useReducer(reducer, []);

  const addVariable = useCallback(
    (v: Omit<Variable, 'id'>) => dispatch({ type: 'ADD', payload: v }),
    [],
  );

  const updateVariable = useCallback(
    (id: number, updated: Partial<Omit<Variable, 'id'>>) =>
      dispatch({ type: 'UPDATE', payload: { id, updated } }),
    [],
  );

  const deleteVariable = useCallback((id: number) => dispatch({ type: 'DELETE', payload: id }), []);

  const deleteAllVariables = useCallback(() => dispatch({ type: 'DELETE_ALL' }), []);

  const contextValue = useMemo(
    () => ({
      variables,
      addVariable,
      updateVariable,
      deleteVariable,
      deleteAllVariables,
      dispatch,
    }),
    [variables, addVariable, updateVariable, deleteVariable, deleteAllVariables],
  );

  return <VariablesContext.Provider value={contextValue}>{children}</VariablesContext.Provider>;
};

export const useVariablesContext = () => {
  const ctx = useContext(VariablesContext);
  if (!ctx) throw new Error('useVariablesContext must be used within VariablesProvider');
  return ctx;
};
