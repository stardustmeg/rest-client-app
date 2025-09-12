import type { RestFormData } from '../domains/rest-client/components/RestForm';
import { MIME_TYPE } from '../lib/constants';
import { getUniqueRequestHeaders, methodHasBody, normalizeError } from '../lib/utils';
import type { ProxyResponse } from './types';

export async function proxySendRequest({
  method,
  endpoint,
  headers,
  body,
}: RestFormData): Promise<ProxyResponse & { ok: boolean }> {
  const requestStart = Date.now();

  const requestSize = calculateRequestSize({
    headers,
    body,
  });

  try {
    const uniqueHeaders = getUniqueRequestHeaders(headers);

    const response = await fetch(endpoint, {
      method,
      body: methodHasBody(method) ? body.value : undefined,
      headers: uniqueHeaders,
    });

    const arrayBuffer = await response.clone().arrayBuffer();

    const contentType = response.headers.get('content-type');
    const responseBody = contentType?.includes(MIME_TYPE.JSON)
      ? await response.json()
      : await response.text();

    return {
      ok: response.ok,
      requestMethod: method,
      endpoint,
      requestTimestamp: requestStart,
      requestDuration: Date.now() - requestStart,
      responseStatusCode: response.status,
      requestSize,
      responseSize: arrayBuffer.byteLength,
      body: { type: body.type, value: responseBody },
      errorDetails: response.statusText,
    };
  } catch (error) {
    return {
      ok: false,
      requestMethod: method,
      endpoint,
      requestTimestamp: requestStart,
      requestDuration: Date.now() - requestStart,
      responseStatusCode: 0,
      requestSize,
      responseSize: 0,
      body: { type: body.type },
      errorDetails: normalizeError(error).message,
    };
  }
}

// TODO (ripetchor): Maybe calculate all form data
function calculateRequestSize({ headers, body }: Pick<RestFormData, 'headers' | 'body'>): number {
  const textEncoder = new TextEncoder();

  let size = 0;

  for (const { key, value } of headers) {
    const header = `${key}: ${value}\r\n`;
    size += textEncoder.encode(header).byteLength;
  }

  if (body.value) {
    size += textEncoder.encode(body.value).byteLength;
  }

  return size;
}
