import { HStack } from '@chakra-ui/react';
import { routes } from '@/app/[locale]/routes';
import { NavigationLink } from '@/app/components/ui/NavigationLink';

export const Navigation = () => {
  const mainRoutes = Object.values(routes).filter(
    (route) => !['notFound'].includes(route.translationKey),
  );

  return (
    <nav>
      <HStack gap={6} align="center" wrap="wrap">
        {mainRoutes.map((route) => (
          <NavigationLink key={route.path} route={route} />
        ))}
      </HStack>
    </nav>
  );
};
