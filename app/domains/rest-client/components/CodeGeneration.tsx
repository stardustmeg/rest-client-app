'use client';

import { Select } from '@/app/components/ui/Select';
import { useCodeGeneration } from '../hooks/use-code-generation';

export const CodeGeneration = () => {
  const { languages, variants, selectLanguage } = useCodeGeneration();

  return (
    <div>
      <Select options={languages} name="language" onValueChange={selectLanguage} />
      <Select options={variants} name="variant" />
      <button type="button">Generate </button>
    </div>
  );
};
