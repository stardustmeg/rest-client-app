'use client';

import { DEFAULT_COLOR_SCHEME } from '@/app/constants/color-theme';
import { useColorScheme } from '@/app/hooks/use-color-scheme';

export function useColorPalette() {
  const { colorScheme } = useColorScheme();

  return colorScheme ?? DEFAULT_COLOR_SCHEME;
}
