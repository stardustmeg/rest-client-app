'use client';
import { useTheme } from 'next-themes';
import { useColorScheme } from '@/app/hooks/use-color-scheme';
import type { ColorMode } from '@/app/types/color-theme';

interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}
export function useColorMode(): UseColorModeReturn {
  const { setTheme } = useTheme();
  const { colorScheme, colorMode } = useColorScheme();

  const toggleColorMode = (): void => {
    const newMode: ColorMode = colorMode === 'dark' ? 'light' : 'dark';
    setTheme(`${colorScheme}-${newMode}`);
  };

  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}
