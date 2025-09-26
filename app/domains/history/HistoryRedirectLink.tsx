'use client';
import { Button } from '@chakra-ui/react';
import { useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { Link } from '@/i18n/routing';
import { responseInfoAtom } from '../rest-client/atoms';

interface HistoryRedirectLinkProps {
  redirectLink: string;
}

export const HistoryRedirectLink = ({ redirectLink }: HistoryRedirectLinkProps) => {
  const resetResponseInfo = useResetAtom(responseInfoAtom);
  useEffect(() => {
    resetResponseInfo();
  }, [resetResponseInfo]);

  return (
    <Tooltip content={`${window.location.origin}${redirectLink}`}>
      <Link href={redirectLink}>
        <Button variant="ghost" size="sm">
          <BsChevronRight />
        </Button>
      </Link>
    </Tooltip>
  );
};
