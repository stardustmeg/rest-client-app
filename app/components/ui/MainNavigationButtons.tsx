'use client';

import { Flex, Skeleton } from '@chakra-ui/react';
import { NavButtons } from '@/app/domains/auth/ui/nav-items/NavButtons';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';
import { useAuth } from '@/app/hooks/use-auth';
import {
  toHistoryAndAnalytics,
  toRestClient,
  toSignIn,
  toSignUp,
  toVariables,
} from '@/data/navLinksInfo';

const mainMenuItems: NavConfigItem[] = [
  toSignIn,
  toSignUp,
  toRestClient,
  toHistoryAndAnalytics,
  toVariables,
];

export const MainNavigationButtons = () => {
  const { isLoading } = useAuth();

  return (
    <Skeleton loading={isLoading} minH="64px" h="auto" w="full" maxW="600px" maxH="164px">
      <Flex gap="4" justifyContent="center" flexDir={{ base: 'column', sm: 'row' }}>
        <NavButtons items={mainMenuItems} />
      </Flex>
    </Skeleton>
  );
};
