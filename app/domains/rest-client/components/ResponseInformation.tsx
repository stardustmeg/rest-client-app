'use client';

export interface ResponseInformationProps {
  status: number;
  size: number;
  time: number;
}

export const ResponseInformation = ({ size, status, time }: ResponseInformationProps) => {
  return (
    <div className="flex gap-3">
      <span>Status: {status}</span>
      <span>Size: {size}</span>
      <span>Time: {time}</span>
    </div>
  );
};
