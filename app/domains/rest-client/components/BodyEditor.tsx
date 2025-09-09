'use client';

import { Button, Flex, Stack, Textarea, type TextareaProps } from '@chakra-ui/react';

export type BodyEditorContentType = 'json' | 'text';

export interface BodyEditorRequestBody {
  type: BodyEditorContentType;
  value: string;
}

export type BodyEditorProps = Omit<TextareaProps, 'onChange'> & {
  type: BodyEditorContentType;
  onChange?(props: { value: string; type: BodyEditorContentType }): void;
  dataTestId?: string;
  buttonFormatText?: string;
};

export const BodyEditor = ({
  readOnly,
  title,
  type,
  name,
  onChange,
  value,
  dataTestId,
  buttonFormatText,
}: BodyEditorProps) => {
  return (
    <Stack>
      <Flex align="center" justify="space-between" height="10">
        {title && <p data-testid="body-editor-title">{title}</p>}
        {type === 'json' && !readOnly && (
          <Button data-testid="body-editor-format-button" size="xs" variant="ghost">
            {buttonFormatText ?? 'Format'}
          </Button>
        )}
      </Flex>
      <Textarea
        data-testid={dataTestId}
        height="full"
        resize="vertical"
        readOnly={readOnly}
        value={value}
        name={name}
        onChange={(e) => onChange?.({ type, value: e.target.value })}
      />
    </Stack>
  );
};
