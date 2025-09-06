import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';
import { useDebouncedEffect } from '@/app/hooks/use-debounced-effect';
import { generateCodeSnippet } from '@/app/server-actions/server-actions';
import {
  codeGenLanguageAtom,
  codeGenVariantAtom,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';

const DEBOUNCE_DELAY_MILLISECONDS = 300;

export function useCodeGenSnippet() {
  const method = useAtomValue(httpRequestMethodAtom);
  const endpoint = useAtomValue(requestEndpointAtom);
  const headers = useAtomValue(requestHeadersAtom);
  const body = useAtomValue(requestBodyAtom);
  const codeGenLanguage = useAtomValue(codeGenLanguageAtom);
  const codeGenVariant = useAtomValue(codeGenVariantAtom);

  const [snippet, setSnippet] = useState('');

  const generateSnipped = useCallback(() => {
    if (!(codeGenLanguage && codeGenVariant)) {
      return;
    }

    generateCodeSnippet({
      method,
      url: endpoint,
      headers,
      body,
      language: codeGenLanguage,
      variant: codeGenVariant,
    }).then(setSnippet);
  }, [method, endpoint, headers, body, codeGenLanguage, codeGenVariant]);

  useDebouncedEffect(generateSnipped, DEBOUNCE_DELAY_MILLISECONDS);

  return snippet;
}
