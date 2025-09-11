'use server';

import pcg from 'postman-code-generators';
import sdk from 'postman-collection';
import type { RestFormData } from '../domains/rest-client/components/RestForm';
import { KILOBYTE, MIME_TYPE } from '../lib/constants';
import { getUniqueRequestHeaders, methodHasBody, normalizeError } from '../lib/utils';
import type { GenerateCodeSnippetParams } from './types';

export async function getLanguageList() {
  return await pcg.getLanguageList();
}

export async function generateCodeSnippet({
  method,
  url,
  headers,
  body,
  language,
  variant,
}: GenerateCodeSnippetParams): Promise<string> {
  const request = new sdk.Request({
    method,
    body: new sdk.RequestBody({ mode: 'raw', raw: body.value }),
    url,
    header: headers,
  });

  return await new Promise((resolve, reject) => {
    pcg.convert(language, variant, request, {}, (error, snippet) => {
      if (error) {
        reject(error);
      } else {
        resolve(snippet ?? '');
      }
    });
  });
}

export async function sendRequest({ method, endpoint, headers, body }: RestFormData) {
  const start = Date.now();

  try {
    const res = await fetch(endpoint, {
      method,
      body: methodHasBody(method) ? body.value : undefined,
      headers: getUniqueRequestHeaders(headers),
    });

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        statusText: res.statusText,
        time: Date.now() - start,
        body: null,
        size: 0,
        error: `Request failed with status ${res.status}`,
      };
    }

    const end = Date.now();

    const buffer = await res.clone().arrayBuffer();
    const sizeKb = buffer.byteLength / KILOBYTE;

    const contentType = res.headers.get('content-type');
    const responseBody = contentType?.includes(MIME_TYPE.JSON)
      ? await res.json()
      : await res.text();

    return {
      ok: true,
      status: res.status,
      statusText: res.statusText,
      body: responseBody,
      time: end - start,
      size: Number(sizeKb.toFixed(2)),
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      statusText: 'Network Error',
      time: Date.now() - start,
      body: null,
      size: 0,
      error: normalizeError(err).message,
    };
  }
}
