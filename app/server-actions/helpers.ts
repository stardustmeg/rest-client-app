import type { RestFormData } from '../domains/rest-client/components/RestForm';
import { MIME_TYPE } from '../lib/constants';
import { getUniqueRequestHeaders, methodHasBody, normalizeError } from '../lib/utils';
import type { FailedResponse, SuccessResponse } from './types';

export function successResponse({
  responseSize,
  time,
  status,
  statusText,
  body,
}: Omit<SuccessResponse, 'ok'>): SuccessResponse {
  return { ok: true, responseSize, time, status, statusText, body };
}

export function failedResponse({
  responseSize,
  time,
  status,
  statusText,
  error,
}: Omit<FailedResponse, 'ok'>): FailedResponse {
  return { ok: false, responseSize, time, status, statusText, error };
}

export async function proxySendRequest({ method, endpoint, headers, body }: RestFormData) {
  const requestStart = Date.now();

  try {
    const response = await fetch(endpoint, {
      method,
      body: methodHasBody(method) ? body.value : undefined,
      headers: getUniqueRequestHeaders(headers),
    });

    const arrayBuffer = await response.clone().arrayBuffer();

    if (!response.ok) {
      return failedResponse({
        status: response.status,
        statusText: response.statusText,
        time: Date.now() - requestStart,
        responseSize: arrayBuffer.byteLength,
        error: response.statusText,
      });
    }

    const contentType = response.headers.get('content-type');
    const responseBody = contentType?.includes(MIME_TYPE.JSON)
      ? await response.json()
      : await response.text();

    return successResponse({
      status: response.status,
      statusText: response.statusText,
      responseSize: arrayBuffer.byteLength,
      time: Date.now() - requestStart,
      body: responseBody,
    });
  } catch (error) {
    return failedResponse({
      status: 0,
      responseSize: 0,
      time: Date.now() - requestStart,
      error: normalizeError(error).message,
    });
  }
}
