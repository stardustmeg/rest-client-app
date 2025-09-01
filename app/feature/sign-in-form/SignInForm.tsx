'use client';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Enabled } from '@/app/components/ui/Enabled';
import { FormField } from '@/app/components/ui/FormField';
import { useToast } from '@/app/hooks/useToast';
import { type SignInFormType, signInFormSchema } from '@/app/types/form-schemas';

export const SignInForm = () => {
  const t = useTranslations('form');
  const { success } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = () => success('Form submitted');

  return (
    <Enabled feature="signInForm">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button colorPalette="pink" w="full" disabled={!isValid || isSubmitting} type="submit">
            {t('submit')}
          </Button>
        </Stack>
      </form>
    </Enabled>
  );
};
