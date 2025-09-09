import { HStack, VStack } from '@chakra-ui/react';
import { routes } from '@/app/[locale]/routes';
import { NavigationLink } from '@/app/components/ui/NavigationLink';

interface NavigationProps {
  direction?: 'horizontal' | 'vertical';
}

export const Navigation = ({ direction = 'horizontal' }: NavigationProps) => {
  const mainRoutes = Object.values(routes).filter(
    (route) => !['notFound', 'signIn', 'signUp'].includes(route.translationKey),
  );

  const NavigationContainer = direction === 'vertical' ? VStack : HStack;

  return (
    <nav>
      <NavigationContainer {...{ gap: 4 }}>
        {mainRoutes.map((route) => (
          <NavigationLink key={route.path} route={route} direction={direction} />
        ))}
      </NavigationContainer>
    </nav>
  );
};
