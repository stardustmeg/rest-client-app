import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import type { Metadata } from 'next';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Geist, Geist_Mono, Noto_Sans_JP } from 'next/font/google';
import { ConvexClientProvider } from '@/app/ConvexClientProvider';
import { AppChakraProvider } from '@/app/components/ui/AppChakraProvider';
import { Toaster } from '@/app/components/ui/Toaster';

import '@/app/main.css';

const geistSans: NextFontWithVariable = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono: NextFontWithVariable = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'REST Client - Modern API Testing Tool',
  description:
    'A lightweight, browser-based alternative to Postman. Build and send HTTP requests, inspect responses, manage variables, track history, and generate code snippets.',
  keywords: [
    'REST client',
    'API testing',
    'HTTP requests',
    'Postman alternative',
    'API tools',
    'RESTful APIs',
    'request builder',
    'response inspector',
  ],
  authors: [
    { name: 'Margarita Golubeva', url: 'https://github.com/stardustmeg' },
    { name: 'Mikhail Zubenko', url: 'https://github.com/ripetchor' },
    { name: 'Daria Melnikova', url: 'https://github.com/zagorky' },
  ],
};

const RootLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <ConvexAuthNextjsServerProvider>
      <html suppressHydrationWarning lang="en">
        <body
          className={`${notoSansJP.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <AppChakraProvider>
              {children}
              <Toaster />
            </AppChakraProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
};

export default RootLayout;
