import { useCallback, useSyncExternalStore } from 'react';

const LS_PREFIX = 'no_no_no_mister_fish_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

export const getFullKey = (key: string): string => `${LS_PREFIX}_${key}`;

type SetValue<T> = (value: T | ((prev: T) => T)) => void;
type UseLocalStorageReturn<T> = [T, SetValue<T>];

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturn<T> => {
  let lastLocalStorageValue: T = initialValue;

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorageEvent = (e: StorageEvent) => {
        if (e.key === getFullKey(key)) {
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
    if (JSON.stringify(lastLocalStorageValue) !== value) {
      lastLocalStorageValue = JSON.parse(value);
    }
    return lastLocalStorageValue;
  };

  const getServerSnapshot = () => {
    return initialValue;
  };

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue: SetValue<T> = (v) => {
    const newValue = typeof v === 'function' ? (v as (prev: T) => T)(lastLocalStorageValue) : v;
    const valueToStore = JSON.stringify(newValue);
    const fullKey = getFullKey(key);
    localStorage.setItem(fullKey, valueToStore);
    lastLocalStorageValue = newValue;
    window.dispatchEvent(new StorageEvent('storage', { key: fullKey }));
  };

  return [value, setValue];
};
