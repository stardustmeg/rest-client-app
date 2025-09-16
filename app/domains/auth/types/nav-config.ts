import type { useTranslations } from 'next-intl';

export const DisplayPolicy = {
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
  public: 'public',
} as const;

export const DisplayContext = {
  mainPage: 'mainPage',
  header: 'header',
  burgerMenu: 'burgerMenu',
} as const;

export type DisplayContextType = (typeof DisplayContext)[keyof typeof DisplayContext];
export type DisplayPolicyType = (typeof DisplayPolicy)[keyof typeof DisplayPolicy];
export type NavigationMessage = Parameters<ReturnType<typeof useTranslations<'navigation'>>>[0];
