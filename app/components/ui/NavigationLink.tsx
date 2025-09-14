import { Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import type { RouteConfig } from '@/app/[locale]/routes';
import { Link } from '@/i18n/routing';

interface NavLinkProps {
  route: RouteConfig;
  direction?: 'horizontal' | 'vertical';
}

export const NavigationLink = ({ route, direction = 'horizontal' }: NavLinkProps) => {
  const t = useTranslations('navigation');

  return (
    <Button
      variant="ghost"
      asChild
      w="max-content"
      fontWeight="medium"
      textAlign={direction === 'vertical' ? 'center' : 'left'}
    >
      <Link href={route.path}>{t(route.translationKey)}</Link>
    </Button>
  );
};
