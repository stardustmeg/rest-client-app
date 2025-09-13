import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { ResponseInformation } from '../ResponseInformation';

describe(ResponseInformation.name, () => {
  it('should render', () => {
    render(
      <TestProviders>
        <ResponseInformation status={200} size={100} time={100} />
      </TestProviders>,
    );

    expect(screen.getByTestId('response-information')).toBeInTheDocument();
    expect(screen.getByTestId('response-information-status')).toHaveTextContent('200');
    expect(screen.getByTestId('response-information-size')).toHaveTextContent('100');
    expect(screen.getByTestId('response-information-time')).toHaveTextContent('100');
  });
});
