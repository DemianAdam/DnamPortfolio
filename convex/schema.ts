import { defineSchema } from "convex/server";
import { authTables } from "./auth/authTables";
import { userTable } from "./user/schema";
import { videoTable } from "./video/schema";
import { videoAccessTable } from "./videoAccess/schema";
import { accessCodeTable } from "./accessCode/schema";

export default defineSchema({
  ...authTables,
  users: userTable,
  videos: videoTable,
  videoAccess: videoAccessTable,
  accessCodes: accessCodeTable
});