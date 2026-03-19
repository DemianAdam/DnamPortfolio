import { zid } from "convex-helpers/server/zod4";
import { ROLES } from "../user/types/role";
import { zUserMutation } from "../zod/zod";
import { createVideoValidator } from "./validators";

export const createVideo = zUserMutation({
    role: ROLES.ADMIN,
    args: createVideoValidator,
    handler: async (ctx, args) => {
        const { assignedUsers, ...videoData } = args;
        //console.log(args)

        const videoId = await ctx.db.insert("videos", {
            ...videoData,
            createdBy: ctx.user._id
        });

        if (assignedUsers) {
            const now = Date.now();
            for (const user of assignedUsers) {
                await ctx.db.insert("videoAccess", {
                    videoId: videoId,
                    userId: user.id,
                    grantedBy: ctx.user._id,
                    grantedAt: now
                })
            }
        }

        return videoId;
    },
    //returns: zid("videos")
});