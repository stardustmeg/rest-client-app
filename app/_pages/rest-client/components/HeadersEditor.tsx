'use client';

import { Button, Flex, For, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { BsXLg } from 'react-icons/bs';

export interface Header {
  key: string;
  value: string;
}

export const HeadersEditor = () => {
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);

  const handleChange = (key: keyof Header, value: string, index: number) => {
    const newHeaders = [...headers];
    newHeaders[index][key] = value;
    setHeaders(newHeaders);

    const isLastRow = index === headers.length - 1;
    const isRowFilled = newHeaders[index].key !== '' || newHeaders[index].value !== '';

    if (isLastRow && isRowFilled) {
      setHeaders([...newHeaders, { key: '', value: '' }]);
    }
  };

  return (
    <Stack>
      <For each={headers}>
        {(header, index) => (
          <Flex gap="2" key={index}>
            <Input
              size="sm"
              type="text"
              value={header.key}
              placeholder="header"
              onChange={(e) => handleChange('key', e.target.value, index)}
            />
            <Input
              size="sm"
              type="text"
              value={header.value}
              placeholder="value"
              onChange={(e) => handleChange('value', e.target.value, index)}
            />
            <Button
              variant="subtle"
              size="sm"
              onClick={() => setHeaders(headers.filter((_, i) => i !== index))}
            >
              <BsXLg />
            </Button>
          </Flex>
        )}
      </For>
    </Stack>
  );
};
