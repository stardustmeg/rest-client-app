'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Enabled } from '@/app/components/ui/Enabled';
import { FormField } from '@/app/components/ui/FormField';
import { useToast } from '@/app/hooks/useToast';
import { type SignUpFormType, signUpFormSchema } from '@/app/types/form-schemas';

export const SignUpForm = () => {
  const t = useTranslations('form');
  const { success } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = () => success('Form submitted');

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
            // biome-ignore lint/nursery/noSecrets: <zaebal>
            label={t('confirmPassword')}
            // biome-ignore lint/nursery/noSecrets: <zaebal x2>
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
