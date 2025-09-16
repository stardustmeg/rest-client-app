import { Button, type ButtonProps } from '@chakra-ui/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { useTranslations } from 'next-intl';
import type { DisplayPolicyType, NavigationMessage } from '@/app/domains/auth/types/nav-config';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import type { NavButtonConfig } from '@/data/navLinksInfo';
import { Link } from '@/i18n/routing';

interface NavButtonsProps extends ButtonProps {
  displayPolicy: DisplayPolicyType;
  config: NavButtonConfig[];
  onAction?: VoidFunction;
}

export const NavButtons = ({ displayPolicy, config, onAction, ...props }: NavButtonsProps) => {
  const t = useTranslations('navigation');
  const tNotification = useTranslations('notifications');
  const { signOut } = useAuthActions();
  const { success } = useToast();

  const filteredConfig = config.filter(({ policy }) => policy === displayPolicy);

  const handleSignOut = () => {
    signOut().finally(() => {
      success(tNotification('signOutSuccess'));
      onAction?.();
    });
  };

  const renderButtons = () =>
    filteredConfig.map((button) => {
      if (button.isAction && button.title === 'signOut') {
        return (
          <Button {...props} key={button.title} onClick={handleSignOut}>
            {t(button.title)}
          </Button>
        );
      }

      if (button.route) {
        return (
          <Button {...props} key={button.route} asChild onClick={onAction}>
            <Link data-testid={button.title} href={button.route}>
              {t(button.title as NavigationMessage)}
            </Link>
          </Button>
        );
      }

      return null;
    });

  switch (displayPolicy) {
    case 'authenticated':
      return <Authenticated>{renderButtons()}</Authenticated>;
    case 'unauthenticated':
      return <Unauthenticated>{renderButtons()}</Unauthenticated>;
    default:
      return <>{renderButtons()}</>;
  }
};
