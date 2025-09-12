'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import type { Variable } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';
import { useLocalStorage2 } from '@/app/hooks/use-local-storage2';
import { useVariablesContext } from './VariablesProvider';

export const VariablesLocalStoragePersistence = () => {
  const { userId } = useAuth();
  const { variables, dispatch } = useVariablesContext();

  const [storedVariables, saveVariables] = useLocalStorage2<Variable[]>(`${userId}:variables`, []);

  const storedVariablesRef = useRef<Variable[]>(storedVariables ?? []);
  useLayoutEffect(() => {
    storedVariablesRef.current = storedVariables;
  });

  useEffect(() => {
    if (storedVariablesRef.current && userId) {
      dispatch({ type: 'SET', payload: storedVariablesRef.current });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (variables && userId) {
      saveVariables(variables);
    }
  }, [variables, saveVariables, userId]);

  return null;
};
