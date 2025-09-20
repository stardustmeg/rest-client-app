/** biome-ignore-all lint/style/useNamingConvention: <test> */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorPage from '../error';

vi.mock('../components/ui/ErrorBoundaryFallback', () => ({
  ErrorBoundaryFallback: ({ reset }: { reset: () => void }) => (
    <div data-testid="error-boundary-fallback">
      <button onClick={reset} type="button" data-testid="reset-button">
        Try Again
      </button>
    </div>
  ),
}));

describe('ErrorPage', () => {
  it('renders ErrorBoundaryFallback component', () => {
    const mockReset = vi.fn();

    render(<ErrorPage reset={mockReset} />);

    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();
  });

  it('passes reset function to ErrorBoundaryFallback', () => {
    const mockReset = vi.fn();

    render(<ErrorPage reset={mockReset} />);

    const resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();

    resetButton.click();
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('handles reset function calls', () => {
    const mockReset = vi.fn();

    render(<ErrorPage reset={mockReset} />);

    const resetButton = screen.getByTestId('reset-button');

    resetButton.click();
    resetButton.click();

    expect(mockReset).toHaveBeenCalledTimes(2);
  });
});
