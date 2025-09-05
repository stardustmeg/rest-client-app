import type { CodeGenLanguage } from 'postman-code-generators';
import { useCallback, useEffect, useState } from 'react';
import type { SelectOption } from '@/app/components/ui/Select';
import { getLanguageList } from '@/app/server-actions/server-actions';

interface UseCodeGenerationReturn {
  languages: SelectOption[];
  variants: SelectOption[];
  selectLanguage: (value: string) => void;
}

export function useCodeGeneration(): UseCodeGenerationReturn {
  const [languageList, setLanguageList] = useState<CodeGenLanguage[]>([]);
  const [languages, setLanguages] = useState<SelectOption[]>([]);
  const [variants, setVariants] = useState<SelectOption[]>([]);

  const selectLanguage = useCallback(
    (value: string) => {
      const selectedLang = languageList.find((lang) => lang.key === value);
      setVariants(getVariantOptions(selectedLang));
    },
    [languageList],
  );

  useEffect(() => {
    getLanguageList().then((list) => {
      setLanguageList(list);
      setLanguages(getLanguageOptions(list));
      setVariants(getVariantOptions(list[0]));
    });
  }, []);

  return { languages, variants, selectLanguage } as const;
}

function getLanguageOptions(languageList: CodeGenLanguage[]): SelectOption[] {
  return languageList.map((lang) => ({ value: lang.key, label: lang.label }));
}

function getVariantOptions(language?: CodeGenLanguage): SelectOption[] {
  if (!language?.variants) {
    return [];
  }

  return language.variants.map((variant) => ({ value: variant.key, label: variant.key }));
}
