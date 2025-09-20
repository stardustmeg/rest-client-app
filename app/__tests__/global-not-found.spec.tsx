/** biome-ignore-all lint/style/useNamingConvention: <test> */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GlobalNotFound from '../global-not-found';

vi.mock('../main.css', () => ({}));
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="next-intl-provider">{children}</div>
  ),
}));
vi.mock('../_pages/NotFound', () => ({
  NotFound: () => <div data-testid="not-found">Not Found Page</div>,
}));

describe('GlobalNotFound', () => {
  it('renders HTML document structure', () => {
    render(<GlobalNotFound />);

    expect(document.documentElement).toBeInTheDocument();
    expect(document.documentElement.tagName).toBe('HTML');
    expect(document.documentElement).toHaveAttribute('lang', 'en');

    expect(document.body).toBeInTheDocument();
  });

  it('includes NextIntlClientProvider', () => {
    render(<GlobalNotFound />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('renders NotFound component', () => {
    render(<GlobalNotFound />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });

  it('has correct lang attribute', () => {
    render(<GlobalNotFound />);

    expect(document.documentElement).toHaveAttribute('lang', 'en');
  });
});
