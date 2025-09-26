import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ColorMode } from '@/app/types/color-theme';
import { useColorMode } from '../use-color-mode';

const mockSetTheme = vi.fn();
let mockResolvedTheme: ColorMode | undefined;
let mockForcedTheme: ColorMode | undefined;

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    forcedTheme: mockForcedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe(useColorMode.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockResolvedTheme = 'light';
    mockForcedTheme = undefined;
  });

  it('should return colorMode from resolvedTheme if no forcedTheme', () => {
    const { result } = renderHook(() => useColorMode());
    expect(result.current.colorMode).toBe('light');
  });

  it('should return forcedTheme when it exists', () => {
    mockForcedTheme = 'dark';
    mockResolvedTheme = 'light';

    const { result } = renderHook(() => useColorMode());
    expect(result.current.colorMode).toBe('dark');
  });

  it('should call setTheme when setColorMode is used', () => {
    const { result } = renderHook(() => useColorMode());

    act(() => {
      result.current.setColorMode('dark');
    });

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle from dark to light', () => {
    mockResolvedTheme = 'dark';
    const { result } = renderHook(() => useColorMode());

    act(() => {
      result.current.toggleColorMode();
    });

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should toggle from light to dark', () => {
    mockResolvedTheme = 'light';
    const { result } = renderHook(() => useColorMode());

    act(() => {
      result.current.toggleColorMode();
    });

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
