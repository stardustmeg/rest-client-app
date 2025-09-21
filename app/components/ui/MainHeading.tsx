'use client';
import { Box, Heading, Skeleton } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/hooks/use-auth';

export const MainHeading = () => {
  const t = useTranslations('main-page');
  const { isAuthenticated, isLoading, username } = useAuth();

  return (
    <Skeleton h="10" loading={isLoading}>
      <Box>
        <Heading
          as="h1"
          size="3xl"
          m={4}
          textAlign="center"
          fontWeight="extrabold"
          letterSpacing="tight"
          className="text-gray-600 dark:text-gray-400"
        >
          {isAuthenticated ? t('authenticatedTitle', { username: username ?? 'User' }) : t('title')}
        </Heading>
      </Box>
    </Skeleton>
  );
};
