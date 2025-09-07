import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const NotFound = async () => {
  const t = await getTranslations('global-not-found');

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-container-md flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-7xl text-pink-600 leading-none md:text-9xl">404</h1>
          <h2 className="font-semibold text-gray-800 text-xl">{t('title')}</h2>
        </div>

        <p className="text-gray-600 text-lg">{t('description')}</p>

        <div className="flex gap-4">
          <Link
            href="/"
            className="rounded-lg border-2 border-gray-400 px-4 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-50"
          >
            {t('link')}
          </Link>
        </div>
      </div>
    </div>
  );
};
