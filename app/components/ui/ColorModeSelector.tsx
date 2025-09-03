'use client';

import { ClientOnly, IconButton, type IconButtonProps, Skeleton } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useColorMode } from '@/app/hooks/use-color-mode';
import type { ColorMode } from '@/app/types/color-theme';

interface ColorModeItem {
  value: ColorMode;
  icon: string;
}

interface ColorModeSelectorProps extends Omit<IconButtonProps, 'aria-label'> {}

const colorModes: ColorModeItem[] = [
  { value: 'light', icon: '☀️' },
  { value: 'dark', icon: '🌙' },
];

export const ColorModeSelector = forwardRef<HTMLButtonElement, ColorModeSelectorProps>(
  (props, ref) => {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
      <ClientOnly fallback={<Skeleton boxSize="8" />}>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
          size="sm"
          variant="plain"
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5',
            },
          }}
        >
          {colorModes.find((mode) => mode.value === colorMode)?.icon ?? '🌙'}
        </IconButton>
      </ClientOnly>
    );
  },
);
