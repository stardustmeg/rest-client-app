'use client';

import { Button, Flex, Input, NativeSelect, Tabs, TabsContent } from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';

const METHODS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

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
              <TabsContent value="json">JeSon</TabsContent>
              <TabsContent value="text">Plain text</TabsContent>
            </Tabs.Root>
          </TabsContent>
        </Tabs.Root>
      </form>
    </PageWrapper>
  );
};
