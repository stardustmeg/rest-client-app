'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Enabled } from '@/app/components/ui/Enabled';
import { FormField } from '@/app/components/ui/FormField';
import { signInFormSchema } from '@/app/types/form-schemas';

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
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = (values: FormValues) => {
    return values;
  };

  return (
    <Enabled feature={'signInForm'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Fieldset.Root>
            <Fieldset.Legend>Sign In form</Fieldset.Legend>
            <Fieldset.HelperText>Please provide your contact details below.</Fieldset.HelperText>
          </Fieldset.Root>
        </Stack>
        <Stack gap="4" align="flex-start" maxW="lg">
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
