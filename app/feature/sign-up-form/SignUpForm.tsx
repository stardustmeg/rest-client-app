'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Enabled } from '@/app/components/ui/Enabled';
import { FormField } from '@/app/components/ui/FormField';
import { useToast } from '@/app/hooks/useToast';
import { createTranslatedSchema, type SignUpFormType } from '@/app/types/form-schemas';

export const SignUpForm = () => {
  const { success } = useToast();
  const t = useTranslations('form');
  const tNotification = useTranslations('notifications');
  const tValidation = useTranslations('validation');
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

  const onSubmit = () => success(tNotification('signUpSuccess'));

  return (
    <Enabled feature="signUpForm">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button colorPalette="pink" w="full" disabled={!isValid || isSubmitting} type="submit">
            {t('submit')}
          </Button>
        </Stack>
      </form>
    </Enabled>
  );
};
