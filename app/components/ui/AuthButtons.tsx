import { Button, Flex } from '@chakra-ui/react';
import { routes } from '@/app/[locale]/routes';
import { Link } from '@/i18n/routing';

interface AuthButtonsProps {
  signInLabel: string;
  signUpLabel: string;
  color?: string;
}

export const AuthButtons = ({ signInLabel, signUpLabel, color }: AuthButtonsProps) => (
  <Flex gap="4" flexDir={{ base: 'column', sm: 'row' }}>
    <Link href={routes.signIn.path} passHref>
      <Button
        size="lg"
        px="8"
        borderRadius="xl"
        fontWeight="semibold"
        shadow="md"
        transition="all 0.2s"
        colorPalette={color}
      >
        {signInLabel}
      </Button>
    </Link>

    <Link href={routes.signIn.path} passHref>
      <Button
        size="lg"
        px="8"
        borderRadius="xl"
        fontWeight="semibold"
        shadow="md"
        transition="all 0.2s"
        colorPalette={color}
      >
        {signUpLabel}
      </Button>
    </Link>
  </Flex>
);
