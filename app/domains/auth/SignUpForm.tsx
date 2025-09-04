'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormField } from '@/app/components/ui/FormField';
import { useToast } from '@/app/hooks/use-toast';
import { type SignUpFormType, signUpFormSchema } from './form-schemas';
import { getValidationError } from './get-validation-error';

export const SignUpForm = () => {
  const { success } = useToast();
  const t = useTranslations('form');
  const tNotification = useTranslations('notifications');
  const tValidation = useTranslations('validation');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = () => success(tNotification('signUpSuccess'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button w="full" disabled={!isValid || isSubmitting} type="submit">
          {t('submit')}
        </Button>
      </Stack>
    </form>
  );
};
