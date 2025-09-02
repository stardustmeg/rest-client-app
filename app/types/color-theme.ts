import type { ThemeProviderProps } from 'next-themes';

export type ColorMode = 'light' | 'dark';
export type ColorScheme = 'pink' | 'green' | 'purple' | 'cyan';
export type ThemeMode = `${ColorScheme}-${ColorMode}`;

export interface ColorModeProviderProps extends ThemeProviderProps {}
