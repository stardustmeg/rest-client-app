import { Flex, Tabs, TabsContent } from '@chakra-ui/react';
import { Select } from '@/app/components/ui/Select';
import { TEMP_LANGUAGES, TEMP_VARIANTS } from '../constants';
import { BodyViewer } from './BodyViewer';

export const ResponseAndSnippets = () => {
  return (
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
            <Select options={TEMP_LANGUAGES} placeholder="Language" />
            <Select options={TEMP_VARIANTS} placeholder="Variant" />
          </Flex>
        </TabsContent>
      </Tabs.Root>
    </div>
  );
};
