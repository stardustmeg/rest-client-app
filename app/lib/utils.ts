/** biome-ignore-all lint/suspicious/noConsole: <asdasdadsdasdas> */

import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { KeyValue } from '@/app/domains/rest-client/components/KeyValueEditor';
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

export function headersToSearchParams(pairs: KeyValue[]) {
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

export function encodeBase64(v: string) {
  return btoa(encodeURIComponent(v));
}

export function decodeBase64(v: string) {
  return decodeURIComponent(atob(v));
}

export function encodeRequestUrl({ method, endpoint, headers, body }: RestFormData) {
  let url = '';

  url += method;
  url += '/';
  url += encodeBase64(endpoint);

  if (body.value) {
    url += '/';
    url += encodeBase64(body.value);
  }

  const sp = headersToSearchParams(headers);

  if (sp.size > 0) {
    url += `?${sp.toString()}`;
  }

  return url;
}

export function decodeRequestUrl(path: string[] | undefined, sp: ReadonlyURLSearchParams) {
  console.log('PATH', path);
  console.log('SP', sp);
}
