import type { useTranslations } from 'next-intl';
import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;
const SPECIAL_CHARACTERS = '!@#$%^&?*';
const SPECIAL_CHARACTERS_REGEX = new RegExp(`[${SPECIAL_CHARACTERS}]`);

const emailErrorKeys = {
  required: 'emailRequired',
  noWhitespace: 'emailNoWhitespace',
  mustContainAt: 'emailMustContainAt',
  mustContainDomain: 'emailMustContainDomain',
} as const;

const passwordErrorKeys = {
  minLength: 'passwordMinLength',
  maxLength: 'passwordMaxLength',
  uppercaseRequired: 'passwordUppercaseRequired',
  lowercaseRequired: 'passwordLowercaseRequired',
  digitRequired: 'passwordDigitRequired',
  specialCharRequired: 'passwordSpecialCharRequired',
  noWhitespace: 'passwordNoWhitespace',
} as const;

const confirmPasswordErrorKeys = {
  required: 'confirmPasswordRequired',
  dontMatch: 'passwordsDontMatch',
} as const;

const emailSchema = z
  .string()
  .min(1, { error: emailErrorKeys.required })
  .regex(/^\S+$/, { error: emailErrorKeys.noWhitespace })
  .regex(/(?=.*@)/, { error: emailErrorKeys.mustContainAt })
  .regex(/^[^@]+@[^@]+\.[^@]+$/, { error: emailErrorKeys.mustContainDomain });

const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, { error: passwordErrorKeys.minLength })
  .max(MAX_PASSWORD_LENGTH, { error: passwordErrorKeys.maxLength })
  .refine((password) => /[A-Z]/.test(password), { error: passwordErrorKeys.uppercaseRequired })
  .refine((password) => /[a-z]/.test(password), { error: passwordErrorKeys.lowercaseRequired })
  .refine((password) => /\d/.test(password), { error: passwordErrorKeys.digitRequired })
  .refine((password) => SPECIAL_CHARACTERS_REGEX.test(password), {
    error: passwordErrorKeys.specialCharRequired,
  })
  .refine((password) => !/\s/.test(password), { error: passwordErrorKeys.noWhitespace });

export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpFormSchema = signInFormSchema
  .extend({
    confirmPassword: z.string().min(1, { message: confirmPasswordErrorKeys.required }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: confirmPasswordErrorKeys.dontMatch,
    path: ['confirmPassword'],
  });

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

export type SignInFormType = z.infer<typeof signInFormSchema>;
export type SignUpFormType = z.infer<typeof signUpFormSchema>;
