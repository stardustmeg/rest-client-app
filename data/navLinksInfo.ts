import { routes } from '@/app/[locale]/routes';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';

export const toMain = {
  id: 'mainToMain',
  title: routes.main.translationKey,
  route: routes.main.path,
  policy: 'authenticated',
} satisfies NavConfigItem;

export const toSignIn = {
  id: 'signIn',
  title: routes.signIn.translationKey,
  route: routes.signIn.path,
  policy: 'unauthenticated',
} satisfies NavConfigItem;

export const toSignUp = {
  id: 'signUp',
  title: routes.signUp.translationKey,
  route: routes.signUp.path,
  policy: 'unauthenticated',
} satisfies NavConfigItem;

export const toRestClient = {
  id: 'restClient',
  title: routes.restClient.translationKey,
  route: routes.restClient.path,
  policy: 'authenticated',
} satisfies NavConfigItem;

export const toHistoryAndAnalytics = {
  id: 'historyAndAnalytics',
  title: routes.historyAndAnalytics.translationKey,
  route: routes.historyAndAnalytics.path,
  policy: 'authenticated',
} satisfies NavConfigItem;

export const toVariables = {
  id: 'variables',
  title: routes.variables.translationKey,
  route: routes.variables.path,
  policy: 'authenticated',
} satisfies NavConfigItem;

export const doSignOut = {
  id: 'signOut',
  title: 'signOut',
  policy: 'authenticated',
  action: 'signOut',
} satisfies NavConfigItem;
