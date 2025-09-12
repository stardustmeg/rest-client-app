'use client';

import { formatValue } from '@/app/utils';

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
        <span className={getStatusColor(status)}>{formatValue(status)}</span>
      </span>
      <span data-testid="response-information-size">
        {labelSize ?? 'Size'}: <span className={getStatusColor(status)}>{formatValue(size)}</span>
      </span>
      <span className="text-gra" data-testid="response-information-time">
        {labelTime ?? 'Time'}: <span className={getStatusColor(status)}>{formatValue(time)}</span>
      </span>
    </div>
  );
};

const getStatusColor = (status: number): string => {
  if (isInformationalResponse(status)) {
    return 'text-gray-500';
  }

  if (isSuccessResponse(status)) {
    return 'text-green-600';
  }

  if (isRedirectionResponse(status)) {
    return 'text-orange-600';
  }

  if (isClientErrorResponse(status)) {
    return 'text-red-600';
  }

  if (isServerErrorResponse(status)) {
    return 'text-red-600';
  }

  return 'text-gray-400';
};
