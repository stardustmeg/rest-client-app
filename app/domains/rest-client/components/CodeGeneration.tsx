'use client';

import { Flex } from '@chakra-ui/react';
import { Select } from '@/app/components/ui/Select';
import { useCodeGenSelection } from '../hooks/use-code-gen-selection';
import { useCodeGenSnippet } from '../hooks/use-code-gen-snippet';

export const CodeGeneration = () => {
  const { languages, variants, setLanguage, setVariant } = useCodeGenSelection();
  const snippet = useCodeGenSnippet();

  return (
    <div>
      <Flex gap="3">
        <Select options={languages} name="language" onValueChange={setLanguage} />
        <Select options={variants} name="variant" onValueChange={setVariant} />
      </Flex>
      <pre>
        <code>{snippet}</code>
      </pre>
    </div>
  );
};
