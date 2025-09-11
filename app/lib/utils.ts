/** biome-ignore-all lint/suspicious/noConsole: <asdasdadsdasdas> */

import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { KeyValue } from '@/app/domains/rest-client/components/KeyValueEditor';
import type { BodyEditorRequestBody } from '../domains/rest-client/components/BodyEditor';
import type { RestFormData } from '../domains/rest-client/components/RestForm';

export function formatJson(input: unknown, onError: (error: Error) => void): string {
  try {
    if (isString(input)) {
      return JSON.stringify(JSON.parse(input), null, 4);
    }
    return JSON.stringify(input, null, 4);
  } catch (e) {
    onError(normalizeError(e));
    return String(input ?? '');
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
  const headers = [...params.entries()].map(([key, value]) => ({ key, value }));
  return [...headers, { key: '', value: '' }];
}

export function encodeBase64(v: string): string {
  return btoa(encodeURIComponent(v));
}

export function decodeBase64(v: string): string {
  return decodeURIComponent(atob(decodeURIComponent(v)));
}

export function encodeRequestUrl({ method, endpoint, headers, body }: RestFormData): string {
  let url = '';

  url += method;
  url += '/';
  url += encodeBase64(endpoint);

  if (body.value) {
    url += '/';
    url += body.type;
    url += '/';
    url += encodeBase64(body.value);
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
): RestFormData | null {
  if (!path) {
    return null;
  }

  const [method, endpoint, body, bodyType] = path;

  const headers = searchParamsToHeaders(searchParams);

  const formData = {
    method,
    endpoint: decodeBase64(endpoint),
    body: {
      value: body ? decodeBase64(body) : '',
      type: bodyType as BodyEditorRequestBody['type'],
    } as const,
    headers,
  };

  return formData;
}
