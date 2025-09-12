'use client';

import { Flex, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { Provider, useAtomValue } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { decodeRequestUrl } from '@/app/lib/utils';
import {
  failedResponseAtom,
  formDataStore,
  responseBodyAtom,
  responseInformationAtom,
} from './atoms';
import { BodyEditor } from './components/BodyEditor';
import { CodeGeneration } from './components/CodeGeneration';
import { ResponseInformation } from './components/ResponseInformation';
import { RestForm } from './components/RestForm';
import { useInitFormAtoms } from './hooks/use-init-form-atoms';
import { useSubmitRestForm } from './hooks/use-submit-rest-form';

export const RestClient = () => {
  const { params } = useParams<{ locale: string; params?: string[] }>();
  const searchParams = useSearchParams();

  const t = useTranslations('restClient.response');
  const { resolvedTheme } = useTheme();

  const responseInfo = useAtomValue(responseInformationAtom);
  const responseBody = useAtomValue(responseBodyAtom);
  const failedResponse = useAtomValue(failedResponseAtom);

  useInitFormAtoms(decodeRequestUrl(params, searchParams));

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
            labelStatus={t('status')}
            labelSize={t('size')}
            labelTime={t('time')}
          />
          {/* TODO (ripetchor): change to default response */}
          <Tabs.Root defaultValue="response" lazyMount>
            <Tabs.List>
              <Tabs.Trigger value="response">{t('tabTriggerResponse')}</Tabs.Trigger>
              <Tabs.Trigger value="code-snippet">{t('tabTriggerCodeSnippet')}</Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="response">
              {!processing && failedResponse.ok ? (
                <BodyEditor
                  value={responseBody}
                  theme={resolvedTheme}
                  readOnly={true}
                  type="json"
                />
              ) : (
                <div>{failedResponse.lastErrorMessage}</div>
              )}
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
