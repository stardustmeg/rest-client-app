import { ThemeProvider } from 'next-themes';
import type { ColorModeProviderProps } from '@/app/types/color-theme';

export const ColorModeProvider = (props: ColorModeProviderProps) => {
  return <ThemeProvider attribute="data-theme" disableTransitionOnChange {...props} />;
};
