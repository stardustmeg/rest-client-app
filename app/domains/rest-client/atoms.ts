import { atom, createStore } from 'jotai';
import type { RequestHeader } from './components/HeadersEditor';

export const formDataStore = createStore();

export const httpRequestMethodAtom = atom('GET');

export const requestEndpointAtom = atom('');

export const requestHeadersAtom = atom<RequestHeader[]>([{ key: '', value: '' }]);

export const requestBodyAtom = atom('');

export const responseInformationAtom = atom<{ status: number; size: number; time: number }>();
