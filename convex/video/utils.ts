import { Doc, Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export async function canUserAccessVideo(ctx: QueryCtx, userId: Id<"users">, video: Doc<"videos">) {

    if (video.isFree) {
        return true;
    }

    if (video.freeUntil && video.freeUntil > Date.now()) {
        return true;
    }

    const access = await ctx.db
        .query("videoAccess")
        .withIndex("index_byVideo_and_user", (q) =>
            q.eq("videoId", video._id).eq("userId", userId)
        )
        .unique();

    if (access) return true;

    return false;
}