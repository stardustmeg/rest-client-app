import { routes } from '@/app/[locale]/routes';
import {
  DisplayContext,
  type DisplayContextType,
  DisplayPolicy,
  type DisplayPolicyType,
  type NavigationMessage,
} from '@/app/domains/auth/types/nav-config';

export interface NavButtonConfig {
  title: NavigationMessage;
  route?: string;
  policy: DisplayPolicyType;
  isAction?: boolean;
  group?: 'navigation' | 'actions';
  contexts: DisplayContextType[];
}

export const navButtonsConfig: NavButtonConfig[] = [
  {
    title: routes.main.translationKey,
    route: routes.main.path,
    policy: DisplayPolicy.public,
    group: 'navigation',
    contexts: [DisplayContext.header, DisplayContext.burgerMenu],
  },
  {
    title: routes.signIn.translationKey,
    route: routes.signIn.path,
    policy: DisplayPolicy.unauthenticated,
    group: 'navigation',
    contexts: [DisplayContext.mainPage, DisplayContext.header, DisplayContext.burgerMenu],
  },
  {
    title: routes.signUp.translationKey,
    route: routes.signUp.path,
    policy: DisplayPolicy.unauthenticated,
    group: 'navigation',
    contexts: [DisplayContext.mainPage, DisplayContext.header, DisplayContext.burgerMenu],
  },
  {
    title: routes.restClient.translationKey,
    route: routes.restClient.path,
    policy: DisplayPolicy.authenticated,
    group: 'navigation',
    contexts: [DisplayContext.mainPage, DisplayContext.header, DisplayContext.burgerMenu],
  },
  {
    title: routes.historyAndAnalytics.translationKey,
    route: routes.historyAndAnalytics.path,
    policy: DisplayPolicy.authenticated,
    group: 'navigation',
    contexts: [DisplayContext.mainPage, DisplayContext.header, DisplayContext.burgerMenu],
  },
  {
    title: routes.variables.translationKey,
    route: routes.variables.path,
    policy: DisplayPolicy.authenticated,
    group: 'navigation',
    contexts: [DisplayContext.mainPage, DisplayContext.header, DisplayContext.burgerMenu],
  },
  {
    title: 'signOut',
    policy: DisplayPolicy.authenticated,
    isAction: true,
    group: 'actions',
    contexts: [DisplayContext.header, DisplayContext.burgerMenu],
  },
];
