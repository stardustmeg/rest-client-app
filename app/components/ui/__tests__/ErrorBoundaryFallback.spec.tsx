import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { ErrorBoundaryFallback } from '../ErrorBoundaryFallback';

describe(ErrorBoundaryFallback.name, () => {
  it('should render', () => {
    render(
      <TestProviders>
        <ErrorBoundaryFallback reset={vi.fn()} />
      </TestProviders>,
    );

    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-title')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-message')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-button')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-fallback-image')).toBeInTheDocument();
  });

  it('should call reset function', async () => {
    const mockReset = vi.fn();

    const { user } = renderWithUserEvent(
      <TestProviders>
        <ErrorBoundaryFallback reset={mockReset} />
      </TestProviders>,
    );

    const buttonReset = screen.getByTestId('error-boundary-fallback-button');

    await user.click(buttonReset);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
