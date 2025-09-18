import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import type { NavButtonsProps } from '@/app/domains/auth/ui/nav-items/NavButtons';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';
import type { WithRequired } from '@/types/types';

export const useSignOutAction = () => {
  const { signOut } = useAuthActions();
  const { successToast } = useToast();
  const tNotification = useTranslations('notifications');

  return useCallback<WithRequired<NavButtonsProps, 'onAction'>['onAction']>(
    (action) => {
      action === 'signOut' &&
        signOut().finally(() => successToast(tNotification('signOutSuccess')));
    },
    [signOut, successToast, tNotification],
  );
};
