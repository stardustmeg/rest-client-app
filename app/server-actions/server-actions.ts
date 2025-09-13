'use server';

import { fetchQuery } from 'convex/nextjs';
import { cookies } from 'next/headers';
import pcg from 'postman-code-generators';
import sdk from 'postman-collection';
import type { RestFormData } from '@/app/domains/rest-client/components/RestForm';
import { api } from '@/convex/_generated/api';
import type { HistoryData, User } from '@/convex/types';
import { proxySendRequest } from './helpers';
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
  const response = await proxySendRequest({ method, endpoint, headers, body });

  return response;
}

interface GetUserHistory {
  data: HistoryData;
  user: User | null;
}

export async function getUserHistory(): Promise<GetUserHistory> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('__convexAuthJWT')?.value;

    if (!authToken) {
      return { data: [], user: null };
    }

    const data = await fetchQuery(api.history.getUserHistory, {}, { token: authToken });
    const user = await fetchQuery(api.users.currentUser, {}, { token: authToken });

    return { data, user };
  } catch {
    return { data: [], user: null };
  }
}
