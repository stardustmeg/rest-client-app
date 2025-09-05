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
    signOut();
    success(tNotification('signOutSuccess'));
  };

  return (
    <header className="fixed top-4 right-4 z-10 flex flex-col gap-2">
      <div className="flex">
        <Navigation />
        <LanguageSelect />

        <Button onClick={handleSignOut}>{t('signOut')}</Button>

        <ColorSchemeSelector />
        <ColorModeSelector />
      </div>
    </header>
  );
};
