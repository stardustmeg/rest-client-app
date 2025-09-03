import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const createAppTheme = (scheme: string) => {
  const config = defineConfig({
    globalCss: {
      html: {
        colorPalette: scheme,
      },
    },
  });

  return createSystem(defaultConfig, config);
};
