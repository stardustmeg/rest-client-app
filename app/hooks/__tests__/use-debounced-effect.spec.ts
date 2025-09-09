import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebouncedEffect } from '../use-debounced-effect';

const DELAY = 100;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe(useDebouncedEffect.name, () => {
  it('should call the effect after the delay', () => {
    const effect = vi.fn();

    renderHook(() => useDebouncedEffect(effect, DELAY));

    expect(effect).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY);

    expect(effect).toHaveBeenCalled();
  });
});
