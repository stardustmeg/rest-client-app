import { Container } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export const PageWrapper = ({ children }: { children: ReactNode }) => (
  <Container fluid maxW="1400px">
    {children}
  </Container>
);
