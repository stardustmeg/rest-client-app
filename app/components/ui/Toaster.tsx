'use client';

import {
  Toaster as ChakraToaster,
  createToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
} from '@chakra-ui/react';
import { useColorPalette } from '@/app/hooks/use-color-palette';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  const colorPalette = useColorPalette();
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }} colorPalette={colorPalette}>
        {(toast) => (
          <Toast.Root width={{ md: 'sm' }}>
            {toast.type === 'loading' ? (
              <Spinner size="sm" colorPalette={colorPalette} />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
