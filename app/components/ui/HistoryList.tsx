import { EmptyState, For, Grid, GridItem } from '@chakra-ui/react';
import { fetchQuery } from 'convex/nextjs';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { api } from '@/convex/_generated/api';
import type { HistoryData } from '@/convex/types';
import { HistoryListItem } from './HistoryListItem';

export const HistoryList = async () => {
  const t = await getTranslations('history');

  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('__convexAuthJWT')?.value;

    if (!authToken) {
      return (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Title>{t('emptyMessage')}</EmptyState.Title>
          </EmptyState.Content>
        </EmptyState.Root>
      );
    }

    const data: HistoryData = await fetchQuery(
      api.history.getUserHistory,
      {},
      { token: authToken },
    );

    return (
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        gap={4}
        p={4}
      >
        <For each={data}>
          {(item) => (
            <GridItem key={item._id}>
              <HistoryListItem item={item} />
            </GridItem>
          )}
        </For>
        {/* TBD: style later */}
        {data.length === 0 && (
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Title>{t('emptyMessage')}</EmptyState.Title>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
      </Grid>
    );
  } catch {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Title>{t('emptyMessage')}</EmptyState.Title>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }
};
