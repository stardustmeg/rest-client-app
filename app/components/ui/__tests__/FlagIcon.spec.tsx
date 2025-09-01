import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FlagIcon } from '../FlagIcon';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

describe(FlagIcon.name, () => {
  it('should render US flag for "en" locale', () => {
    render(
      <TestWrapper>
        <FlagIcon country="en" />
      </TestWrapper>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should render Russian flag for "ru" locale', () => {
    render(
      <TestWrapper>
        <FlagIcon country="ru" />
      </TestWrapper>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should render Japanese flag for "jp" locale', () => {
    render(
      <TestWrapper>
        <FlagIcon country="jp" />
      </TestWrapper>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('viewBox', '0 0 36 24');
  });

  it('should render with custom title', () => {
    render(
      <TestWrapper>
        <FlagIcon country="en" title="United States" />
      </TestWrapper>,
    );

    expect(screen.getByTitle('United States')).toBeInTheDocument();
  });

  it('should apply custom size and height', () => {
    render(
      <TestWrapper>
        <FlagIcon country="en" size={30} height={10} />
      </TestWrapper>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveStyle({ width: '45px', height: 'var(--chakra-sizes-10)' });
  });

  it('should return null for unsupported locale', () => {
    const { container } = render(
      <TestWrapper>
        {/* @ts-expect-error - This is a test */}
        <FlagIcon country="fr" />
      </TestWrapper>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should have default size and height', () => {
    render(
      <TestWrapper>
        <FlagIcon country="en" />
      </TestWrapper>,
    );

    const flagElement = screen.getByTitle('').closest('svg');
    expect(flagElement).toHaveStyle({ width: '30px', height: 'var(--chakra-sizes-6)' });
  });
});
