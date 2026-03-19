import z from "zod";
import { ROLES } from "./types/role";
import { zid } from "convex-helpers/server/zod4";

const roleLiterals = Object.values(ROLES).map((role) => z.literal(role));

const roleValidator = z.union(
  roleLiterals as [typeof roleLiterals[number], ...typeof roleLiterals[number][]]
);

export const userValidator = z.union([
  z.object({
    email: z.string(),
    name: z.optional(z.string()),
    emailVerified: z.optional(z.number()),
    image: z.optional(z.string()),
    role: roleValidator.default(ROLES.STUDENT),
    completed: z.literal(false).default(false)
  }),
  z.object({
    email: z.string(),
    name: z.string(),
    emailVerified: z.optional(z.number()),
    image: z.optional(z.string()),
    role: roleValidator.default(ROLES.STUDENT),
    completed: z.literal(true).default(true)
  })
]);

export const simpleUserValidator = z.object({
  id: zid("users"),
  name: z.string(),
  email: z.string()
});

export const adminUserValidator = z.object({
  _id: z.string(),
  role: z.literal(ROLES.ADMIN)
});

export const userIdValidator = z.union([zid("users"), adminUserValidator.pick({ _id: true }).shape._id])

