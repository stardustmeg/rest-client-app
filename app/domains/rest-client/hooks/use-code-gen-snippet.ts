import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';
import { useDebouncedEffect } from '@/app/hooks/use-debounced-effect';
import { generateCodeSnippet } from '@/app/server-actions/server-actions';
import {
  codeGenLanguageAtom,
  codeGenVariantAtom,
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';

const DEBOUNCE_DELAY_MILLISECONDS = 300;

export function useCodeGenSnippet() {
  const [generatingSnippet, setGeneratingSnippet] = useState(false);

  const method = useAtomValue(httpRequestMethodAtom, { store: formDataStore });
  const endpoint = useAtomValue(requestEndpointAtom, { store: formDataStore });
  const headers = useAtomValue(requestHeadersAtom, { store: formDataStore });
  const body = useAtomValue(requestBodyAtom, { store: formDataStore });
  const codeGenLanguage = useAtomValue(codeGenLanguageAtom, { store: formDataStore });
  const codeGenVariant = useAtomValue(codeGenVariantAtom, { store: formDataStore });

  const [snippet, setSnippet] = useState('');

  const generateSnipped = useCallback(() => {
    if (!(codeGenLanguage && codeGenVariant)) {
      return;
    }

    setGeneratingSnippet(true);

    generateCodeSnippet({
      method,
      url: endpoint,
      headers,
      body,
      language: codeGenLanguage,
      variant: codeGenVariant,
    })
      .then(setSnippet)
      .finally(() => setGeneratingSnippet(false));
  }, [method, endpoint, headers, body, codeGenLanguage, codeGenVariant]);

  useDebouncedEffect(generateSnipped, DEBOUNCE_DELAY_MILLISECONDS);

  return { snippet, generatingSnippet };
}
