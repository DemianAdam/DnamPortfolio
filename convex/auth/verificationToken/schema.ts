import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { verificationTokenValidator } from "./validators";

const verificationTokenSchema = zodOutputToConvex(verificationTokenValidator);

export const verificationTokenTable = defineTable(verificationTokenSchema)
  .index("identifierToken", ["identifier", "token"]);
