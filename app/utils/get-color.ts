/** biome-ignore-all lint/nursery/noUnnecessaryConditions: <are you schewpid?> */
import {
  DURATION_THRESHOLDS,
  SIZE_THRESHOLDS,
  STATUS_CLASS,
  STATUS_CLASS_DIVISOR,
} from './constants';

export const getStatusColor = (status: number): string => {
  switch (Math.floor(status / STATUS_CLASS_DIVISOR)) {
    case STATUS_CLASS.success:
      return 'green';
    case STATUS_CLASS.redirect:
      return 'orange';
    case STATUS_CLASS.clientError:
    case STATUS_CLASS.serverError:
    case STATUS_CLASS.error:
      return 'red';
    default:
      return 'gray';
  }
};

export const getDurationColor = (duration: number): string => {
  switch (true) {
    case duration === DURATION_THRESHOLDS.default:
      return 'gray';
    case duration < DURATION_THRESHOLDS.fast:
      return 'green';
    case duration < DURATION_THRESHOLDS.medium:
      return 'yellow';
    case duration < DURATION_THRESHOLDS.slow:
      return 'orange';
    default:
      return 'red';
  }
};

export const getSizeColor = (size: number): string => {
  switch (true) {
    case size === SIZE_THRESHOLDS.default:
      return 'gray';
    case size < SIZE_THRESHOLDS.small:
      return 'green';
    case size < SIZE_THRESHOLDS.medium:
      return 'yellow';
    case size < SIZE_THRESHOLDS.large:
      return 'orange';
    default:
      return 'red';
  }
};
