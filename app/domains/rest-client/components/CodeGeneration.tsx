'use client';

import { Clipboard, Flex, IconButton } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { use, useEffect, useRef, useState, useTransition } from 'react';
import { Select } from '@/app/components/ui/Select';
import { useToast } from '@/app/hooks/use-toast';
import { generateCodeSnippet } from '@/app/server-actions/server-actions';
import { useResolveVariables } from '../../variables/hooks/use-resolve-variables';
import {
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';
import { CodeGenLanguageContext } from '../contexts/code-gen-language-context';
import { useHighlightSyntax } from '../hooks/use-highlight-syntax';

export const CodeGeneration = () => {
  const languageList = use(CodeGenLanguageContext);
  const selectedLanguage = useRef(languageList[0]);

  const [isLoading, startTransition] = useTransition();

  const { errorToast } = useToast();

  const [snippet, setSnippet] = useState('');
  const [languageConfig, setLanguageConfig] = useState({
    language: selectedLanguage.current.key,
    variant: selectedLanguage.current.selectedVariant,
  });

  const method = useAtomValue(httpRequestMethodAtom, { store: formDataStore });
  const endpoint = useAtomValue(requestEndpointAtom, { store: formDataStore });
  const headers = useAtomValue(requestHeadersAtom, { store: formDataStore });
  const body = useAtomValue(requestBodyAtom, { store: formDataStore });

  const { resolveVariables } = useResolveVariables();

  useEffect(() => {
    startTransition(async () => {
      const code = await Promise.try(() =>
        generateCodeSnippet({
          ...resolveVariables({ method, endpoint, headers, body }),
          language: languageConfig.language,
          variant: languageConfig.variant,
        }),
      ).catch((e) => errorToast(e));
      setSnippet(code ?? '');
    });
  }, [method, endpoint, headers, body, languageConfig, errorToast, resolveVariables]);

  const highlightedCode = useHighlightSyntax(languageConfig.language, snippet);

  const languages = languageList.map((lang) => ({ value: lang.key, label: lang.label }));
  const variants = selectedLanguage.current.variants.map((v) => ({ value: v, label: v })) ?? [];

  const handleLanguageChange = ({ language, variant }: { language: string; variant?: string }) => {
    selectedLanguage.current = languageList.find((l) => l.key === language) ?? languageList[0];
    selectedLanguage.current.selectedVariant = variant ?? selectedLanguage.current.selectedVariant;

    setLanguageConfig({
      language: selectedLanguage.current.key,
      variant: selectedLanguage.current.selectedVariant,
    });
  };

  return (
    <div>
      <Flex gap="3" marginBottom="5" alignItems="center">
        <Select
          disabled={isLoading}
          options={languages}
          name="language"
          onValueChange={(value) => handleLanguageChange({ language: value })}
          value={languageConfig.language}
        />
        <Select
          disabled={isLoading}
          options={variants}
          name="variant"
          onValueChange={(value) =>
            handleLanguageChange({ variant: value, language: selectedLanguage.current.key })
          }
          value={languageConfig.variant}
        />
        <Clipboard.Root value={snippet}>
          <Clipboard.Trigger asChild disabled={isLoading}>
            <IconButton variant="surface" size="xs" disabled={isLoading}>
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>
      </Flex>

      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <yayaya> */}
      <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  );
};
