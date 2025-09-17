import { Flex } from '@chakra-ui/react';
import { NavButtons } from '@/app/domains/auth/ui/nav-items/NavButtons';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';
import {
  toHistoryAndAnalytics,
  toMain,
  toRestClient,
  toSignIn,
  toSignUp,
  toVariables,
} from '@/data/navLinksInfo';

const headerMenuItems: NavConfigItem[] = [
  toMain,
  toSignIn,
  toSignUp,
  toRestClient,
  toHistoryAndAnalytics,
  toVariables,
];

export const HeaderNavigationButtons = () => (
  <nav>
    <Flex gap="1" align="center" justify="start" direction="row" wrap="wrap">
      <NavButtons items={headerMenuItems} variant="ghost" size="sm" px="2" />
    </Flex>
  </nav>
);
