'use client';

export interface ResponseInformationProps {
  status: number;
  size: number;
  time: number;
}

export const ResponseInformation = ({ size, status, time }: ResponseInformationProps) => {
  return (
    <div data-testid="response-information" className="flex gap-3">
      <span data-testid="response-information-status">Status: {status}</span>
      <span data-testid="response-information-size">Size: {size}</span>
      <span data-testid="response-information-time">Time: {time}</span>
    </div>
  );
};
