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
  signIn: {
    path: '/sign-in',
    translationKey: 'signIn',
  },
  signUp: {
    path: '/sign-up',
    translationKey: 'signUp',
  },
  restClient: {
    path: '/rest-client',
    translationKey: 'restClient',
  },
  historyAndAnalytics: {
    path: '/history-and-analytics',
    translationKey: 'historyAndAnalytics',
  },
  variables: {
    path: '/variables',
    translationKey: 'variables',
  },
  notFound: {
    path: '/404',
    translationKey: 'notFound',
  },
} as const;

export type RouteKey = keyof typeof routes;
