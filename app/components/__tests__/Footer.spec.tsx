import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { Footer } from '../Footer';

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl');
  return {
    ...actual,
    useTranslations: vi.fn(() => (key: string) => {
      const translations: Record<string, string> = {
        'course.description': 'React course description',
        'course.school': 'Rolling Scopes School',
      };
      return translations[key] || key;
    }),
  };
});

vi.mock('@/data/developersInfo', () => ({
  developersInfo: [
    {
      name: 'John Doe',
      github: 'https://github.com/johndoe',
      avatar: '/avatar1.jpg',
    },
    {
      name: 'Jane Smith',
      github: 'https://github.com/janesmith',
      avatar: '/avatar2.jpg',
    },
  ],
}));

describe('Footer', () => {
  it('should render footer element', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });

  it('should render developer information', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render developer links with correct attributes', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    const johnLink = screen.getByRole('link', { name: /john doe/i });
    expect(johnLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(johnLink).toHaveAttribute('target', '_blank');
    expect(johnLink).toHaveAttribute('rel', 'noopener noreferrer');

    const janeLink = screen.getByRole('link', { name: /jane smith/i });
    expect(janeLink).toHaveAttribute('href', 'https://github.com/janesmith');
  });

  it('should render course description', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    expect(screen.getByText('React course description')).toBeInTheDocument();
  });

  it('should render Rolling Scopes School link', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    const schoolLink = screen.getByRole('link', { name: /rolling scopes school/i });
    expect(schoolLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(schoolLink).toHaveAttribute('target', '_blank');
  });

  it('should render RSS logo', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    const logo = screen.getByAltText('Rolling Scopes School Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/react/assets/rss-logo.svg',
    );
  });

  it('should render copyright text', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    expect(screen.getByText('© 2025')).toBeInTheDocument();
  });

  it('should render developer avatars', () => {
    render(
      <TestProviders>
        <Footer />
      </TestProviders>,
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
