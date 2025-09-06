'use client';

import { Flex } from '@chakra-ui/react';
import { Select } from '@/app/components/ui/Select';
import { useCodeGenSelection } from '../hooks/use-code-gen-selection';
import { useCodeGenSnippet } from '../hooks/use-code-gen-snippet';
import { useHighlightSyntax } from '../hooks/use-highlight-syntax';

export const CodeGeneration = () => {
  const { languages, variants, setLanguage, setVariant } = useCodeGenSelection();
  const snippet = useCodeGenSnippet();
  const highlightedCode = useHighlightSyntax(snippet);

  return (
    <div>
      <Flex gap="3" marginBottom="5">
        <Select options={languages} name="language" onValueChange={setLanguage} />
        <Select options={variants} name="variant" onValueChange={setVariant} />
      </Flex>
      {/* TODO (ripetchor): there is still problem with word wrap */}
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: <yayayaya> */}
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  );
};

// !!!!!!!!!!!!!!!!! NOT SUPPORTED LANGUAGES !!!!!!!!!!!!!!!
// curl
