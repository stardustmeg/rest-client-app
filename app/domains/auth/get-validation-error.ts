import type { useTranslations } from 'next-intl';

export type FormMessage = Parameters<ReturnType<typeof useTranslations<'form'>>>[0];

type ValidationMessage = Parameters<ReturnType<typeof useTranslations<'validation'>>>[0];

export function getValidationError(
  tValidation: ReturnType<typeof useTranslations<'validation'>>,
  message: unknown,
  fallback = '',
): string {
  if (!message) {
    return fallback;
  }

  return tValidation.has(message as ValidationMessage)
    ? tValidation(message as ValidationMessage)
    : fallback;
}
