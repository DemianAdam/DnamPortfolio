import z from "zod";
import { adapterMutation } from "../adapter";
import { sessionValidator } from "./validators";

export const createSession = adapterMutation({
  args: { session: sessionValidator },
  handler: async (ctx, { session }) => {
    return await ctx.db.insert("sessions", session);
  },
});

export const updateSession = adapterMutation({
  args: {
    session: z.object({
      expires: z.number(),
      sessionToken: z.string(),
    }),
  },
  handler: async (ctx, { session }) => {
    const existingSession = await ctx.db
      .query("sessions")
      .withIndex("sessionToken", (q) =>
        q.eq("sessionToken", session.sessionToken),
      )
      .unique();
    if (existingSession === null) {
      return null;
    }
    await ctx.db.patch("sessions", existingSession._id, session);
  },
});

export const deleteSession = adapterMutation({
  args: { sessionToken: z.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("sessionToken", (q) => q.eq("sessionToken", args.sessionToken))
      .unique();
    if (session === null) {
      return null;
    }
    await ctx.db.delete("sessions", session._id);
    return session;
  },
});