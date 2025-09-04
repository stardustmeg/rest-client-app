'use client';

import { Button, Flex, NativeSelect, Separator, Tabs, TabsContent } from '@chakra-ui/react';
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
          <div>
            <span>Status: </span>
            <span>Size: </span>
            <span>Time: </span>
          </div>
          <Tabs.Root defaultValue="response">
            <Tabs.List>
              <Tabs.Trigger value="response">Response</Tabs.Trigger>
              <Tabs.Trigger value="code-snippet">Code snippet</Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="response">
              <BodyViewer readOnly={true} title="Response" type="json" />
            </TabsContent>
            <TabsContent value="code-snippet">
              <Flex gap="3">
                <NativeSelect.Root>
                  <NativeSelect.Field name="language">
                    <option value="json">Javascript</option>
                    <option value="text">Dart</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <NativeSelect.Root>
                  <NativeSelect.Field name="language">
                    <option value="fetch">fetch</option>
                    <option value="curl">curl</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Flex>
            </TabsContent>
          </Tabs.Root>
        </div>
      </Flex>
    </PageWrapper>
  );
};
