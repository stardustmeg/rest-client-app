import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { FlagIcon } from '../FlagIcon';

describe(FlagIcon.name, () => {
  it('should render US flag for "en" locale', () => {
    render(
      <TestProviders>
        <FlagIcon country="en" />
      </TestProviders>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should render Russian flag for "ru" locale', () => {
    render(
      <TestProviders>
        <FlagIcon country="ru" />
      </TestProviders>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should render Japanese flag for "jp" locale', () => {
    render(
      <TestProviders>
        <FlagIcon country="jp" />
      </TestProviders>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should render with custom title', () => {
    render(
      <TestProviders>
        <FlagIcon country="en" title="United States" />
      </TestProviders>,
    );

    expect(screen.getByTitle('United States')).toBeInTheDocument();
  });

  it('should apply custom size and height', () => {
    render(
      <TestProviders>
        <FlagIcon country="en" size={30} height={10} />
      </TestProviders>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveStyle({ width: '45px', height: 'var(--chakra-sizes-10)' });
  });

  it('should return null for unsupported locale', () => {
    const { container } = render(
      <TestProviders>
        {/* @ts-expect-error - This is a test */}
        <FlagIcon country="fr" />
      </TestProviders>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should have default size and height', () => {
    render(
      <TestProviders>
        <FlagIcon country="en" />
      </TestProviders>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toHaveStyle({ width: '30px', height: 'var(--chakra-sizes-6)' });
  });
});
