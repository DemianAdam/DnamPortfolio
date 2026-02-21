import z from "zod";
import { adapterMutation } from "../adapter";
import { userValidator } from "../../user/validators";
import { zid } from "convex-helpers/server/zod4";

export const createUser = adapterMutation({
  args: { user: userValidator },
  handler: async (ctx, { user }) => {
    return await ctx.db.insert("users", user);
  },
});
export const updateUser = adapterMutation({
  args: {
    user: z.object({
      id: zid("users"),
      ...(userValidator.partial().shape),
    }),
  },
  handler: async (ctx, { user: { id, ...data } }) => {
    const user = await ctx.db.get("users", id);
    if (user === null) {
      return;
    }
    await ctx.db.patch("users", user._id, data);
  },
});
export const deleteUser = adapterMutation({
  args: { id: zid("users") },
  handler: async (ctx, { id }) => {
    const user = await ctx.db.get("users", id);
    if (user === null) {
      return null;
    }
    await ctx.db.delete("users", id);
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("userId", (q) => q.eq("userId", id))
      .collect();
    for (const session of sessions) {
      await ctx.db.delete("sessions", session._id);
    }
    const accounts = await ctx.db
      .query("accounts")
      .withIndex("userId", (q) => q.eq("userId", id))
      .collect();
    for (const account of accounts) {
      await ctx.db.delete("accounts", account._id);
    }
    return user;
  },
});