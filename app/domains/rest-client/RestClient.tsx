'use client';

import { Flex, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { Provider } from 'jotai';
import { formDataStore } from './atoms';
import { BodyEditor } from './components/BodyEditor';
import { CodeGeneration } from './components/CodeGeneration';
import { ResponseInformation } from './components/ResponseInformation';
import { RestForm, type RestFormData } from './components/RestForm';

export const RestClient = () => {
  const handleFormSubmit = (data: RestFormData) => {
    // biome-ignore lint/suspicious/noConsole: <shhhhhhhhhhhh>
    console.log(data);
  };

  return (
    <Provider store={formDataStore}>
      <Flex gap="3">
        <RestForm onSubmit={handleFormSubmit} />
        <Separator orientation="vertical" />
        <div className="w-full max-w-[48%]">
          <ResponseInformation />
          {/* TODO (ripetchor): change to default response */}
          <Tabs.Root defaultValue="code-snippet">
            <Tabs.List>
              <Tabs.Trigger value="response">Response</Tabs.Trigger>
              <Tabs.Trigger value="code-snippet">Code snippet</Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="response">
              <BodyEditor readOnly={true} title="Response" type="json" />
            </TabsContent>
            <TabsContent value="code-snippet">
              <CodeGeneration />
            </TabsContent>
          </Tabs.Root>
        </div>
      </Flex>
    </Provider>
  );
};
