'use client';

import { ChakraProvider, ClientOnly, defaultSystem } from '@chakra-ui/react';
import type { JSX } from 'react';
import { ColorModeProvider, type ColorModeProviderProps } from './ColorMode';

export function Provider(props: ColorModeProviderProps): JSX.Element {
  return (
    <ChakraProvider value={defaultSystem}>
      <ClientOnly>
        <ColorModeProvider {...props} />
      </ClientOnly>
    </ChakraProvider>
  );
}
