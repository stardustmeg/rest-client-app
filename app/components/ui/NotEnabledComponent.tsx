'use client';

import { Button } from '@chakra-ui/react';
import { useColorPalette } from '@/app/hooks/use-color-palette';
import { useToast } from '@/app/hooks/use-toast';
import { Enabled } from './Enabled';

// TBD: remove later; just an example
export const NotEnabledComponent = () => {
  const { warning } = useToast();
  const colorPalette = useColorPalette();

  const handleButtonClick = () => warning("You didn't see me");

  return (
    <Enabled feature="notEnabledComponent">
      <Button variant="solid" colorPalette={colorPalette} size="lg" onClick={handleButtonClick}>
        Not shown button
      </Button>
      <div>Not Enabled Component</div>
    </Enabled>
  );
};
