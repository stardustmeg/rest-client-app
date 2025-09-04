import { Button, Flex, Stack, Textarea } from '@chakra-ui/react';

export type BodyViewerContentType = 'json' | 'text';

export interface BodyViewerProps {
  readOnly: boolean;
  title: string;
  type: BodyViewerContentType;
  name?: string;
}

export const BodyViewer = ({ readOnly, title, type, name }: BodyViewerProps) => {
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
      <Textarea height="full" resize="vertical" readOnly={readOnly} name={name} />
    </Stack>
  );
};
