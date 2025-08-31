'use client';

import { Button } from '@chakra-ui/react';
import { Enabled } from './Enabled';
import { toaster } from './Toaster';

// TBD: remove later; just an example
export const NotEnabledComponent = () => {
  const handleButtonClick = () => {
    toaster.create({
      title: "You didn't see me",
      type: 'success',
      duration: 3000,
      closable: true,
    });
  };

  return (
    <Enabled feature="notEnabledComponent">
      <Button variant="solid" colorPalette="orange" size="lg" onClick={handleButtonClick}>
        Not shown button
      </Button>
      <div>Not Enabled Component</div>
    </Enabled>
  );
};
