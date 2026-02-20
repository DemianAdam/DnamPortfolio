import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const sessionValidator = z.object({
  userId: zid("users"),
  expires: z.number(),
  sessionToken: z.string(),
});


