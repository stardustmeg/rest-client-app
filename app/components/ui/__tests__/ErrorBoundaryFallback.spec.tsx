import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundaryFallback } from '../ErrorBoundaryFallback';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

describe(ErrorBoundaryFallback.name, () => {
  it('should render', () => {
    render(
      <TestWrapper>
        <ErrorBoundaryFallback error={new Error('test error')} reset={vi.fn()} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-title')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-message')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-button')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-image')).toBeInTheDocument();
  });

  it('should call reset function', async () => {
    const user = userEvent.setup();
    const mockReset = vi.fn();

    render(
      <TestWrapper>
        <ErrorBoundaryFallback error={new Error('test error')} reset={mockReset} />
      </TestWrapper>,
    );

    const buttonReset = screen.getByTestId('error-boundary-fallback-button');

    await user.click(buttonReset);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
