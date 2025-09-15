import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from '@/app/hooks/use-debounced-callback';
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

const DEBOUNCE_DELAY_MILLISECONDS = 300;

export function useCodeGenSnippet(language: string, variant: string) {
  const [generatingSnippet, setGeneratingSnippet] = useState(false);
  const [genError, setGenError] = useState(false);
  const [snippet, setSnippet] = useState('');

  const { resolveVariables } = useResolveVariables();
  const { error } = useToast();

  const method = useAtomValue(httpRequestMethodAtom, { store: formDataStore });
  const endpoint = useAtomValue(requestEndpointAtom, { store: formDataStore });
  const headers = useAtomValue(requestHeadersAtom, { store: formDataStore });
  const body = useAtomValue(requestBodyAtom, { store: formDataStore });

  const debouncedGenerate = useDebouncedCallback(
    async (data: RestFormData, l: string, v: string) => {
      setGenError(false);
      setGeneratingSnippet(true);

      try {
        const code = await generateCodeSnippet({
          method: data.method,
          url: data.endpoint,
          headers: data.headers,
          body: data.body,
          language: l,
          variant: v,
        });

        setSnippet(code);
      } catch (e) {
        setGenError(true);
        error(normalizeError(e).message);
      } finally {
        setGeneratingSnippet(false);
      }
    },
    DEBOUNCE_DELAY_MILLISECONDS,
  );

  useEffect(() => {
    let resolvedData: RestFormData;

    try {
      resolvedData = resolveVariables({ method, endpoint, headers, body });
    } catch (e) {
      queueMicrotask(() => {
        error(normalizeError(e).message);
      });
      setGenError(true);
      return;
    }

    debouncedGenerate(resolvedData, language, variant);
  }, [
    method,
    endpoint,
    headers,
    body,
    resolveVariables,
    error,
    debouncedGenerate,
    language,
    variant,
  ]);

  return { snippet, generatingSnippet, genError };
}
