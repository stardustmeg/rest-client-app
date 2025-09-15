'use client';

import { Clipboard, Flex, IconButton } from '@chakra-ui/react';
import { Select } from '@/app/components/ui/Select';
import { Spinner } from '@/app/components/ui/Spinner';
import { useCodeGenSelection } from '../hooks/use-code-gen-selection';
import { useCodeGenSnippet } from '../hooks/use-code-gen-snippet';
import { useHighlightSyntax } from '../hooks/use-highlight-syntax';

export const CodeGeneration = () => {
  const { languages, variants, loadingList, setLanguage, setVariant, language, variant } =
    useCodeGenSelection();
  const { snippet, generatingSnippet, genError } = useCodeGenSnippet(language, variant);
  const highlightedCode = useHighlightSyntax(language, snippet);

  if (loadingList) {
    return <Spinner />;
  }

  return (
    <div>
      <Flex gap="3" marginBottom="5" alignItems="center">
        <Select
          disabled={genError || generatingSnippet}
          options={languages}
          name="language"
          onValueChange={setLanguage}
          value={language}
        />
        <Select
          disabled={genError || generatingSnippet}
          options={variants}
          name="variant"
          onValueChange={setVariant}
          value={variant}
        />
        <Clipboard.Root value={snippet}>
          <Clipboard.Trigger asChild disabled={genError || generatingSnippet}>
            <IconButton variant="surface" size="xs" disabled={genError || generatingSnippet}>
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>
      </Flex>
      {generatingSnippet ? (
        <Spinner />
      ) : (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <yayaya>
        <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      )}
    </div>
  );
};
