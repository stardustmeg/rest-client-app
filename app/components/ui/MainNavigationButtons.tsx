'use client';

import { Flex, Skeleton } from '@chakra-ui/react';
import { Suka } from '@/app/components/ui/suka';
import { DisplayContext } from '@/app/domains/auth/types/nav-config';
import { useAuth } from '@/app/hooks/use-auth';

export const MainNavigationButtons = () => {
  const { isLoading } = useAuth();

  return (
    <Skeleton loading={isLoading} minH="64px" h="auto" w="full" maxW="600px" maxH="164px">
      <Flex gap="4" justifyContent="center" flexDir={{ base: 'column', sm: 'row' }}>
        <Suka context={DisplayContext.mainPage} />
      </Flex>
    </Skeleton>
  );
};
