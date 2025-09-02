import { routes } from '@/app/[locale]/routes';
import { NavigationLink } from './NavigationLink';

export const Navigation = () => {
  return (
    <nav className="!p-4 flex gap-4 bg-gray-100 dark:bg-gray-800">
      {Object.values(routes).map((route) => (
        <NavigationLink key={route.path} route={route} />
      ))}
    </nav>
  );
};
