import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { sessionValidator } from "./validators";

const sessionSchema = zodOutputToConvex(sessionValidator);

export const sessionTable = defineTable(sessionSchema)
  .index("sessionToken", ["sessionToken"])
  .index("userId", ["userId"]);
