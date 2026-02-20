import { defineSchema } from "convex/server";
import { authTables } from "./auth/authTables";
import { userTable } from "./user/schema";

export default defineSchema({
  ...authTables,
  users: userTable

});