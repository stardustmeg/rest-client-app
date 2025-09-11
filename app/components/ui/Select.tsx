'use client';

import { For, NativeSelect } from '@chakra-ui/react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  name: string;
  dataTestId?: string;
  value?: string;
}

export const Select = ({ options, onValueChange, name, dataTestId, value }: SelectProps) => {
  return (
    <NativeSelect.Root width="max-content">
      <NativeSelect.Field
        name={name}
        value={value}
        width="max-content"
        onChange={(e) => onValueChange?.(e.currentTarget.value)}
        data-testid={dataTestId}
      >
        <For each={options}>
          {(option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )}
        </For>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};
