'use client';

import { Flex } from '@chakra-ui/react';
import { Select } from '@/app/components/ui/Select';
import { useCodeGeneration } from '../hooks/use-code-generation';

export const CodeGeneration = () => {
  const { languages, variants, setLanguage, setVariant } = useCodeGeneration();

  return (
    <div>
      <Flex gap="3">
        <Select options={languages} name="language" onValueChange={setLanguage} />
        <Select options={variants} name="variant" onValueChange={setVariant} />
      </Flex>
    </div>
  );
};
