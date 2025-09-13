import { Flex, IconButton, Separator, Skeleton, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { BsTrash } from 'react-icons/bs';
import { type KeyValue, KeyValueEditor } from '@/app/domains/rest-client/components/KeyValueEditor';
import { useVariablesActions, variablesAtom } from '@/app/domains/variables/store/variables-store';
import { useAuth } from '@/app/hooks/use-auth';

export const VariablesContent = () => {
  const { isLoading } = useAuth();
  const t = useTranslations('variables');
  const [variables] = useAtom(variablesAtom);
  const { addVariable, updateVariable, deleteVariable, deleteAllVariables } = useVariablesActions();

  const keyValueItems: KeyValue[] = variables.map((v) => ({
    key: v.name.replace('{{', '').replace('}}', ''),
    value: v.value,
  }));

  const handleChange = (field: keyof KeyValue, value: string, index: number) => {
    const variable = variables[index];
    if (!variable) return;

    updateVariable(variable.id, {
      ...variable,
      name: field === 'key' ? value : variable.name,
      value: field === 'value' ? value : variable.value,
    });
  };

  return (
    <Skeleton loading={isLoading} minH="300px">
      {variables.length > 0 ? (
        <Flex direction="column" gap="2">
          <Separator />

          <Flex align="center" gap="1">
            <Text px="2" flex="1" fontSize="sm">
              {t('name')}
            </Text>
            <Separator orientation="vertical" height="4" />
            <Text px="2" flex="1" fontSize="sm">
              {t('value')}
            </Text>
            <IconButton py="2" px="3.5" size="sm" variant="outline" onClick={deleteAllVariables}>
              <BsTrash />
            </IconButton>
          </Flex>

          <Separator />

          <KeyValueEditor
            items={keyValueItems}
            onChange={handleChange}
            onDelete={(index) => deleteVariable(variables[index].id)}
            onAdd={() => addVariable({ name: '', value: '' })}
            addButtonText={t('addVariable')}
            placeholderKey={t('name')}
            placeholderValue={t('value')}
          />
        </Flex>
      ) : (
        <Flex justify="center">
          <Text textStyle="2xl" fontWeight="bold">
            {t('noVariables')} 🥲
          </Text>
        </Flex>
      )}
    </Skeleton>
  );
};
