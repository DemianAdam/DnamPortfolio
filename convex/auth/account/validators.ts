import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const accountValidator = z.object({
  userId: zid("users"),
  type: z.enum([
    "email",
    "oidc",
    "oauth",
    "webauthn",
  ]),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.optional(z.string()),
  access_token: z.optional(z.string()),
  expires_at: z.optional(z.number()),
  token_type: z.optional(z.string()),
  scope: z.optional(z.string()),
  id_token: z.optional(z.string()),
  session_state: z.optional(z.string()),
});

