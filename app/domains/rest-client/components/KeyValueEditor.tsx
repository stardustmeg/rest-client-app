'use client';

import { Button, Flex, For, Input, Stack } from '@chakra-ui/react';
import { BsXLg } from 'react-icons/bs';

export interface KeyValue {
  key: string;
  value: string;
}

export interface KeyValueEditorProps {
  onChange(key: keyof KeyValue, value: string, index: number): void;
  onAdd(): void;
  onDelete(index: number): void;
  items: KeyValue[];
  addButtonText: string;
}

export const KeyValueEditor = ({
  items,
  onDelete,
  onChange,
  onAdd,
  addButtonText,
}: KeyValueEditorProps) => {
  return (
    <Stack>
      {items.length === 0 && (
        <Button type="button" size="sm" width="max-content" onClick={onAdd}>
          {addButtonText}
        </Button>
      )}
      <For each={items}>
        {(item, index) => (
          <Flex gap="2" key={index}>
            <Input
              name={`header-key-${index}`}
              size="sm"
              type="text"
              value={item.key}
              placeholder="header"
              onChange={(e) => onChange('key', e.target.value, index)}
            />
            <Input
              name={`header-value-${index}`}
              size="sm"
              type="text"
              value={item.value}
              placeholder="value"
              onChange={(e) => onChange('value', e.target.value, index)}
            />
            <Button variant="subtle" size="sm" onClick={() => onDelete(index)}>
              <BsXLg />
            </Button>
          </Flex>
        )}
      </For>
    </Stack>
  );
};
