import {
  Spinner as ChakraSpinner,
  type SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react';

export type SpinnerProps = ChakraSpinnerProps & { message?: string };

export const Spinner = ({ message, ...props }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <ChakraSpinner size="xl" {...props} />
      {message && <p>{message}</p>}
    </div>
  );
};
