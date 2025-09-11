'use client';

import { Button, type ButtonProps, Flex, Skeleton } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { withAuthGuard } from '@/app/components/hoc/WithAuthGuard';
import { useAuth } from '@/app/hooks/use-auth';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import { authButtons, navigationButtons } from '@/data/navLinksInfo';
import { Link } from '@/i18n/routing';

export interface AuthButtonsProps {
  onAction?: VoidFunction;
  variant?: ButtonProps['variant'];
}

const GuestButtons = ({ onAction, variant }: AuthButtonsProps) => {
  const t = useTranslations('navigation');
  return authButtons.map(({ route, title }) => (
    <Button key={route} variant={variant} asChild size="sm" onClick={onAction}>
      <Link data-testid={title} href={route}>
        {t(title)}
      </Link>
    </Button>
  ));
};

const UserNavigation = () => {
  const t = useTranslations('navigation');
  return navigationButtons.map(({ title, route }) => (
    <Button key={route} asChild size="sm">
      <Link data-testid={title} href={route}>
        {t(title)}
      </Link>
    </Button>
  ));
};

const UserButtons = ({ onAction, variant }: AuthButtonsProps) => {
  const t = useTranslations('navigation');
  const tNotification = useTranslations('notifications');
  const { signOut } = useAuthActions();
  const { success } = useToast();

  const handleSignOut = () => {
    signOut().finally(() => {
      success(tNotification('signOutSuccess'));
      onAction?.();
    });
  };

  return (
    <Button variant={variant} onClick={handleSignOut} size="sm">
      {t('signOut')}
    </Button>
  );
};

const GuardedNavigation = withAuthGuard({
  authenticated: UserNavigation,
  unauthenticated: GuestButtons,
});

export const NavigationButtons = () => {
  const { isLoading } = useAuth();

  return (
    <Skeleton loading={isLoading} minH="64px" h="auto" w="full" maxW="600px" maxH="164px">
      <Flex gap="4" justifyContent="center" flexDir={{ base: 'column', sm: 'row' }}>
        <GuardedNavigation />
      </Flex>
    </Skeleton>
  );
};

export const AuthButtons = withAuthGuard<AuthButtonsProps>({
  authenticated: UserButtons,
  unauthenticated: GuestButtons,
});
