import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from '../Spinner';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

describe(Spinner.name, () => {
  it('should render without message', () => {
    render(
      <TestWrapper>
        <Spinner />
      </TestWrapper>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner-message')).not.toBeInTheDocument();
  });

  it('should render with message', () => {
    render(
      <TestWrapper>
        <Spinner message="Loading..." />
      </TestWrapper>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('spinner-message')).toBeInTheDocument();
  });
});
