import { Container, Flex, VStack } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { AboutDevelopersBlock } from '@/app/components/ui/AboutDevelopersBlock';
import { AboutProjectBlock } from '@/app/components/ui/AboutProjectBlock';
import { AuthButtons } from '@/app/components/ui/AuthButtons';
import { MainHeading } from '@/app/components/ui/MainHeading';

export const MainPage = async () => {
  const t = await getTranslations('MainPage');

  return (
    <Flex as="main" minH="100vh" align="center" justify="center" px="6" py="12">
      <Container maxW="5xl" centerContent>
        <VStack gap="16" textAlign="center" w="full">
          <MainHeading title={t('title')} />
          <AuthButtons signInLabel={t('signIn')} signUpLabel={t('signUp')} />
          <AboutProjectBlock tFunction={t} />
          <AboutDevelopersBlock tFunction={t} />
        </VStack>
      </Container>
    </Flex>
  );
};
