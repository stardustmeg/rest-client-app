'use client';

import { Button, Loader } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { RxMagicWand } from 'react-icons/rx';
import { SignInForm } from '@/app/components/SignInForm';
import { SignUpForm } from '@/app/components/SignUpForm';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { useColorPalette } from '@/app/hooks/use-color-palette';
import { useToast } from '@/app/hooks/use-toast';

const Home = () => {
  const { palette } = useColorPalette();
  const t = useTranslations('main');
  const { success } = useToast();

  const handleButtonClick = () => success('Congrats! You are a fish');

  return (
    <Suspense fallback={<Loader text="Loading..." colorPalette={palette} />}>
      <div className="flex min-h-screen flex-col place-content-center gap-10">
        <h1 className="font-bold text-4xl text-emerald-700 dark:text-blue-400">{t('hello')}</h1>
        <SignInForm />
        <SignUpForm />

        <main className="flex place-content-center">
          <div className="flex flex-col items-center gap-[32px] sm:items-start">
            <h1 className="font-bold text-4xl text-emerald-700 dark:text-blue-400">
              No No No Mister Fish
            </h1>
            <Tooltip content="Click Me" showArrow>
              <Button onClick={handleButtonClick} colorPalette={palette} size="lg" variant="solid">
                Click Me! <RxMagicWand />
              </Button>
            </Tooltip>
          </div>
        </main>
        <footer className="flex h-6 flex-wrap place-content-center" />
      </div>
    </Suspense>
  );
};

export default Home;
