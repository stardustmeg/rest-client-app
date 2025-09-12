'use client';
import { VariablesContent } from '@/app/domains/variables/components/VariablesContent';
import { VariablesForm } from '@/app/domains/variables/components/VariablesForm';
import { VariablesLocalStoragePersistence } from '@/app/domains/variables/components/VariablesLocalStoragePersistence';
import { VariablesProvider } from '@/app/domains/variables/components/VariablesProvider';

export const Variables = () => {
  return (
    <VariablesProvider>
      <VariablesLocalStoragePersistence />
      <VariablesForm />
      <VariablesContent />
    </VariablesProvider>
  );
};
