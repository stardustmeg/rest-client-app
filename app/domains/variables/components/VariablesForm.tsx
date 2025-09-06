'use client';
import { Field, Flex, IconButton, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
        <Field.Root invalid={!!errors.name}>
          <Field.Label w="full">
            <Input placeholder="Enter variable name" {...register('name')} />
          </Field.Label>
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.value}>
          <Field.Label w="full">
            <Input placeholder="Enter variable value" {...register('value')} />
          </Field.Label>
          <Field.ErrorText>{errors.value?.message}</Field.ErrorText>
        </Field.Root>
        <IconButton p="2" type="submit" loading={isSubmitting} disabled={!isValid || isSubmitting}>
          Add Variable
        </IconButton>
      </Flex>
    </form>
  );
};
