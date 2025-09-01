export type FeatureFlag = keyof typeof FEATURE_FLAGS;

const FEATURE_FLAGS = {
  languageSelect: true,
  notEnabledComponent: false,
  signUpForm: false,
  signInForm: true,
} as const;

export const enabled = (feature: FeatureFlag) => FEATURE_FLAGS[feature];
