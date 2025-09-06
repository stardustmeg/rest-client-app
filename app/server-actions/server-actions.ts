'use server';

import pcg from 'postman-code-generators';
import sdk from 'postman-collection';
import { type BundledLanguage, codeToHtml } from 'shiki';
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
    body: new sdk.RequestBody({ mode: 'raw', raw: body }),
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

export async function highlightSyntax(code: string, language: string, currentTheme: string) {
  const lang: BundledLanguage =
    language === 'nodejs' ? 'javascript' : (language as BundledLanguage);

  const theme = currentTheme === 'dark' ? 'github-dark' : 'github-light';

  return await codeToHtml(code, { lang, theme });
}
