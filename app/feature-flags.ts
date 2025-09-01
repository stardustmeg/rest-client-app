export type FeatureFlag = keyof typeof FEATURE_FLAGS;

const FEATURE_FLAGS = {
  // TBD: replace with real one later
  isFeatureEnabled: false,
  notEnabledComponent: false,
  signInForm: true,
} as const;

export const enabled = (feature: FeatureFlag) => FEATURE_FLAGS[feature];
