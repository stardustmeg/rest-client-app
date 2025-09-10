import { Button, HStack, VStack } from '@chakra-ui/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { useTranslations } from 'next-intl';
import { routes } from '@/app/[locale]/routes';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
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
          <Button
            asChild
            size="sm"
            variant="outline"
            w={variant === 'full' ? 'full' : undefined}
            onClick={onAction}
          >
            <Link href={routes.signIn.path}>{t('signIn')}</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            w={variant === 'full' ? 'full' : undefined}
            onClick={onAction}
          >
            <Link href={routes.signUp.path}>{t('signUp')}</Link>
          </Button>
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
