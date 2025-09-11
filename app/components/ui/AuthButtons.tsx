import { Button, HStack, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { withAuthGuard } from '@/app/components/ui/WithAuthGuard';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import { authButtons } from '@/data/navLinksInfo';
import { Link } from '@/i18n/routing';

type VariantType = 'compact' | 'full';

export interface AuthButtonsProps {
  variant?: VariantType;
  onAction?: VoidFunction;
}

const variantConfig = (variant: VariantType) =>
  variant === 'full'
    ? { container: VStack, containerProps: { gap: '2', w: 'full' }, buttonProps: { w: 'full' } }
    : {
        container: HStack,
        containerProps: { gap: '2', w: 'auto' },
        buttonProps: {},
      };

const GuestButtons = ({ variant = 'compact', onAction }: AuthButtonsProps) => {
  const t = useTranslations('navigation');
  const { container: Wrapper, containerProps, buttonProps } = variantConfig(variant);

  return (
    <Wrapper {...containerProps}>
      {authButtons.map((route) => (
        <Button
          key={route.route}
          asChild
          size="sm"
          variant="outline"
          {...buttonProps}
          onClick={onAction}
        >
          <Link data-testid={route.title} href={route.route}>
            {t(route.title)}
          </Link>
        </Button>
      ))}
    </Wrapper>
  );
};

const UserButtons = ({ variant = 'compact', onAction }: AuthButtonsProps) => {
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

  const { container: Wrapper, containerProps, buttonProps } = variantConfig(variant);

  return (
    <Wrapper {...containerProps}>
      <Button onClick={handleSignOut} size="sm" variant="outline" {...buttonProps}>
        {t('signOut')}
      </Button>
    </Wrapper>
  );
};

export const AuthButtons = withAuthGuard<AuthButtonsProps>({
  authenticated: UserButtons,
  unauthenticated: GuestButtons,
});
