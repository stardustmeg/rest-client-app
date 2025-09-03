'use client';

import { ChakraProvider, ClientOnly, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from '@/app/components/ui/ColorMode';
import type { ColorModeProviderProps } from '@/app/types/color-theme';

export const AppChakraProvider = (props: ColorModeProviderProps) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ClientOnly>
        <ColorModeProvider {...props} />
      </ClientOnly>
    </ChakraProvider>
  );
};
