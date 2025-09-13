'use client';

import { Button, Flex, Input, Tabs, TabsContent } from '@chakra-ui/react';
import { useAtom, useStore } from 'jotai';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { ChangeEvent, FormEvent } from 'react';
import { Select, type SelectOption } from '@/app/components/ui/Select';
import { HTTP_METHOD } from '@/app/constants';
import { useToast } from '@/app/hooks/use-toast';
import { formatJson } from '@/app/lib/utils';
import {
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';
import { BodyEditor, type BodyEditorRequestBody } from './BodyEditor';
import { type KeyValue, KeyValueEditor } from './KeyValueEditor';

const HTTP_METHOD_SELECT_OPTIONS: SelectOption[] = Object.values(HTTP_METHOD).map((method) => ({
  value: method,
  label: method,
}));

export interface RestFormData {
  method: string;
  endpoint: string;
  headers: KeyValue[];
  body: BodyEditorRequestBody;
}

export interface RestFormProps {
  onSubmit(data: RestFormData): void;
  disabled?: boolean;
}

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: <shhhhhhhh>
export const RestForm = ({ onSubmit, disabled }: RestFormProps) => {
  const t = useTranslations('restClient.form');
  const { resolvedTheme } = useTheme();

  const { error } = useToast();

  const store = useStore();

  const [endpoint, setEndpoint] = useAtom(requestEndpointAtom);
  const [httpMethod, setHttpMethod] = useAtom(httpRequestMethodAtom);
  const [requestBody, setRequestBody] = useAtom(requestBodyAtom);
  const [headers, setHeaders] = useAtom(requestHeadersAtom);

  const handleHeadersChange = (key: keyof KeyValue, value: string, index: number) => {
    const newHeaders = [...headers];
    newHeaders[index][key] = value;
    setHeaders(newHeaders);

    const isLastRow = index === headers.length - 1;
    const isRowFilled = newHeaders[index].key !== '' || newHeaders[index].value !== '';

    if (isLastRow && isRowFilled) {
      setHeaders((prev) => [...prev, { key: '', value: '' }]);
    }
  };

  const addHeader = () => {
    setHeaders([{ key: '', value: '' }]);
  };

  const deleteHeader = (index: number) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMethodChange = (v: string) => {
    setHttpMethod(v);
  };

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const handleFormatJson = () => {
    const formatted = formatJson(requestBody.value, () => error(t('formatFailed')));
    setRequestBody({ type: 'json', value: formatted });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      method: store.get(httpRequestMethodAtom),
      endpoint: store.get(requestEndpointAtom),
      headers: store.get(requestHeadersAtom),
      body: store.get(requestBodyAtom),
    };

    onSubmit(formData);
  };

  return (
    <form data-testid="rest-form" onSubmit={handleSubmit} className="w-full">
      <Flex gap="1">
        <Select
          dataTestId="rest-form-method-select"
          onValueChange={handleMethodChange}
          options={HTTP_METHOD_SELECT_OPTIONS}
          name="method"
          value={httpMethod}
          disabled={disabled}
        />
        <Input
          data-testid="rest-form-endpoint-input"
          name="endpoint"
          placeholder={t('inputPlaceholderEndpoint')}
          onChange={handleEndpointChange}
          value={endpoint}
          disabled={disabled}
        />
        <Button
          data-testid="rest-form-submit-button"
          type="submit"
          disabled={disabled || endpoint.trim().length === 0}
        >
          {t('buttonSend')}
        </Button>
      </Flex>
      <Tabs.Root defaultValue="headers">
        <Tabs.List>
          <Tabs.Trigger disabled={disabled} value="headers">
            {t('tabTriggerHeaders')}
          </Tabs.Trigger>
          <Tabs.Trigger disabled={disabled} value="body">
            {t('tabTriggerBody')}
          </Tabs.Trigger>
        </Tabs.List>
        <TabsContent value="headers">
          <KeyValueEditor
            items={headers}
            onChange={handleHeadersChange}
            onAdd={addHeader}
            onDelete={deleteHeader}
            addButtonText={t('buttonAddHeader')}
            placeholderKey={t('inputPlaceholderHeaderKey')}
            placeholderValue={t('inputPlaceholderHeaderValue')}
            disabled={disabled}
          />
        </TabsContent>
        <TabsContent value="body">
          <Tabs.Root defaultValue={requestBody.type}>
            <Tabs.List>
              <Tabs.Trigger disabled={disabled} value="json">
                {t('tabTriggerJson')}
              </Tabs.Trigger>
              <Tabs.Trigger disabled={disabled} value="text">
                {t('tabTriggerText')}
              </Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="json">
              <BodyEditor
                theme={resolvedTheme}
                disabled={disabled}
                value={requestBody.type === 'json' ? requestBody.value : undefined}
                dataTestId="rest-form-body-editor-json"
                readOnly={false}
                title={t('tabBodyTitleJson')}
                type="json"
                onChange={setRequestBody}
                buttonFormatText={t('buttonFormat')}
                onFormat={handleFormatJson}
              />
            </TabsContent>
            <TabsContent value="text">
              <BodyEditor
                theme={resolvedTheme}
                disabled={disabled}
                value={requestBody.type === 'text' ? requestBody.value : undefined}
                dataTestId="rest-form-body-editor-text"
                readOnly={false}
                title={t('tabBodyTitleText')}
                type="text"
                onChange={setRequestBody}
              />
            </TabsContent>
          </Tabs.Root>
        </TabsContent>
      </Tabs.Root>
    </form>
  );
};
