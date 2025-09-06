'use client';

import { Button, Flex, Stack, Textarea } from '@chakra-ui/react';

export type BodyEditorContentType = 'json' | 'text';

export interface BodyEditorProps {
  readOnly: boolean;
  title: string;
  type: BodyEditorContentType;
  name?: string;
  onChange?(value: string): void;
}

export const BodyEditor = ({ readOnly, title, type, name, onChange }: BodyEditorProps) => {
  return (
    <Stack>
      <Flex align="center" justify="space-between" height="10">
        <p>{title}</p>
        {type === 'json' && !readOnly && (
          <Button size="xs" variant="ghost">
            Format
          </Button>
        )}
      </Flex>
      <Textarea
        height="full"
        resize="vertical"
        readOnly={readOnly}
        name={name}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Stack>
  );
};
