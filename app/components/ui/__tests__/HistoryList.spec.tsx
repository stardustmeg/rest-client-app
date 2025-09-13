/** biome-ignore-all lint/style/useNamingConvention: test mocks use kebab-case */
/** biome-ignore-all lint/suspicious/noExplicitAny: test mocks */
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { HistoryList } from '../HistoryList';

vi.mock('convex/nextjs', () => ({
  fetchQuery: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name: string) => {
      if (name === '__convexAuthJWT') {
        return { value: 'mock-jwt-token' };
      }
      return null;
    }),
  })),
}));

vi.mock('../EmptyMessage', () => ({
  EmptyMessage: () => (
    <div>
      <h3>emptyMessage</h3>
    </div>
  ),
}));

vi.mock('../HistoryListItem', () => ({
  HistoryListItem: ({ item }: { item: any }) => (
    <div data-testid="history-item">{item.requestMethod}</div>
  ),
}));

const mockHistoryData = [
  {
    _id: '1',
    requestMethod: 'GET',
    endpoint: '/api/test',
    responseStatusCode: 200,
    requestTimestamp: Date.now(),
    requestDuration: 100,
    requestSize: 1024,
    responseSize: 2048,
  },
  {
    _id: '2',
    requestMethod: 'POST',
    endpoint: '/api/create',
    responseStatusCode: 201,
    requestTimestamp: Date.now(),
    requestDuration: 150,
    requestSize: 512,
    responseSize: 1024,
  },
];

describe('HistoryList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render history items when data is available', async () => {
    const { fetchQuery } = await import('convex/nextjs');
    vi.mocked(fetchQuery).mockResolvedValue(mockHistoryData);

    const HistoryListComponent = await HistoryList();

    render(<TestProviders>{HistoryListComponent}</TestProviders>);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getAllByTestId('history-item')).toHaveLength(2);
  });

  it('should render empty state when no history data', async () => {
    const { fetchQuery } = await import('convex/nextjs');
    vi.mocked(fetchQuery).mockResolvedValue([]);

    const HistoryListComponent = await HistoryList();

    render(<TestProviders>{HistoryListComponent}</TestProviders>);

    expect(screen.getByText('emptyMessage')).toBeInTheDocument();
    expect(screen.queryByTestId('history-item')).not.toBeInTheDocument();
  });

  it('should have correct grid layout structure', async () => {
    const { fetchQuery } = await import('convex/nextjs');
    vi.mocked(fetchQuery).mockResolvedValue(mockHistoryData);

    const HistoryListComponent = await HistoryList();

    render(<TestProviders>{HistoryListComponent}</TestProviders>);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
  });

  it('should render empty message when no auth token', async () => {
    const { cookies } = await import('next/headers');
    vi.mocked(cookies).mockReturnValue({
      get: vi.fn(() => null),
    } as any);

    const HistoryListComponent = await HistoryList();

    render(<TestProviders>{HistoryListComponent}</TestProviders>);

    expect(screen.getByText('emptyMessage')).toBeInTheDocument();
  });
});
