'use client';

import { useAtomValue } from 'jotai';
import { responseInformationAtom } from '../atoms';

export const ResponseInformation = () => {
  const responseInfo = useAtomValue(responseInformationAtom);

  return (
    <div className="flex gap-3">
      <span>Status: {responseInfo?.status}</span>
      <span>Size: {responseInfo?.size}</span>
      <span>Time: {responseInfo?.time}</span>
    </div>
  );
};
