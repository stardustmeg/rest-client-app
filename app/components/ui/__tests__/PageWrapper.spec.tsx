import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { PageWrapper } from '../PageWrapper';

describe(PageWrapper.name, () => {
  it('renders children correctly', () => {
    const testContent = 'Test content';

    render(
      <TestProviders>
        <PageWrapper>
          <div>{testContent}</div>
        </PageWrapper>
      </TestProviders>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <TestProviders>
        <PageWrapper>
          <h1>Title</h1>
          <p>Description</p>
          <button type="button">Action</button>
        </PageWrapper>
      </TestProviders>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Action');
  });
});
