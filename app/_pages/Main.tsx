import { Box, Container, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { AuthButtons } from '@/app/components/ui/AuthButtons';
import { MainHeading } from '@/app/components/ui/MainHeading';

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

export const MainPage = () => {
  const t = useTranslations('MainPage');

  return (
    <Flex as="main" minH="100vh" align="center" justify="center" px="6" py="12">
      <Container maxW="5xl" centerContent>
        <VStack gap="16" textAlign="center" w="full">
          <MainHeading title={t('title')} />
          <AuthButtons signInLabel={t('signIn')} signUpLabel={t('signUp')} />

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
        </VStack>
      </Container>
    </Flex>
  );
};
