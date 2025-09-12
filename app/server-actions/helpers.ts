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

  try {
    const response = await fetch(endpoint, {
      method,
      body: methodHasBody(method) ? body.value : undefined,
      headers: getUniqueRequestHeaders(headers),
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
      requestSize: 0,
      responseSize: arrayBuffer.byteLength,
      body: responseBody,
    };
  } catch (error) {
    return {
      ok: false,
      requestMethod: method,
      endpoint,
      requestTimestamp: requestStart,
      requestDuration: Date.now() - requestStart,
      responseStatusCode: 0,
      requestSize: 0,
      responseSize: 0,
      errorDetails: normalizeError(error).message,
    };
  }
}
