import { Link } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import type { RouteConfig } from '@/app/[locale]/routes';
import { Link as I18nLink } from '@/i18n/routing';

interface NavLinkProps {
  route: RouteConfig;
  direction?: 'horizontal' | 'vertical';
}

export const NavigationLink = ({ route, direction = 'horizontal' }: NavLinkProps) => {
  const t = useTranslations('navigation');

  return (
    <Link
      asChild
      py={2}
      w="max-content"
      fontWeight="medium"
      textAlign={direction === 'vertical' ? 'center' : 'left'}
    >
      <I18nLink href={route.path}>
        <span>{t(route.translationKey)}</span>
      </I18nLink>
    </Link>
  );
};
