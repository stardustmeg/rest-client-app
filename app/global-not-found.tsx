import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

import './main.css';

export default function GlobalNotFound(): JSX.Element {
  const t = useTranslations('global-not-found');

  return (
    <html lang="en">
      <body>
        <div>{t('title')}</div>
        <Link href="/">{t('link')}</Link>
      </body>
    </html>
  );
}
