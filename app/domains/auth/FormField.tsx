import { Box, Field, Input } from '@chakra-ui/react';
import type { ComponentProps } from 'react';

interface FormFieldProps extends Omit<ComponentProps<typeof Input>, 'children'> {
  error?: string;
  label: string;
}
export const FormField = ({ error, label, ...rest }: FormFieldProps) => (
  <Field.Root invalid={!!error}>
    <Field.Label>{label}</Field.Label>
    <Input variant="subtle" {...rest} />
    <Box minH="6">
      {error ? <Field.ErrorText data-testid="error-field">{error}</Field.ErrorText> : ' '}
    </Box>
  </Field.Root>
);
