import { atom, createStore } from 'jotai';
import type { BodyEditorRequestBody } from './components/BodyEditor';
import type { KeyValue } from './components/KeyValueEditor';
import type { ResponseInformationProps } from './components/ResponseInformation';

export const formDataStore = createStore();

export const httpRequestMethodAtom = atom('GET');

export const requestEndpointAtom = atom('');

export const requestHeadersAtom = atom<KeyValue[]>([{ key: '', value: '' }]);

export const requestBodyAtom = atom<BodyEditorRequestBody>({
  type: 'json',
  value: '',
});

export const responseBodyAtom = atom('');

export const responseInformationAtom = atom<ResponseInformationProps>({
  status: 0,
  size: '',
  time: 0,
});

export const codeGenLanguageAtom = atom('');

export const codeGenVariantAtom = atom('');
