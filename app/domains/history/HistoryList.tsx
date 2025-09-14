import { Link as ChakraLink, For, Grid, GridItem, Heading, Highlight } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { routes } from '@/app/[locale]/routes';
import { EmptyMessage } from '@/app/components/ui/EmptyMessage';
import { getUserHistory } from '@/app/server-actions/server-actions';
import { Link } from '@/i18n/routing';
import { HistoryListItem } from './HistoryListItem';

export const HistoryList = async () => {
  const t = await getTranslations('history');

  const { data, user } = await getUserHistory();
  const username = user?.username ?? '';

  return (
    <>
      {data.length > 0 && (
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
      )}
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
      </Grid>
      {data.length === 0 && (
        <EmptyMessage message={t('emptyMessage', { username })}>
          <ChakraLink asChild variant="plain">
            <Link href={routes.restClient.path}>{t('emptyLink')}</Link>
          </ChakraLink>
        </EmptyMessage>
      )}
    </>
  );
};
