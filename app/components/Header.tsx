import { ColorModeButton } from './ui/ColorMode';
import { LanguageSelect } from './ui/LanguageSelect';
import { Navigation } from './ui/Navigation';

export const Header = () => {
  return (
    <header className="fixed top-4 right-4 z-10 flex flex-col gap-2">
      <div className="flex">
        <Navigation />
        <LanguageSelect />
        <ColorModeButton />
      </div>
    </header>
  );
};
