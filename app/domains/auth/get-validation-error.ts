import type { useTranslations } from 'next-intl';

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
