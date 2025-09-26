import { useCallback, useRef, useSyncExternalStore } from 'react';

const LS_PREFIX = 'no_no_no_mister_fish';

const getFullKey = (key: string): string => `${LS_PREFIX}_${key}`;

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const fullKey = getFullKey(key);
  const lastLocalStorageValue = useRef(initialValue);

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorageEvent = (event: StorageEvent) => {
        if (event.key === fullKey) {
          callback();
        }
      };
      window.addEventListener('storage', handleStorageEvent);
      return () => window.removeEventListener('storage', handleStorageEvent);
    },
    [fullKey],
  );

  const getSnapshot = () => {
    const savedValue = localStorage.getItem(fullKey);
    if (savedValue && JSON.stringify(lastLocalStorageValue.current) !== savedValue) {
      lastLocalStorageValue.current = JSON.parse(savedValue);
    }
    return lastLocalStorageValue.current;
  };

  const getServerSnapshot = () => initialValue;

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue: SetValue<T> = useCallback(
    (v) => {
      const newValue =
        typeof v === 'function' ? (v as (prev: T) => T)(lastLocalStorageValue.current) : v;
      const valueToStore = JSON.stringify(newValue);
      localStorage.setItem(fullKey, valueToStore);
      lastLocalStorageValue.current = newValue;
      window.dispatchEvent(new StorageEvent('storage', { key: fullKey }));
    },
    [fullKey],
  );

  return [value, setValue];
};
