import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { ColorModeSelector } from '../ColorModeSelector';

vi.mock('@/app/hooks/use-color-mode', () => ({
  useColorMode: vi.fn(() => ({
    colorMode: 'light',
    toggleColorMode: vi.fn(),
    setColorMode: vi.fn(),
  })),
}));

describe('ColorModeSelector', () => {
  it('should render toggle button', () => {
    render(
      <TestProviders>
        <ColorModeSelector />
      </TestProviders>,
    );

    const button = screen.getByRole('button', { name: /toggle color mode/i });
    expect(button).toBeInTheDocument();
  });

  it('should call toggleColorMode when clicked', async () => {
    const mockToggle = vi.fn();
    const { useColorMode } = await import('@/app/hooks/use-color-mode');
    vi.mocked(useColorMode).mockReturnValue({
      colorMode: 'light',
      toggleColorMode: mockToggle,
      setColorMode: vi.fn(),
    });

    const { user } = renderWithUserEvent(
      <TestProviders>
        <ColorModeSelector />
      </TestProviders>,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('should show correct icon for light mode', async () => {
    const { useColorMode } = await import('@/app/hooks/use-color-mode');
    vi.mocked(useColorMode).mockReturnValue({
      colorMode: 'light',
      toggleColorMode: vi.fn(),
      setColorMode: vi.fn(),
    });

    render(
      <TestProviders>
        <ColorModeSelector />
      </TestProviders>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('☀️');
  });
});
