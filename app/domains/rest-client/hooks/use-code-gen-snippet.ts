import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { generateCodeSnippet } from '@/app/server-actions/server-actions';
import {
  codeGenLanguageAtom,
  codeGenVariantAtom,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';

export function useCodeGenSnippet() {
  const method = useAtomValue(httpRequestMethodAtom);
  const endpoint = useAtomValue(requestEndpointAtom);
  const headers = useAtomValue(requestHeadersAtom);
  const body = useAtomValue(requestBodyAtom);
  const codeGenLanguage = useAtomValue(codeGenLanguageAtom);
  const codeGenVariant = useAtomValue(codeGenVariantAtom);

  const [snippet, setSnippet] = useState('');

  useEffect(() => {
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

  return snippet;
}
