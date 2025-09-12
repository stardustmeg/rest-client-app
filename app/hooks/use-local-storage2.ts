import { useCallback, useMemo, useSyncExternalStore } from 'react';

type Nullable<T> = T | null | undefined;

const LS_PREFIX = 'no_no_no_mister_fish_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';
export const getFullKey = (key: string): string => `${LS_PREFIX}_${key}`;
const getServerSnapshot = () => null;
const getItemByKey = (key: string) => localStorage.getItem(getFullKey(key));
const setItemWithKey = (key: string, value: string) => localStorage.setItem(getFullKey(key), value);
const keysEquals = (k1: Nullable<string>, k2: Nullable<string>) =>
  k1 && k2 && getFullKey(k1) === getFullKey(k2);

const STORE_CHANGE = 'ceStoreChange';

declare global {
  interface WindowEventMap {
    [STORE_CHANGE]: CustomEvent;
  }
}

export const useLocalStorage2 = <T>(key: string, defaultValue?: T) => {
  const getSnapshot = useCallback(() => getItemByKey(key), [key]);

  const subscribe = useCallback(
    (rerender: () => void) => {
      const handleStorageEvent = (e: CustomEvent) => keysEquals(e.detail.key, key) && rerender();
      window.addEventListener(STORE_CHANGE, handleStorageEvent);
      return () => window.removeEventListener(STORE_CHANGE, handleStorageEvent);
    },
    [key],
  );

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<T>(() => {
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  }, [storedValue, defaultValue]);

  const setValue = useCallback(
    (val: T) => {
      setItemWithKey(key, JSON.stringify(val));
      window.dispatchEvent(new CustomEvent(STORE_CHANGE, { detail: { key } }));
    },
    [key],
  );

  return useMemo(() => [value, setValue] as const, [value, setValue]);
};
