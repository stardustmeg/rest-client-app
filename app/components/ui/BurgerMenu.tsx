'use client';
import { Box, Button, HStack, Portal, VStack } from '@chakra-ui/react';
import { Authenticated } from 'convex/react';
import { useTranslations } from 'next-intl';
import { ColorModeSelector } from '@/app/components/ui/ColorModeSelector';
import { ColorSchemeSelector } from '@/app/components/ui/ColorSchemeSelector';
import { LanguageSelect } from '@/app/components/ui/LanguageSelect';
import { Navigation } from '@/app/components/ui/Navigation';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
  const t = useTranslations('navigation');
  const tNotification = useTranslations('notifications');
  const { signOut } = useAuthActions();
  const { success } = useToast();

  const handleSignOut = () => {
    signOut().finally(() => success(tNotification('signOutSuccess')));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
        zIndex="9998"
        onClick={onClose}
      />

      <Box
        position="fixed"
        top="0"
        right="0"
        height="100vh"
        width="280px"
        bg="bg"
        shadow="2xl"
        zIndex="9999"
        transform={isOpen ? 'translateX(0)' : 'translateX(100%)'}
        transition="transform 0.3s ease-in-out"
        overflowY="auto"
      >
        <VStack align="stretch" gap={6} h="full" p={4}>
          <VStack align="stretch" gap={4} paddingTop={6}>
            <Navigation direction={isOpen ? 'vertical' : 'horizontal'} />
          </VStack>

          <VStack align="stretch" gap={3} mt="auto">
            <HStack justify="center" gap={2}>
              <ColorSchemeSelector />
              <ColorModeSelector />
              <LanguageSelect disablePortal />
            </HStack>

            <Authenticated>
              <Button size="sm" variant="outline" onClick={handleSignOut} w="full">
                {t('signOut')}
              </Button>
            </Authenticated>
          </VStack>
        </VStack>
      </Box>
    </Portal>
  );
};
