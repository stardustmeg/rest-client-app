import { Button, Flex } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { routes } from '@/app/[locale]/routes';
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

export const NavigationButtons = async ({ type }: { type: ButtonListType }) => {
  const t = await getTranslations('navigation');
  const routesList = type === 'authButtons' ? authButtons : navigationButtons;

  return (
    <Flex gap="4" flexDir={{ base: 'column', sm: 'row' }}>
      {routesList.map((route) => (
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
    </Flex>
  );
};
