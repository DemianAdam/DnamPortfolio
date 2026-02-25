/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as accessCode_validator from "../accessCode/validator.js";
import type * as auth_account_helpers from "../auth/account/helpers.js";
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
import type * as auth_user_mutations from "../auth/user/mutations.js";
import type * as auth_user_queries from "../auth/user/queries.js";
import type * as auth_verificationToken_mutations from "../auth/verificationToken/mutations.js";
import type * as auth_verificationToken_validators from "../auth/verificationToken/validators.js";
import type * as counter from "../counter.js";
import type * as http from "../http.js";
import type * as triggers from "../triggers.js";
import type * as user_roles from "../user/roles.js";
import type * as user_validators from "../user/validators.js";
import type * as videoAccess_validator from "../videoAccess/validator.js";
import type * as video_mutations from "../video/mutations.js";
import type * as video_triggers from "../video/triggers.js";
import type * as video_validator from "../video/validator.js";
import type * as zod_zod from "../zod/zod.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "accessCode/validator": typeof accessCode_validator;
  "auth/account/helpers": typeof auth_account_helpers;
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
  "auth/user/mutations": typeof auth_user_mutations;
  "auth/user/queries": typeof auth_user_queries;
  "auth/verificationToken/mutations": typeof auth_verificationToken_mutations;
  "auth/verificationToken/validators": typeof auth_verificationToken_validators;
  counter: typeof counter;
  http: typeof http;
  triggers: typeof triggers;
  "user/roles": typeof user_roles;
  "user/validators": typeof user_validators;
  "videoAccess/validator": typeof videoAccess_validator;
  "video/mutations": typeof video_mutations;
  "video/triggers": typeof video_triggers;
  "video/validator": typeof video_validator;
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

export declare const components: {
  shardedCounter: {
    public: {
      add: FunctionReference<
        "mutation",
        "internal",
        { count: number; name: string; shard?: number; shards?: number },
        number
      >;
      count: FunctionReference<"query", "internal", { name: string }, number>;
      estimateCount: FunctionReference<
        "query",
        "internal",
        { name: string; readFromShards?: number; shards?: number },
        any
      >;
      rebalance: FunctionReference<
        "mutation",
        "internal",
        { name: string; shards?: number },
        any
      >;
      reset: FunctionReference<"mutation", "internal", { name: string }, any>;
    };
  };
};
