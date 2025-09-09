'use client';

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
        {labelStatus ?? 'Status'}: {status}
      </span>
      <span data-testid="response-information-size">
        {labelSize ?? 'Size'}: {size}
      </span>
      <span data-testid="response-information-time">
        {labelTime ?? 'Time'}: {time}
      </span>
    </div>
  );
};
