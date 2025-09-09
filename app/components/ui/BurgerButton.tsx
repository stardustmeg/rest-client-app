'use client';
import { Button } from '@chakra-ui/react';
import { PiHamburger } from 'react-icons/pi';

interface BurgerButtonProps {
  onClick: () => void;
}

export const BurgerButton = ({ onClick }: BurgerButtonProps) => {
  return (
    <Button variant="ghost" size="lg" onClick={onClick} aria-label="Open menu" p={2}>
      <PiHamburger />
    </Button>
  );
};
