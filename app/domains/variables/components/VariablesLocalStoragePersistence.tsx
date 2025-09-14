'use client';

import { useAtom } from 'jotai';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { variablesAtom } from '@/app/domains/variables/store/variables-store';
import type { Variable } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';
import { useLocalStorage2 } from '@/app/hooks/use-local-storage2';

export const VariablesLocalStoragePersistence = () => {
  const { userId } = useAuth();
  const [variables, setVariables] = useAtom(variablesAtom);
  const [storedVariables, saveVariables] = useLocalStorage2<Variable[]>(`${userId}:variables`, []);
  const storedVariablesRef = useRef<Variable[]>(storedVariables ?? []);

  useLayoutEffect(() => {
    storedVariablesRef.current = storedVariables;
  });

  useEffect(() => {
    if (storedVariablesRef.current && userId) {
      setVariables(storedVariablesRef.current);
    }
  }, [userId, setVariables]);

  useEffect(() => {
    if (variables && userId) {
      saveVariables(variables);
    }
  }, [variables, saveVariables, userId]);

  return null;
};
