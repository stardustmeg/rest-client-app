'use client';

import { Flex, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { Provider } from 'jotai';
import { Select } from '@/app/components/ui/Select';
import { formDataStore } from '@/app/domains/rest-client/atoms';
import { BodyViewer } from '@/app/domains/rest-client/components/BodyViewer';
import { ResponseInformation } from '@/app/domains/rest-client/components/ResponseInformation';
import { RestForm } from '@/app/domains/rest-client/components/RestForm';
import {
  TEMPORARY_LANGUAGES_SELECT_OPTIONS,
  TEMPORARY_VARIANTS_SELECT_OPTIONS,
} from '@/app/domains/rest-client/constants';

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
                <Select options={TEMPORARY_LANGUAGES_SELECT_OPTIONS} name="language" />
                <Select options={TEMPORARY_VARIANTS_SELECT_OPTIONS} name="variant" />
              </Flex>
            </TabsContent>
          </Tabs.Root>
        </div>
      </Flex>
    </Provider>
  );
};
