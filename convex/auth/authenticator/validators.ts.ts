import { zid } from "convex-helpers/server/zod4";
import z from "zod"

export const authenticatorValidator = z.object({
  credentialID: z.string(),
  userId: zid("users"),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().nullish(),
});
