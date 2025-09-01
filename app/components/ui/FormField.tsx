import { Box, Field, Input } from '@chakra-ui/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  error?: FieldError;
  register: UseFormRegisterReturn;
  label: string;
}

export const FormField = ({ error, register, label }: FormFieldProps) => (
  <Field.Root invalid={!!error}>
    <Field.Label>{label}</Field.Label>
    <Input variant="subtle" {...register} />
    <Box minH="6">
      {error ? <Field.ErrorText data-testid="error-field">{error.message}</Field.ErrorText> : ' '}
    </Box>
  </Field.Root>
);
