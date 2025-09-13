import { For, Grid, GridItem, Heading, Highlight } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { getUserHistory } from '@/app/server-actions/server-actions';
import { EmptyMessage } from './EmptyMessage';
import { HistoryListItem } from './HistoryListItem';

export const HistoryList = async () => {
  const traslationKey = 'history';
  const t = await getTranslations(traslationKey);

  const { data, user } = await getUserHistory();
  const username = user?.username ?? '';

  return (
    <>
      <Heading
        size="3xl"
        letterSpacing="tight"
        m={4}
        textAlign="center"
        className="text-gray-600 dark:text-gray-400"
      >
        <Highlight
          query={['freshest history', 'свежайшая история', '最新の履歴']}
          styles={{ bg: 'cyan.subtle', color: 'cyan.fg' }}
        >
          {t('title', { username })}
        </Highlight>
      </Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        gridAutoRows="max-content"
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
    </>
  );
};
