import dynamic from 'next/dynamic';

const VariablesPage = dynamic(() => {
  return import('@/app/_pages/Variables').then((mod) => mod.VariablesPage);
});

export default function Page() {
  return <VariablesPage />;
}
