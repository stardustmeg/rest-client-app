import { Flex, Separator } from '@chakra-ui/react';
import { Enabled } from '@/app/components/ui/Enabled';
import { ResponseAndSnippets } from './components/ResponseAndSnippets';
import { RestForm } from './components/RestForm';

export const RestClient = () => {
  return (
    <Enabled feature="restClient">
      <Flex gap="3">
        <RestForm />
        <Separator orientation="vertical" />
        <ResponseAndSnippets />
      </Flex>
    </Enabled>
  );
};
