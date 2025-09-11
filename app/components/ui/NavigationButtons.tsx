'use client';

import { Button, Flex, Skeleton } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { withAuthGuard } from '@/app/components/hoc/WithAuthGuard';
import { useAuth } from '@/app/hooks/use-auth';
import { authButtons, navigationButtons } from '@/data/navLinksInfo';
import { Link } from '@/i18n/routing';

const AuthButtons = () => {
  const t = useTranslations('navigation');
  return authButtons.map((route) => (
    <Link key={route.route} href={route.route} passHref>
      <Button size="sm" px="8" fontWeight="semibold" transition="all 0.2s">
        {t(route.title)}
      </Button>
    </Link>
  ));
};

const UserNavigation = () => {
  const t = useTranslations('navigation');
  return navigationButtons.map((route) => (
    <Link key={route.route} href={route.route} passHref>
      <Button size="sm" px="8" fontWeight="semibold" transition="all 0.2s">
        {t(route.title)}
      </Button>
    </Link>
  ));
};

const GuardedNavigation = withAuthGuard({
  authenticated: UserNavigation,
  unauthenticated: AuthButtons,
});

export const NavigationButtons = () => {
  const { isLoading } = useAuth();

  return (
    <Skeleton loading={isLoading} minH="64px" h="auto" w="full" maxW="600px" maxH="164px">
      <Flex gap="4" justifyContent="center" flexDir={{ base: 'column', md: 'row' }}>
        <GuardedNavigation />
      </Flex>
    </Skeleton>
  );
};
