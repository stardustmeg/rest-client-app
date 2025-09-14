import type { CodeGenLanguage } from 'postman-code-generators';
import { useCallback, useEffect, useState } from 'react';
import type { SelectOption } from '@/app/components/ui/Select';
import { getLanguageList } from '@/app/server-actions/server-actions';

// interface UseCodeGenSelectionReturn {
//   languages: SelectOption[];
//   variants: SelectOption[];
//   loadingList: boolean;
//   setLanguage: (value: string) => void;
//   setVariant: (value: string) => void;
// }

export function useCodeGenSelection() {
  const [loadingList, setLoadingList] = useState(false);

  const [lang, setLang] = useState('csharp');
  const [variant, setVariant] = useState('HttpClient');

  const [languageList, setLanguageList] = useState<CodeGenLanguage[]>([]);
  const [languages, setLanguages] = useState<SelectOption[]>([]);
  const [variants, setVariants] = useState<SelectOption[]>([]);

  const setLanguage = useCallback(
    (key: string) => {
      const selectedLang = findLanguageByKey(languageList, key);

      if (!selectedLang) {
        return;
      }

      setVariants(getVariantOptions(selectedLang));

      setLang(key);
      setVariant(selectedLang.variants[0].key);
    },
    [languageList],
  );

  useEffect(() => {
    setLoadingList(true);

    getLanguageList()
      .then((list) => {
        setLanguageList(list);
        setLanguages(getLanguageOptions(list));
        const initialLang = list[0];

        setVariants(getVariantOptions(initialLang));

        setLang(initialLang.key);
        setVariant(initialLang.variants[0].key);
      })
      .finally(() => setLoadingList(false));
  }, []);

  return {
    languages,
    variants,
    lang,
    variant,
    loadingList,
    setVariant,
    setLanguage,
  } as const;
}

export function getLanguageOptions(languageList: CodeGenLanguage[]): SelectOption[] {
  return languageList.map((lang) => ({ value: lang.key, label: lang.label }));
}

export function getVariantOptions(language?: CodeGenLanguage): SelectOption[] {
  if (!language?.variants) {
    return [];
  }

  return language.variants.map((variant) => ({
    value: variant.key,
    label: variant.key,
  }));
}

export function findLanguageByKey(
  languages: CodeGenLanguage[],
  key: string,
): CodeGenLanguage | undefined {
  return languages.find((lang) => lang.key === key);
}
