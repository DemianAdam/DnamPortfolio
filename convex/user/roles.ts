import { z } from "zod";

export const ROLES = {
    ADMIN: "admin",
    STUDENT: "student",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

const roleLiterals = Object.values(ROLES).map((role) => z.literal(role));

export const roleSchema = z.union(
  roleLiterals as [typeof roleLiterals[number], ...typeof roleLiterals[number][]]
);
