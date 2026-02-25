import { zodOutputToConvex } from "convex-helpers/server/zod";
import { videoValidator } from "./validator";
import { defineTable } from "convex/server";

const videoSchema = zodOutputToConvex(videoValidator);

export const videoTable =
    defineTable(videoSchema)
        .index("index_byCreator", ["createdBy"])
        .index("index_byIsFree", ["isFree"])
        .index("index_byIsFree_and_freeUntil", ["isFree", "freeUntil"])