import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '../components/Header';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: (typeof routing.locales)[number] }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header />
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
