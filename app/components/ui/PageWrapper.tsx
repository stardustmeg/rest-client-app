import { Box, Container, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export const PageWrapper = ({ children, size = 'lg' }: { children: ReactNode; size?: string }) => (
  <Flex minH="100vh" align="center" justify="center" p="4">
    <Container maxW={size} w="full">
      <Box w="full">{children}</Box>
    </Container>
  </Flex>
);
