import { Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

const characters = [
  's',
  't',
  'a',
  'r',
  'd',
  'u',
  's',
  't',
  'm',
  'e',
  'g',
  ' ',
  'z',
  'a',
  'g',
  'o',
  'r',
  'k',
  'y',
  ' ',
  'r',
  'i',
  'p',
  'e',
  't',
  'c',
  'h',
  'o',
  'r',
  ' ',
];

export const Spinner = ({ message }: { message?: ReactNode }) => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4" data-testid="spinner">
      <div className="relative flex h-80 w-80 items-center justify-center">
        {characters.map((char, index) => {
          const angle = (index / characters.length) * 360;
          const radius = 4;
          return (
            <span
              key={index}
              className="absolute top-1/2 left-1/2 font-bold font-mono text-md"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}rem)`,
                transformOrigin: 'center center',
              }}
            >
  {char}
</span>
          );
        })}

        <div className="!text-8xl -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 animate-spin">
          🥸
        </div>
      </div>
      {message && <Text data-testid="spinner-message">{message}</Text>}
    </div>
  );
