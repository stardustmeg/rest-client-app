import { useAtomValue } from 'jotai';
import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';
import { type BundledLanguage, createHighlighter } from 'shiki';

import { codeGenLanguageAtom } from '../atoms';

const highlighter = await createHighlighter({
  themes: ['github-dark', 'github-light'],
  langs: [
    'csharp',
    'dart',
    'go',
    'http',
    'java',
    'javascript',
    'kotlin',
    'c',
    'objective-c',
    'ocaml',
    'php',
    'powershell',
    'python',
    'r',
    'ruby',
    'rust',
    'shell',
    'swift',
  ],
});

function highlightSyntax(code: string, language: string, currentTheme: string): string {
  let lang: BundledLanguage;

  if (language === 'nodejs') {
    lang = 'javascript';
  } else if (language === 'curl') {
    lang = 'bash';
  } else {
    lang = language as BundledLanguage;
  }

  const theme = currentTheme === 'dark' ? 'github-dark' : 'github-light';

  return highlighter.codeToHtml(code, { lang, theme });
}

export function useHighlightSyntax(code: string): string {
  const { resolvedTheme } = useTheme();
  const language = useAtomValue(codeGenLanguageAtom);

  const [highlightedCode, setHighlightedCode] = useState('');

  useLayoutEffect(() => {
    setHighlightedCode(highlightSyntax(code, language, resolvedTheme ?? 'dark'));
  }, [code, language, resolvedTheme]);

  return highlightedCode;
}
