import z from "zod";
import { adapterMutation } from "../adapter";
import { verificationTokenValidator } from "./validators";

export const createVerificationToken = adapterMutation({
  args: { verificationToken: verificationTokenValidator },
  handler: async (ctx, { verificationToken }) => {
    return await ctx.db.insert("verificationTokens", verificationToken);
  },
});

export const useVerificationToken = adapterMutation({
  args: { identifier: z.string(), token: z.string() },
  handler: async (ctx, { identifier, token }) => {
    const verificationToken = await ctx.db
      .query("verificationTokens")
      .withIndex("identifierToken", (q) =>
        q.eq("identifier", identifier).eq("token", token),
      )
      .unique();
    if (verificationToken === null) {
      return null;
    }
    await ctx.db.delete("verificationTokens", verificationToken._id);
    return verificationToken;
  },
});