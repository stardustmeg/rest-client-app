'use client';

import type { CodegenLanguage, CodegenVariant } from 'postman-code-generators';
import { useEffect, useState } from 'react';
import { Select } from '@/app/components/ui/Select';
import { getLanguageList } from '@/app/server-actions/server-actions';

export const CodeGeneration = () => {
  const [languages, setLanguages] = useState<CodegenLanguage[]>([]);
  const [variants, setVariants] = useState<CodegenVariant[]>([]);
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string | null>(null);

  useEffect(() => {
    getLanguageList().then((list) => {
      setLanguages(list);
    });
  }, []);

  useEffect(() => {
    if (languages.length > 0) {
      setVariants(languages[0].variants);
    }
  }, [languages]);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguageKey(value);
    const selectedLang = languages.find((lang) => lang.key === value);
    setVariants(selectedLang?.variants || []);
  };

  return (
    <div>
      <Select
        options={languages.map((lang) => ({ label: lang.label, value: lang.key }))}
        name="language"
        onValueChange={handleLanguageChange}
      />
      <Select
        options={variants.map((variant) => ({ label: variant.key, value: variant.key }))}
        name="variant"
      />
      <button type="button">Generate {selectedLanguageKey}</button>
    </div>
  );
};
