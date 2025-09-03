'use client';

import { Loader } from '@chakra-ui/react';
import { Suspense } from 'react';
import { MainPage } from '@/app/_pages/Main';
import { useColorPalette } from '@/app/hooks/use-color-palette';

const Home = () => {
  const { palette } = useColorPalette();

  return (
    <Suspense fallback={<Loader text="Loading..." colorPalette={palette} />}>
      <MainPage />
    </Suspense>
  );
};

export default Home;
