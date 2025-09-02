import { NextIntlClientProvider, useTranslations } from 'next-intl';

import './main.css';
import { Link } from '@/i18n/routing';
import { Navigation } from './components/ui/Navigation';

export const GlobalNotFound = () => {
  const t = useTranslations('global-not-found');

  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <NextIntlClientProvider>
          <Navigation />
          <div className="flex h-screen flex-col items-center justify-center gap-5">
            <div className="flex text-9xl">
              <div>4️⃣</div>
              <div>0️⃣</div>
              <div>4️⃣</div>
            </div>
            <h1 className="text-7xl">{t('title')}</h1>
            <Link
              className="rounded-2xl bg-[#5f889b] p-4 text-2xl transition hover:bg-[#427687]"
              href="/"
            >
              {t('link')}
            </Link>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default GlobalNotFound;
