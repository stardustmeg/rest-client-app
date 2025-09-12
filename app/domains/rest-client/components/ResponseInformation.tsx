'use client';

import {
  isClientErrorResponse,
  isInformationalResponse,
  isRedirectionResponse,
  isServerErrorResponse,
  isSuccessResponse,
} from '@/app/lib/utils';

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
        {labelStatus ?? 'Status'}: <span className={getStatusColor(status)}>{status}</span>
      </span>
      <span data-testid="response-information-size">
        {labelSize ?? 'Size'}: <span className={getStatusColor(status)}>{size}</span>
      </span>
      <span data-testid="response-information-time">
        {labelTime ?? 'Time'}: <span className={getStatusColor(status)}>{time}</span>
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

  return 'text-gray-600';
};
