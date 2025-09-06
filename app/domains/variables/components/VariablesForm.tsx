'use client';
import { Flex, IconButton } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField } from '@/app/components/ui/FormField';
import { variablesSchema } from '@/app/domains/variables/types/variables-schema';
import { useAuth } from '@/app/hooks/use-auth';

export const VariablesForm = () => {
  const { username } = useAuth();
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
        <FormField error={errors.name?.message} placeholder="Name" {...register('name')} />

        <FormField error={errors.value?.message} placeholder="Value" {...register('value')} />

        <IconButton
          mt="1.5"
          p="2"
          type="submit"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          Add Variable
        </IconButton>
      </Flex>
    </form>
  );
};
