'use client';

import { Button, Flex, Input, Tabs, TabsContent } from '@chakra-ui/react';
import { useSetAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { Select } from '@/app/components/ui/Select';
import { httpRequestMethodAtom, requestBodyAtom, requestEndpointAtom } from '../atoms';
import { TEMP_METHODS } from '../constants';
import { BodyViewer } from './BodyViewer';
import { HeadersEditor } from './HeadersEditor';

export const RestForm = () => {
  const setEndpoint = useSetAtom(requestEndpointAtom);
  const setHttpMethod = useSetAtom(httpRequestMethodAtom);
  const setRequestBody = useSetAtom(requestBodyAtom);

  const handleMethodChange = (v: string) => {
    setHttpMethod(v);
  };

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // biome-ignore lint/suspicious/noConsole: <Because i can!>
    console.log(Object.fromEntries(data));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Flex gap="1">
        <Select onValueChange={handleMethodChange} options={TEMP_METHODS} name="method" />
        <Input name="endpoint" placeholder="Endpoint" onChange={handleEndpointChange} />
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
              <BodyViewer
                readOnly={false}
                title="JSON Content"
                type="json"
                onChange={setRequestBody}
              />
            </TabsContent>
            <TabsContent value="text">
              <BodyViewer
                readOnly={false}
                title="Text Content"
                type="text"
                onChange={setRequestBody}
              />
            </TabsContent>
          </Tabs.Root>
        </TabsContent>
      </Tabs.Root>
    </form>
  );
};
