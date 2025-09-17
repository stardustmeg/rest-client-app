import { act, renderHook } from '@testing-library/react';
import { useResetAtom } from 'jotai/react/utils';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { useResetClientAtoms } from '../use-reset-client-atoms';

vi.mock('jotai/react/utils', () => ({
  useResetAtom: vi.fn(),
}));

describe(useResetClientAtoms.name, () => {
  let resetMethod: ReturnType<typeof vi.fn>;
  let resetEndpoint: ReturnType<typeof vi.fn>;
  let resetHeaders: ReturnType<typeof vi.fn>;
  let resetBody: ReturnType<typeof vi.fn>;
  let resetResponse: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    resetMethod = vi.fn();
    resetEndpoint = vi.fn();
    resetHeaders = vi.fn();
    resetBody = vi.fn();
    resetResponse = vi.fn();

    (useResetAtom as Mock)
      .mockReturnValueOnce(resetMethod)
      .mockReturnValueOnce(resetEndpoint)
      .mockReturnValueOnce(resetHeaders)
      .mockReturnValueOnce(resetBody)
      .mockReturnValueOnce(resetResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls all reset functions', () => {
    const { result } = renderHook(() => useResetClientAtoms());

    act(() => {
      result.current();
    });

    expect(resetMethod).toHaveBeenCalledTimes(1);
    expect(resetEndpoint).toHaveBeenCalledTimes(1);
    expect(resetHeaders).toHaveBeenCalledTimes(1);
    expect(resetBody).toHaveBeenCalledTimes(1);
    expect(resetResponse).toHaveBeenCalledTimes(1);
  });
});
