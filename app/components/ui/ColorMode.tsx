'use client';

import type { IconButtonProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider, useTheme } from 'next-themes';
import { forwardRef } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

export interface ColorModeProviderProps extends ThemeProviderProps {}

export type ColorMode = 'light' | 'dark';
export type ColorScheme = 'pink' | 'green' | 'purple' | 'cyan';
export type ThemeMode = `${ColorScheme}-${ColorMode}`;

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export interface UseColorSchemeReturn {
  colorScheme: ColorScheme;
  colorMode: ColorMode;
  setColorScheme: (colorScheme: ColorScheme) => void;
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

interface ColorSchemeItem {
  value: ColorScheme;
  icon: string;
}

export const ColorModeProvider = (props: ColorModeProviderProps) => {
  return <ThemeProvider attribute="data-theme" disableTransitionOnChange {...props} />;
};

export function useColorMode(): UseColorModeReturn {
  const { setTheme } = useTheme();
  const { colorScheme, colorMode } = useColorScheme();

  const toggleColorMode = (): void => {
    const newMode = colorMode === 'dark' ? 'light' : 'dark';
    setTheme(`${colorScheme}-${newMode}`);
  };

  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorScheme(): UseColorSchemeReturn {
  const { resolvedTheme, setTheme } = useTheme();

  const parseThemeMode = (theme: string): { colorScheme: ColorScheme; colorMode: ColorMode } => {
    const parts = theme.split('-');
    if (parts.length === 2) {
      const [scheme, mode] = parts as [ColorScheme, ColorMode];
      return { colorScheme: scheme, colorMode: mode };
    }
    return { colorScheme: 'purple', colorMode: 'light' };
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

export const ColorModeButton = forwardRef<HTMLButtonElement, ColorModeButtonProps>((props, ref) => {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{ _icon: { width: '5', height: '5' } }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const ColorModeIcon = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
};

const colorSchemes: ColorSchemeItem[] = [
  { value: 'purple', icon: '🟣' },
  { value: 'cyan', icon: '🔵' },
  { value: 'green', icon: '🟢' },
  { value: 'pink', icon: '🩷' },
];

export const ColorSchemeSelector = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <div className="flex items-center gap-2">
      {colorSchemes.map((scheme) => (
        <button
          key={scheme.value}
          type="button"
          onClick={() => setColorScheme(scheme.value)}
          style={{
            padding: '4px 8px',
            border: '1px solid',
            borderRadius: '4px',
            color: colorScheme === scheme.value ? 'var(--foreground)' : 'var(--background)',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {scheme.icon}
        </button>
      ))}
    </div>
  );
};

export function useThemeColorPalette() {
  const { colorScheme } = useColorScheme();
  return colorScheme ?? 'purple';
}
