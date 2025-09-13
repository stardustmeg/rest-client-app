import { EmptyState } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import type { MessagesKeysType } from '@/i18n/routing';

interface EmptyMessageProps {
  key: MessagesKeysType;
}

// TBD: style later
export const EmptyMessage = ({ key }: EmptyMessageProps) => {
  const t = useTranslations(key);
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Title>{t('emptyMessage')}</EmptyState.Title>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
