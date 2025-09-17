'use client';

import { CodeGenLanguageContext } from '../contexts/code-gen-language-context';
import type { CodeGenLanguage } from '../hooks/types/index';

interface CodeGenLanguageProviderProps {
  children: React.ReactNode;
  languageList: CodeGenLanguage[];
}

export const CodeGenLanguageProvider = ({
  children,
  languageList,
}: CodeGenLanguageProviderProps) => {
  return (
    <CodeGenLanguageContext.Provider value={languageList}>
      {children}
    </CodeGenLanguageContext.Provider>
  );
};
