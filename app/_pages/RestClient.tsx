'use client';

import {
  Button,
  Flex,
  Input,
  NativeSelect,
  Stack,
  Tabs,
  TabsContent,
  Textarea,
} from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';

const METHODS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

type BodyViewerContentType = 'json' | 'text';

interface BodyViewerProps {
  readOnly: boolean;
  title: string;
  type: BodyViewerContentType;
}

const BodyViewer = ({ readOnly, title, type }: BodyViewerProps) => {
  return (
    <Stack>
      <Flex align="center" justify="space-between" height="10">
        <p>{title}</p>
        {type === 'json' && (
          <Button size="xs" variant="ghost">
            Format
          </Button>
        )}
      </Flex>
      <Textarea resize="vertical" readOnly={readOnly} />
    </Stack>
  );
};

export const RestClientPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <Flex gap="1">
          <NativeSelect.Root>
            <NativeSelect.Field>
              {METHODS.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Input name="endpoint-url" placeholder="Endpoint url" />
          <Button type="submit">Send</Button>
        </Flex>
        <Tabs.Root defaultValue="headers">
          <Tabs.List>
            <Tabs.Trigger value="headers">Headers</Tabs.Trigger>
            <Tabs.Trigger value="body">Body</Tabs.Trigger>
          </Tabs.List>
          <TabsContent value="headers">headers</TabsContent>
          <TabsContent value="body">
            <Tabs.Root defaultValue="json">
              <Tabs.List>
                <Tabs.Trigger value="json">JSON</Tabs.Trigger>
                <Tabs.Trigger value="text">Text</Tabs.Trigger>
              </Tabs.List>
              <TabsContent value="json">
                <BodyViewer readOnly={false} title="JSON Content" type="json" />
              </TabsContent>
              <TabsContent value="text">
                <BodyViewer readOnly={false} title="Text Content" type="text" />
              </TabsContent>
            </Tabs.Root>
          </TabsContent>
        </Tabs.Root>
      </form>
    </PageWrapper>
  );
};
