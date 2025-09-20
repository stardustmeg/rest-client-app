import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalStorage } from '../use-local-storage';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, 'StorageEvent', {
  value: class StorageEvent extends Event {
    constructor(type: string, options?: { key?: string; newValue?: string; oldValue?: string }) {
      super(type);
      this.key = options?.key;
      this.newValue = options?.newValue;
      this.oldValue = options?.oldValue;
    }
    key: string | undefined;
    newValue: string | undefined;
    oldValue: string | undefined;
  },
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'dispatchEvent');
  });

  it('should return initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));

    expect(result.current[0]).toBe('default-value');
  });

  it('should return parsed value from localStorage', () => {
    const storedValue = { name: 'John', age: 30 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedValue));

    const { result } = renderHook(() => useLocalStorage('test-key', {}));

    expect(result.current[0]).toEqual(storedValue);
  });

  it("should return the same reference when localStorage value hasn't changed", () => {
    const storedValue = { items: [1, 2, 1] };
    const jsonValue = JSON.stringify(storedValue);
    localStorageMock.getItem.mockReturnValue(jsonValue);

    const { result, rerender } = renderHook(() => useLocalStorage('test-key', {}));

    const firstValue = result.current[0];

    rerender();

    const secondValue = result.current[0];

    expect(firstValue).toBe(secondValue);
    expect(firstValue).toEqual(storedValue);
  });

  it('should update value and localStorage when setValue is called', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated-value');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'no_no_no_mister_fish_test-key',
      JSON.stringify('updated-value'),
    );
    expect(window.dispatchEvent).toHaveBeenCalledWith(expect.any(StorageEvent));
  });

  it('should handle functional updates', () => {
    const initialValue = [1, 2, 1];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialValue));

    const { result } = renderHook(() => useLocalStorage<number[]>('test-key', []));

    act(() => {
      result.current[1]((prev) => [...prev, 2]);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'no_no_no_mister_fish_test-key',
      JSON.stringify([1, 2, 1, 2]),
    );
  });

  it('should handle different data types', () => {
    const THE_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING = 42;
    localStorageMock.getItem.mockReturnValue(JSON.stringify('hello'));
    const { result: stringResult } = renderHook(() => useLocalStorage('string-key', ''));
    expect(stringResult.current[0]).toBe('hello');

    localStorageMock.getItem.mockReturnValue(JSON.stringify(42));
    const { result: numberResult } = renderHook(() => useLocalStorage('number-key', 0));
    expect(numberResult.current[0]).toBe(
      THE_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING,
    );

    localStorageMock.getItem.mockReturnValue(JSON.stringify(true));
    const { result: booleanResult } = renderHook(() => useLocalStorage('boolean-key', false));
    expect(booleanResult.current[0]).toBe(true);

    const arrayValue = [1, 2, 1];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(arrayValue));
    const { result: arrayResult } = renderHook(() => useLocalStorage<number[]>('array-key', []));
    expect(arrayResult.current[0]).toEqual(arrayValue);

    const objectValue = { name: 'test', value: 123 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(objectValue));
    const { result: objectResult } = renderHook(() => useLocalStorage('object-key', {}));
    expect(objectResult.current[0]).toEqual(objectValue);
  });

  it('should subscribe to storage events for the correct key', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('value'));

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
  });

  it('should ignore storage events for different keys', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('initial'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'different-key',
          newValue: JSON.stringify('external-change'),
        }),
      );
    });

    expect(result.current[0]).toBe('initial');
  });

  it('should create new object reference when localStorage value actually changes', () => {
    const initialValue = { count: 1 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialValue));

    const { result } = renderHook(() => useLocalStorage('test-key', {}));

    const firstValue = result.current[0];

    localStorageMock.getItem.mockReturnValue(JSON.stringify({ count: 2 }));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'no_no_no_mister_fish_test-key',
        }),
      );
    });

    const secondValue = result.current[0];

    expect(firstValue).not.toBe(secondValue);
    expect(firstValue).toEqual({ count: 1 });
    expect(secondValue).toEqual({ count: 2 });
  });
});
