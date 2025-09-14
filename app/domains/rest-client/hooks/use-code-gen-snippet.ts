import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { generateCodeSnippet } from '@/app/server-actions/server-actions';
import { useResolveVariables } from '../../variables/hooks/use-resolve-variables';
import {
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';

// const _DEBOUNCE_DELAY_MILLISECONDS = 300;

export function useCodeGenSnippet(language: string, variant: string) {
  const [generatingSnippet, setGeneratingSnippet] = useState(false);

  const { resolveVariables } = useResolveVariables();

  const method = useAtomValue(httpRequestMethodAtom, { store: formDataStore });
  const endpoint = useAtomValue(requestEndpointAtom, { store: formDataStore });
  const headers = useAtomValue(requestHeadersAtom, { store: formDataStore });
  const body = useAtomValue(requestBodyAtom, { store: formDataStore });

  const [snippet, setSnippet] = useState('');

  useEffect(() => {
    const resData = resolveVariables({ method, endpoint, headers, body });

    setGeneratingSnippet(true);

    generateCodeSnippet({
      method: resData.method,
      url: resData.endpoint,
      headers: resData.headers,
      body: resData.body,
      language,
      variant,
    })
      .then(setSnippet)
      .finally(() => setGeneratingSnippet(false));
  }, [language, variant, body, endpoint, headers, method, resolveVariables]);

  return { snippet, generatingSnippet };
}
