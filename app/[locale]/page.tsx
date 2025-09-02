import { Button, Loader } from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { RxMagicWand } from 'react-icons/rx';
import { SignInForm } from '@/app/components/SignInForm';
import { SignUpForm } from '@/app/components/SignUpForm';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { NotEnabledComponent } from '../components/ui/NotEnabledComponent';
import { useToast } from '../hooks/useToast';

export const Home = () => {
  const t = useTranslations('main');
  const { success } = useToast();

  const handleButtonClick = () => success('Congrats! You are a fish');

  return (
    <Suspense fallback={<Loader text="Loading..." />}>
      <div className="flex min-h-screen flex-col place-content-center gap-10">
        <h1 className="font-bold text-4xl text-emerald-700 dark:text-blue-400">{t('hello')}</h1>
        <SignInForm />
        <SignUpForm />

        <main className="flex place-content-center">
          <div className="flex flex-col items-center gap-[32px] sm:items-start">
            <h1 className="font-bold text-4xl text-emerald-700 dark:text-blue-400">
              No No No Mister Fish
            </h1>

            {/* TBD: remove later; just an example */}
            <NotEnabledComponent />

            <Tooltip content="Click Me" showArrow>
              <Button onClick={handleButtonClick} colorPalette="green" size="lg" variant="surface">
                Click Me! <RxMagicWand />
              </Button>
            </Tooltip>
          </div>
        </main>
        <footer className="mb-6 flex flex-wrap place-content-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://app.rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
            RS App
          </a>
        </footer>
      </div>
    </Suspense>
  );
};

export default Home;
