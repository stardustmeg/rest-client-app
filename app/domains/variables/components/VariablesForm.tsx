'use client';
import { Flex, IconButton } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormField } from '@/app/components/ui/FormField';
import { getValidationError } from '@/app/domains/auth/get-validation-error';
import { variablesSchema } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';

export const VariablesForm = () => {
  const { username } = useAuth();
  const t = useTranslations('variables');
  const tValidation = useTranslations('validation');
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(variablesSchema),
  });

  const VariableKey = `${username}:variables`;

  const handleAddVariable = (data: unknown) => {
    // biome-ignore lint/suspicious/noConsole: <temp>
    console.log(data, VariableKey);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleAddVariable)}>
      <Flex gap="2">
        <FormField
          variant="outline"
          error={getValidationError(tValidation, errors.name?.message)}
          placeholder={t('name')}
          {...register('name')}
        />

        <FormField
          variant="outline"
          error={getValidationError(tValidation, errors.value?.message)}
          placeholder={t('value')}
          {...register('value')}
        />

        <IconButton
          mt="1.5"
          p="2"
          type="submit"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          {t('addVariable')}
        </IconButton>
      </Flex>
    </form>
  );
};
