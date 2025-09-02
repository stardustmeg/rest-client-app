import type messages from '@/app/messages/en.json';

export interface RouteConfig {
  path: string;
  translationKey: keyof (typeof messages)['navigation'];
}

export const routes: Record<string, RouteConfig> = {
  main: {
    path: '/',
    translationKey: 'main',
  },
  notFound: {
    path: '/404',
    translationKey: 'notFound',
  },
} as const;

export type RouteKey = keyof typeof routes;
