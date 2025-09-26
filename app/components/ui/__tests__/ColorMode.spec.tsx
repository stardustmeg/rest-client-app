import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ColorModeProvider } from '../ColorMode';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ColorModeProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <ColorModeProvider>
        <div>Test content</div>
      </ColorModeProvider>,
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('should pass props to ThemeProvider', () => {
    const { container } = render(
      <ColorModeProvider defaultTheme="dark">
        <div>Test content</div>
      </ColorModeProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
