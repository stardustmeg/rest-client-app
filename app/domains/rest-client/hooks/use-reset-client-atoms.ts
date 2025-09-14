import { useResetAtom } from 'jotai/react/utils';
import { useCallback } from 'react';
import {
  failedResponseAtom,
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
  responseBodyAtom,
  responseInformationAtom,
} from '../atoms';

export function useResetClientAtoms() {
  const resetRequestMethod = useResetAtom(httpRequestMethodAtom, { store: formDataStore });
  const resetRequestEndpoint = useResetAtom(requestEndpointAtom, { store: formDataStore });
  const resetRequestHeaders = useResetAtom(requestHeadersAtom, { store: formDataStore });
  const resetRequestBody = useResetAtom(requestBodyAtom, { store: formDataStore });
  const resetResponseBody = useResetAtom(responseBodyAtom, { store: formDataStore });
  const resetFailedResponse = useResetAtom(failedResponseAtom, { store: formDataStore });
  const resetResponseInformation = useResetAtom(responseInformationAtom, { store: formDataStore });

  const resetAtoms = useCallback(() => {
    resetRequestMethod();
    resetRequestEndpoint();
    resetRequestHeaders();
    resetRequestBody();
    resetResponseBody();
    resetFailedResponse();
    resetResponseInformation();
  }, [
    resetRequestMethod,
    resetRequestEndpoint,
    resetRequestHeaders,
    resetRequestBody,
    resetResponseBody,
    resetFailedResponse,
    resetResponseInformation,
  ]);

  return resetAtoms;
}
