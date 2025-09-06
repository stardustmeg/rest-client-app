'use client';
import { Flex, IconButton, Table } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { BsPencil, BsTrash3 } from 'react-icons/bs';
import type { Variable } from '@/app/domains/variables/types/variables-schema';

const test = [
  { id: 1, name: 'name', value: 'value' },
  { id: 2, name: 'name', value: 'value' },
  { id: 3, name: 'name', value: 'value' },
];

export const VariablesContent = () => {
  const t = useTranslations('variables');
  const variables = [...test];
  const handleDelete = (id: number) => {
    // biome-ignore lint/suspicious/noConsole: <temp>
    console.log(id);
  };

  const handleEdit = (value: Variable) => {
    // biome-ignore lint/suspicious/noConsole: <temp>
    console.log(value);
  };

  return (
    <Table.Root size="lg">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>{t('key')}</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">{t('name')}</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">{t('value')}</Table.ColumnHeader>
          <Table.ColumnHeader>
            <Flex px="3" justify="flex-end">
              <BsPencil />
            </Flex>
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Flex px="3" justify="flex-end">
              <BsTrash3 />
            </Flex>
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {variables.length > 0 ? (
          variables.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell textAlign="center">{item.name}</Table.Cell>
              <Table.Cell textAlign="center">{item.value}</Table.Cell>
              <Table.Cell textAlign="end">
                <IconButton aria-label={t('edit')} size="sm" onClick={() => handleEdit(item)}>
                  <BsPencil />
                </IconButton>
              </Table.Cell>
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
          ))
        ) : (
          <Table.Row textAlign="center">{t('noVariables')}</Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
};
