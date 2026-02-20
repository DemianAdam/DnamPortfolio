import { zodOutputToConvex } from "convex-helpers/server/zod";
import { userValidator } from "./validators";
import { defineTable } from "convex/server";

const userSchema = zodOutputToConvex(userValidator);

export const userTable =
  defineTable(userSchema)
    .index("email", ["email"]);