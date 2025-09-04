'use client';

import { Button, Flex, Input, Tabs, TabsContent } from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { Select } from '@/app/components/ui/Select';
import { TEMP_METHODS } from '../constants';
import { BodyViewer } from './BodyViewer';
import { HeadersEditor } from './HeadersEditor';

export const RestForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Flex gap="1">
        <Select options={TEMP_METHODS} placeholder="Method" />
        <Input name="endpoint" placeholder="Endpoint" />
        <Button type="submit">Send</Button>
      </Flex>
      <Tabs.Root defaultValue="headers">
        <Tabs.List>
          <Tabs.Trigger value="headers">Headers</Tabs.Trigger>
          <Tabs.Trigger value="body">Body</Tabs.Trigger>
        </Tabs.List>
        <TabsContent value="headers">
          <HeadersEditor />
        </TabsContent>
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
  );
};
