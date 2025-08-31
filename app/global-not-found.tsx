import Link from 'next/link';
import { useTranslations } from 'next-intl';

import './main.css';

export const GlobalNotFound = () => {
  const t = useTranslations('global-not-found');

  return (
    <html lang="en">
      <body>
        <div>{t('title')}</div>
        <Link href="/">{t('link')}</Link>
      </body>
    </html>
  );
};

export default GlobalNotFound;
