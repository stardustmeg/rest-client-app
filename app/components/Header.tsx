'use client';
import { Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { ColorModeSelector } from '@/app/components/ui/ColorModeSelector';
import { ColorSchemeSelector } from '@/app/components/ui/ColorSchemeSelector';
import { LanguageSelect } from '@/app/components/ui/LanguageSelect';
import { Navigation } from '@/app/components/ui/Navigation';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';

export const Header = () => {
  const t = useTranslations('navigation');
  const tNotification = useTranslations('notifications');
  const { signOut } = useAuthActions();
  const { success } = useToast();

  const handleSignOut = () => {
    signOut().finally(() => success(tNotification('signOutSuccess')));
  };

  return (
    <header className="!mb-10 sticky top-0 z-10 flex flex-col gap-2 align-center">
      <div className="flex justify-center">
        <Navigation />
        <LanguageSelect />

        <Button onClick={handleSignOut}>{t('signOut')}</Button>

        <ColorSchemeSelector />
        <ColorModeSelector />
      </div>
    </header>
  );
};
