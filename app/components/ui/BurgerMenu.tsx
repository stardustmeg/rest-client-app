'use client';
import { Box, HStack, Portal, VStack } from '@chakra-ui/react';
import { ColorModeSelector } from '@/app/components/ui/ColorModeSelector';
import { ColorSchemeSelector } from '@/app/components/ui/ColorSchemeSelector';
import { LanguageSelect } from '@/app/components/ui/LanguageSelect';
import { useSignOutAction } from '@/app/domains/auth/hooks/use-signout-action';
import { NavButtons } from '@/app/domains/auth/ui/nav-items/NavButtons';
import type { NavConfigItem } from '@/app/domains/auth/ui/nav-items/types';
import {
  doSignOut,
  toHistoryAndAnalytics,
  toMain,
  toRestClient,
  toSignIn,
  toSignUp,
  toVariables,
} from '@/data/navLinksInfo';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

const burgerMenuItems: NavConfigItem[] = [
  toMain,
  toSignIn,
  toSignUp,
  toRestClient,
  toHistoryAndAnalytics,
  toVariables,
  doSignOut,
];

export const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
  const handleNavButtonsAction = useSignOutAction();
  return (
    isOpen && (
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
              <NavButtons
                items={burgerMenuItems}
                variant="ghost"
                size="lg"
                px="2"
                onAction={handleNavButtonsAction}
                onClick={onClose}
              />
            </VStack>

            <VStack align="stretch" gap={3} mt="auto">
              <HStack justify="center" gap={2}>
                <ColorSchemeSelector />
                <ColorModeSelector />
                <LanguageSelect disablePortal />
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Portal>
    )
  );
};
