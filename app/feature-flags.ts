export type FeatureFlag = keyof typeof FEATURE_FLAGS;

const FEATURE_FLAGS = {
  languageSelect: true,
  // TBD: remove later; just an example
  notEnabledComponent: false,
  signUpForm: false,
  signInForm: false,
} as const;

export const enabled = (feature: FeatureFlag) => FEATURE_FLAGS[feature];
