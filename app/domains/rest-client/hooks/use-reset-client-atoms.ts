import { useResetAtom } from 'jotai/react/utils';
import { useCallback } from 'react';
import {
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
  responseInfoAtom,
} from '../atoms';

export function useResetClientAtoms() {
  const resetRequestMethod = useResetAtom(httpRequestMethodAtom, { store: formDataStore });
  const resetRequestEndpoint = useResetAtom(requestEndpointAtom, { store: formDataStore });
  const resetRequestHeaders = useResetAtom(requestHeadersAtom, { store: formDataStore });
  const resetRequestBody = useResetAtom(requestBodyAtom, { store: formDataStore });

  const resetResponseInfo = useResetAtom(responseInfoAtom, { store: formDataStore });

  const resetAtoms = useCallback(() => {
    resetRequestMethod();
    resetRequestEndpoint();
    resetRequestHeaders();
    resetRequestBody();
    resetResponseInfo();
  }, [
    resetRequestMethod,
    resetRequestEndpoint,
    resetRequestHeaders,
    resetRequestBody,
    resetResponseInfo,
  ]);

  return resetAtoms;
}
