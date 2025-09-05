'use client';
import { Box, Heading, Skeleton } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/hooks/use-auth';

export const MainHeading = () => {
  const t = useTranslations('main-page');
  // TODO (zagorky): replace with username
  const { isAuthenticated, isLoading } = useAuth();
  const username = 'popik';

  return (
    <Skeleton h="10" loading={isLoading}>
      <Box>
        <Heading as="h1" size="2xl" fontWeight="extrabold" letterSpacing="tight">
          {isAuthenticated ? t('authenticatedTitle', { username }) : t('title')}
        </Heading>
      </Box>
    </Skeleton>
  );
};
