import z from "zod";
import { adapterQuery } from "../adapter";
import { zid } from "convex-helpers/server/zod4";

export const getAuthenticator = adapterQuery({
  args: { credentialID: z.string() },
  handler: async (ctx, { credentialID }) => {
    return await ctx.db
      .query("authenticators")
      .withIndex("credentialID", (q) => q.eq("credentialID", credentialID))
      .unique();
  },
});

export const listAuthenticatorsByUserId = adapterQuery({
  args: { userId: zid("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("authenticators")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .collect();
  },
});