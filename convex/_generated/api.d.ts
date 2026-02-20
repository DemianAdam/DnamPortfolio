/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth_account_mutations from "../auth/account/mutations.js";
import type * as auth_account_queries from "../auth/account/queries.js";
import type * as auth_account_validators from "../auth/account/validators.js";
import type * as auth_adapter from "../auth/adapter.js";
import type * as auth_authTables from "../auth/authTables.js";
import type * as auth_authenticator_mutations from "../auth/authenticator/mutations.js";
import type * as auth_authenticator_queries from "../auth/authenticator/queries.js";
import type * as auth_session_mutations from "../auth/session/mutations.js";
import type * as auth_session_queries from "../auth/session/queries.js";
import type * as auth_session_validators from "../auth/session/validators.js";
import type * as auth_verificationToken_mutations from "../auth/verificationToken/mutations.js";
import type * as auth_verificationToken_validators from "../auth/verificationToken/validators.js";
import type * as user_mutations from "../user/mutations.js";
import type * as user_queries from "../user/queries.js";
import type * as user_validators from "../user/validators.js";
import type * as zod_zod from "../zod/zod.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "auth/account/mutations": typeof auth_account_mutations;
  "auth/account/queries": typeof auth_account_queries;
  "auth/account/validators": typeof auth_account_validators;
  "auth/adapter": typeof auth_adapter;
  "auth/authTables": typeof auth_authTables;
  "auth/authenticator/mutations": typeof auth_authenticator_mutations;
  "auth/authenticator/queries": typeof auth_authenticator_queries;
  "auth/session/mutations": typeof auth_session_mutations;
  "auth/session/queries": typeof auth_session_queries;
  "auth/session/validators": typeof auth_session_validators;
  "auth/verificationToken/mutations": typeof auth_verificationToken_mutations;
  "auth/verificationToken/validators": typeof auth_verificationToken_validators;
  "user/mutations": typeof user_mutations;
  "user/queries": typeof user_queries;
  "user/validators": typeof user_validators;
  "zod/zod": typeof zod_zod;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
