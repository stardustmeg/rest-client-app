import type { useTranslations } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { getValidationError } from '@/app/domains/auth/get-validation-error';

function createTValidation(messages: Record<string, string>) {
  type Key = keyof typeof messages;
  type Translator = ((key: Key) => string) & { has: (key: Key) => boolean };

  const t = ((key: Key) => messages[key]) as Translator;
  t.has = (key: Key) => key in messages;

  return t;
}

describe('getValidationError', () => {
  it('should return translation when key exists', () => {
    const tValidation = createTValidation({ required: 'Field is required' }) as ReturnType<
      typeof useTranslations
    >;

    const result = getValidationError(tValidation, 'required');

    expect(result).toBe('Field is required');
  });

  it('should return fallback when message is null', () => {
    const tValidation = createTValidation({ required: 'Field is required' }) as ReturnType<
      typeof useTranslations
    >;

    const result = getValidationError(tValidation, null, '');

    expect(result).toBe('');
  });

  it('should return empty string when message is undefined and no fallback provided', () => {
    const tValidation = createTValidation({ required: 'Field is required' }) as ReturnType<
      typeof useTranslations
    >;

    const result = getValidationError(tValidation, undefined);

    expect(result).toBe('');
  });
});
