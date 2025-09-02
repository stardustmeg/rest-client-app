import dynamic from 'next/dynamic';

const HistoryAndAnalyticsPage = dynamic(() => {
  return import('@/app/_pages/HistoryAndAnalytics').then((mod) => mod.HistoryAnAnalyticsPage);
});

export default function Page() {
  return <HistoryAndAnalyticsPage />;
}
