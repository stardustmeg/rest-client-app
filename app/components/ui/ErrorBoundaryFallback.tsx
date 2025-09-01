'use client';

import { Button } from '@chakra-ui/react';
import Image from 'next/image';

const DOG_MEME_GIF_URL =
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeml3dW44ZXlkazFsZzFiaHluemlidXJqbHFxbmxmYjYweHg4azF3dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif';

export interface ErrorBoundaryFallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// TODO (ripetchor): May need to be update styles and add some buttons
export const ErrorBoundaryFallback = (props: ErrorBoundaryFallbackProps) => {
  return (
    <div className="flex h-screen items-center justify-center gap-10">
      <div>
        <h2 className="!text-6xl">Ooops!</h2>
        <h3 className="!text-5xl">Something went wrong!</h3>
        <Button onClick={props.reset}>Try again</Button>
      </div>
      <Image
        className="rounded-2xl"
        src={DOG_MEME_GIF_URL}
        unoptimized
        alt="Dog Meme"
        width={400}
        height={400}
      />
    </div>
  );
};
