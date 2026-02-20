import z from "zod";
import { adapterQuery } from "../adapter";
import { toAdapterAccount } from "./helpers";

export const getAccount = adapterQuery({
  args: { provider: z.string(), providerAccountId: z.string() },
  handler: async (ctx, { provider, providerAccountId }) => {
    const account = await ctx.db
      .query("accounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", provider).eq("providerAccountId", providerAccountId),
      )
      .unique();


    if (!account) {
      return null;
    }


    return toAdapterAccount(account);
  },
});



