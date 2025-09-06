'use client';
import { VariablesContent } from '@/app/domains/variables/components/VariablesContent';
import { VariablesForm } from '@/app/domains/variables/components/VariablesForm';
import { VariablesProvider } from '@/app/domains/variables/components/VariablesProvider';

export const Variables = () => {
  return (
    <VariablesProvider>
      <VariablesForm />
      <VariablesContent />
    </VariablesProvider>
  );
};
