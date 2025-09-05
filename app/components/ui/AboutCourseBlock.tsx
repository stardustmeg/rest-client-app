import { Box, Text, VStack } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const AboutCourseBlock = async () => {
  const t = await getTranslations('main-page.course');

  return (
    <Box borderRadius="md" p={4} textAlign="center">
      <VStack gap={2}>
        <Text fontSize="lg">
          🥸 {t('description')}{' '}
          <Link className="!font-bold !text-cyan-600" href="https://rs.school/courses/reactjs">
            {' '}
            {t('school')} 🫀
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
