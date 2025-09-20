import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import type { Id } from '@/convex/_generated/dataModel';
import type { HistoryDataItem } from '@/convex/types';
import { HistoryListItem } from '../HistoryListItem';

vi.mock('@/app/components/ui/ResponseInformation', () => ({
  ResponseInformation: ({
    status,
    size,
    duration,
  }: {
    status: number;
    size: number;
    duration: number;
  }) => (
    <div data-testid="response-information">
      Status: {status}, Size: {size}, Time: {duration}
    </div>
  ),
}));

vi.mock('@/app/utils', () => ({
  formatValue: ({ value, postfix }: { value: number; postfix: string }) => `${value}${postfix}`,
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="history-link">
      {children}
    </a>
  ),
}));

const mockHistoryItem: HistoryDataItem = {
  userId: 'test-id' as Id<'users'>,
  requestDuration: 150,
  responseStatusCode: 200,
  requestTimestamp: 1_640_995_200_000,
  requestMethod: 'GET',
  errorDetails: null,
  _id: 'test-id' as Id<'history'>,
  _creationTime: 1_640_995_200_000,
  requestBody: {
    value: 'test-value',
    type: 'test-type',
  },
  requestHeaders: [],
  endpoint: '/api/test',
  requestSize: 1024,
  responseSize: 2048,
};

describe('HistoryListItem', () => {
  it('should render request method', () => {
    render(
      <TestProviders>
        <HistoryListItem item={mockHistoryItem} />
      </TestProviders>,
    );

    expect(screen.getByText('GET')).toBeInTheDocument();
  });

  it('should render endpoint in description', () => {
    render(
      <TestProviders>
        <HistoryListItem item={mockHistoryItem} />
      </TestProviders>,
    );

    expect(screen.getByText('/api/test')).toBeInTheDocument();
  });

  it('should render formatted timestamp', () => {
    render(
      <TestProviders>
        <HistoryListItem item={mockHistoryItem} />
      </TestProviders>,
    );

    const timestamp = screen.getByText(/2022|Jan/);
    expect(timestamp).toBeInTheDocument();
  });

  it('should render request size badge', () => {
    render(
      <TestProviders>
        <HistoryListItem item={mockHistoryItem} />
      </TestProviders>,
    );

    expect(screen.getByText('1024B')).toBeInTheDocument();
  });

  it('should render response information', () => {
    render(
      <TestProviders>
        <HistoryListItem item={mockHistoryItem} />
      </TestProviders>,
    );

    expect(screen.getByTestId('response-information')).toBeInTheDocument();
    expect(screen.getByText(/Status: 200.*Size: 2048.*Time: 150/i)).toBeInTheDocument();
  });

  it('should render link to rest client', () => {
    render(
      <TestProviders>
        <HistoryListItem item={mockHistoryItem} />
      </TestProviders>,
    );

    const link = screen.getByTestId('history-link');
    expect(link).toHaveAttribute(
      'href',
      '/rest-client/GET/test-type/JTJGYXBpJTJGdGVzdA==/dGVzdC12YWx1ZQ==',
    );
  });

  it('should handle different request methods', () => {
    const postItem = { ...mockHistoryItem, requestMethod: 'POST' };

    render(
      <TestProviders>
        <HistoryListItem item={postItem} />
      </TestProviders>,
    );

    expect(screen.getByText('POST')).toBeInTheDocument();
  });
});
