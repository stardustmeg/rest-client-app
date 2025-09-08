import { Link } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import type { RouteConfig } from '@/app/[locale]/routes';
import { Link as I18nLink } from '@/i18n/routing';

interface NavLinkProps {
  route: RouteConfig;
}

export const NavigationLink = ({ route }: NavLinkProps) => {
  const t = useTranslations('navigation');

  return (
    <Link asChild className="!font-medium">
      <I18nLink href={route.path}>
        <span>{t(route.translationKey)}</span>
      </I18nLink>
    </Link>
  );
};
