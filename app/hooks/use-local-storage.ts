import { useCallback, useSyncExternalStore } from 'react';

const LS_PREFIX = 'no_no_no_mister_fish_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

const getFullKey = (key: string): string => `${LS_PREFIX}_${key}`;

type LocalStorageSubscriber = () => void;

const subscribers = new Map<string, Set<LocalStorageSubscriber>>();

const getSubscribers = (key: string): Set<LocalStorageSubscriber> => {
  if (!subscribers.has(key)) {
    subscribers.set(key, new Set());
  }
  const subs = subscribers.get(key);
  if (!subs) {
    throw new Error(`Failed to get subscribers for key: ${key}`);
  }
  return subs;
};

const notifySubscribers = (key: string): void => {
  const subs = getSubscribers(key);
  subs.forEach((callback) => {
    callback();
  });
};

const subscribe = (key: string, callback: LocalStorageSubscriber): (() => void) => {
  const subs = getSubscribers(key);
  subs.add(callback);

  const handleStorageEvent = (event: StorageEvent): void => {
    if (event.key === getFullKey(key)) {
      callback();
    }
  };

  window.addEventListener('storage', handleStorageEvent);

  return () => {
    subs.delete(callback);
    window.removeEventListener('storage', handleStorageEvent);
  };
};

const getSnapshot = <T>(key: string, defaultValue: T): T => {
  const fullKey = getFullKey(key);

  try {
    const storedValue = localStorage.getItem(fullKey);
    if (storedValue === null) {
      return defaultValue;
    }

    return JSON.parse(storedValue) as T;
  } catch {
    const storedValue = localStorage.getItem(fullKey);
    return (storedValue as T) || defaultValue;
  }
};

const getServerSnapshot = <T>(defaultValue: T): T => {
  return defaultValue;
};

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const snapshot = useSyncExternalStore(
    useCallback((callback) => subscribe(key, callback), [key]),
    useCallback(() => getSnapshot(key, defaultValue), [key, defaultValue]),
    useCallback(() => getServerSnapshot(defaultValue), [defaultValue]),
  );

  const setValue = useCallback(
    (value: T): void => {
      const fullKey = getFullKey(key);
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);

      localStorage.setItem(fullKey, valueToStore);
      notifySubscribers(key);
    },
    [key],
  );

  return [snapshot, setValue];
};
