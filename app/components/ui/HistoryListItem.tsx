import { Badge, Button, Card, Separator, Text } from '@chakra-ui/react';
import { BsChevronRight } from 'react-icons/bs';
import { ResponseInformation } from '@/app/domains/rest-client/components/ResponseInformation';
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
  },
}: HistoryListItemProps) => {
  return (
    <Card.Root key={_id} variant="outline">
      <Card.Header>
        <Card.Title>{requestMethod}</Card.Title>
        <div className="flex justify-between gap-2">
          <Text color="gray.500" fontStyle="italic" fontSize="sm">
            {new Date(requestTimestamp).toLocaleString()}
          </Text>
          <Badge w={'max-content'}>{formatValue({ value: requestSize, postfix: 'B' })}</Badge>
        </div>
        <Separator orientation="horizontal" />
        <ResponseInformation
          status={responseStatusCode}
          size={responseSize}
          time={requestDuration}
        />
        <Separator orientation="horizontal" />
      </Card.Header>
      <Card.Body>
        <Card.Description style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
          {endpoint}
        </Card.Description>
      </Card.Body>
      {/* TBD: fix link to rest-client */}
      <Card.Footer className="flex place-content-end">
        <Link href={`/rest-client/${endpoint}`}>
          <Button variant="ghost" size="sm">
            <BsChevronRight />
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};
