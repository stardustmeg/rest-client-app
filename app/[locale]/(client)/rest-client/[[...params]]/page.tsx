import dynamic from 'next/dynamic';
import { use } from 'react';

const RestClientPage = dynamic(() => {
  return import('@/app/_pages/RestClient').then((mod) => mod.RestClientPage);
});

const Page = (props: PageProps<'/[locale]/rest-client/[[...params]]'>) => {
  const p = use(props.params);

  return <RestClientPage params={p.params} />;
};

export default Page;
