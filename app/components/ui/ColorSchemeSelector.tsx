'use client';

import { ClientOnly, IconButton, Skeleton, useChakraContext } from '@chakra-ui/react';
import type { ColorScheme } from '@/app/types/color-theme';

interface ColorSchemeItem {
  value: ColorScheme;
  icon: string;
}

const colorSchemes: ColorSchemeItem[] = [
  { value: 'purple', icon: '🟣' },
  { value: 'cyan', icon: '🔵' },
  { value: 'green', icon: '🟢' },
  { value: 'pink', icon: '🩷' },
];

export const ColorSchemeSelector = () => {
  const { setColorScheme } = useChakraContext();

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <div className="flex h-fit items-center gap-2">
        {colorSchemes.map((scheme) => (
          <IconButton
            key={scheme.value}
            onClick={() => setColorScheme(scheme.value)}
            aria-label="Toggle color scheme"
            size="sm"
            variant="plain"
            css={{
              _icon: {
                width: '5',
                height: '5',
              },
            }}
          >
            {scheme.icon}
          </IconButton>
        ))}
      </div>
    </ClientOnly>
  );
};
