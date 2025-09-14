import { createStore } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import type { ResponseInformationProps } from '@/app/components/ui/ResponseInformation';
import type { BodyEditorRequestBody } from './components/BodyEditor';
import type { KeyValue } from './components/KeyValueEditor';

export const formDataStore = createStore();

export const httpRequestMethodAtom = atomWithReset('GET');

export const requestEndpointAtom = atomWithReset('');

export const requestHeadersAtom = atomWithReset<KeyValue[]>([]);

export const requestBodyAtom = atomWithReset<BodyEditorRequestBody>({
  type: 'json',
  value: '',
});

export const responseBodyAtom = atomWithReset('');

export const failedResponseAtom = atomWithReset<{ ok: boolean; lastErrorMessage: string }>({
  ok: true,
  lastErrorMessage: '',
});

export const responseInformationAtom = atomWithReset<ResponseInformationProps>({
  status: 0,
  size: 0,
  time: 0,
});
