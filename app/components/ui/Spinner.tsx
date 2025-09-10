import { Text } from '@chakra-ui/react';
import Image from "next/image";
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
  '✨',
  ' ',
  'z',
  'a',
  'g',
  'o',
  'r',
  'k',
  'y',
  ' ',
  '🥲',
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
  '💃',
  ' ',
];

export const Spinner = ({ message }: { message?: ReactNode }) => (
    <div className="flex flex-col items-center justify-center gap-4 place-self-center" data-testid="spinner">
      <div className="relative flex h-80 w-80 items-center justify-center">
        {characters.map((char, index) => {
          const angle = (index / characters.length) * 360;
          const radius = 6;
          return (
            <span
              key={index}
              className="!font-bold !font-mono !text-md absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}rem)`,
                transformOrigin: 'center center',
              }}
              >
              {char}
            </span>
          );
        })}

        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 animate-spin">
          <Image src='/sasa.png' alt='sasarik real photo' width={512} height={512} />
        </div>
      </div>
      {message && <Text data-testid="spinner-message">{message}</Text>}
    </div>
  );
