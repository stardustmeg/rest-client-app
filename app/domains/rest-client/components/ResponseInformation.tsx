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
  time: number;
  labelsKey?: MessagesKeysType;
}

export const ResponseInformation = ({
  status,
  size,
  time,
  labelsKey,
}: ResponseInformationProps) => {
  const t = useTranslations(labelsKey ?? 'restClient.response');
  return (
    <div
      data-testid="response-information"
      className="flex flex-wrap justify-between gap-3 text-gray-500 text-sm"
    >
      <span data-testid="response-information-status">
        {t('status')}:{' '}
        <Badge w={'max-content'} colorPalette={getStatusColor(status)}>
          {getStatusIcon(status)}
          {formatValue({ value: status, defaultValue: 0 })}
        </Badge>
      </span>
      <span data-testid="response-information-size">
        {t('size')}:{' '}
        <Badge w={'max-content'} colorPalette={getSizeColor(size)}>
          <BsBoxSeam />
          {formatValue({ value: size, postfix: 'B', defaultValue: 0 })}
        </Badge>
      </span>
      <span data-testid="response-information-time">
        {t('time')}:{' '}
        <Badge w={'max-content'} colorPalette={getDurationColor(time)}>
          <BsSpeedometer2 />
          {formatValue({ value: time, postfix: 'ms' })}
        </Badge>
      </span>
    </div>
  );
};
