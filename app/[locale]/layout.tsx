import { VStack } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/ui/Footer';
import { type RoutingLocales, routing } from '@/i18n/routing';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: RoutingLocales }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <VStack className="min-h-screen justify-between gap-0">
        <div className="w-full flex-1">
          <Header />
          <main className="min-h-screen">{children}</main>
        </div>
        <Footer />
      </VStack>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
