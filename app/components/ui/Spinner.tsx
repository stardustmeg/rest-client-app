import {
  Spinner as ChakraSpinner,
  type SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react';

export type SpinnerProps = ChakraSpinnerProps & { message?: string };

export const Spinner = ({ message, ...props }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <ChakraSpinner size="xl" {...props} data-testid="spinner" />
      {message && <p data-testid="spinner-message">{message}</p>}
    </div>
  );
};
