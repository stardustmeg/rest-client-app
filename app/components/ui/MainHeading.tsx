import { Box, Heading } from '@chakra-ui/react';

export const MainHeading = ({ title }: { title: string }) => (
  <Box>
    <Heading as="h1" size="2xl" fontWeight="extrabold" letterSpacing="tight">
      {title}
    </Heading>
  </Box>
);
