import { PageWrapper } from '@/app/components/ui/PageWrapper';
import { HistoryList } from '@/app/domains/history/HistoryList';

export const HistoryAndAnalyticsPage = () => {
  return (
    <PageWrapper>
      <HistoryList />
    </PageWrapper>
  );
};
