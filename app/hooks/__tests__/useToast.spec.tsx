import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useToast } from '../use-toast';

const mockToasterCreate = vi.fn();
vi.mock('../../components/ui/Toaster', () => ({
  toaster: {
    create: (options: Record<string, unknown>) => mockToasterCreate(options),
  },
}));

describe(useToast.name, () => {
  beforeEach(() => {
    mockToasterCreate.mockClear();
  });

  it('should return all toast methods', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.success).toBeDefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.warning).toBeDefined();
    expect(result.current.info).toBeDefined();
  });

  it('should call toaster.create with success type and default duration', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Success message';

    result.current.success(message);

    expect(mockToasterCreate).toHaveBeenCalledWith({
      title: message,
      type: 'success',
      duration: 3000,
      closable: true,
    });
  });

  it('should call toaster.create with error type and default duration', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Error message';

    result.current.error(message);

    expect(mockToasterCreate).toHaveBeenCalledWith({
      title: message,
      type: 'error',
      duration: 3000,
      closable: true,
    });
  });

  it('should call toaster.create with warning type and default duration', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Warning message';

    result.current.warning(message);

    expect(mockToasterCreate).toHaveBeenCalledWith({
      title: message,
      type: 'warning',
      duration: 3000,
      closable: true,
    });
  });

  it('should call toaster.create with info type and default duration', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Info message';

    result.current.info(message);

    expect(mockToasterCreate).toHaveBeenCalledWith({
      title: message,
      type: 'info',
      duration: 3000,
      closable: true,
    });
  });

  it('should use custom duration when provided', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Custom duration message';
    const customDuration = 5000;

    result.current.success(message, customDuration);

    expect(mockToasterCreate).toHaveBeenCalledWith({
      title: message,
      type: 'success',
      duration: customDuration,
      closable: true,
    });
  });
});
