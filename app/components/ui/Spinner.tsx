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
  <div className="flex min-h-full items-center justify-center">
    <div className="relative flex h-80 w-80 items-center justify-center">
      <div className="absolute h-64 w-64">
        {characters.map((char, index) => {
          const fullCircle = 360;
          const angle = (index / characters.length) * fullCircle;
          const radius = 2.5;

          return (
            <span
              key={`${index}-${char}`}
              className="!font-bold !font-mono !text-md absolute top-[50%] left-[50%]"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                   translateY(-${radius}rem)
                `,
                transformOrigin: `center ${radius}rem`,
              }}
            >
              {char}
            </span>
          );
        })}
        <div className="!text-8xl absolute top-[41%] left-[31%] animate-spin rounded-full">🥸</div>
      </div>
    </div>
    <Text>{message}</Text>
  </div>
);
