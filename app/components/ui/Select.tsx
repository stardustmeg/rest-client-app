import { Select as ChakraSelect, createListCollection } from '@chakra-ui/react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  name?: string;
  placeholder: string;
}

export const Select = ({ options, onValueChange, name, placeholder }: SelectProps) => {
  const collection = createListCollection({ items: options });

  return (
    <ChakraSelect.Root
      name={name}
      collection={collection}
      onValueChange={({ value }) => onValueChange?.(value[0])}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <ChakraSelect.Positioner>
        <ChakraSelect.Content>
          {collection.items.map((item) => (
            <ChakraSelect.Item item={item} key={item.value}>
              {item.label}
              <ChakraSelect.ItemIndicator />
            </ChakraSelect.Item>
          ))}
        </ChakraSelect.Content>
      </ChakraSelect.Positioner>
    </ChakraSelect.Root>
  );
};
