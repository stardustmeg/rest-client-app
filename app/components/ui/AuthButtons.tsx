import { Button, HStack, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { withAuthGuard } from '@/app/components/hoc/WithAuthGuard';
import { withWrapper } from '@/app/components/hoc/WithWrapper';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import { authButtons } from '@/data/navLinksInfo';
import { Link } from '@/i18n/routing';

type VariantType = 'compact' | 'full';

export interface AuthButtonsProps {
  variant?: VariantType;
  onAction?: VoidFunction;
}

interface VariantWrapperProps extends AuthButtonsProps {
  children?: ReactNode;
}

const getVariantConfig = (variant: VariantType = 'compact') =>
  variant === 'full'
    ? { container: VStack, containerProps: { gap: 2, w: 'full' }, buttonProps: { w: 'full' } }
    : {
        container: HStack,
        containerProps: { gap: 2, w: 'auto' },
        buttonProps: {},
      };

const VariantWrapper = ({ variant = 'compact', children }: VariantWrapperProps) => {
  const { container: Container, containerProps } = getVariantConfig(variant);
  return <Container {...containerProps}>{children}</Container>;
};

export const GuestButtons = ({ variant = 'compact', onAction }: AuthButtonsProps) => {
  const t = useTranslations('navigation');
  const { buttonProps } = getVariantConfig(variant);

  return (
    <>
      {authButtons.map(({ route, title }) => (
        <Button key={route} asChild size="sm" {...buttonProps} onClick={onAction}>
          <Link data-testid={title} href={route}>
            {t(title)}
          </Link>
        </Button>
      ))}
    </>
  );
};

const UserButtons = ({ variant = 'compact', onAction }: AuthButtonsProps) => {
  const t = useTranslations('navigation');
  const tNotification = useTranslations('notifications');
  const { signOut } = useAuthActions();
  const { success } = useToast();
  const { buttonProps } = getVariantConfig(variant);

  const handleSignOut = () => {
    signOut().finally(() => {
      success(tNotification('signOutSuccess'));
      onAction?.();
    });
  };

  return (
    <Button onClick={handleSignOut} size="sm" {...buttonProps}>
      {t('signOut')}
    </Button>
  );
};

export const AuthButtons = withWrapper<VariantWrapperProps>({
  wrapper: VariantWrapper,
  children: withAuthGuard<AuthButtonsProps>({
    authenticated: UserButtons,
    unauthenticated: GuestButtons,
  }),
});
