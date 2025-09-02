import dynamic from 'next/dynamic';

const RestClientPage = dynamic(() => {
  return import('@/app/_pages/RestClient').then((mod) => mod.RestClientPage);
});

export default function Page() {
  return <RestClientPage />;
}
