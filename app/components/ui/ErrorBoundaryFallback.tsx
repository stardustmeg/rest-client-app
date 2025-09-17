'use client';

import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const DOG_MEME_GIF_URL =
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeml3dW44ZXlkazFsZzFiaHluemlidXJqbHFxbmxmYjYweHg4azF3dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif';

export interface ErrorBoundaryFallbackProps {
  reset: () => void;
}

// TODO (ripetchor): May need to be update styles and add some buttons
export const ErrorBoundaryFallback = ({ reset }: ErrorBoundaryFallbackProps) => {
  const t = useTranslations('error-boundary-fallback');

  return (
    <div
      className="flex h-screen items-center justify-center gap-10"
      data-testid="error-boundary-fallback"
    >
      <div>
        <h2 data-testid="error-boundary-fallback-title" className="!text-6xl">
          {t('title')}
        </h2>
        <h3 data-testid="error-boundary-fallback-message" className="!text-5xl">
          {t('message')}
        </h3>
        <Button data-testid="error-boundary-fallback-button" onClick={reset}>
          {t('button-reset')}
        </Button>
      </div>
      <Image
        data-testid="error-boundary-fallback-image"
        className="rounded-2xl"
        src={DOG_MEME_GIF_URL}
        unoptimized
        alt="Dog Meme"
        width={400}
        height={400}
        priority
      />
    </div>
  );
};
