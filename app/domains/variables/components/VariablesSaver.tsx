import { useEffect } from 'react';
import { useVariablesContext } from '@/app/domains/variables/components/VariablesProvider';
import { useLocalStorage } from '@/app/hooks/use-local-storage';

export const VariablesSaver = () => {
  const { variables } = useVariablesContext();
  const { setValue } = useLocalStorage('variables');

  useEffect(() => {
    setValue(JSON.stringify(variables));
  }, [variables, setValue]);

  return null;
};
