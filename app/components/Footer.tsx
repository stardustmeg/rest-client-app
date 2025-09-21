'use client';
import { Avatar, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { developersInfo } from '@/data/developersInfo';

export const Footer = () => {
  const t = useTranslations('main-page');

  return (
    <footer className="mt-auto w-full">
      <VStack className="!w-full !p-4 place-content-center gap-4 bg-gray-100 dark:bg-gray-900">
        <HStack gap={4} justify="center" wrap="wrap">
          {developersInfo.map(({ name, github, avatar }) => (
            <Link
              key={name}
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2"
            >
              <Avatar.Root size="sm">
                <Avatar.Image src={avatar} />
                <Avatar.Fallback name={name} />
              </Avatar.Root>
              <Text fontSize="sm" fontWeight="medium">
                {name}
              </Text>
            </Link>
          ))}
        </HStack>

        <Text className="text-center">{t('course.description')}</Text>

        <HStack className="wrap justify-center gap-6">
          <HStack gap={2} align="center">
            <Image
              src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/react/assets/rss-logo.svg"
              alt="Rolling Scopes School Logo"
              width="24px"
              height="24px"
              className="opacity-80 transition-opacity hover:opacity-100"
            />
            <Link
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="!font-medium"
            >
              {t('course.school')}
            </Link>
          </HStack>

          <Text className="text-gray-600 text-sm dark:text-gray-200">© 2025</Text>
        </HStack>
      </VStack>
    </footer>
  );
};
