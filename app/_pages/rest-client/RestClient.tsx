'use client';

import { Button, Flex, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { BodyViewer } from './components/BodyViewer';
import { EndpointInput } from './components/EndpointInput';
import { HeadersEditor } from './components/HeadersEditor';
import { MethodSelector } from './components/MethodSelector';

export const RestClientPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageWrapper>
      <Flex gap="3">
        <form onSubmit={handleSubmit} className="w-full">
          <Flex gap="1">
            <MethodSelector />
            <EndpointInput />
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
        <Separator orientation="vertical" />
        <div className="w-full">
          <BodyViewer readOnly={true} title="Response" type="json" />
        </div>
      </Flex>
    </PageWrapper>
  );
};
