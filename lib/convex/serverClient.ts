// lib/convex/serverClient.ts

import {
  FunctionReference,
  ArgsAndOptions,
  FunctionReturnType,
} from "convex/server";

import { fetchMutation, fetchQuery } from "convex/nextjs";

type ConvexClientOptions = {
  token: string;
};

export function createConvexClient(options: ConvexClientOptions) {
  return {
    mutation: async <
      Mutation extends FunctionReference<"mutation">
    >(
      mutation: Mutation,
      ...args: ArgsAndOptions<Mutation, { token: string }>
    ): Promise<FunctionReturnType<Mutation>> => {
      const [fnArgs] = args;

      return fetchMutation(
        mutation,
        fnArgs,
        { token: options.token }
      );
    },

    query: async <
      Query extends FunctionReference<"query">
    >(
      query: Query,
      ...args: ArgsAndOptions<Query, { token: string }>
    ): Promise<FunctionReturnType<Query>> => {
      const [fnArgs] = args;

      return fetchQuery(
        query,
        fnArgs,
        { token: options.token }
      );
    },
  };
}

export type ConvexClient = ReturnType<typeof createConvexClient>;