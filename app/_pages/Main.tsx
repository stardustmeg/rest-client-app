import { Container, Flex, VStack } from '@chakra-ui/react';
import { AboutDevelopersBlock } from '@/app/components/ui/AboutDevelopersBlock';
import { AboutProjectBlock } from '@/app/components/ui/AboutProjectBlock';
import { MainHeading } from '@/app/components/ui/MainHeading';
import { NavigationButtons } from '@/app/components/ui/NavigationButtons';

export const MainPage = () => {
  return (
    <Flex as="main" minH="100vh" align="center" justify="center" px="6" py="12">
      <Container maxW="5xl" centerContent>
        <VStack gap="16" textAlign="center" w="full">
          <MainHeading />
          <NavigationButtons type="navigationButtons" />
          <AboutProjectBlock />
          <AboutDevelopersBlock />
        </VStack>
      </Container>
    </Flex>
  );
};
