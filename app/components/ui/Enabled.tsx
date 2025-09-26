import { enabled, type FeatureFlag } from '@/app/feature-flags';

interface EnabledProps {
  children: React.ReactNode;
  feature: FeatureFlag;
}

export const Enabled = ({ children, feature }: EnabledProps) => {
  return <>{enabled(feature) && children}</>;
};
