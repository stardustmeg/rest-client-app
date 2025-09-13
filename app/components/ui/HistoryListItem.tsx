import { Badge, Button, Card, Separator, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { BsChevronRight } from 'react-icons/bs';
import type { BodyEditorContentType } from '@/app/domains/rest-client/components/BodyEditor';
import { ResponseInformation } from '@/app/domains/rest-client/components/ResponseInformation';
import { useToast } from '@/app/hooks/use-toast';
import { encodeRequestUrl } from '@/app/lib/utils';
import { formatValue } from '@/app/utils';
import type { HistoryDataItem } from '@/convex/types';
import { Link } from '@/i18n/routing';

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
    body,
  },
}: HistoryListItemProps) => {
  const { error } = useToast();

  const getRestClientUrl = () => {
    const url = encodeRequestUrl(
      {
        endpoint,
        headers: requestHeaders,
        body: {
          type: body.type as BodyEditorContentType,
          value: body.value ?? '',
        },
        method: requestMethod,
      },
      (e) => {
        error(e.message);
      },
    );

    return `/rest-client/${url}`;
  };

  const t = useTranslations('history');
  return (
    <Card.Root key={_id} variant="outline" h="full" color="gray.500">
      <Card.Header>
        <div className="flex justify-between gap-2">
          <Card.Title>{requestMethod}</Card.Title>
          <Text fontStyle="italic" fontSize="sm">
            {new Date(requestTimestamp).toLocaleString()}
          </Text>
        </div>
        <Text>
          {t('requestSize')}:
          <Badge w={'max-content'} ml={2}>
            {formatValue({ value: requestSize, postfix: 'B', defaultValue: 0 })}
          </Badge>
        </Text>
        <Separator orientation="horizontal" />
        <ResponseInformation
          status={responseStatusCode}
          size={responseSize}
          time={requestDuration}
        />
        <Separator orientation="horizontal" />
      </Card.Header>
      <Card.Body gap={2}>
        <Card.Description style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
          {endpoint}
        </Card.Description>
        {errorDetails && (
          <Card.Description
            color="red.700"
            style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
          >
            {errorDetails}
          </Card.Description>
        )}
      </Card.Body>
      <Card.Footer className="flex place-content-end">
        <Link href={getRestClientUrl()}>
          <Button variant="ghost" size="sm">
            <BsChevronRight />
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};
