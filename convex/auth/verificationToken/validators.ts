import z from "zod";

export const verificationTokenValidator = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.number(),
});