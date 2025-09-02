import { useTranslations } from 'next-intl';
import type { RouteConfig } from '@/app/[locale]/routes';
import { Link } from '@/i18n/routing';

interface NavLinkProps {
  route: RouteConfig;
}

export const NavigationLink = ({ route }: NavLinkProps) => {
  const t = useTranslations('navigation');

  return (
    <Link
      href={route.path}
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
    >
      {t(route.translationKey)}
    </Link>
  );
};
