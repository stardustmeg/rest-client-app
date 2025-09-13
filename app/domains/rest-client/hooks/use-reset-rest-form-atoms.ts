import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import {
  codeGenLanguageAtom,
  codeGenVariantAtom,
  failedResponseAtom,
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
  responseBodyAtom,
  responseInformationAtom,
} from '../atoms';

export function useResetRestFormAtoms() {
  const setRequestMethod = useSetAtom(httpRequestMethodAtom, { store: formDataStore });
  const setRequestEndpoint = useSetAtom(requestEndpointAtom, { store: formDataStore });
  const setRequestHeaders = useSetAtom(requestHeadersAtom, { store: formDataStore });
  const setRequestBody = useSetAtom(requestBodyAtom, { store: formDataStore });
  const setResponseBody = useSetAtom(responseBodyAtom, { store: formDataStore });
  const setFailedResponse = useSetAtom(failedResponseAtom, { store: formDataStore });
  const setResponseInformation = useSetAtom(responseInformationAtom, { store: formDataStore });
  const setCodeGenLanguage = useSetAtom(codeGenLanguageAtom, { store: formDataStore });
  const setCodeGenVariant = useSetAtom(codeGenVariantAtom, { store: formDataStore });

  const resetAtoms = useCallback(() => {
    setRequestMethod('GET');
    setRequestEndpoint('');
    setRequestHeaders([]);
    setRequestBody({ type: 'json', value: '' });
    setResponseBody('');
    setFailedResponse({ ok: true, lastErrorMessage: '' });
    setResponseInformation({ status: 0, size: 0, time: 0 });
    setCodeGenLanguage('');
    setCodeGenVariant('');
  }, [
    setRequestMethod,
    setRequestEndpoint,
    setRequestHeaders,
    setRequestBody,
    setResponseBody,
    setFailedResponse,
    setResponseInformation,
    setCodeGenLanguage,
    setCodeGenVariant,
  ]);

  return resetAtoms;
}
