'use client';
import { HStack, useBreakpointValue, VStack } from '@chakra-ui/react';
import { cn } from 'clsx-for-tailwind';
import { useEffect, useState } from 'react';
import { BurgerButton } from '@/app/components/ui/BurgerButton';
import { BurgerMenu } from '@/app/components/ui/BurgerMenu';
import { ColorModeSelector } from '@/app/components/ui/ColorModeSelector';
import { ColorSchemeSelector } from '@/app/components/ui/ColorSchemeSelector';
import { LanguageSelect } from '@/app/components/ui/LanguageSelect';
import { Navigation } from '@/app/components/ui/Navigation';
import { AuthButtons } from '@/app/domains/auth/ui/NavigationButtons';

const SCROLL_THRESHOLD = 10;
const FADE_IN_ANIMATION_DURATION = 600;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false });

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
          {!isMobile && <Navigation />}

          <HStack align="center" gap={1}>
            {!isMobile && (
              <>
                <ColorSchemeSelector />
                <ColorModeSelector />
                <LanguageSelect />
                <HStack gap="2" w="full">
                  <AuthButtons variant="outline" />
                </HStack>
              </>
            )}
          </HStack>

          {isMobile && <BurgerButton onClick={() => setIsBurgerOpen(true)} />}
        </HStack>
      </VStack>

      {isMobile && <BurgerMenu isOpen={isBurgerOpen} onClose={() => setIsBurgerOpen(false)} />}
    </header>
  );
};
