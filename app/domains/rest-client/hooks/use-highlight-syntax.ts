import { useAtomValue } from 'jotai';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { highlightSyntax } from '@/app/server-actions/server-actions';
import { codeGenLanguageAtom } from '../atoms';

export function useHighlightSyntax(code: string): string {
  const { resolvedTheme } = useTheme();
  const language = useAtomValue(codeGenLanguageAtom);

  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    highlightSyntax(code, language, resolvedTheme ?? '').then(setHighlightedCode);
  }, [code, language, resolvedTheme]);

  return highlightedCode;
}
