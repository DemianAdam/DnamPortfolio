import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { authenticatorValidator } from "./validators.ts";

const authenticatorSchema = zodOutputToConvex(authenticatorValidator);

export const authenticatorTable = defineTable(authenticatorSchema)
  .index("userId", ["userId"])
  .index("credentialID", ["credentialID"]);
