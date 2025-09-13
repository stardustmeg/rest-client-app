import { useSetAtom } from 'jotai';
import type { CodeGenLanguage } from 'postman-code-generators';
import { useCallback, useEffect, useState } from 'react';
import type { SelectOption } from '@/app/components/ui/Select';
import { getLanguageList } from '@/app/server-actions/server-actions';
import { codeGenLanguageAtom, codeGenVariantAtom, formDataStore } from '../atoms';

interface UseCodeGenSelectionReturn {
  languages: SelectOption[];
  variants: SelectOption[];
  setLanguage: (value: string) => void;
  setVariant: (value: string) => void;
}

export function useCodeGenSelection(): UseCodeGenSelectionReturn {
  const setLanguageAtom = useSetAtom(codeGenLanguageAtom, { store: formDataStore });
  const setVariantAtom = useSetAtom(codeGenVariantAtom, { store: formDataStore });

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
      setLanguageAtom(key);
      setVariantAtom(selectedLang.variants[0].key);
    },
    [languageList, setVariantAtom, setLanguageAtom],
  );

  useEffect(() => {
    getLanguageList().then((list) => {
      setLanguageList(list);
      setLanguages(getLanguageOptions(list));
      const initialLang = list[0];

      setVariants(getVariantOptions(initialLang));
      setLanguageAtom(initialLang.key);
      setVariantAtom(initialLang.variants[0].key);
    });
  }, [setLanguageAtom, setVariantAtom]);

  return {
    languages,
    variants,
    setVariant: setVariantAtom,
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
