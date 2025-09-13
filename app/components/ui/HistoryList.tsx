import { For, Grid, GridItem } from '@chakra-ui/react';
import { fetchQuery } from 'convex/nextjs';
import { cookies } from 'next/headers';
import { api } from '@/convex/_generated/api';
import type { HistoryData } from '@/convex/types';
import { EmptyMessage } from './EmptyMessage';
import { HistoryListItem } from './HistoryListItem';

export const HistoryList = async () => {
  const traslationKey = 'history';
  try {
    // TBD: maybe rewrite all convex to server interaction
    const cookieStore = await cookies();
    const authToken = cookieStore.get('__convexAuthJWT')?.value;

    if (!authToken) {
      return <EmptyMessage key={traslationKey} />;
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
        {data.length === 0 && <EmptyMessage key={traslationKey} />}
      </Grid>
    );
  } catch {
    return <EmptyMessage key={traslationKey} />;
  }
};
