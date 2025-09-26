import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { type RenderResult, render } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

export const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider locale="en">
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </NextIntlClientProvider>
  );
};

export const renderWithUserEvent = (tsx: ReactNode): { user: UserEvent } & RenderResult => {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
};
