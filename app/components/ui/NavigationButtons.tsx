'use client';
import { Button, Flex, Skeleton } from '@chakra-ui/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { useTranslations } from 'next-intl';
import { routes } from '@/app/[locale]/routes';
import { useAuth } from '@/app/hooks/use-auth';
import { Link } from '@/i18n/routing';

const authButtons = [
  { title: routes.signIn.translationKey, route: routes.signIn.path },
  { title: routes.signUp.translationKey, route: routes.signUp.path },
] as const;

const navigationButtons = [
  { title: routes.restClient.translationKey, route: routes.restClient.path },
  { title: routes.historyAndAnalytics.translationKey, route: routes.historyAndAnalytics.path },
  { title: routes.variables.translationKey, route: routes.variables.path },
] as const;

export type ButtonListType = 'authButtons' | 'navigationButtons';

export const NavigationButtons = () => {
  const t = useTranslations('navigation');
  const { isLoading } = useAuth();

  return (
    <Skeleton loading={isLoading} minH="64px" h="auto" w="full" maxW="600px" maxH="164px">
      <Flex gap="4" justifyContent="center" flexDir={{ base: 'column', md: 'row' }}>
        <Unauthenticated>
          {authButtons.map((route) => (
            <Link key={route.route} href={route.route} passHref>
              <Button
                size="lg"
                px="8"
                borderRadius="xl"
                fontWeight="semibold"
                shadow="md"
                transition="all 0.2s"
              >
                {t(route.title)}
              </Button>
            </Link>
          ))}
        </Unauthenticated>

        <Authenticated>
          {navigationButtons.map((route) => (
            <Link key={route.route} href={route.route} passHref>
              <Button
                size="lg"
                px="8"
                borderRadius="xl"
                fontWeight="semibold"
                shadow="md"
                transition="all 0.2s"
              >
                {t(route.title)}
              </Button>
            </Link>
          ))}
        </Authenticated>
      </Flex>
    </Skeleton>
  );
};
