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
import { createTranslatedSchema, type SignInFormType } from '@/app/types/form-schemas';

export const SignInForm = () => {
  const { success, error } = useToast();

  const t = useTranslations('form');
  const tNotification = useTranslations('notifications');
  const tValidation = useTranslations('validation');

  const { signIn } = useAuthActions();
  const { isLoading } = useAuth();

  const { signInFormSchema } = createTranslatedSchema(tValidation);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInFormSchema),
  });

  const handleSignIn = (data: SignInFormType) => {
    signIn(data)
      .then(() => success(tNotification('signInSuccess')))
      .catch(() => error(tNotification('authError')));
  };

  return (
    <Enabled feature="signInForm">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Stack maxW="lg" w="full" mx="auto" p="8">
          <Fieldset.Root>
            <Fieldset.Legend fontSize="xl" fontWeight="bold">
              {t('signInTitle')}
            </Fieldset.Legend>
          </Fieldset.Root>
          <FormField error={errors.email} label={t('email')} register={register('email')} />
          <FormField
            error={errors.password}
            label={t('password')}
            register={register('password')}
          />
          <Button loading={isLoading} w="full" disabled={!isValid || isSubmitting} type="submit">
            {t('submit')}
          </Button>
        </Stack>
      </form>
    </Enabled>
  );
};
