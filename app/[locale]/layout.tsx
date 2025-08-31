import { NextIntlClientProvider } from 'next-intl';

export const LocaleLayout = ({ children }: { children: React.ReactNode }) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default LocaleLayout;
