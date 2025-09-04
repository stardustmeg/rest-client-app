import { Box, Heading } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';

export const MainHeading = async () => {
  const t = await getTranslations('MainPage');
  return (
    <Box>
      <Heading as="h1" size="2xl" fontWeight="extrabold" letterSpacing="tight">
        {t('title')}
      </Heading>
    </Box>
  );
};
