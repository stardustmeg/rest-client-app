import { Flex, IconButton, Skeleton, Table, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { BsTrash3 } from 'react-icons/bs';
import { useVariablesContext } from '@/app/domains/variables/components/VariablesProvider';
import { useAuth } from '@/app/hooks/use-auth';

export const VariablesContent = () => {
  const { isLoading } = useAuth();
  const t = useTranslations('variables');
  const { variables, deleteVariable, deleteAllVariables } = useVariablesContext();
  const handleDelete = (id: number) => {
    deleteVariable(id);
  };

  return (
    <Skeleton loading={isLoading} minH="300px">
      {variables.length > 0 ? (
        <Table.Root size="lg">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>{t('key')}</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">{t('name')}</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">{t('value')}</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                <IconButton
                  size="sm"
                  onClick={deleteAllVariables}
                  aria-label={t('deleteAll')}
                  variant="surface"
                >
                  <BsTrash3 />
                </IconButton>
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {variables.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell textAlign="center">{item.name}</Table.Cell>
                <Table.Cell textAlign="center">{item.value}</Table.Cell>
                <Table.Cell textAlign="end">
                  <IconButton
                    aria-label={t('delete')}
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <BsTrash3 />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
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
