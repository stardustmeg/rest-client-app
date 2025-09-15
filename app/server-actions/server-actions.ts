'use server';

import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { cookies } from 'next/headers';
import pcg from 'postman-code-generators';
import sdk from 'postman-collection';
import type { RestFormData } from '@/app/domains/rest-client/components/RestForm';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import type { BodyEditorRequestBody } from '../domains/rest-client/components/BodyEditor';
import { formatJson } from '../lib/utils';
import type { OnErrorCallback } from '../types';
import { proxySendRequest } from './helpers';
import type { GenerateCodeSnippetParams, GetUserHistory, ProxyResponse } from './types';

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

const saveHistoryItem = (
  { responseBody, ...response }: ProxyResponse,
  userId: Id<'users'>,
  { type, value }: BodyEditorRequestBody,
) =>
  fetchMutation(api.history.createHistoryItem, {
    ...response,
    userId,
    requestBody: { type, value },
  });

export async function sendRequest(
  { method, endpoint, headers, body }: RestFormData,
  userId: Id<'users'>,
  onError: OnErrorCallback,
) {
  const response = await proxySendRequest({ method, endpoint, headers, body });

  await saveHistoryItem(response, userId, body);

  const data = {
    ...response,
    responseBody: formatJson(response.responseBody, (e) => onError(e)),
  };

  return data;
}

export async function getUserHistory(): Promise<GetUserHistory> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('__convexAuthJWT')?.value;

    if (!token) {
      return { data: [], user: null };
    }

    const data = await fetchQuery(api.history.getUserHistory, {}, { token });
    const user = await fetchQuery(api.users.currentUser, {}, { token });

    return { data, user };
  } catch {
    return { data: [], user: null };
  }
}
