import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { type RenderResult, render } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import type { ReactNode } from 'react';

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

export const setupUserEvent = (tsx: ReactNode): { user: UserEvent } & RenderResult => {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
};
