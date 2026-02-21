import z from "zod";
import { ROLES, roleSchema } from "./roles";

export const userValidator = z.object({
  email: z.string(),
  name: z.optional(z.string()),
  emailVerified: z.optional(z.number()),
  image: z.optional(z.string()),
  role: roleSchema.default(ROLES.STUDENT)
});


