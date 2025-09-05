'use client';

import { Button, Flex, For, Input, Stack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { BsXLg } from 'react-icons/bs';
import { requestHeadersAtom } from '@/app/domains/rest-client/atoms';

export interface Header {
  key: string;
  value: string;
}

export const HeadersEditor = () => {
  const [headers, setHeaders] = useAtom(requestHeadersAtom);

  const handleChange = (key: keyof Header, value: string, index: number) => {
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

  return (
    <Stack>
      {headers.length === 0 && (
        <Button type="button" size="sm" width="max-content" onClick={addHeader}>
          Add header
        </Button>
      )}
      <For each={headers}>
        {(header, index) => (
          <Flex gap="2" key={index}>
            <Input
              name={`header-key-${index}`}
              size="sm"
              type="text"
              value={header.key}
              placeholder="header"
              onChange={(e) => handleChange('key', e.target.value, index)}
            />
            <Input
              name={`header-value-${index}`}
              size="sm"
              type="text"
              value={header.value}
              placeholder="value"
              onChange={(e) => handleChange('value', e.target.value, index)}
            />
            <Button variant="subtle" size="sm" onClick={() => deleteHeader(index)}>
              <BsXLg />
            </Button>
          </Flex>
        )}
      </For>
    </Stack>
  );
};
