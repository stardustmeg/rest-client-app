import { Field, Input } from '@chakra-ui/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  label: string;
}

export const FormField = ({ error, register, label }: FormFieldProps) => {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label>{label}</Field.Label>
      <Input {...register} />
      {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  );
};
