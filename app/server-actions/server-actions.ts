'use server';

import pcg from 'postman-code-generators';
import sdk from 'postman-collection';
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
}: GenerateCodeSnippetParams) {
  const request = new sdk.Request({
    method,
    body: new sdk.RequestBody({ mode: 'raw', raw: body }),
    url,
    header: headers,
  });

  return await new Promise((resolve, reject) => {
    pcg.convert(language, variant, request, {}, (error, snippet) => {
      if (error) {
        reject(error);
      } else {
        resolve(snippet);
      }
    });
  });
}
