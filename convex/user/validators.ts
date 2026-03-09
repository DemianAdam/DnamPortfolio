import z from "zod";
import { ROLES } from "./types/role";

const roleLiterals = Object.values(ROLES).map((role) => z.literal(role));

const roleValidator = z.union(
  roleLiterals as [typeof roleLiterals[number], ...typeof roleLiterals[number][]]
);

export const userValidator = z.object({
  email: z.string(),
  name: z.optional(z.string()),
  emailVerified: z.optional(z.number()),
  image: z.optional(z.string()),
  role: roleValidator.default(ROLES.STUDENT)
});


