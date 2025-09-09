'use client';
import { Button, HStack, VStack } from '@chakra-ui/react';
import { cn } from 'clsx-for-tailwind';
import { Authenticated } from 'convex/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ColorModeSelector } from '@/app/components/ui/ColorModeSelector';
import { ColorSchemeSelector } from '@/app/components/ui/ColorSchemeSelector';
import { LanguageSelect } from '@/app/components/ui/LanguageSelect';
import { Navigation } from '@/app/components/ui/Navigation';
import { useAuthActions } from '@/app/hooks/use-auth-actions';
import { useToast } from '@/app/hooks/use-toast';

const SCROLL_THRESHOLD = 10;
const FADE_IN_ANIMATION_DURATION = 600;

export const Header = () => {
  const t = useTranslations('navigation');
  const tNotification = useTranslations('notifications');
  const { signOut } = useAuthActions();
  const { success } = useToast();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let animationStartTime: number | null = null;

    const handleScroll = () => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD;

      if (scrolled && !isScrolled) {
        setIsAnimating(true);

        const endAnimation = (timestamp: number) => {
          animationStartTime = animationStartTime || timestamp;
          const elapsed = timestamp - animationStartTime;
          const shouldEnd = elapsed >= FADE_IN_ANIMATION_DURATION;

          if (shouldEnd) {
            setIsAnimating(false);
            animationStartTime = null;
          } else {
            animationFrameId = requestAnimationFrame(endAnimation);
          }
        };

        animationFrameId = requestAnimationFrame(endAnimation);
      }

      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isScrolled]);

  const handleSignOut = () => signOut().finally(() => success(tNotification('signOutSuccess')));
  return (
    <header
      className={cn(
        '!p-4 sticky top-0 z-50 place-content-center transition-all duration-300 ease-in-out',
        {
          'border-gray-200 border-b bg-white/50 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/50':
            isScrolled,
          'bg-white dark:bg-gray-900': !isScrolled,
          'animate-fade-in-scale': isAnimating,
        },
      )}
    >
      <VStack className="gap-2 px-4 py-3">
        <HStack className="mx-auto w-full max-w-7xl justify-between">
          <Navigation />

          <HStack align="center" gap={1}>
            <ColorSchemeSelector />
            <ColorModeSelector />
            <LanguageSelect />

            <Authenticated>
              <Button size="sm" variant="outline" onClick={handleSignOut}>
                {t('signOut')}
              </Button>
            </Authenticated>
          </HStack>
        </HStack>
      </VStack>
    </header>
  );
};
