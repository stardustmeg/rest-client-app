import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useDebounceValue } from '@/app/hooks/use-debounce-value';
import { generateCodeSnippet } from '@/app/server-actions/server-actions';
import {
  codeGenLanguageAtom,
  codeGenVariantAtom,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';

const DEBOUNCE_DELAY_MILLISECONDS = 200;

export function useCodeGenSnippet() {
  const method = useAtomValue(httpRequestMethodAtom);
  const endpoint = useAtomValue(requestEndpointAtom);
  const headers = useAtomValue(requestHeadersAtom);
  const body = useAtomValue(requestBodyAtom);
  const codeGenLanguage = useAtomValue(codeGenLanguageAtom);
  const codeGenVariant = useAtomValue(codeGenVariantAtom);

  const [snippet, setSnippet] = useState('');

  const stringifiedInput = JSON.stringify({
    method,
    endpoint,
    headers,
    body,
    language: codeGenLanguage,
    variant: codeGenVariant,
  });

  const debouncedInput = useDebounceValue(stringifiedInput, DEBOUNCE_DELAY_MILLISECONDS);

  useEffect(() => {
    const parsed = JSON.parse(debouncedInput);

    if (!(parsed.language && parsed.variant)) {
      return;
    }

    generateCodeSnippet({
      method: parsed.method,
      url: parsed.endpoint,
      headers: parsed.headers,
      body: parsed.body,
      language: parsed.language,
      variant: parsed.variant,
    }).then(setSnippet);
  }, [debouncedInput]);

  return snippet;
}
