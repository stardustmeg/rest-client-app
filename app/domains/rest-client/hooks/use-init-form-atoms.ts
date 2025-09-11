import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';
import type { RestFormData } from '../components/RestForm';

export function useInitFormAtoms(formData: RestFormData | null) {
  const setRequestMethod = useSetAtom(httpRequestMethodAtom);
  const setRequestEndpoint = useSetAtom(requestEndpointAtom);
  const setHeaders = useSetAtom(requestHeadersAtom);
  const setBody = useSetAtom(requestBodyAtom);

  useEffect(() => {
    if (!formData) {
      return;
    }

    setRequestMethod(formData.method);
    setRequestEndpoint(formData.endpoint);
    setHeaders(formData.headers);
    setBody(formData.body);
  }, [formData, setRequestMethod, setRequestEndpoint, setHeaders, setBody]);
}
