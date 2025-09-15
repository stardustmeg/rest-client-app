'use client';

import { Box, Flex, Heading, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { getDefaultStore, Provider, useAtomValue } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useTransition } from 'react';
import { ResponseInformation } from '@/app/components/ui/ResponseInformation';
import { useToast } from '@/app/hooks/use-toast';
import { decodeRequestUrl } from '@/app/lib/utils';
import { formDataStore, responseInfoAtom } from './atoms';
import { BodyEditor } from './components/BodyEditor';
import { CodeGeneration } from './components/CodeGeneration';
import { RestForm, type RestFormData } from './components/RestForm';
import { useInitFormAtoms } from './hooks/use-init-form-atoms';
import { useSubmitRestForm } from './hooks/use-submit-rest-form';

export const RestClient = () => {
  const { params } = useParams<{ locale: string; params?: string[] }>();
  const searchParams = useSearchParams();

  const t = useTranslations('restClient.response');

  const { resolvedTheme } = useTheme();
  const [isLoading, startTransition] = useTransition();

  const { handleSubmit } = useSubmitRestForm();

  const { error } = useToast();

  const { responseSize, requestDuration, responseBody, responseStatusCode, errorDetails } =
    useAtomValue(responseInfoAtom, { store: formDataStore });

  useInitFormAtoms(decodeRequestUrl(params, searchParams, (e) => error(e)));

  const handleSubmitRestForm = (data: RestFormData) => startTransition(() => handleSubmit(data));

  return (
    <Provider store={formDataStore}>
      <Flex gap="3">
        <RestForm disabled={isLoading} onSubmit={handleSubmitRestForm} />
        <Separator orientation="vertical" />
        <div className="w-full max-w-[48%]">
          <ResponseInformation
            status={responseStatusCode}
            size={responseSize}
            duration={requestDuration}
          />
          <Tabs.Root defaultValue="response" lazyMount>
            <Tabs.List>
              <Tabs.Trigger value="response">{t('tabTriggerResponse')}</Tabs.Trigger>
              <Tabs.Trigger value="code-snippet">{t('tabTriggerCodeSnippet')}</Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="response">
              {!(isLoading || errorDetails) && (
                <BodyEditor
                  value={responseBody}
                  theme={resolvedTheme}
                  readOnly={true}
                  type="json"
                />
              )}
              {!isLoading && errorDetails && (
                <Box background="crimson" padding="4" color="white">
                  <Heading size="xl">{t('requestFailedTitle')}</Heading>
                  <p>{errorDetails ?? 'Unknown error'}</p>
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
