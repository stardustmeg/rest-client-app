import dynamic from 'next/dynamic';

const VariablesPage = dynamic(() => {
  return import('@/app/_pages/Variables').then((mod) => mod.VariablesPage);
});

const Page = () => {
  return <VariablesPage />;
};

export default Page;
