'use client';

import { Button, Flex, Input, Tabs, TabsContent } from '@chakra-ui/react';
import { useSetAtom, useStore } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { Select } from '@/app/components/ui/Select';
import {
  httpRequestMethodAtom,
  requestBodyAtom,
  requestEndpointAtom,
  requestHeadersAtom,
} from '../atoms';
import { TEMPORARY_METHOD_SELECT_OPTIONS } from '../constants';
import { BodyEditor, type BodyEditorRequestBody } from './BodyEditor';
import { HeadersEditor, type RequestHeader } from './HeadersEditor';

export interface RestFormData {
  method: string;
  endpoint: string;
  headers: RequestHeader[];
  body: BodyEditorRequestBody;
}

export interface RestFormProps {
  onSubmit(data: RestFormData): void;
}

export const RestForm = ({ onSubmit }: RestFormProps) => {
  const store = useStore();

  const setEndpoint = useSetAtom(requestEndpointAtom);
  const setHttpMethod = useSetAtom(httpRequestMethodAtom);
  const setRequestBody = useSetAtom(requestBodyAtom);

  const handleMethodChange = (v: string) => {
    setHttpMethod(v);
  };

  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
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
          options={TEMPORARY_METHOD_SELECT_OPTIONS}
          name="method"
        />
        <Input
          data-testid="rest-form-endpoint-input"
          name="endpoint"
          placeholder="Endpoint"
          onChange={handleEndpointChange}
        />
        <Button data-testid="rest-form-submit-button" type="submit">
          Send
        </Button>
      </Flex>
      <Tabs.Root defaultValue="headers">
        <Tabs.List>
          <Tabs.Trigger value="headers">Headers</Tabs.Trigger>
          <Tabs.Trigger value="body">Body</Tabs.Trigger>
        </Tabs.List>
        <TabsContent value="headers">
          <HeadersEditor />
        </TabsContent>
        <TabsContent value="body">
          <Tabs.Root defaultValue="json">
            <Tabs.List>
              <Tabs.Trigger value="json">JSON</Tabs.Trigger>
              <Tabs.Trigger value="text">Text</Tabs.Trigger>
            </Tabs.List>
            <TabsContent value="json">
              <BodyEditor
                dataTestId="rest-form-body-editor-json"
                readOnly={false}
                title="JSON Content"
                type="json"
                onChange={setRequestBody}
              />
            </TabsContent>
            <TabsContent value="text">
              <BodyEditor
                dataTestId="rest-form-body-editor-text"
                readOnly={false}
                title="Text Content"
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
