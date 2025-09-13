import { MIME_TYPE } from '../constants';
import type { RestFormData } from '../domains/rest-client/components/RestForm';
import { getUniqueRequestHeaders, methodHasBody, normalizeError } from '../lib/utils';
import type { ProxyResponse } from './types';

export async function proxySendRequest({
  method,
  endpoint,
  headers,
  body,
}: RestFormData): Promise<ProxyResponse> {
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

    // TODO (ripetchor): return headers
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
      errorDetails: response.ok ? undefined : response.statusText,
    };
  } catch (error) {
    // TODO (ripetchor): return headers
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
