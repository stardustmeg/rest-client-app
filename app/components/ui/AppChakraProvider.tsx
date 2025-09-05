'use client';

import { ChakraProvider, ClientOnly } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { ColorModeProvider } from '@/app/components/ui/ColorMode';
import type { ColorModeProviderProps, ColorScheme } from '@/app/types/color-theme';
import { createAppTheme } from './theme';

export const AppChakraProvider = (props: ColorModeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('purple');

  const system = useMemo(
    () => Object.assign(createAppTheme(colorScheme), { setColorScheme }),
    [colorScheme],
  );

  return (
    <ChakraProvider value={system}>
      <ClientOnly>
        <ColorModeProvider {...props} />
      </ClientOnly>
    </ChakraProvider>
  );
};
