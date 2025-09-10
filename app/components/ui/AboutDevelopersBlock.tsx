import { Avatar, Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { developersInfo } from '@/data/developersInfo';

export const AboutDevelopersBlock = () => {
  const t = useTranslations('main-page');

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="8" w="full">
      {developersInfo.map(({ name, author, avatar, role, description }) => (
        <Box
          key={name}
          p="8"
          borderRadius="2xl"
          borderWidth="1px"
          shadow="md"
          backdropFilter="blur(50px)"
          textAlign="center"
        >
          <VStack gap="4">
            <Avatar.Root size="xl">
              <Avatar.Fallback name={t(author)} />
              <Avatar.Image src={avatar} />
            </Avatar.Root>
            <Heading as="h3" size="xl" color="pink.600">
              {t(author)}
            </Heading>
            <Text fontWeight="semibold" color="teal.500">
              {t(role)}
            </Text>
            <Text fontSize="md" opacity="0.8">
              {t(description)}
            </Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
