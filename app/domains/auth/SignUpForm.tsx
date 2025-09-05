'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormField } from '@/app/components/ui/FormField';
import { type SignUpFormType, signUpFormSchema } from '@/app/domains/auth/form-schemas';
import { getValidationError } from '@/app/domains/auth/get-validation-error';
import { useAuth } from '@/app/hooks/use-auth';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';

export const SignUpForm = () => {
  const { success, error } = useToast();

  const t = useTranslations('form');
  const tNotification = useTranslations('notifications');
  const tValidation = useTranslations('validation');

  const { signUp } = useAuthActions();
  const { isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpFormSchema),
  });

  const handleSignUp = (data: SignUpFormType) =>
    signUp(data)
      .then(() => success(tNotification('signUpSuccess')))
      .catch(() => error(tNotification('authError')));

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Stack maxW="lg" w="full" mx="auto" p="8">
        <Fieldset.Root>
          <Fieldset.Legend fontSize="xl" fontWeight="bold">
            {t('signUpTitle')}
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
        <FormField
          error={getValidationError(tValidation, errors.confirmPassword?.message)}
          label={t('confirmPassword')}
          {...register('confirmPassword')}
        />
        <Button loading={isLoading} w="full" disabled={!isValid || isSubmitting} type="submit">
          {t('submit')}
        </Button>
      </Stack>
    </form>
  );
};
