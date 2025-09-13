import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { ColorSchemeSelector } from '../ColorSchemeSelector';

const mockSetColorScheme = vi.fn();
vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual,
    useChakraContext: () => ({
      setColorScheme: mockSetColorScheme,
    }),
  };
});

describe('ColorSchemeSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all color scheme buttons', () => {
    render(
      <TestProviders>
        <ColorSchemeSelector />
      </TestProviders>,
    );

    expect(screen.getByRole('button', { name: /set purple color scheme/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /set cyan color scheme/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /set green color scheme/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /set pink color scheme/i })).toBeInTheDocument();
  });

  it('should call setColorScheme when button is clicked', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <ColorSchemeSelector />
      </TestProviders>,
    );

    const purpleButton = screen.getByRole('button', { name: /set purple color scheme/i });
    await user.click(purpleButton);

    expect(mockSetColorScheme).toHaveBeenCalledWith('purple');
  });

  it('should display correct icons', () => {
    render(
      <TestProviders>
        <ColorSchemeSelector />
      </TestProviders>,
    );

    const purpleButton = screen.getByRole('button', { name: /set purple color scheme/i });
    const cyanButton = screen.getByRole('button', { name: /set cyan color scheme/i });

    expect(purpleButton).toHaveTextContent('🟣');
    expect(cyanButton).toHaveTextContent('🔵');
  });
});
