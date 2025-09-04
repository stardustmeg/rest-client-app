import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { AboutDevelopersBlock } from '@/app/components/ui/AboutDevelopersBlock';
import { AboutProjectBlock } from '@/app/components/ui/AboutProjectBlock';
import { NavigationButtons } from '@/app/components/ui/NavigationButtons';

export const MainPage = async () => {
  const t = await getTranslations('MainPage');

  return (
    <Flex as="main" minH="100vh" align="center" justify="center" px="6" py="12">
      <Container maxW="5xl" centerContent>
        <VStack gap="16" textAlign="center" w="full">
          <Box>
            <Heading as="h1" size="2xl" fontWeight="extrabold" letterSpacing="tight">
              {t('title')}
            </Heading>
          </Box>

          <NavigationButtons type="navigationButtons" />
          <AboutProjectBlock />
          <AboutDevelopersBlock />
        </VStack>
      </Container>
    </Flex>
  );
};
