import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { KeyValue } from '@/app/domains/rest-client/components/KeyValueEditor';
import { HTTP_METHODS_WITH_BODY } from '../constants';
import type { BodyEditorRequestBody } from '../domains/rest-client/components/BodyEditor';
import type { RestFormData } from '../domains/rest-client/components/RestForm';
import type { OnErrorCallback } from '../types';

export function formatJson(input: unknown, onError: OnErrorCallback): string {
  try {
    if (isString(input)) {
      return JSON.stringify(JSON.parse(input), null, 4);
    }
    return JSON.stringify(input, null, 4);
  } catch (e) {
    onError(e);
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

export function encodeBase64(v: string, onError: OnErrorCallback): string {
  try {
    return btoa(encodeURIComponent(v));
  } catch (error) {
    onError(error);
    return v;
  }
}

export function decodeBase64(v: string, onError: OnErrorCallback): string {
  try {
    return decodeURIComponent(atob(decodeURIComponent(v)));
  } catch (error) {
    onError(error);
    return v;
  }
}

export function encodeRequestUrl(
  { method, endpoint, headers, body }: RestFormData,
  onError: OnErrorCallback,
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
  onError: OnErrorCallback,
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
