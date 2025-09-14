import { getDefaultStore, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import type { RestFormData } from '@/app/domains/rest-client/components/RestForm';
import { variablesAtom } from '@/app/domains/variables/store/variables-store';
import { useToast } from '@/app/hooks/use-toast';

interface ReplaceInObjectProps {
  data: unknown;
  replaceFn: (str: string) => string;
}

interface ReplacePlaceholdersProps {
  str: string;
  variablesMap: Record<PropertyKey, string>;
  errorFn: (message: string) => void;
}

const PLACEHOLDER_REGEX = /\{\{([^}]+)\}\}/g;

export const useResolveVariables = () => {
  const defaultStore = getDefaultStore();
  const [variables] = useAtom(variablesAtom, { store: defaultStore });
  const { error } = useToast();
  const variablesMap = useMemo(
    () =>
      variables.reduce(
        (acc, v) => {
          let key = String(v.name ?? '').trim();
          if (key.startsWith('{{') && key.endsWith('}}')) {
            key = key.slice(2, -2).trim();
          }
          if (key) acc[key] = v.value;
          return acc;
        },
        {} as Record<PropertyKey, string>,
      ),
    [variables],
  );

  const resolveVariables = useCallback(
    (data: RestFormData): RestFormData => {
      const newData = structuredClone(data);
      newData.endpoint = replaceInString({
        str: newData.endpoint,
        variablesMap,
        errorFn: error,
      });

      newData.headers = newData.headers.map((header) => ({
        ...header,
        value: replaceInString({ str: header.value, variablesMap, errorFn: error }),
      }));

      let bodyContent = newData.body.value;

      try {
        const parsedBody = JSON.parse(bodyContent);
        const resolvedBody = replaceInObject({
          data: parsedBody,
          replaceFn: (str) => replaceInString({ str, variablesMap, errorFn: error }),
        });
        bodyContent = JSON.stringify(resolvedBody);
      } catch {
        bodyContent = replaceInString({ str: bodyContent, variablesMap, errorFn: error });
      }
      newData.body = { ...newData.body, value: bodyContent };
      return newData;
    },
    [variablesMap, error],
  );

  return { resolveVariables };
};

function replaceInObject({
  data,
  replaceFn,
}: ReplaceInObjectProps): string | string[] | Record<PropertyKey, string> | unknown {
  if (typeof data === 'string') {
    return replaceFn(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => replaceInObject({ data: item, replaceFn }));
  }

  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        replaceInObject({ data: value, replaceFn }),
      ]),
    );
  }
  return data;
}

function replaceInString({ str, variablesMap, errorFn }: ReplacePlaceholdersProps): string {
  return str.replace(PLACEHOLDER_REGEX, (_match, varName: string) => {
    const normalized = String(varName).trim();
    const value = variablesMap[normalized];
    if (value === undefined) {
      const errorMessage = `Variable "${normalized}" is not defined`;
      errorFn(errorMessage);
      throw new Error(errorMessage);
    }
    return value;
  });
}
