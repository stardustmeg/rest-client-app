'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Enabled } from '@/app/components/ui/Enabled';
import { FormField } from '@/app/components/ui/FormField';
import { useAuth } from '@/app/hooks/use-auth';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import { createTranslatedSchema, type SignUpFormType } from '@/app/types/form-schemas';

export const SignUpForm = () => {
  const { success, error } = useToast();

  const t = useTranslations('form');
  const tNotification = useTranslations('notifications');
  const tValidation = useTranslations('validation');

  const { signUp } = useAuthActions();
  const { isLoading } = useAuth();

  const { signUpFormSchema } = createTranslatedSchema(tValidation);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpFormSchema),
  });

  const handleSignUp = (data: SignUpFormType) => {
    signUp(data)
      .then(() => success(tNotification('signUpSuccess')))
      .catch(() => error(tNotification('authError')));
  };

  return (
    <Enabled feature="signUpForm">
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Stack maxW="lg" w="full" mx="auto" p="8">
          <Fieldset.Root>
            <Fieldset.Legend fontSize="xl" fontWeight="bold">
              {t('signUpTitle')}
            </Fieldset.Legend>
          </Fieldset.Root>
          <FormField error={errors.email} label={t('email')} register={register('email')} />
          <FormField
            error={errors.password}
            label={t('password')}
            register={register('password')}
          />
          <FormField
            error={errors.confirmPassword}
            label={t('confirmPassword')}
            register={register('confirmPassword')}
          />
          <Button loading={isLoading} w="full" disabled={!isValid || isSubmitting} type="submit">
            {t('submit')}
          </Button>
        </Stack>
      </form>
    </Enabled>
  );
};
