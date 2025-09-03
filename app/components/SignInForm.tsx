'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormField } from '@/app/components/ui/FormField';
import { useToast } from '@/app/hooks/use-toast';
import {
  getValidationError,
  type SignInFormType,
  signInFormSchema,
} from '@/app/types/form-schemas';
import { useColorPalette } from '../hooks/use-color-palette';

export const SignInForm = () => {
  const { palette } = useColorPalette();
  const { success } = useToast();
  const t = useTranslations('form');
  const tNotification = useTranslations('notifications');
  const tValidation = useTranslations('validation');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = () => success(tNotification('signInSuccess'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button colorPalette={palette} w="full" disabled={!isValid || isSubmitting} type="submit">
          {t('submit')}
        </Button>
      </Stack>
    </form>
  );
};
