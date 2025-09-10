'use client';
import { VariablesContent } from '@/app/domains/variables/components/VariablesContent';
import { VariablesForm } from '@/app/domains/variables/components/VariablesForm';
import { VariablesProvider } from '@/app/domains/variables/components/VariablesProvider';
import { VariablesSaver } from '@/app/domains/variables/components/VariablesSaver';

export const Variables = () => {
  return (
    <VariablesProvider>
      <VariablesSaver />
      <VariablesForm />
      <VariablesContent />
    </VariablesProvider>
  );
};
