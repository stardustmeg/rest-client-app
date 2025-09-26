export const STATUS_CLASS_DIVISOR = 100;

export const STATUS_CLASS = {
  success: 2,
  redirect: 3,
  clientError: 4,
  serverError: 5,
};

export const DURATION_THRESHOLDS = {
  default: 0,
  fast: 500,
  medium: 1000,
  slow: 1500,
};

export const SIZE_THRESHOLDS = {
  default: 0,
  small: 1000,
  medium: 5000,
  large: 10_000,
};
