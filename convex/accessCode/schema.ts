import { zodOutputToConvex } from "convex-helpers/server/zod";
import { accessCodeValidator } from "./validator";
import { defineTable } from "convex/server";

const accessCodeSchema = zodOutputToConvex(accessCodeValidator);

export const accessCodeTable =
    defineTable(accessCodeSchema)
        .index("index_byCode", ["code"])
        .index("index_byVideo", ["videoId"])
        .index("index_byExpiration", ["expiresAt"])
        .index("index_byCreator", ["createdBy"]);