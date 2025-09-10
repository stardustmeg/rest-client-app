import { Button, HStack, VStack } from '@chakra-ui/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { useTranslations } from 'next-intl';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import { authButtons } from '@/data/navLinksInfo';
import { Link } from '@/i18n/routing';

interface AuthButtonsProps {
  variant?: 'compact' | 'full';
  onAction?: VoidFunction;
}

export const AuthButtons = ({ variant = 'compact', onAction }: AuthButtonsProps) => {
  const t = useTranslations('navigation');
  const tNotification = useTranslations('notifications');
  const { signOut } = useAuthActions();
  const { success } = useToast();

  const handleSignOut = () => {
    signOut().finally(() => {
      success(tNotification('signOutSuccess'));
      if (onAction) {
        onAction();
      }
    });
  };

  const Wrapper = variant === 'full' ? VStack : HStack;

  return (
    <Wrapper gap="2" w={variant === 'full' ? 'full' : 'auto'}>
      <Unauthenticated>
        <Wrapper gap="2" w={variant === 'full' ? 'full' : 'auto'}>
          {authButtons.map((route) => (
            <Button
              key={route.route}
              asChild
              size="sm"
              variant="outline"
              w={variant === 'full' ? 'full' : undefined}
              onClick={onAction}
            >
              <Link data-testid={route.title} href={route.route}>
                {t(route.title)}
              </Link>
            </Button>
          ))}
        </Wrapper>
      </Unauthenticated>

      <Authenticated>
        <Button
          onClick={handleSignOut}
          size="sm"
          variant="outline"
          w={variant === 'full' ? 'full' : undefined}
        >
          {t('signOut')}
        </Button>
      </Authenticated>
    </Wrapper>
  );
};
