import z from "zod";
import { adapterMutation } from "../adapter";
import { accountValidator } from "./validators";
import { toAdapterAccount } from "./helpers";

export const linkAccount = adapterMutation({
  args: { account: accountValidator },
  handler: async (ctx, { account }) => {
    const id = await ctx.db.insert("accounts", account);

    const inserted = await ctx.db.get("accounts", id);
    if (!inserted) {
      return null;
    }
    return toAdapterAccount(inserted);
  },
});

export const unlinkAccount = adapterMutation({
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
    await ctx.db.delete("accounts", account._id);
    return toAdapterAccount(account);
  },
});