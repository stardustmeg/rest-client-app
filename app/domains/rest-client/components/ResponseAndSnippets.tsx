import { Flex, Tabs, TabsContent } from '@chakra-ui/react';
import { Select } from '@/app/components/ui/Select';
import {
  TEMPORARY_LANGUAGES_SELECT_OPTIONS,
  TEMPORARY_VARIANTS_SELECT_OPTIONS,
} from '../constants';
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
            <Select options={TEMPORARY_LANGUAGES_SELECT_OPTIONS} name="language" />
            <Select options={TEMPORARY_VARIANTS_SELECT_OPTIONS} name="variant" />
          </Flex>
        </TabsContent>
      </Tabs.Root>
    </div>
  );
};
