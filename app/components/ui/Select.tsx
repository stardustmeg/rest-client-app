import { For, NativeSelect } from '@chakra-ui/react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  name: string;
}

export const Select = ({ options, onValueChange, name }: SelectProps) => {
  return (
    <NativeSelect.Root width="max-content">
      <NativeSelect.Field
        name={name}
        width="max-content"
        onChange={(e) => onValueChange?.(e.currentTarget.value)}
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
