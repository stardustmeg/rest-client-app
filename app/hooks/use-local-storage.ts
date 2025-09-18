import { useCallback, useRef, useSyncExternalStore } from 'react';

const LS_PREFIX = 'no_no_no_mister_fish';

export const getFullKey = (key: string): string => `${LS_PREFIX}_${key}`;

type SetValue<T> = (value: T | ((prev: T) => T)) => void;
type UseLocalStorageReturn<T> = [T, SetValue<T>];

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturn<T> => {
  const lastLocalStorageValue = useRef(initialValue);

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorageEvent = (event: StorageEvent) => {
        if (event.key === getFullKey(key)) {
          callback();
        }
      };
      window.addEventListener('storage', handleStorageEvent);
      return () => window.removeEventListener('storage', handleStorageEvent);
    },
    [key],
  );

  const getSnapshot = () => {
    const fullKey = getFullKey(key);
    const value = localStorage.getItem(fullKey);
    if (!value) {
      return initialValue;
    }
    if (JSON.stringify(lastLocalStorageValue.current) !== value) {
      lastLocalStorageValue.current = JSON.parse(value);
    }
    return lastLocalStorageValue.current;
  };

  const getServerSnapshot = () => {
    return initialValue;
  };

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue: SetValue<T> = (v) => {
    const newValue =
      typeof v === 'function' ? (v as (prev: T) => T)(lastLocalStorageValue.current) : v;
    const valueToStore = JSON.stringify(newValue);
    const fullKey = getFullKey(key);
    localStorage.setItem(fullKey, valueToStore);
    lastLocalStorageValue.current = newValue;
    window.dispatchEvent(new StorageEvent('storage', { key: fullKey }));
  };

  return [value, setValue];
};
