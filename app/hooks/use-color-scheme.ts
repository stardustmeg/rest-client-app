'use client';

import { useTheme } from 'next-themes';
import { DEFAULT_COLOR_MODE, DEFAULT_COLOR_SCHEME } from '@/app/constants/color-theme';
import type { ColorMode, ColorScheme, ThemeMode } from '@/app/types/color-theme';

interface UseColorSchemeReturn {
  colorScheme: ColorScheme;
  colorMode: ColorMode;
  setColorScheme: (colorScheme: ColorScheme) => void;
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}

export function useColorScheme(): UseColorSchemeReturn {
  const { resolvedTheme, setTheme } = useTheme();

  const parseThemeMode = (theme: string): { colorScheme: ColorScheme; colorMode: ColorMode } => {
    const parts = theme.split('-');
    if (parts.length === 2) {
      const [scheme, mode] = parts as [ColorScheme, ColorMode];
      return { colorScheme: scheme, colorMode: mode };
    }
    return { colorScheme: DEFAULT_COLOR_SCHEME, colorMode: DEFAULT_COLOR_MODE };
  };

  const { colorScheme, colorMode } = parseThemeMode(resolvedTheme ?? 'purple-light');
  const themeMode: ThemeMode = `${colorScheme}-${colorMode}`;

  const setColorScheme = (newScheme: ColorScheme): void => {
    setTheme(`${newScheme}-${colorMode}`);
  };

  const setThemeMode = (newThemeMode: ThemeMode): void => {
    setTheme(newThemeMode);
  };

  return {
    colorScheme,
    colorMode,
    setColorScheme,
    themeMode,
    setThemeMode,
  };
}
