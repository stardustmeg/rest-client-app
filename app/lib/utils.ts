import type { KeyValue } from '@/app/domains/rest-client/components/KeyValueEditor';

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

    sp.append(normalizedKey, normalizedValue);
  }

  return sp;
}
