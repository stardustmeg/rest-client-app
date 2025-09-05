import { Loader } from '@chakra-ui/react';
import { Suspense } from 'react';
import { MainPage } from '@/app/_pages/Main';

const Home = () => {
  return (
    <Suspense fallback={<Loader text="Loading..." />}>
      <MainPage />
    </Suspense>
  );
};

export default Home;
