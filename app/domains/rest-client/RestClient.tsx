'use client';

import { Box, Flex, Heading, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { getDefaultStore, Provider, useAtomValue } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { ResponseInformation } from '@/app/components/ui/ResponseInformation';
import { useToast } from '@/app/hooks/use-toast';
import { decodeRequestUrl } from '@/app/lib/utils';
import {
  failedResponseAtom,
  formDataStore,
  responseBodyAtom,
  responseInformationAtom,
} from './atoms';
import { BodyEditor } from './components/BodyEditor';
import { CodeGeneration } from './components/CodeGeneration';
import { RestForm } from './components/RestForm';
import { useInitFormAtoms } from './hooks/use-init-form-atoms';
import { useSubmitRestForm } from './hooks/use-submit-rest-form';

export const RestClient = () => {
  const { params } = useParams<{ locale: string; params?: string[] }>();
  const searchParams = useSearchParams();
  const t = useTranslations('restClient.response');
  const { resolvedTheme } = useTheme();

  const { error } = useToast();

  const responseInfo = useAtomValue(responseInformationAtom, { store: formDataStore });
  const responseBody = useAtomValue(responseBodyAtom, { store: formDataStore });
  const failedResponse = useAtomValue(failedResponseAtom, { store: formDataStore });

  useInitFormAtoms(decodeRequestUrl(params, searchParams, (e) => error(e.message)));

  const { processing, handleSubmit } = useSubmitRestForm();

  return (
    <Provider store={formDataStore}>
      <Flex gap="3">
        <RestForm disabled={processing} onSubmit={handleSubmit} />
        <Separator orientation="vertical" />
        <div className="w-full max-w-[48%]">
          <ResponseInformation
            status={responseInfo.status}
            size={responseInfo.size}
            time={responseInfo.time}
          />
          <Tabs.Root defaultValue="response" lazyMount>
            <Tabs.List>
              <Tabs.Trigger value="response">{t('tabTriggerResponse')}</Tabs.Trigger>
              <Tabs.Trigger value="code-snippet">{t('tabTriggerCodeSnippet')}</Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="response">
              {!processing && failedResponse.ok && (
                <BodyEditor
                  value={responseBody}
                  theme={resolvedTheme}
                  readOnly={true}
                  type="json"
                />
              )}
              {!(processing || failedResponse.ok) && (
                <Box background="crimson" padding="4" color="white">
                  <Heading size="xl">{t('requestFailedTitle')}</Heading>
                  <p>{failedResponse.lastErrorMessage}</p>
                </Box>
              )}
            </TabsContent>
            <TabsContent value="code-snippet">
              <Provider store={getDefaultStore()}>
                <CodeGeneration />
              </Provider>
            </TabsContent>
          </Tabs.Root>
        </div>
      </Flex>
    </Provider>
  );
};
