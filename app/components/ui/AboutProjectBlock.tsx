import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import type { useTranslations } from 'next-intl';

interface AboutProjectBlockProps {
  tFunction: ReturnType<typeof useTranslations>;
}

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

export const AboutProjectBlock = ({ tFunction }: AboutProjectBlockProps) => (
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
          {tFunction(item.title)}
        </Heading>
        <Text fontSize="md" opacity="0.8">
          {tFunction(item.description)}
        </Text>
      </Box>
    ))}
  </SimpleGrid>
);
