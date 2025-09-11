'use client';

import { useEffect, useRef } from 'react';
import type { Variable } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';
import { useToast } from '@/app/hooks/use-toast';
import { useVariablesContext } from './VariablesProvider';

const InnerSaver = ({ userId }: { userId: string }) => {
  const { variables, dispatch } = useVariablesContext();
  const { error } = useToast();
  const storageKey = `${userId}:variables`;
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    try {
      const json = localStorage.getItem(storageKey);
      const loadedVars: Variable[] = json ? JSON.parse(json) : [];
      dispatch({ type: 'SET', payload: loadedVars });
    } catch (er) {
      error(`Error occurred while loading variables from localStorage: ${er}`);
      dispatch({ type: 'SET', payload: [] });
    }
  }, [dispatch, storageKey, error]);

  useEffect(() => {
    try {
      const jsonToStore = JSON.stringify(variables);
      localStorage.setItem(storageKey, jsonToStore);
    } catch (er) {
      error(`Error occurred while saving variables in localStorage: ${er}`);
    }
  }, [variables, storageKey, error]);

  return null;
};

export const VariablesSaver = () => {
  const { userId } = useAuth();

  if (!userId) {
    return null;
  }

  return <InnerSaver userId={userId} />;
};
