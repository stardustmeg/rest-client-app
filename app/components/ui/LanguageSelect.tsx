'use client';

import {
  createListCollection,
  HStack,
  IconButton,
  Portal,
  Select,
  useSelectContext,
} from '@chakra-ui/react';
import { useLocale } from 'next-intl';
import { FlagIcon } from '@/app/components/ui/FlagIcon';
import { type RoutingLocales, routing, usePathname, useRouter } from '@/i18n/routing';

const SelectTrigger = () => {
  const { selectedItems, getTriggerProps } = useSelectContext();

  return (
    <IconButton px="2" variant="outline" size="sm" {...getTriggerProps()}>
      {selectedItems[0].icon}
    </IconButton>
  );
};

const getLanguageLabel = (locale: RoutingLocales) => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'ru':
      return 'Русский';
    case 'jp':
      return '日本語';
    default:
      return '';
  }
};

const languageItems = () => {
  return createListCollection({
    items: routing.locales.map((locale) => ({
      label: getLanguageLabel(locale),
      value: locale,
      icon: <FlagIcon country={locale} />,
    })),
  });
};

interface LanguageSelectProps {
  disablePortal?: boolean;
}

export const LanguageSelect = ({ disablePortal = false }: LanguageSelectProps) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const languages = languageItems();

  const handleLanguageChange = ({ value }: { value: string[] }) => {
    const newLocale = value[0] as RoutingLocales;
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={languages}
      size="sm"
      defaultValue={[locale]}
      onValueChange={handleLanguageChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      {disablePortal ? (
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
      ) : (
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
      )}
    </Select.Root>
  );
};
