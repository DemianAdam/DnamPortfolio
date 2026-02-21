import { zid } from "convex-helpers/server/zod4";
import { adapterQuery } from "../adapter";
import z from "zod";

export const getUser = adapterQuery({
  args: { id: zid("users") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get("users", id);
  },
});

export const getUserByAccount = adapterQuery({
  args: { provider: z.string(), providerAccountId: z.string() },
  handler: async (ctx, { provider, providerAccountId }) => {
    const account = await ctx.db
      .query("accounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", provider).eq("providerAccountId", providerAccountId),
      )
      .unique();
    if (account === null) {
      return null;
    }
    return await ctx.db.get("users", account.userId);
  },
});

export const getUserByEmail = adapterQuery({
  args: { email: z.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .unique();
  },
});
