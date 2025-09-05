import { useSetAtom } from 'jotai';
import type { CodeGenLanguage } from 'postman-code-generators';
import { useCallback, useEffect, useState } from 'react';
import type { SelectOption } from '@/app/components/ui/Select';
import { getLanguageList } from '@/app/server-actions/server-actions';
import { codeGenLanguageAtom, codeGenVariantAtom } from '../atoms';

interface UseCodeGenerationReturn {
  languages: SelectOption[];
  variants: SelectOption[];
  setLanguage: (value: string) => void;
  setVariant: (value: string) => void;
}

export function useCodeGeneration(): UseCodeGenerationReturn {
  const setLanguageAtom = useSetAtom(codeGenLanguageAtom);
  const setVariantAtom = useSetAtom(codeGenVariantAtom);

  const [languageList, setLanguageList] = useState<CodeGenLanguage[]>([]);
  const [languages, setLanguages] = useState<SelectOption[]>([]);
  const [variants, setVariants] = useState<SelectOption[]>([]);

  const setLanguage = useCallback(
    (value: string) => {
      const selectedLang = languageList.find((lang) => lang.key === value);
      setVariants(getVariantOptions(selectedLang));
      setLanguageAtom(value);
      setVariantAtom(selectedLang?.variants[0].key ?? '');
    },
    [languageList, setVariantAtom, setLanguageAtom],
  );

  const setVariant = useCallback(
    (value: string) => {
      setVariantAtom(value);
    },
    [setVariantAtom],
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

  return { languages, variants, setVariant, setLanguage } as const;
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
