import { useResetAtom } from 'jotai/react/utils';
import { useCallback } from 'react';
import {
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
  responseInfoAtom,
} from '../atoms';

export function useResetClientAtoms() {
  const resetRequestMethod = useResetAtom(httpRequestMethodAtom);
  const resetRequestEndpoint = useResetAtom(requestEndpointAtom);
  const resetRequestHeaders = useResetAtom(requestHeadersAtom);
  const resetRequestBody = useResetAtom(requestBodyAtom);

  const resetResponseInfo = useResetAtom(responseInfoAtom);

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
