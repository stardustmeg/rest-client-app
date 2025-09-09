import { useEffect, useState } from 'react';

const LS_PREFIX = 'no_no_no_mister_fish_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

const getFullKey = (key: string): string => `${LS_PREFIX}_${key}`;

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(getFullKey(key));
    if (storedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return storedValue as unknown as T;
    }
  });

  useEffect(() => {
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(getFullKey(key), valueToStore);
  }, [key, value]);

  return [value, setValue];
};
