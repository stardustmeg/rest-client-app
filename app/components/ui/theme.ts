import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const createAppTheme = (scheme: string) => {
  const config = defineConfig({
    globalCss: {
      html: {
        colorPalette: scheme,
      },
    },
    theme: {
      tokens: {
        fonts: {
          heading: { value: `'Noto Sans JP', var(--font-geist-sans), sans-serif` },
          body: { value: `'Noto Sans JP', var(--font-geist-sans), sans-serif` },
        },
      },
    },
  });

  return createSystem(defaultConfig, config);
};
