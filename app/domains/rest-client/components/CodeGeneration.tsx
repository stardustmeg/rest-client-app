'use client';

import { Clipboard, Flex, IconButton } from '@chakra-ui/react';
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
      <Flex gap="3" marginBottom="5" alignItems="center">
        <Select options={languages} name="language" onValueChange={setLanguage} />
        <Select options={variants} name="variant" onValueChange={setVariant} />
        <Clipboard.Root value={snippet}>
          <Clipboard.Trigger asChild>
            <IconButton variant="surface" size="xs">
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>
      </Flex>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: <yayayaya> */}
      <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  );
};
