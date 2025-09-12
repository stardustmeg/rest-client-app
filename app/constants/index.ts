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
