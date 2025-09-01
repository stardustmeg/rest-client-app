'use client';

import {
  createListCollection,
  HStack,
  IconButton,
  Portal,
  Select,
  useSelectContext,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { FlagIcon } from './FlagIcon';

const SelectTrigger = () => {
  const { selectedItems, getTriggerProps } = useSelectContext();

  return (
    <IconButton px="2" variant="outline" size="sm" {...getTriggerProps()}>
      {selectedItems[0].icon}
    </IconButton>
  );
};

export const LanguageSelect = () => {
  const t = useTranslations();
  const options = languages(t);

  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={options}
      size="sm"
      width="320px"
      defaultValue={[routing.defaultLocale]}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {options.items.map(({ value, icon, label, ...item }) => (
              <Select.Item item={{ value, icon, label, ...item }} key={value}>
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

const languages = (t: ReturnType<typeof useTranslations>) =>
  createListCollection({
    items: routing.locales.map((locale) => ({
      label: t(`language.${locale}`),
      value: locale,
      icon: <FlagIcon country={locale} />,
    })),
  });
