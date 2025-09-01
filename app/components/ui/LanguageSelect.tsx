'use client';

import {
  createListCollection,
  HStack,
  IconButton,
  Portal,
  Select,
  useSelectContext,
} from '@chakra-ui/react';
import { useLocale, useTranslations } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { FlagIcon } from './FlagIcon';

const SelectTrigger = () => {
  const { selectedItems, getTriggerProps } = useSelectContext();

  return (
    <IconButton px="2" variant="outline" size="sm" {...getTriggerProps()}>
      {selectedItems[0].icon}
    </IconButton>
  );
};

const languageItems = () => {
  const t = useTranslations();
  return createListCollection({
    items: routing.locales.map((locale) => ({
      label: t(`language.${locale}`),
      value: locale,
      icon: <FlagIcon country={locale} />,
    })),
  });
};

export const LanguageSelect = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const languages = languageItems();

  const handleLanguageChange = ({ value }: { value: string[] }) => {
    const newLocale = value[0] as (typeof routing.locales)[number];
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={languages}
      size="sm"
      width="320px"
      defaultValue={[locale]}
      onValueChange={handleLanguageChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {languages.items.map(({ value, icon, label, ...language }) => (
              <Select.Item item={{ value, icon, label, ...language }} key={value}>
                <HStack>
                  {icon}
                  {label}
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
