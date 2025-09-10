import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

const infoSection = [
  {
    title: 'features.api.title',
    description: 'features.api.description',
  },
  {
    title: 'features.history.title',
    description: 'features.history.description',
  },
  {
    title: 'features.organize.title',
    description: 'features.organize.description',
  },
] as const;

export const AboutProjectBlock = () => {
  const t = useTranslations('main-page');

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="8" w="full" textAlign="left">
      {infoSection.map((item) => (
        <Box
          key={item.title}
          p="8"
          borderRadius="2xl"
          borderWidth="1px"
          shadow="md"
          backdropFilter="blur(50px)"
        >
          <Heading as="h3" size="md" mb="3" fontWeight="semibold">
            {t(item.title)}
          </Heading>
          <Text fontSize="md" opacity="0.8">
            {t(item.description)}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};
