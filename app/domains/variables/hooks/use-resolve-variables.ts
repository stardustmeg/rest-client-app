import { useAtom } from 'jotai';
import { useCallback } from 'react';
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
  warningFn: (message: string) => void;
}

const PLACEHOLDER_REGEX = /\{\{([^}]+)\}\}/g;

export const useResolveVariables = () => {
  const [variables] = useAtom(variablesAtom);
  const { warning } = useToast();
  const variablesMap = variables.reduce(
    (acc, v) => {
      let key = String(v.name ?? '').trim();
      if (key.startsWith('{{') && key.endsWith('}}')) {
        key = key.slice(2, -2).trim();
      }
      if (key) acc[key] = v.value;
      return acc;
    },
    {} as Record<PropertyKey, string>,
  );

  const resolveVariables = useCallback(
    (data: RestFormData): RestFormData => {
      const newData = structuredClone(data);
      newData.endpoint = replaceInString({
        str: newData.endpoint,
        variablesMap,
        warningFn: warning,
      });

      newData.headers = newData.headers.map((header) => ({
        ...header,
        value: replaceInString({ str: header.value, variablesMap, warningFn: warning }),
      }));

      let bodyContent = newData.body.value;

      try {
        const parsedBody = JSON.parse(bodyContent);
        const resolvedBody = replaceInObject({
          data: parsedBody,
          replaceFn: (str) => replaceInString({ str, variablesMap, warningFn: warning }),
        });
        bodyContent = JSON.stringify(resolvedBody);
      } catch {
        bodyContent = replaceInString({ str: bodyContent, variablesMap, warningFn: warning });
      }
      newData.body = { ...newData.body, value: bodyContent };
      return newData;
    },
    [variablesMap, warning],
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

function replaceInString({ str, variablesMap, warningFn }: ReplacePlaceholdersProps): string {
  return str.replace(PLACEHOLDER_REGEX, (match, varName: string) => {
    const normalized = String(varName).trim();
    const value = variablesMap[normalized];
    if (value === undefined) {
      warningFn(`Variable "${normalized}" is not defined`);
      return match;
    }
    return value;
  });
}
