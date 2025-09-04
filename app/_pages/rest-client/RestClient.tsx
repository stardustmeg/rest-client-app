'use client';

import { Button, Flex, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { Select } from '@/app/components/ui/Select';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { BodyViewer } from './components/BodyViewer';
import { EndpointInput } from './components/EndpointInput';
import { HeadersEditor } from './components/HeadersEditor';

const METHODS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

const LANGUAGES = [
  { value: 'js', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
];

const VARIANTS = [
  { value: 'fetch', label: 'Fetch' },
  { value: 'curl', label: 'Curl' },
];

export const RestClientPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageWrapper>
      <Flex gap="3">
        <form onSubmit={handleSubmit} className="w-full">
          <Flex gap="1">
            <Select options={METHODS} placeholder="Method" />
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
                <Select options={LANGUAGES} placeholder="Language" />
                <Select options={VARIANTS} placeholder="Variant" />
              </Flex>
            </TabsContent>
          </Tabs.Root>
        </div>
      </Flex>
    </PageWrapper>
  );
};
