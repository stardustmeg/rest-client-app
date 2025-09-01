export type FeatureFlag = keyof typeof FEATURE_FLAGS;

const FEATURE_FLAGS = {
  languageSelect: false,
  notEnabledComponent: false,
  signInForm: false,
} as const;

export const enabled = (feature: FeatureFlag) => FEATURE_FLAGS[feature];
