import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useToast } from '@/app/hooks/use-toast';
import { normalizeError } from '@/app/lib/utils';
import { generateCodeSnippet } from '@/app/server-actions/server-actions';
import { useResolveVariables } from '../../variables/hooks/use-resolve-variables';
import {
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';
import type { RestFormData } from '../components/RestForm';

// const _DEBOUNCE_DELAY_MILLISECONDS = 300;

export function useCodeGenSnippet(language: string, variant: string) {
  const [generatingSnippet, setGeneratingSnippet] = useState(false);

  const { resolveVariables } = useResolveVariables();

  const { error } = useToast();

  const method = useAtomValue(httpRequestMethodAtom, { store: formDataStore });
  const endpoint = useAtomValue(requestEndpointAtom, { store: formDataStore });
  const headers = useAtomValue(requestHeadersAtom, { store: formDataStore });
  const body = useAtomValue(requestBodyAtom, { store: formDataStore });

  const [snippet, setSnippet] = useState('');

  useEffect(() => {
    setGeneratingSnippet(true);

    let resData: RestFormData;

    try {
      resData = resolveVariables({ method, endpoint, headers, body });
    } catch (e) {
      queueMicrotask(() => {
        error(normalizeError(e).message);
      });
      setGeneratingSnippet(false);
      return;
    }

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
  }, [language, variant, body, endpoint, headers, method, resolveVariables, error]);

  return { snippet, generatingSnippet };
}
