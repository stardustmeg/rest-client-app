import { Flex } from '@chakra-ui/react';
import { Suka } from '@/app/components/ui/suka';
import { DisplayContext } from '@/app/domains/auth/types/nav-config';

export const HeaderNavigationButtons = () => (
  <nav>
    <Flex gap="1" align="center" justify="start" direction="row" wrap="wrap">
      <Suka context={DisplayContext.header} variant="ghost" size="sm" px="2" />
    </Flex>
  </nav>
);
