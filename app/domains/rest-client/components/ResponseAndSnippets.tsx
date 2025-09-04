import { Flex, Tabs, TabsContent } from '@chakra-ui/react';
import { Select } from '@/app/components/ui/Select';
import { TEMP_LANGUAGES, TEMP_VARIANTS } from '../constants';
import { BodyViewer } from './BodyViewer';
import { ResponseInformation } from './ResponseInformation';

export const ResponseAndSnippets = () => {
  return (
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
          <Flex gap="3">
            <Select options={TEMP_LANGUAGES} name="language" />
            <Select options={TEMP_VARIANTS} name="variant" />
          </Flex>
        </TabsContent>
      </Tabs.Root>
    </div>
  );
};
