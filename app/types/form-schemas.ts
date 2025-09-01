import { z } from 'zod';

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;
export const SPEC_CHARACTERS = '!@#$%^&?*';

const emailSchema = z
  .string()
  .min(1, { error: 'Email cannot be empty' })
  .regex(/^\S+$/, { error: 'Email must not contain any whitespace' })
  .regex(/(?=.*@)/, {
    error: "Email must contain an '@' symbol separating local part and domain name",
  })
  .regex(/^[^@]+@[^@]+\.[^@]+$/, { error: 'Email must contain a domain name (e.g., example.com)' });

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, {
    error: `Password must be at least ${MIN_PASSWORD_LENGTH.toString()} characters long`,
  })
  .max(MAX_PASSWORD_LENGTH, {
    error: `Password  must be no more than ${MAX_PASSWORD_LENGTH.toString()} characters`,
  })
  .refine((password) => /[A-Z]/.test(password), {
    error: 'Password must contain at least one uppercase letter (A-Z)',
  })
  .refine((password) => /[a-z]/.test(password), {
    error: 'Password must contain at least one lowercase letter (a-z)',
  })
  .refine((password) => /[0-9]/.test(password), {
    error: 'Password must contain at least one digit (0-9)',
  })
  .refine((password) => /[!@#$%^&?*]/.test(password), {
    error: `Password must contain at least one special character (e.g., ${SPEC_CHARACTERS.toString()})`,
  })
  .refine((password) => !/\s/.test(password), {
    error: 'Password must not contain any whitespace characters',
  });

export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    // biome-ignore lint/nursery/noSecrets: <this is not sensitive data>
    path: ['confirmPassword'],
    when(payload) {
      return signUpFormSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });

export type SignInFormType = z.infer<typeof signInFormSchema>;
export type SignUpFormType = z.infer<typeof signUpFormSchema>;
