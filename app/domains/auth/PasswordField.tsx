import { Box, Field } from '@chakra-ui/react';
import { PasswordInput } from '@/app/components/ui/PasswordInput';

interface PasswordFieldProps {
  error?: string;
  label: string;
  variant?: string;
}

export const PasswordField = ({ error, variant, label, ...rest }: PasswordFieldProps) => (
  <Field.Root invalid={!!error}>
    <Field.Label>{label}</Field.Label>
    <PasswordInput {...rest} />
    <Box minH="6">
      {error ? <Field.ErrorText data-testid="error-field">{error}</Field.ErrorText> : ' '}
    </Box>
  </Field.Root>
);
