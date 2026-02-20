import z from "zod";
import { adapterQuery } from "../adapter";

export const getSessionAndUser = adapterQuery({
  args: { sessionToken: z.string() },
  handler: async (ctx, { sessionToken }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("sessionToken", (q) => q.eq("sessionToken", sessionToken))
      .unique();
    if (session === null) {
      return null;
    }
    const user = await ctx.db.get("users",session.userId);
    if (user === null) {
      return null;
    }
    return { session, user };
  },
});