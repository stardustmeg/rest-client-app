export type FeatureFlag = keyof typeof FEATURE_FLAGS;

const FEATURE_FLAGS = {
  languageSelect: true,
  signUpForm: true,
  signInForm: true,
} as const;

export const enabled = (feature: FeatureFlag) => FEATURE_FLAGS[feature];
