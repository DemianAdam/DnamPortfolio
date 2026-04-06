import { ROLES } from "../user/types/role";
import { zUserMutation } from "../zod/zod";
import { createdVideoValidator, createVideoValidator, deleteVideoValidator } from "./validators";
import { CreatedVideoDTO } from "./dtos";
import { AppError } from "../../lib/errors/AppError";
import { ERROR_CODE } from "../../lib/errors/registry";

export const createVideo = zUserMutation({
    role: ROLES.ADMIN,
    args: createVideoValidator,
    handler: async (ctx, args) => {
        const { assignedUsers, ...videoData } = args;
        //console.log(args)
        console.log("Inserting...\n", videoData)
        const secret = crypto.randomUUID();
        const videoId = await ctx.db.insert("videos", {
            ...videoData,
            secret: secret,
            createdBy: ctx.user._id
        });

        console.log("Inserted video with ID:", videoId)

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

        const video: CreatedVideoDTO = {
            id: videoId,
            title: videoData.title,
            description: videoData.description ?? null,
            isFree: videoData.isFree,
            createdBy: ctx.user._id,
            secret: secret,
            freeUntil: videoData.freeUntil ?? null,
            assignedUsers: assignedUsers ?? null,
            publishDate: videoData.publishDate ?? null,
            deleted: videoData.deleted,
            duration: videoData.duration,
        }
        console.log("Final video data:", video)

        return video;
    },
    returns: createdVideoValidator
});

export const deleteVideo = zUserMutation({
    role: ROLES.ADMIN,
    args: deleteVideoValidator,
    handler: async (ctx, args) => {
        const video = await ctx.db.get("videos", args.videoId);
        if (!video) {
            throw new AppError(ERROR_CODE.VIDEO.NOT_FOUND, { videoId: args.videoId })
        }

        await ctx.db.patch("videos", args.videoId, { deleted: true })
    }
});