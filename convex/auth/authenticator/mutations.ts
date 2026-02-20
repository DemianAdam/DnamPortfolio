import z from "zod";
import { adapterMutation } from "../adapter";
import { authenticatorValidator } from "./validators.ts";

export const createAuthenticator = adapterMutation({
  args: { authenticator: authenticatorValidator },
  handler: async (ctx, args) => {
    return await ctx.db.insert("authenticators", args.authenticator);
  },
});

export const updateAuthenticatorCounter = adapterMutation({
  args: { credentialID: z.string(), newCounter: z.number() },
  handler: async (ctx, { credentialID, newCounter }) => {
    const authenticator = await ctx.db
      .query("authenticators")
      .withIndex("credentialID", (q) => q.eq("credentialID", credentialID))
      .unique();
    if (authenticator === null) {
      throw new Error(
        `Authenticator not found for credentialID: ${credentialID}`,
      );
    }
    await ctx.db.patch("authenticators", authenticator._id, { counter: newCounter });
    return { ...authenticator, counter: newCounter };
  },
});