/** biome-ignore-all lint/nursery/noSecrets: false positive */
import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;
const SPECIAL_CHARACTERS = '!@#$%^&?*';
const SPECIAL_CHARACTERS_REGEX = new RegExp(`[${SPECIAL_CHARACTERS}]`);

export const createTranslatedSchema = (t: (key: string) => string) => {
  const emailSchema = z
    .string()
    .min(1, { error: t('emailRequired') })
    .regex(/^\S+$/, { error: t('emailNoWhitespace') })
    .regex(/(?=.*@)/, { error: t('emailMustContainAt') })
    .regex(/^[^@]+@[^@]+\.[^@]+$/, { error: t('emailMustContainDomain') });

  const passwordSchema = z
    .string()
    .min(MIN_PASSWORD_LENGTH, { error: t('passwordMinLength') })
    .max(MAX_PASSWORD_LENGTH, { error: t('passwordMaxLength') })
    .refine((password) => /[A-Z]/.test(password), { error: t('passwordUppercaseRequired') })
    .refine((password) => /[a-z]/.test(password), { error: t('passwordLowercaseRequired') })
    .refine((password) => /\d/.test(password), { error: t('passwordDigitRequired') })
    .refine((password) => SPECIAL_CHARACTERS_REGEX.test(password), {
      error: t('passwordSpecialCharRequired'),
    })
    .refine((password) => !/\s/.test(password), { error: t('passwordNoWhitespace') });

  return {
    signInFormSchema: z.object({
      email: emailSchema,
      password: passwordSchema,
    }),

    signUpFormSchema: z
      .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, { error: t('confirmPasswordRequired') }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        error: t('passwordsDontMatch'),
        path: ['confirmPassword'],
      }),

    emailSchema,
    passwordSchema,
  };
};

export type SignInFormType = z.infer<ReturnType<typeof createTranslatedSchema>['signInFormSchema']>;
export type SignUpFormType = z.infer<ReturnType<typeof createTranslatedSchema>['signUpFormSchema']>;
