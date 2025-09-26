import { EmptyState } from '@chakra-ui/react';

interface EmptyMessageProps {
  message: string;
  children?: React.ReactNode;
}

export const EmptyMessage = ({ message, children }: EmptyMessageProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Title>{message}</EmptyState.Title>
        {children}
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
