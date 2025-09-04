import { Avatar, Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import type { useTranslations } from 'next-intl';

interface AboutDevelopersBlockProps {
  tFunction: ReturnType<typeof useTranslations>;
}

const infoSection = [
  {
    author: 'developers.stardustmeg.author',
    avatar: 'https://avatars.githubusercontent.com/u/146496794?v=4',
    role: 'developers.stardustmeg.role',
    description: 'developers.stardustmeg.description',
  },
  {
    author: 'developers.ripetchor.author',
    avatar: 'https://avatars.githubusercontent.com/u/115036520?v=4',
    role: 'developers.ripetchor.role',
    description: 'developers.ripetchor.description',
  },
  {
    author: 'developers.zagorky.author',
    avatar: 'https://avatars.githubusercontent.com/u/156232667?v=4',
    role: 'developers.zagorky.role',
    description: 'developers.zagorky.description',
  },
] as const;

export const AboutDevelopersBlock = ({ tFunction }: AboutDevelopersBlockProps) => (
  <SimpleGrid columns={{ base: 1, md: 3 }} gap="8" w="full">
    {infoSection.map((item) => (
      <Box
        key={item.author}
        p="8"
        borderRadius="2xl"
        borderWidth="1px"
        shadow="md"
        backdropFilter="blur(50px)"
        textAlign="center"
      >
        <VStack gap="4">
          <Avatar.Root size="xl">
            <Avatar.Fallback name={tFunction(item.author)} />
            <Avatar.Image src={item.avatar} />
          </Avatar.Root>
          <Heading as="h3" size="xl" color="pink.600">
            {tFunction(item.author)}
          </Heading>
          <Text fontWeight="semibold" color="teal.500">
            {tFunction(item.role)}
          </Text>
          <Text fontSize="md" opacity="0.8">
            {tFunction(item.description)}
          </Text>
        </VStack>
      </Box>
    ))}
  </SimpleGrid>
);
