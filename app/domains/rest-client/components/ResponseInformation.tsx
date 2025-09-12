'use client';

import { Badge } from '@chakra-ui/react';
import { BsBoxSeam, BsSpeedometer2 } from 'react-icons/bs';
import { formatValue } from '@/app/utils';
import { getDurationColor, getSizeColor, getStatusColor } from '@/app/utils/get-color';
import { getStatusIcon } from '@/app/utils/get-icon';

export interface ResponseInformationProps {
  status: number;
  size: number;
  time: number;
  labelStatus?: string;
  labelSize?: string;
  labelTime?: string;
}

export const ResponseInformation = ({
  size,
  status,
  time,
  labelStatus,
  labelSize,
  labelTime,
}: ResponseInformationProps) => {
  return (
    <div data-testid="response-information" className="flex gap-3">
      <span data-testid="response-information-status">
        {labelStatus ?? 'Status'}:{' '}
        <Badge w={'max-content'} colorPalette={getStatusColor(status)}>
          {getStatusIcon(status)}
          {formatValue({ value: status, defaultValue: 0 })}
        </Badge>
      </span>
      <span data-testid="response-information-size">
        {labelSize ?? 'Size'}:{' '}
        <Badge w={'max-content'} colorPalette={getSizeColor(size)}>
          <BsBoxSeam />
          {formatValue({ value: size, postfix: 'B', defaultValue: 0 })}
        </Badge>
      </span>
      <span className="text-gra" data-testid="response-information-time">
        {labelTime ?? 'Time'}:{' '}
        <Badge w={'max-content'} colorPalette={getDurationColor(time)}>
          <BsSpeedometer2 />
          {formatValue({ value: time, postfix: 'ms' })}
        </Badge>
      </span>
    </div>
  );
};
