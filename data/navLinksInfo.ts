import { routes } from '@/app/[locale]/routes';

export const authButtons = [
  { title: routes.signIn.translationKey, route: routes.signIn.path },
  { title: routes.signUp.translationKey, route: routes.signUp.path },
] as const;

export const navigationButtons = [
  { title: routes.restClient.translationKey, route: routes.restClient.path },
  { title: routes.historyAndAnalytics.translationKey, route: routes.historyAndAnalytics.path },
  { title: routes.variables.translationKey, route: routes.variables.path },
] as const;
