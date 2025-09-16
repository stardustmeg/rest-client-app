import type { ButtonProps } from '@chakra-ui/react';
import { type DisplayContextType, DisplayPolicy } from '@/app/domains/auth/types/nav-config';
import { NavButtons } from '@/app/domains/auth/ui/NavButtons';
import { navButtonsConfig } from '@/data/navLinksInfo';

interface SukaProps extends ButtonProps {
  context: DisplayContextType;
}

export const Suka = ({ context, ...props }: SukaProps) => {
  const config = navButtonsConfig.filter((button) => button.contexts.includes(context));

  return (
    <>
      <NavButtons displayPolicy={DisplayPolicy.public} config={config} {...props} />
      <NavButtons displayPolicy={DisplayPolicy.authenticated} config={config} {...props} />
      <NavButtons displayPolicy={DisplayPolicy.unauthenticated} config={config} {...props} />
    </>
  );
};
