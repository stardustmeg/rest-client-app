import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { type KeyValue, KeyValueEditor } from '@/app/domains/rest-client/components/KeyValueEditor';
import { useVariablesContext } from '@/app/domains/variables/components/VariablesProvider';
import { useAuth } from '@/app/hooks/use-auth';

export const VariablesContent = () => {
  const { isLoading } = useAuth();
  const t = useTranslations('variables');
  const { variables, addVariable, updateVariable, deleteVariable } = useVariablesContext();

  const keyValueItems: KeyValue[] = variables.map((v) => ({
    key: v.name,
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
        <KeyValueEditor
          items={keyValueItems}
          onChange={handleChange}
          onDelete={(index) => deleteVariable(variables[index].id)}
          onAdd={() => addVariable({ name: '', value: '' })}
          addButtonText={t('addVariable')}
          placeholderKey={t('key')}
          placeholderValue={t('value')}
        />
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
