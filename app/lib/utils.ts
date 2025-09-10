import type { KeyValue } from '@/app/domains/rest-client/components/KeyValueEditor';

export function formatJson(text: string, onError: () => void): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 4);
  } catch {
    onError();
    return text;
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
