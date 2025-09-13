import { VStack } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { type RoutingLocales, routing } from '@/i18n/routing';
import { VariablesLocalStoragePersistence } from '../domains/variables/components/VariablesLocalStoragePersistence';

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
      <VariablesLocalStoragePersistence />
      <VStack className="min-h-screen justify-between gap-0">
        <div className="grid w-full flex-1 grid-rows-[min-content_1fr]">
          <Header />
          <main className="grid">{children}</main>
        </div>
        <Footer />
      </VStack>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
