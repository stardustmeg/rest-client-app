import { Badge } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { BsBoxSeam, BsSpeedometer2 } from 'react-icons/bs';
import { formatValue } from '@/app/utils';
import { getDurationColor, getSizeColor, getStatusColor } from '@/app/utils/get-color';
import { getStatusIcon } from '@/app/utils/get-icon';
import type { MessagesKeysType } from '@/i18n/routing';

export interface ResponseInformationProps {
  status: number;
  size: number;
  duration: number;
  labelsKey?: MessagesKeysType;
}

export const ResponseInformation = ({
  status,
  size,
  duration,
  labelsKey,
}: ResponseInformationProps) => {
  const t = useTranslations(labelsKey ?? 'restClient.response');
  return (
    <div
      data-testid="response-information"
      className="flex flex-wrap justify-between gap-2 text-gray-600 text-sm dark:text-gray-200"
    >
      <span data-testid="response-information-status">
        {`${t('status')}:`}
        <Badge w={'max-content'} ml={1} colorPalette={getStatusColor(status)}>
          {getStatusIcon(status)}
          {formatValue({ value: status })}
        </Badge>
      </span>
      <span data-testid="response-information-size">
        {`${t('size')}:`}
        <Badge w={'max-content'} ml={1} colorPalette={getSizeColor(size)}>
          <BsBoxSeam />
          {formatValue({ value: size, postfix: 'B' })}
        </Badge>
      </span>
      <span data-testid="response-information-time">
        {`${t('time')}:`}
        <Badge w={'max-content'} ml={1} colorPalette={getDurationColor(duration)}>
          <BsSpeedometer2 />
          {formatValue({ value: duration, postfix: 'ms' })}
        </Badge>
      </span>
    </div>
  );
};
