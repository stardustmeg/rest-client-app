'use client';

import { Flex, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { Provider } from 'jotai';
import { Select } from '@/app/components/ui/Select';
import { formDataStore } from './atoms';
import { BodyViewer } from './components/BodyViewer';
import { ResponseInformation } from './components/ResponseInformation';
import { RestForm } from './components/RestForm';
import { TEMP_LANGUAGES, TEMP_VARIANTS } from './constants';

export const RestClient = () => {
  return (
    <Provider store={formDataStore}>
      <Flex gap="3">
        <RestForm />
        <Separator orientation="vertical" />
        <div className="w-full">
          <ResponseInformation />
          <Tabs.Root defaultValue="response">
            <Tabs.List>
              <Tabs.Trigger value="response">Response</Tabs.Trigger>
              <Tabs.Trigger value="code-snippet">Code snippet</Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="response">
              <BodyViewer readOnly={true} title="Response" type="json" />
            </TabsContent>
            <TabsContent value="code-snippet">
              {/* TODO (ripetchor): extract to separate component */}
              <Flex gap="3">
                <Select options={TEMP_LANGUAGES} name="language" />
                <Select options={TEMP_VARIANTS} name="variant" />
              </Flex>
            </TabsContent>
          </Tabs.Root>
        </div>
      </Flex>
    </Provider>
  );
};
