import type { useTranslations } from 'next-intl';

export type NavItemDisplayPolicy = 'public' | 'unauthenticated' | 'authenticated';

export type NavItemAction = 'signOut' | (string & {});

export type NavItemTitle = Parameters<ReturnType<typeof useTranslations<'navigation'>>>[0];

export type NavConfigItem = {
  id: string;
  title: NavItemTitle;
  policy: NavItemDisplayPolicy;
} & (
  | {
      route: string;
      action?: never;
    }
  | {
      route?: never;
      action: NavItemAction;
    }
);
