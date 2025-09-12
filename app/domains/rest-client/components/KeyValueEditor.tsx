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
  testIdPrefix?: string;
  placeholderKey?: string;
  placeholderValue?: string;
  disabled?: boolean;
}

export const KeyValueEditor = ({
  items,
  onDelete,
  onChange,
  onAdd,
  addButtonText,
  testIdPrefix,
  placeholderKey,
  placeholderValue,
  disabled,
}: KeyValueEditorProps) => {
  return (
    <Stack data-testid={testIdPrefix ? `${testIdPrefix}-key-value-editor` : 'key-value-editor'}>
      {items.length === 0 && (
        <Button
          disabled={disabled}
          data-testid={testIdPrefix ? `${testIdPrefix}-add-button` : 'add-button'}
          type="button"
          size="sm"
          width="max-content"
          onClick={onAdd}
        >
          {addButtonText}
        </Button>
      )}
      <For each={items}>
        {(item, index) => (
          <Flex gap="2" key={index}>
            <Input
              data-testid={
                testIdPrefix ? `${testIdPrefix}-key-input-${index}` : `key-input-${index}`
              }
              disabled={disabled}
              name={`header-key-${index}`}
              size="sm"
              type="text"
              value={item.key}
              placeholder={placeholderKey ?? 'key'}
              onChange={(e) => onChange('key', e.target.value, index)}
            />
            <Input
              data-testid={
                testIdPrefix ? `${testIdPrefix}-value-input-${index}` : `value-input-${index}`
              }
              disabled={disabled}
              name={`header-value-${index}`}
              size="sm"
              type="text"
              value={item.value}
              placeholder={placeholderValue ?? 'value'}
              onChange={(e) => onChange('value', e.target.value, index)}
            />
            <Button
              data-testid={
                testIdPrefix ? `${testIdPrefix}-delete-button-${index}` : `delete-button-${index}`
              }
              disabled={disabled}
              variant="subtle"
              size="sm"
              onClick={() => onDelete(index)}
            >
              <BsXLg />
            </Button>
          </Flex>
        )}
      </For>
    </Stack>
  );
};
