import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { accountValidator } from "./validators";

const accountSchema = zodOutputToConvex(accountValidator);

export const accountTable =
  defineTable(accountSchema)
    .index("providerAndAccountId", ["provider", "providerAccountId"])
    .index("userId", ["userId"]);
