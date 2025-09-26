import { NextIntlClientProvider } from 'next-intl';
import '@/app/main.css';
import { NotFound } from '@/app/_pages/NotFound';

const GlobalNotFound = () => (
  <html lang="en">
    <body>
      <NextIntlClientProvider>
        <NotFound />
      </NextIntlClientProvider>
    </body>
  </html>
);

export default GlobalNotFound;
