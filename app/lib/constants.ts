/** biome-ignore-all lint/style/useNamingConvention: <no> */
export const HTTP_METHOD = {
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
  PATCH: 'PATCH',
};

export const HTTP_METHODS_WITH_BODY = new Set([
  HTTP_METHOD.POST,
  HTTP_METHOD.PUT,
  HTTP_METHOD.PATCH,
  HTTP_METHOD.DELETE,
  HTTP_METHOD.OPTIONS,
]);

export const MIME_TYPE = {
  JSON: 'application/json',
  TEXT: 'text/plain',
} as const;

export const KILOBYTE = 1024;

export const STATUS_INFORMATIONAL_MIN = 100;
export const STATUS_INFORMATIONAL_MAX = 199;
export const STATUS_SUCCESS_MIN = 200;
export const STATUS_SUCCESS_MAX = 299;
export const STATUS_REDIRECTION_MIN = 300;
export const STATUS_REDIRECTION_MAX = 399;
export const STATUS_CLIENT_ERROR_MIN = 400;
export const STATUS_CLIENT_ERROR_MAX = 499;
export const STATUS_SERVER_ERROR_MIN = 500;
export const STATUS_SERVER_ERROR_MAX = 599;
