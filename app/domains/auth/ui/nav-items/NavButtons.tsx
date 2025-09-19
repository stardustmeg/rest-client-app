import { Button, type ButtonProps } from '@chakra-ui/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { useTranslations } from 'next-intl';
import { type ElementType, Fragment, type MouseEventHandler } from 'react';
import { Link } from '@/i18n/routing';
import type { NavConfigItem, NavItemAction, NavItemDisplayPolicy } from './types';

const authWrapper: Record<NavItemDisplayPolicy, ElementType> = {
  authenticated: Authenticated,
  unauthenticated: Unauthenticated,
  public: Fragment,
};

export interface NavButtonsProps extends ButtonProps {
  items: NavConfigItem[];
  onAction?: (action: NavItemAction) => void;
}

export const NavButtons = ({ items, onAction, ...props }: NavButtonsProps) => {
  const t = useTranslations('navigation');
  const handleAction =
    (action: NavItemAction): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      onAction?.(action);
      props.onClick?.(e);
    };

  return items.map((item) => {
    const { title, policy, id } = item;

    const AuthWrapper = authWrapper[policy];

    return (
      <AuthWrapper key={id}>
        {item.action && (
          <Button data-testid={`nav-item-${id}`} {...props} onClick={handleAction(item.action)}>
            {t(title)}
          </Button>
        )}
        {item.route && (
          <Button data-testid={`nav-item-${id}`} {...props} asChild>
            <Link data-testid={title} href={item.route}>
              {t(title)}
            </Link>
          </Button>
        )}
      </AuthWrapper>
    );
  });
};
