import { atom } from 'jotai';
import type { Header } from './components/HeadersEditor';

export const httpRequestMethodAtom = atom('GET');

export const requestEndpointAtom = atom('');

export const requestHeadersAtom = atom<Header[]>([]);

export const requestBodyAtom = atom('');

export const responseInformationAtom = atom<{ status: number; size: number; time: number }>();
