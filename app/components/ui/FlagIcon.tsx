import { chakra } from '@chakra-ui/react';
import type { RoutingLocales } from '@/i18n/routing';

interface FlagIconProps {
  country: RoutingLocales;
  size?: number;
  height?: number;
  title?: string;
}

const FLAG_ASPECT_RATIO = 1.5;

export const FlagIcon: React.FC<FlagIconProps> = ({ country, size = 20, height = 6, title }) => {
  switch (country) {
    case 'en':
      return (
        <chakra.svg
          viewBox="0 0 36 24"
          width={size * FLAG_ASPECT_RATIO}
          height={height}
          borderRadius="2px"
          display="inline-block"
        >
          <title>{title}</title>
          <chakra.rect width="36" height="2" y="0" fill="#B22234" />
          <chakra.rect width="36" height="2" y="4" fill="#B22234" />
          <chakra.rect width="36" height="2" y="8" fill="#B22234" />
          <chakra.rect width="36" height="2" y="12" fill="#B22234" />
          <chakra.rect width="36" height="2" y="16" fill="#B22234" />
          <chakra.rect width="36" height="2" y="20" fill="#B22234" />
          <chakra.rect width="36" height="2" y="2" fill="white" />
          <chakra.rect width="36" height="2" y="6" fill="white" />
          <chakra.rect width="36" height="2" y="10" fill="white" />
          <chakra.rect width="36" height="2" y="14" fill="white" />
          <chakra.rect width="36" height="2" y="18" fill="white" />
          <chakra.rect width="36" height="2" y="22" fill="white" />
          <chakra.rect width="15" height="12" fill="#3C3B6E" />
          <chakra.circle cx="3" cy="1.5" r="0.8" fill="white" />
          <chakra.circle cx="6" cy="1.5" r="0.8" fill="white" />
          <chakra.circle cx="9" cy="1.5" r="0.8" fill="white" />
          <chakra.circle cx="12" cy="1.5" r="0.8" fill="white" />
          <chakra.circle cx="4.5" cy="4.5" r="0.8" fill="white" />
          <chakra.circle cx="7.5" cy="4.5" r="0.8" fill="white" />
          <chakra.circle cx="10.5" cy="4.5" r="0.8" fill="white" />
          <chakra.circle cx="13.5" cy="4.5" r="0.8" fill="white" />
          <chakra.circle cx="3" cy="7.5" r="0.8" fill="white" />
          <chakra.circle cx="6" cy="7.5" r="0.8" fill="white" />
          <chakra.circle cx="9" cy="7.5" r="0.8" fill="white" />
          <chakra.circle cx="12" cy="7.5" r="0.8" fill="white" />
          <chakra.circle cx="4.5" cy="10.5" r="0.8" fill="white" />
          <chakra.circle cx="7.5" cy="10.5" r="0.8" fill="white" />
          <chakra.circle cx="10.5" cy="10.5" r="0.8" fill="white" />
          <chakra.circle cx="13.5" cy="10.5" r="0.8" fill="white" />
        </chakra.svg>
      );

    case 'ru':
      return (
        <chakra.svg
          viewBox="0 0 36 24"
          width={size * FLAG_ASPECT_RATIO}
          height={height}
          borderRadius="2px"
          display="inline-block"
        >
          <title>{title}</title>
          <chakra.rect width="36" height="8" y="0" fill="white" />
          <chakra.rect width="36" height="8" y="8" fill="#0052B4" />
          <chakra.rect width="36" height="8" y="16" fill="#D52B1E" />
        </chakra.svg>
      );

    case 'jp':
      return (
        <chakra.svg
          viewBox="0 0 36 24"
          width={size * FLAG_ASPECT_RATIO}
          height={height}
          borderRadius="2px"
          display="inline-block"
        >
          <title>{title}</title>
          <chakra.rect width="36" height="24" fill="white" />
          <chakra.circle cx="18" cy="12" r="7" fill="#D52B1E" />
        </chakra.svg>
      );

    default:
      return null;
  }
};
