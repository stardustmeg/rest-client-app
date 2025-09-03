'use client';

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { useColorScheme } from '@/app/hooks/use-color-scheme';
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
  const { colorScheme, setColorScheme } = useColorScheme();

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
                color: colorScheme === scheme.value ? 'var(--foreground)' : 'var(--background)',
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
