import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  formDataStore,
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';
import type { RestFormData } from '../components/RestForm';

export function useInitFormAtoms(formData: RestFormData | null) {
  const setRequestMethod = useSetAtom(httpRequestMethodAtom, { store: formDataStore });
  const setRequestEndpoint = useSetAtom(requestEndpointAtom, { store: formDataStore });
  const setHeaders = useSetAtom(requestHeadersAtom, { store: formDataStore });
  const setBody = useSetAtom(requestBodyAtom, { store: formDataStore });

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
