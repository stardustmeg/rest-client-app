import { ColorModeSelector } from './ui/ColorModeSelector';
import { ColorSchemeSelector } from './ui/ColorSchemeSelector';
import { LanguageSelect } from './ui/LanguageSelect';
import { Navigation } from './ui/Navigation';

export const Header = () => {
  return (
    <header className="!mb-10 sticky top-0 z-10 flex flex-col gap-2 align-center">
      <div className="flex justify-center">
        <Navigation />
        <LanguageSelect />
        <ColorSchemeSelector />
        <ColorModeSelector />
      </div>
    </header>
  );
};
