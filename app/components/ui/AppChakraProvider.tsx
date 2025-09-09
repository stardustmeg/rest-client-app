'use client';

import { ChakraProvider, ClientOnly } from '@chakra-ui/react';
import { useMemo } from 'react';
import { ColorModeProvider } from '@/app/components/ui/ColorMode';
import { createAppTheme } from '@/app/components/ui/theme';
import { useLocalStorage } from '@/app/hooks/use-local-storage';
import type { ColorModeProviderProps, ColorScheme } from '@/app/types/color-theme';

export const AppChakraProvider = (props: ColorModeProviderProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>('colorScheme', 'purple');

  const system = useMemo(
    () => Object.assign(createAppTheme(colorScheme), { setColorScheme }),
    [colorScheme, setColorScheme],
  );

  return (
    <ChakraProvider value={system}>
      <ClientOnly>
        <ColorModeProvider {...props} />
      </ClientOnly>
    </ChakraProvider>
  );
};
