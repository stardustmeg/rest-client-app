'use client';
import { Button, Stack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Enabled } from '@/app/components/ui/Enabled';
import { FormField } from '@/app/components/ui/FormField';

interface FormValues {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const t = useTranslations('form');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    return values;
  };

  return (
    <Enabled feature={'signInForm'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <FormField error={errors.email} label={t('email')} register={register('email')} />
          <FormField
            error={errors.password}
            label={t('password')}
            register={register('password')}
          />
          <Button type="submit">{t('submit')}</Button>
        </Stack>
      </form>
    </Enabled>
  );
};
