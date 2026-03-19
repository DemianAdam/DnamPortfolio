import z from "zod";
import { Doc } from "../../_generated/dataModel";
import { adminUserValidator } from "../validators";

export type User = Doc<"users">
export type CompletedUser = Extract<User, { completed: true }>
export type IncompleteUser = Extract<User, { completed: false }>
export type AdminUser = z.infer<typeof adminUserValidator>