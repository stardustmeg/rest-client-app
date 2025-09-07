import { Box, Field, Input, type InputProps } from '@chakra-ui/react';
import type { ComponentProps } from 'react';

interface FormFieldProps extends Omit<ComponentProps<typeof Input>, 'children'> {
  error?: string;
  label?: string;
  variant?: InputProps['variant'];
}
export const FormField = ({ error, label, variant = 'subtle', ...rest }: FormFieldProps) => (
  <Field.Root invalid={!!error}>
    <Field.Label>{label}</Field.Label>
    <Input variant={variant} {...rest} />
    <Box minH="6">
      {error ? <Field.ErrorText data-testid="error-field">{error}</Field.ErrorText> : ' '}
    </Box>
  </Field.Root>
);
