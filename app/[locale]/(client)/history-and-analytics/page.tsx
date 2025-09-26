import dynamic from 'next/dynamic';

const HistoryAndAnalyticsPage = dynamic(() => {
  return import('@/app/_pages/HistoryAndAnalytics').then((mod) => mod.HistoryAndAnalyticsPage);
});

const Page = () => {
  return <HistoryAndAnalyticsPage />;
};

export default Page;
