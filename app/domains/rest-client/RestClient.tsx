'use client';

import { Box, Flex, Heading, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useActionState } from 'react';
import { ResponseInformation } from '@/app/components/ui/ResponseInformation';
import { useToast } from '@/app/hooks/use-toast';
import { decodeRequestUrl } from '@/app/lib/utils';
import { responseInfoAtom } from './atoms';
import { BodyEditor } from './components/BodyEditor';
import { CodeGeneration } from './components/CodeGeneration';
import { RestForm } from './components/RestForm';
import { useInitFormAtoms } from './hooks/use-init-form-atoms';
import { useSubmitRestForm } from './hooks/use-submit-rest-form';

export const RestClient = () => {
  const t = useTranslations('restClient.response');
  const tError = useTranslations('error');
  const tTitle = useTranslations('navigation');

  const { params } = useParams<{ locale: string; params?: string[] }>();
  const searchParams = useSearchParams();
  const { errorToast } = useToast();
  const { resolvedTheme } = useTheme();

  const { handleSubmit } = useSubmitRestForm();
  const [_state, submitAction, isPending] = useActionState(handleSubmit, null);

  const { responseSize, requestDuration, responseBody, responseStatusCode, errorDetails } =
    useAtomValue(responseInfoAtom);
  useInitFormAtoms(decodeRequestUrl(params, searchParams, errorToast));

  return (
    <>
      {' '}
      <Heading
        as="h1"
        size="3xl"
        m={4}
        textAlign="center"
        fontWeight="extrabold"
        letterSpacing="tight"
        className="text-gray-600 dark:text-gray-400"
      >
        {tTitle('restClient')}
      </Heading>
      <Flex gap="3" className="flex-col md:flex-row" mt={4}>
        <RestForm disabled={isPending} onSubmit={submitAction} />
        <Separator orientation="vertical" />
        <div className="w-full md:max-w-[48%]">
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
              {!(isPending || errorDetails) && (
                <BodyEditor
                  value={responseBody}
                  theme={resolvedTheme}
                  readOnly={true}
                  type="json"
                />
              )}
              {!isPending && errorDetails && (
                <Box background="crimson" padding="4" color="white">
                  <Heading size="xl">{t('requestFailedTitle')}</Heading>
                  <p>{errorDetails ?? tError('unknownError')}</p>
                </Box>
              )}
            </TabsContent>
            <TabsContent value="code-snippet">
              <CodeGeneration />
            </TabsContent>
          </Tabs.Root>
        </div>
      </Flex>
    </>
  );
};
