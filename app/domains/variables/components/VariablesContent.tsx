'use client';
import { IconButton, Table } from '@chakra-ui/react';
import { BsPencil, BsTrash3 } from 'react-icons/bs';
import type { Variable } from '@/app/domains/variables/types/variables-schema';

const test = [
  { id: 1, name: 'name', value: 'name' },
  { id: 2, name: 'name', value: 'name' },
  { id: 3, name: 'name', value: 'name' },
];

export const VariablesContent = () => {
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
          <Table.ColumnHeader>Key</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Name</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Value</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Edit</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Delete</Table.ColumnHeader>
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
                <IconButton aria-label="Edit" size="sm" onClick={() => handleEdit(item)}>
                  <BsPencil />
                </IconButton>
              </Table.Cell>
              <Table.Cell textAlign="end">
                <IconButton aria-label="Delete" size="sm" onClick={() => handleDelete(item.id)}>
                  <BsTrash3 />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row textAlign="center">No Variables yet</Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
};
