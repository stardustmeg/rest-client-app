import type { NamespaceKeys } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import type messages from '@/app/messages/en.json';

export const routing = defineRouting({
  locales: ['en', 'ru', 'jp'],
  defaultLocale: 'en',
});

export type MessagesType = typeof messages;
export type MessagesKeysType = NamespaceKeys<MessagesType, keyof MessagesType>;

export type RoutingLocales = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
