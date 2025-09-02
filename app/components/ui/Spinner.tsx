import {
  Spinner as ChakraSpinner,
  type SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react';
import { useColorPalette } from '@/app/hooks/use-color-palette';

export type SpinnerProps = ChakraSpinnerProps & { message?: string };

export const Spinner = ({ message, ...props }: SpinnerProps) => {
  const colorPalette = useColorPalette();
  return (
    <div className="flex flex-col items-center gap-1">
      <ChakraSpinner size="xl" {...props} data-testid="spinner" colorPalette={colorPalette} />
      {message && <p data-testid="spinner-message">{message}</p>}
    </div>
  );
};
