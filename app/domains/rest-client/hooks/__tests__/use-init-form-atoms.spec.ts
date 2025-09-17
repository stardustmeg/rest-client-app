import { renderHook } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import type { RestFormData } from '../../components/RestForm';
import { useInitFormAtoms } from '../use-init-form-atoms';
import { useResetClientAtoms } from '../use-reset-client-atoms';

vi.mock('jotai', () => ({
  useSetAtom: vi.fn(),
}));

vi.mock('../use-reset-client-atoms.ts', () => ({
  useResetClientAtoms: vi.fn(),
}));

describe('useInitFormAtoms', () => {
  let setMethod: ReturnType<typeof vi.fn>;
  let setEndpoint: ReturnType<typeof vi.fn>;
  let setHeaders: ReturnType<typeof vi.fn>;
  let setBody: ReturnType<typeof vi.fn>;
  let resetAtoms: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setMethod = vi.fn();
    setEndpoint = vi.fn();
    setHeaders = vi.fn();
    setBody = vi.fn();
    resetAtoms = vi.fn();

    (useSetAtom as Mock)
      .mockReturnValueOnce(setMethod)
      .mockReturnValueOnce(setEndpoint)
      .mockReturnValueOnce(setHeaders)
      .mockReturnValueOnce(setBody);

    (useResetClientAtoms as Mock).mockReturnValue(resetAtoms);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls resetAtoms when formData is null', () => {
    renderHook(() => useInitFormAtoms(null));
    expect(resetAtoms).toHaveBeenCalledTimes(1);
    expect(setMethod).not.toHaveBeenCalled();
    expect(setEndpoint).not.toHaveBeenCalled();
    expect(setHeaders).not.toHaveBeenCalled();
    expect(setBody).not.toHaveBeenCalled();
  });

  it('sets atoms when formData is provided', () => {
    const formData: RestFormData = {
      method: 'POST',
      endpoint: '/api/test',
      headers: [{ key: 'content-type', value: 'application/json' }],
      body: { type: 'json', value: '{ "foo":"bar" }' },
    };

    renderHook(() => useInitFormAtoms(formData));

    expect(resetAtoms).not.toHaveBeenCalled();
    expect(setMethod).toHaveBeenCalledWith(formData.method);
    expect(setEndpoint).toHaveBeenCalledWith(formData.endpoint);
    expect(setHeaders).toHaveBeenCalledWith(formData.headers);
    expect(setBody).toHaveBeenCalledWith(formData.body);
  });
});
