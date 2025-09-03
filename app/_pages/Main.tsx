import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export const MainPage = () => {
  const t = useTranslations('MainPage');

  const InfoSection = useMemo(
    () => [
      {
        title: t('features.api.title'),
        description: t('features.api.description'),
      },

      {
        title: t('features.history.title'),
        description: t('features.history.description'),
      },
      {
        title: t('features.organize.title'),
        description: t('features.organize.description'),
      },
    ],
    [t],
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="flex w-full max-w-5xl flex-col items-center gap-16 text-center">
        <section>
          <h1 className="!text-5xl font-extrabold tracking-tight">{t('title')}</h1>
        </section>

        <section className="grid w-full grid-cols-1 gap-8 text-left md:grid-cols-3">
          {InfoSection.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-accent bg-white/5 p-8 shadow-md backdrop-blur-sm"
            >
              <h3 className="!text-xl mb-3 font-semibold">{item.title}</h3>
              <p className="!text-base opacity-80">{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};
