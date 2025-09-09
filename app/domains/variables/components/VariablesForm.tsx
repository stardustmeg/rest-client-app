import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FormField } from '@/app/components/ui/FormField';
import { getValidationError } from '@/app/domains/auth/get-validation-error';
import { useVariablesContext } from '@/app/domains/variables/components/VariablesProvider';
import { type Variable, variablesSchema } from '@/app/domains/variables/types/variables-schema';
import { useToast } from '@/app/hooks/use-toast';

export const VariablesForm = () => {
  const t = useTranslations('variables');
  const tValidation = useTranslations('validation');
  const { warning } = useToast();
  const { addVariable, variables } = useVariablesContext();
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

  const handleAddVariable = (data: Omit<Variable, 'id'>) => {
    if (variables.some((v) => v.name === data.name)) {
      warning(tValidation('variableUniqueNameRequired'));
      return;
    }

    addVariable(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleAddVariable)}>
      <Heading py="4" size="2xl" textAlign="center" as="h2">
        {t('title')}
      </Heading>
      <Text pb="6" fontSize="xs" textAlign="center">
        {t('sensitiveData')}
      </Text>
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
