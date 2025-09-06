'use client';
import { Button, Fieldset, Stack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormField } from '@/app/domains/auth/FormField';
import { type SignInFormType, signInFormSchema } from '@/app/domains/auth/form-schemas';
import { getValidationError } from '@/app/domains/auth/get-validation-error';
import { useAuth } from '@/app/hooks/use-auth';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import { Link } from '@/i18n/routing';

export const SignInForm = () => {
  const { success, error } = useToast();

  const t = useTranslations('form');
  const tNotification = useTranslations('notifications');
  const tValidation = useTranslations('validation');

  const { signIn } = useAuthActions();
  const { isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInFormSchema),
  });

  const handleSignIn = (data: SignInFormType) =>
    signIn(data)
      .then(() => success(tNotification('signInSuccess')))
      .catch(() => error(tNotification('authError')));

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Stack maxW="lg" w="full" mx="auto" p="8">
        <Fieldset.Root>
          <Fieldset.Legend fontSize="xl" fontWeight="bold">
            {t('signInTitle')}
          </Fieldset.Legend>
        </Fieldset.Root>
        <FormField
          error={getValidationError(tValidation, errors.email?.message)}
          label={t('email')}
          {...register('email')}
        />
        <FormField
          error={getValidationError(tValidation, errors.password?.message)}
          label={t('password')}
          {...register('password')}
        />
        <Button loading={isLoading} w="full" disabled={!isValid || isSubmitting} type="submit">
          {t('submit')}
        </Button>

        <Text textAlign="center" fontSize="md">
          {t('noAccount')}{' '}
          <Link className="!text-cyan-600 !font-bold" href="/sign-up">
            {t('signUpHere')}
          </Link>
        </Text>
      </Stack>
    </form>
  );
};
