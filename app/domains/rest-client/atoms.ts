import { atom, createStore } from 'jotai';
import type { ResponseInformationProps } from '@/app/components/ui/ResponseInformation';
import type { BodyEditorRequestBody } from './components/BodyEditor';
import type { KeyValue } from './components/KeyValueEditor';

export const formDataStore = createStore();

export const httpRequestMethodAtom = atom('GET');

export const requestEndpointAtom = atom('');

export const requestHeadersAtom = atom<KeyValue[]>([]);

export const requestBodyAtom = atom<BodyEditorRequestBody>({
  type: 'json',
  value: '',
});

export const responseBodyAtom = atom('');

export const failedResponseAtom = atom<{ ok: boolean; lastErrorMessage: string }>({
  ok: true,
  lastErrorMessage: '',
});

export const responseInformationAtom = atom<ResponseInformationProps>({
  status: 0,
  size: 0,
  time: 0,
});

export const codeGenLanguageAtom = atom('');

export const codeGenVariantAtom = atom('');
