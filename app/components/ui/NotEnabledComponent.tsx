'use client';

import { Button } from '@chakra-ui/react';
import { useToast } from '@/app/hooks/useToast';
import { Enabled } from './Enabled';

// TBD: remove later; just an example
export const NotEnabledComponent = () => {
  const { warning } = useToast();

  const handleButtonClick = () => warning("You didn't see me");

  return (
    <Enabled feature="notEnabledComponent">
      <Button variant="solid" colorPalette="orange" size="lg" onClick={handleButtonClick}>
        Not shown button
      </Button>
      <div>Not Enabled Component</div>
    </Enabled>
  );
};
