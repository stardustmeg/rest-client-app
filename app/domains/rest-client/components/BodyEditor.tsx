'use client';

import { Button, Flex } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';

export type BodyEditorContentType = 'json' | 'text';

export interface BodyEditorRequestBody {
  type: BodyEditorContentType;
  value: string;
}

export interface BodyEditorProps {
  type: BodyEditorContentType;
  onChange?(payload: { value: string; type: BodyEditorContentType }): void;
  onFormat?(): void;
  dataTestId?: string;
  buttonFormatText?: string;
  readOnly: boolean;
  value?: string;
  title?: string;
  theme?: string;
}

export const BodyEditor = ({
  readOnly,
  theme,
  type,
  onChange,
  onFormat,
  dataTestId,
  value,
  buttonFormatText,
  title,
}: BodyEditorProps) => {
  return (
    <div data-testid={dataTestId}>
      <Flex align="center" justify="space-between" height="10">
        {title && <p data-testid="body-editor-title">{title}</p>}
        {type === 'json' && !readOnly && (
          <Button
            data-testid="body-editor-format-button"
            size="xs"
            variant="ghost"
            onClick={onFormat}
          >
            {buttonFormatText ?? 'Format'}
          </Button>
        )}
      </Flex>
      <Editor
        language={type}
        height="70dvh"
        options={{ readOnly }}
        value={value}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        onChange={(v) => {
          onChange?.({ type, value: v ?? '' });
        }}
      />
    </div>
  );
};
