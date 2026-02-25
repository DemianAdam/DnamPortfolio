import { zodOutputToConvex } from "convex-helpers/server/zod";
import { videoAccessValidator } from "./validator";
import { defineTable } from "convex/server";

const videoAccessSchema = zodOutputToConvex(videoAccessValidator);

export const videoAccessTable =
    defineTable(videoAccessSchema)
        .index("index_byUser", ["userId"])
        .index("index_byVideo", ["videoId"])
        .index("index_byUser_and_video", ["userId", "videoId"])
        .index("index_byVideo_and_user", ["videoId", "userId"])
        .index("index_byExpiration", ["expiresAt"]);