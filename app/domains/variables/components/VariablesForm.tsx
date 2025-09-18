'use client';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { BsPlusLg } from 'react-icons/bs';
import { FormField } from '@/app/components/ui/FormField';
import { getValidationError } from '@/app/domains/auth/get-validation-error';
import { useVariablesActions } from '@/app/domains/variables/store/variables-store';
import { type Variable, variablesSchema } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';
import { useLocalStorage } from '@/app/hooks/use-local-storage';
import { useToast } from '@/app/hooks/use-toast';

export const VariablesForm = () => {
  const { userId } = useAuth();
  const t = useTranslations('variables');
  const tValidation = useTranslations('validation');
  const { warningToast } = useToast();
  const [variables] = useLocalStorage<Variable[]>(`variables_${userId}`, []);
  const { addVariable } = useVariablesActions();
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

  const handleAddVariable = (data: Variable) => {
    const name = `{{${data.name}}}`;
    if (variables.some((v) => name === v.name)) {
      warningToast(tValidation('variableUniqueNameRequired'));
      return;
    }

    addVariable({ name, value: data.value });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleAddVariable)}>
      <Heading size="2xl" textAlign="center" as="h2">
        {t('title')}
      </Heading>
      <Text pb="6" fontSize="xs" textAlign="center">
        {t('sensitiveData')}
      </Text>
      <Flex gap="2">
        <FormField
          variant="outline"
          size="sm"
          error={getValidationError(tValidation, errors.name?.message)}
          placeholder={t('name')}
          {...register('name')}
        />

        <FormField
          variant="outline"
          size="sm"
          error={getValidationError(tValidation, errors.value?.message)}
          placeholder={t('value')}
          {...register('value')}
        />

        <IconButton
          mt="1.5"
          py="2"
          px="3.5"
          size="sm"
          type="submit"
          data-testid="add-variable"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          <BsPlusLg />
        </IconButton>
      </Flex>
    </form>
  );
};
