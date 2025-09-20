/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules, FilterApi, FunctionReference } from 'convex/server';
import type * as auth from '../auth.js';
import type * as CustomProfile from '../CustomProfile.js';
import type * as history from '../history.js';
import type * as http from '../http.js';
import type * as schemasHistorySchema from '../schemas/historySchema.js';
import type * as schemasUsersSchema from '../schemas/usersSchema.js';
import type * as typesIndex from '../types/index.js';
import type * as users from '../users.js';

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  CustomProfile: typeof CustomProfile;
  auth: typeof auth;
  history: typeof history;
  http: typeof http;
  'schemas/historySchema': typeof schemasHistorySchema;
  'schemas/usersSchema': typeof schemasUsersSchema;
  'types/index': typeof typesIndex;
  users: typeof users;
}>;
/* For reviewer: This is automatically generated API by Convex. */
export declare const api: FilterApi<typeof fullApi, FunctionReference<any, 'public'>>;
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, 'internal'>>;
