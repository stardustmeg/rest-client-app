/** biome-ignore-all lint/suspicious/noConsole: <shhhh> */
'use client';

import { Flex, Separator, Tabs, TabsContent } from '@chakra-ui/react';
import { Provider, useAtom } from 'jotai';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useResolveVariables } from '@/app/domains/variables/hooks/useResolveVariables';
import { variablesAtom } from '@/app/domains/variables/store/variables-store';
import { decodeRequestUrl, encodeRequestUrl, formatJson } from '@/app/lib/utils';
import { sendRequest } from '@/app/server-actions/server-actions';
import { formDataStore, responseBodyAtom, responseInformationAtom } from './atoms';
import { BodyEditor } from './components/BodyEditor';
import { CodeGeneration } from './components/CodeGeneration';
import { ResponseInformation } from './components/ResponseInformation';
import { RestForm, type RestFormData } from './components/RestForm';
import { useInitFormAtoms } from './hooks/use-init-form-atoms';

export const RestClient = () => {
  const router = useRouter();
  const { params } = useParams<{ locale: string; params?: string[] }>();
  const searchParams = useSearchParams();
  const { resolveVariables } = useResolveVariables();
  const t = useTranslations('restClient.response');
  const { resolvedTheme } = useTheme();
  const [variables] = useAtom(variablesAtom);

  const [responseInfo, setResponseInfo] = useAtom(responseInformationAtom);
  const [responseBody, setResponseBody] = useAtom(responseBodyAtom);

  useInitFormAtoms(decodeRequestUrl(params, searchParams));

  const handleFormSubmit = (data: RestFormData) => {
    const sss = resolveVariables(data);
    console.log('after replacement', sss);
    console.log('vars', variables);
    const url = encodeRequestUrl(sss);
    router.push(`/rest-client/${url}`);

    sendRequest(data).then((res) => {
      setResponseInfo({ time: res.time, status: res.status, size: res.size ?? '' });

      const formattedBody = formatJson(res.body, (e) => {
        console.log(e.message);
      });

      setResponseBody(formattedBody);
    });
  };

  return (
    <Provider store={formDataStore}>
      <Flex gap="3">
        <RestForm onSubmit={handleFormSubmit} />
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
              <BodyEditor value={responseBody} theme={resolvedTheme} readOnly={true} type="json" />
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
