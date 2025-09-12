/** biome-ignore-all lint/suspicious/noConsole: <asdasdadsdasdas> */

import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { KeyValue } from '@/app/domains/rest-client/components/KeyValueEditor';
import type { BodyEditorRequestBody } from '../domains/rest-client/components/BodyEditor';
import type { RestFormData } from '../domains/rest-client/components/RestForm';
import {
  HTTP_METHODS_WITH_BODY,
  STATUS_CLIENT_ERROR_MAX,
  STATUS_CLIENT_ERROR_MIN,
  STATUS_INFORMATIONAL_MAX,
  STATUS_INFORMATIONAL_MIN,
  STATUS_REDIRECTION_MAX,
  STATUS_REDIRECTION_MIN,
  STATUS_SERVER_ERROR_MAX,
  STATUS_SERVER_ERROR_MIN,
  STATUS_SUCCESS_MAX,
  STATUS_SUCCESS_MIN,
} from './constants';

export function formatJson(input: unknown, onError: (error: Error) => void): string {
  try {
    if (isString(input)) {
      return JSON.stringify(JSON.parse(input), null, 4);
    }
    return JSON.stringify(input, null, 4);
  } catch (e) {
    onError(normalizeError(e));
    return JSON.stringify(input ?? '');
  }
}

export function isString(value: unknown): value is string {
  return value != null && (typeof value === 'string' || value instanceof String);
}

export function normalizeError(value: unknown): Error {
  const message = isString(value) ? value : 'Unknown error';
  return value instanceof Error ? value : new Error(message);
}

export function getUniqueRequestHeaders(pairs: KeyValue[]): Record<string, string> {
  const map = new Map<string, string>();

  for (const { key, value } of pairs) {
    const normalizedKey = key.trim().toLowerCase();
    const normalizedValue = value.trim();

    if (normalizedKey && normalizedValue && !map.has(normalizedKey)) {
      map.set(normalizedKey, normalizedValue);
    }
  }

  return Object.fromEntries(map);
}

export function headersToSearchParams(pairs: KeyValue[]): URLSearchParams {
  const sp = new URLSearchParams();

  for (const { key, value } of pairs) {
    const normalizedKey = key.trim().toLowerCase();
    const normalizedValue = value.trim();

    if (normalizedKey && normalizedValue) {
      sp.append(normalizedKey, normalizedValue);
    }
  }

  return sp;
}

export function searchParamsToHeaders(params: ReadonlyURLSearchParams): KeyValue[] {
  if (params.size === 0) {
    return [];
  }

  const headers = [...params.entries()].map(([key, value]) => ({ key, value }));
  return [...headers, { key: '', value: '' }];
}

export function encodeBase64(v: string, onError: (error: Error) => void): string {
  try {
    return btoa(encodeURIComponent(v));
  } catch (error) {
    onError(normalizeError(error));
    return v;
  }
}

export function decodeBase64(v: string, onError: (error: Error) => void): string {
  try {
    return decodeURIComponent(atob(decodeURIComponent(v)));
  } catch (error) {
    onError(normalizeError(error));
    return v;
  }
}

export function encodeRequestUrl(
  { method, endpoint, headers, body }: RestFormData,
  onError: (error: Error) => void,
): string {
  let url = '';

  url += method;
  url += '/';
  url += body.type;
  url += '/';
  url += encodeBase64(endpoint, onError);

  if (body.value) {
    url += '/';
    url += encodeBase64(body.value, onError);
  }

  const sp = headersToSearchParams(headers);

  if (sp.size > 0) {
    url += `?${sp.toString()}`;
  }

  return url;
}

export function decodeRequestUrl(
  path: string[] | undefined,
  searchParams: ReadonlyURLSearchParams,
  onError: (error: Error) => void,
): RestFormData | null {
  if (!path) {
    return null;
  }

  const [method, bodyType, endpoint, body] = path;

  const headers = searchParamsToHeaders(searchParams);

  const formData = {
    method,
    endpoint: decodeBase64(endpoint, onError),
    body: {
      value: body ? decodeBase64(body, onError) : '',
      type: bodyType as BodyEditorRequestBody['type'],
    } as const,
    headers,
  };

  return formData;
}

export function methodHasBody(method: string): boolean {
  return HTTP_METHODS_WITH_BODY.has(method);
}

export const isInformationalResponse = (status: number): boolean =>
  status >= STATUS_INFORMATIONAL_MIN && status < STATUS_INFORMATIONAL_MAX;

export const isSuccessResponse = (status: number): boolean =>
  status >= STATUS_SUCCESS_MIN && status < STATUS_SUCCESS_MAX;

export const isRedirectionResponse = (status: number): boolean =>
  status >= STATUS_REDIRECTION_MIN && status < STATUS_REDIRECTION_MAX;

export const isClientErrorResponse = (status: number): boolean =>
  status >= STATUS_CLIENT_ERROR_MIN && status < STATUS_CLIENT_ERROR_MAX;

export const isServerErrorResponse = (status: number): boolean =>
  status >= STATUS_SERVER_ERROR_MIN && status < STATUS_SERVER_ERROR_MAX;
