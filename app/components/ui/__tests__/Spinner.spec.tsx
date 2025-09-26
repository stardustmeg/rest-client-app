import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { Spinner } from '../Spinner';

describe(Spinner.name, () => {
  it('should render without message', () => {
    render(
      <TestProviders>
        <Spinner />
      </TestProviders>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner-message')).not.toBeInTheDocument();
  });

  it('should render with message', () => {
    render(
      <TestProviders>
        <Spinner message="Loading..." />
      </TestProviders>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('spinner-message')).toBeInTheDocument();
  });
});
