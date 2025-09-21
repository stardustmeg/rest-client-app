import { Badge, Card, Separator, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { routes } from '@/app/[locale]/routes';
import { ResponseInformation } from '@/app/components/ui/ResponseInformation';
import type { BodyEditorContentType } from '@/app/domains/rest-client/components/BodyEditor';
import { useToast } from '@/app/hooks/use-toast';
import { encodeRequestUrl } from '@/app/lib/utils';
import { formatValue } from '@/app/utils';
import type { HistoryDataItem } from '@/convex/types';
import { HistoryRedirectLink } from './HistoryRedirectLink';

interface HistoryListItemProps {
  item: HistoryDataItem;
}

export const HistoryListItem = ({
  item: {
    _id,
    requestTimestamp,
    requestMethod,
    endpoint,
    responseStatusCode,
    requestDuration,
    requestSize,
    responseSize,
    requestHeaders,
    errorDetails,
    requestBody,
  },
}: HistoryListItemProps) => {
  const { errorToast } = useToast();

  const getRestClientUrl = () => {
    const url = encodeRequestUrl(
      {
        endpoint,
        headers: requestHeaders,
        body: {
          type: requestBody.type as BodyEditorContentType,
          value: requestBody.value ?? '',
        },
        method: requestMethod,
      },
      errorToast,
    );

    return `${routes.restClient.path}/${url}`;
  };

  const t = useTranslations('history');
  return (
    <Card.Root key={_id} variant="outline" h="full" className="text-gray-600 dark:text-gray-200">
      <Card.Header>
        <div className="flex justify-between gap-2">
          <Card.Title>{requestMethod}</Card.Title>
          <Text fontStyle="italic" fontSize="sm">
            {new Date(requestTimestamp).toLocaleString()}
          </Text>
        </div>
        <Text>
          {t('requestSize')}:
          <Badge w={'max-content'} ml={1}>
            {formatValue({ value: requestSize, postfix: 'B' })}
          </Badge>
        </Text>
        <Separator orientation="horizontal" />
        <ResponseInformation
          status={responseStatusCode}
          size={responseSize}
          duration={requestDuration}
        />
        <Separator orientation="horizontal" />
      </Card.Header>
      <Card.Body gap={2}>
        <Card.Description style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
          {endpoint}
        </Card.Description>
        {errorDetails && (
          <Card.Description
            color="red.500"
            style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
          >
            {errorDetails}
          </Card.Description>
        )}
      </Card.Body>
      <Card.Footer className="flex place-content-end">
        <HistoryRedirectLink redirectLink={getRestClientUrl()} />
      </Card.Footer>
    </Card.Root>
  );
};
