import dynamic from 'next/dynamic';

const RestClientPage = dynamic(() => {
  return import('@/app/_pages/rest-client/RestClient').then((mod) => mod.RestClientPage);
});

const Page = () => {
  return <RestClientPage />;
};

export default Page;
