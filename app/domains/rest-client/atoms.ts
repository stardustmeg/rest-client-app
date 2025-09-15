import { createStore } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import type { BodyEditorRequestBody } from './components/BodyEditor';
import type { KeyValue } from './components/KeyValueEditor';
import type { ResponseInfoAtom } from './hooks/types';

export const formDataStore = createStore();

export const httpRequestMethodAtom = atomWithReset('GET');

export const requestEndpointAtom = atomWithReset('');

export const requestHeadersAtom = atomWithReset<KeyValue[]>([]);

export const requestBodyAtom = atomWithReset<BodyEditorRequestBody>({
  type: 'json',
  value: '',
});

export const responseInfoAtom = atomWithReset<ResponseInfoAtom>({
  ok: true,
  responseStatusCode: 0,
  responseSize: 0,
  requestDuration: 0,
  responseBody: '',
  errorDetails: null,
});
